import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

/**
 * REFRESH TRENDING PRODUCTS CRON JOB
 * 
 * This endpoint automatically determines which products should be marked as "trending"
 * based on actual performance metrics:
 * - Click-through rate
 * - Recent views
 * - Affiliate click data
 * - Time since last update
 * 
 * Schedule: Daily at midnight
 * 
 * This ensures your "Trending" section always shows truly popular products
 */

export const dynamic = 'force-dynamic';
export async function GET(request: NextRequest) {
  try {
    // Security check
    const authHeader = request.headers.get('authorization')
    const querySecret = request.nextUrl.searchParams.get('secret')
    const cronSecret = process.env.CRON_SECRET
    
    const isAuthorized = cronSecret && (
      authHeader === `Bearer ${cronSecret}` ||
      querySecret === cronSecret
    )
    
    if (cronSecret && !isAuthorized) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    console.log('Starting trending products refresh...')

    // Step 1: Reset all trending flags for products older than 30 days
    await resetOldTrending()

    // Step 2: Calculate trending scores based on metrics
    const trendingProducts = await calculateTrendingProducts()

    // Step 3: Mark top products as trending
    await markTrendingProducts(trendingProducts)

    // Step 4: Ensure we always have some trending products
    await ensureMinimumTrending()

    console.log('Trending products refreshed:', trendingProducts.length)

    return NextResponse.json({
      success: true,
      message: 'Trending products refreshed successfully',
      trendingCount: trendingProducts.length,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error('Error refreshing trending products:', error)
    return NextResponse.json(
      { error: 'Failed to refresh trending products', details: error },
      { status: 500 }
    )
  }
}

/**
 * Reset trending flag for products that haven't been updated in 30 days
 */
async function resetOldTrending() {
  const thirtyDaysAgo = new Date()
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

  await supabaseAdmin
    .from('products')
    .update({ is_trending: false })
    .eq('is_trending', true)
    .lt('updated_at', thirtyDaysAgo.toISOString())
}

/**
 * Calculate which products should be trending
 * 
 * Scoring factors:
 * - Affiliate clicks (weight: 40%)
 * - Recent updates (weight: 20%)
 * - Discount percentage (weight: 20%)
 * - Price range (weight: 10%)
 * - Category diversity (weight: 10%)
 */
async function calculateTrendingProducts(): Promise<string[]> {
  // Get all products with their click data
  const { data: products } = await supabaseAdmin
    .from('products')
    .select(`
      id,
      name,
      price,
      discount_percentage,
      category,
      updated_at,
      affiliate_clicks (
        clicked_at
      )
    `)
    .order('created_at', { ascending: false })
    .limit(200) // Analyze top 200 products

  if (!products) return []

  // Calculate trending score for each product
  const scoredProducts = products.map(product => {
    let score = 0

    // Factor 1: Click count (last 7 days) - 40% weight
    const sevenDaysAgo = new Date()
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)
    
    const recentClicks = product.affiliate_clicks?.filter(
      (click: any) => new Date(click.clicked_at) > sevenDaysAgo
    ).length || 0
    
    score += recentClicks * 10 // 10 points per click

    // Factor 2: Recency - 20% weight
    const daysSinceUpdate = Math.floor(
      (Date.now() - new Date(product.updated_at).getTime()) / (1000 * 60 * 60 * 24)
    )
    score += Math.max(0, 50 - daysSinceUpdate * 2) // Newer = higher score

    // Factor 3: Discount percentage - 20% weight
    const discount = product.discount_percentage || 0
    score += discount * 2 // 2 points per % discount

    // Factor 4: Price range sweet spot - 10% weight
    // Products between $20-$200 tend to convert better
    if (product.price >= 20 && product.price <= 200) {
      score += 25
    }

    // Factor 5: Category diversity bonus - 10% weight
    // Popular categories get a boost
    const popularCategories = ['Electronics', 'Home', 'Fashion', 'Beauty']
    if (popularCategories.includes(product.category)) {
      score += 20
    }

    return {
      id: product.id,
      name: product.name,
      category: product.category,
      score,
    }
  })

  // Sort by score and get top 20
  scoredProducts.sort((a, b) => b.score - a.score)
  
  // Ensure category diversity in top trending
  const trending: string[] = []
  const categoryCounts: Record<string, number> = {}
  const maxPerCategory = 5

  for (const product of scoredProducts) {
    const categoryCount = categoryCounts[product.category] || 0
    
    if (categoryCount < maxPerCategory) {
      trending.push(product.id)
      categoryCounts[product.category] = categoryCount + 1
    }

    if (trending.length >= 20) break
  }

  return trending
}

/**
 * Mark products as trending
 */
async function markTrendingProducts(productIds: string[]) {
  if (productIds.length === 0) return

  // First, unmark all current trending
  await supabaseAdmin
    .from('products')
    .update({ is_trending: false })
    .eq('is_trending', true)

  // Then mark new trending products
  await supabaseAdmin
    .from('products')
    .update({ is_trending: true })
    .in('id', productIds)
}

/**
 * Ensure we always have at least 10 trending products
 * If we don't have enough based on metrics, pick newest products
 */
async function ensureMinimumTrending() {
  const { count } = await supabaseAdmin
    .from('products')
    .select('id', { count: 'exact', head: true })
    .eq('is_trending', true)

  const minimumTrending = 10

  if (count && count < minimumTrending) {
    const needed = minimumTrending - count

    // Get newest products that aren't already trending
    const { data: newProducts } = await supabaseAdmin
      .from('products')
      .select('id')
      .eq('is_trending', false)
      .order('created_at', { ascending: false })
      .limit(needed)

    if (newProducts && newProducts.length > 0) {
      await supabaseAdmin
        .from('products')
        .update({ is_trending: true })
        .in('id', newProducts.map(p => p.id))
    }
  }
}

/**
 * ALTERNATIVE: EXTERNAL TRENDING DATA
 * 
 * You can also integrate with external services to determine trending:
 * - Google Trends API
 * - Amazon Best Sellers Rank
 * - Social media APIs (Twitter trending)
 * - Affiliate network "hot products" lists
 */
async function getTrendingFromExternalSources(): Promise<string[]> {
  // Example: Get trending products from Google Trends
  // Example: Get Amazon Best Sellers
  // Example: Get trending hashtags from Twitter
  
  return []
}
