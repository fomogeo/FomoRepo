import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

/**
 * AUTOMATIC PRICE UPDATE CRON JOB
 * 
 * This endpoint checks product prices and updates them automatically.
 * Also marks products with price drops for promotion.
 * 
 * Schedule: Daily at 3 AM
 * 
 * Features:
 * - Updates product prices
 * - Detects price drops
 * - Marks deals as expired if no longer available
 * - Calculates discount percentages
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

    console.log('Starting price update...')

    // Get all products with affiliate links
    const { data: products, error } = await supabaseAdmin
      .from('products')
      .select('*, affiliate_links(*)')
      .limit(100) // Process in batches

    if (error) throw error

    let updated = 0
    let priceDrops = 0
    let expired = 0

    for (const product of products || []) {
      try {
        // Get current price from affiliate network
        const currentPrice = await checkProductPrice(product)
        
        if (currentPrice === null) {
          // Product might be out of stock or unavailable
          // Mark as not trending after 7 days
          const sevenDaysAgo = new Date()
          sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)
          
          if (new Date(product.updated_at) < sevenDaysAgo) {
            await supabaseAdmin
              .from('products')
              .update({ is_trending: false })
              .eq('id', product.id)
            expired++
          }
          continue
        }

        // Check if price has changed
        if (currentPrice !== product.price) {
          const oldPrice = product.price
          const isPriceDrop = currentPrice < oldPrice

          // Calculate new discount percentage
          const originalPrice = product.original_price || oldPrice
          const discountPercentage = Math.round(
            ((originalPrice - currentPrice) / originalPrice) * 100
          )

          // Update product
          await supabaseAdmin
            .from('products')
            .update({
              price: currentPrice,
              discount_percentage: discountPercentage > 0 ? discountPercentage : null,
              updated_at: new Date().toISOString(),
            })
            .eq('id', product.id)

          updated++

          if (isPriceDrop) {
            // Mark as trending for price drops
            await supabaseAdmin
              .from('products')
              .update({ is_trending: true })
              .eq('id', product.id)
            
            priceDrops++
            
            // Optional: Send notification about price drop
            await notifyPriceDrop(product, oldPrice, currentPrice)
          }
        }
      } catch (error) {
        console.error(`Error updating product ${product.id}:`, error)
      }
    }

    console.log('Price update completed:', { updated, priceDrops, expired })

    return NextResponse.json({
      success: true,
      message: 'Prices updated successfully',
      stats: { updated, priceDrops, expired },
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error('Error updating prices:', error)
    return NextResponse.json(
      { error: 'Failed to update prices', details: error },
      { status: 500 }
    )
  }
}

/**
 * Check product price from affiliate network
 * 
 * Returns current price or null if unavailable
 */
async function checkProductPrice(product: any): Promise<number | null> {
  // Get primary affiliate link
  const primaryLink = product.affiliate_links?.[0]
  
  if (!primaryLink) return null

  try {
    switch (primaryLink.network) {
      case 'amazon':
        return await checkAmazonPrice(primaryLink.affiliate_url)
      
      case 'awin':
        return await checkAwinPrice(product.id)
      
      case 'cj':
        return await checkCJPrice(product.id)
      
      default:
        // For networks without API, keep current price
        return product.price
    }
  } catch (error) {
    console.error(`Price check failed for product ${product.id}:`, error)
    return product.price // Return current price on error
  }
}

/**
 * Check Amazon product price
 * 
 * Options:
 * 1. Amazon PA-API (official, requires approval)
 * 2. RainforestAPI (paid service, $0.01 per request)
 * 3. Web scraping (check Amazon ToS)
 */
async function checkAmazonPrice(affiliateUrl: string): Promise<number | null> {
  const rainforestApiKey = process.env.RAINFOREST_API_KEY
  
  if (!rainforestApiKey) {
    // No price checking available without API
    return null
  }

  try {
    // Extract ASIN from URL
    const asinMatch = affiliateUrl.match(/\/dp\/([A-Z0-9]{10})/)
    if (!asinMatch) return null

    const asin = asinMatch[1]

    // Use RainforestAPI to check price
    const response = await fetch(
      `https://api.rainforestapi.com/request?api_key=${rainforestApiKey}&type=product&asin=${asin}`,
      { next: { revalidate: 0 } } // No caching for price checks
    )

    if (!response.ok) return null

    const data = await response.json()
    
    return data.product?.buybox_winner?.price?.value || null
  } catch (error) {
    console.error('Amazon price check error:', error)
    return null
  }
}

/**
 * Check Awin product price
 */
async function checkAwinPrice(productId: string): Promise<number | null> {
  const apiKey = process.env.AWIN_API_KEY
  
  if (!apiKey) return null

  try {
    // Awin Product Feed API call
    // Implementation depends on your Awin setup
    return null
  } catch (error) {
    return null
  }
}

/**
 * Check CJ product price
 */
async function checkCJPrice(productId: string): Promise<number | null> {
  const apiKey = process.env.CJ_API_KEY
  
  if (!apiKey) return null

  try {
    // CJ API call
    return null
  } catch (error) {
    return null
  }
}

/**
 * Notify subscribers about significant price drops
 */
async function notifyPriceDrop(
  product: any,
  oldPrice: number,
  newPrice: number
) {
  const dropPercentage = Math.round(((oldPrice - newPrice) / oldPrice) * 100)
  
  // Only notify for drops > 20%
  if (dropPercentage < 20) return

  try {
    // Get subscribed emails
    const { data: subscribers } = await supabaseAdmin
      .from('email_subscribers')
      .select('email')
      .eq('is_subscribed', true)

    if (!subscribers || subscribers.length === 0) return

    // In production, integrate with your email service
    // For now, just log
    console.log(`Price drop notification: ${product.name} dropped ${dropPercentage}%`)
    console.log(`Would notify ${subscribers.length} subscribers`)

    // Example: SendGrid integration
    // await sendEmail({
    //   to: subscribers.map(s => s.email),
    //   subject: `🔥 Price Drop Alert: ${product.name}`,
    //   body: `${product.name} just dropped ${dropPercentage}%! Now only $${newPrice}`,
    // })
  } catch (error) {
    console.error('Error sending price drop notification:', error)
  }
}

/**
 * ALTERNATIVE: MANUAL PRICE UPDATES
 * 
 * If you don't want to use APIs for price checking:
 * 1. Download updated product feeds weekly
 * 2. Upload to Supabase Storage
 * 3. This script processes the feed and updates prices
 * 
 * This is more cost-effective but less real-time
 */
