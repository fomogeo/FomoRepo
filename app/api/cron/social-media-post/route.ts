export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import {
  postToAllPlatforms,
  createProductPost,
  createBlogPromotionPost,
  createPriceDropPost,
  createNewArrivalPost,
  generateHashtags,
} from '@/lib/social-media/socialPoster'

/**
 * AUTOMATIC SOCIAL MEDIA POSTING CRON JOB
 * 
 * Posts to all Buffer-connected platforms (Facebook, Instagram, Pinterest)
 * in a single API call.
 * 
 * Schedule: Once per day at 14:00 UTC (0 14 * * *)
 * 
 * Post type rotates daily:
 * - Monday: Trending product
 * - Tuesday: Blog post
 * - Wednesday: Price drop alert
 * - Thursday: New arrival
 * - Friday: Trending product
 * - Saturday: Blog post
 * - Sunday: Best deal of the week
 */

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

    // Check Buffer is configured
    if (!process.env.BUFFER_ACCESS_TOKEN) {
      return NextResponse.json({
        success: false,
        error: 'BUFFER_ACCESS_TOKEN not set in environment variables',
      }, { status: 500 })
    }

    console.log('Starting social media posting via Buffer...')

    const results = {
      posted: false,
      postType: '',
      platforms: '',
      errors: [] as string[],
    }

    // Determine what to post based on day of week
    const dayOfWeek = new Date().getDay() // 0=Sun, 1=Mon, ...
    
    try {
      switch (dayOfWeek) {
        case 1: // Monday - Trending product
        case 5: // Friday - Trending product
          await postTrendingProduct(results)
          break
        case 2: // Tuesday - Blog post
        case 6: // Saturday - Blog post
          await postRecentBlog(results)
          break
        case 3: // Wednesday - Price drop
          await postPriceDrop(results)
          break
        case 4: // Thursday - New arrival
          await postNewProducts(results)
          break
        case 0: // Sunday - Best deal of the week
          await postBestDeal(results)
          break
      }
    } catch (error: any) {
      results.errors.push(error.message)
      console.error('Posting failed:', error.message)
    }

    // Log to social_media_queue for tracking
    if (results.posted) {
      try {
        await supabaseAdmin.from('social_media_queue').insert({
          platform: 'buffer',
          content: `[${results.postType}] Posted to: ${results.platforms}`,
          status: 'posted',
          posted_at: new Date().toISOString(),
          scheduled_for: new Date().toISOString(),
        })
      } catch (e) {
        // Don't fail the whole request if logging fails
        console.error('Failed to log to queue:', e)
      }
    }

    console.log('Social media posting completed:', results)

    return NextResponse.json({
      success: results.posted,
      message: results.posted ? 'Posted successfully to all platforms' : 'No content to post',
      results,
      timestamp: new Date().toISOString(),
    })
  } catch (error: any) {
    console.error('Error in social media posting:', error)
    return NextResponse.json({
      error: 'Failed to post to social media',
      details: error.message,
    }, { status: 500 })
  }
}

/**
 * Post a trending product to all platforms
 */
async function postTrendingProduct(results: any) {
  const { data: products } = await supabaseAdmin
    .from('products')
    .select('*')
    .eq('is_trending', true)
    .order('updated_at', { ascending: false })
    .limit(5)

  if (!products || products.length === 0) {
    console.log('No trending products found')
    return
  }

  // Pick a random one from the top 5 for variety
  const product = products[Math.floor(Math.random() * products.length)]
  const post = createProductPost(product)

  console.log(`Posting trending product: ${product.name}`)
  const result = await postToAllPlatforms(post)
  
  results.posted = true
  results.postType = 'Trending Product'
  results.platforms = result.postedTo
}

/**
 * Post a price drop alert to all platforms
 */
async function postPriceDrop(results: any) {
  const { data: products } = await supabaseAdmin
    .from('products')
    .select('*')
    .gte('discount_percentage', 15)
    .order('discount_percentage', { ascending: false })
    .limit(5)

  if (!products || products.length === 0) {
    // Fallback to any trending product
    await postTrendingProduct(results)
    return
  }

  const product = products[Math.floor(Math.random() * products.length)]
  const post = createPriceDropPost(product)

  console.log(`Posting price drop: ${product.name} (${product.discount_percentage}% off)`)
  const result = await postToAllPlatforms(post)

  results.posted = true
  results.postType = 'Price Drop'
  results.platforms = result.postedTo
}

/**
 * Post about new products to all platforms
 */
async function postNewProducts(results: any) {
  const sevenDaysAgo = new Date()
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)

  const { data: products } = await supabaseAdmin
    .from('products')
    .select('*')
    .gte('created_at', sevenDaysAgo.toISOString())
    .order('created_at', { ascending: false })
    .limit(5)

  if (!products || products.length === 0) {
    await postTrendingProduct(results)
    return
  }

  const product = products[Math.floor(Math.random() * products.length)]
  const post = createNewArrivalPost(product)

  console.log(`Posting new arrival: ${product.name}`)
  const result = await postToAllPlatforms(post)

  results.posted = true
  results.postType = 'New Arrival'
  results.platforms = result.postedTo
}

/**
 * Post a recent blog article to all platforms
 */
async function postRecentBlog(results: any) {
  const thirtyDaysAgo = new Date()
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

  const { data: posts } = await supabaseAdmin
    .from('blog_posts')
    .select('*')
    .eq('is_published', true)
    .gte('published_at', thirtyDaysAgo.toISOString())
    .order('published_at', { ascending: false })
    .limit(5)

  if (!posts || posts.length === 0) {
    // Fallback to trending product if no recent blogs
    await postTrendingProduct(results)
    return
  }

  const blogPost = posts[Math.floor(Math.random() * posts.length)]
  const post = createBlogPromotionPost(blogPost)

  console.log(`Posting blog: ${blogPost.title}`)
  const result = await postToAllPlatforms(post)

  results.posted = true
  results.postType = 'Blog Post'
  results.platforms = result.postedTo
}

/**
 * Post the best deal of the week (Sunday special)
 */
async function postBestDeal(results: any) {
  const { data: products } = await supabaseAdmin
    .from('products')
    .select('*')
    .gte('discount_percentage', 10)
    .order('discount_percentage', { ascending: false })
    .limit(1)

  if (!products || products.length === 0) {
    await postTrendingProduct(results)
    return
  }

  const product = products[0]
  const post: any = {
    content: `🏆 DEAL OF THE WEEK\n\n${product.name}\n\n💰 ${product.discount_percentage}% OFF — Just $${product.price}\n\nOur top pick this week. Verified and recommended by the FomoGeo team.\n\nDon't miss out! 👇`,
    url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://fomogeo.com'}/products/${product.id}`,
    imageUrl: product.image_url,
    hashtags: ['FomoGeo', 'DealOfTheWeek', 'BestDeals', product.category?.replace(/[&\s]+/g, '') || 'deals'],
  }

  console.log(`Posting deal of the week: ${product.name}`)
  const result = await postToAllPlatforms(post)

  results.posted = true
  results.postType = 'Deal of the Week'
  results.platforms = result.postedTo
}
