import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import {
  postToTwitter,
  postToFacebook,
  postToPinterest,
  postToInstagram,
  createProductPost,
  generateHashtags,
} from '@/lib/social-media/socialPoster'

/**
 * AUTOMATIC SOCIAL MEDIA POSTING CRON JOB
 * 
 * This endpoint automatically posts to social media platforms.
 * 
 * Two modes:
 * 1. Process scheduled posts from queue
 * 2. Create and post new promotional content
 * 
 * Schedule: Every 2 hours (0 */2 * * *)
 * 
 * Platforms supported:
 * - Twitter/X
 * - Facebook
 * - Pinterest
 * - Instagram
 */

export async function GET(request: NextRequest) {
  try {
    // Security check
    const authHeader = request.headers.get('authorization')
    const cronSecret = process.env.CRON_SECRET
    
    if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    console.log('Starting social media posting...')

    const results = {
      queueProcessed: 0,
      newPosts: 0,
      errors: [] as string[],
    }

    // Step 1: Process scheduled posts from queue
    const queueResults = await processScheduledPosts()
    results.queueProcessed = queueResults.posted
    results.errors.push(...queueResults.errors)

    // Step 2: Create new promotional posts if needed
    const newPostResults = await createAutomaticPosts()
    results.newPosts = newPostResults.created
    results.errors.push(...newPostResults.errors)

    console.log('Social media posting completed:', results)

    return NextResponse.json({
      success: true,
      message: 'Social media posting completed',
      results,
      timestamp: new Date().toISOString(),
    })
  } catch (error: any) {
    console.error('Error in social media posting:', error)
    return NextResponse.json(
      { 
        error: 'Failed to post to social media',
        details: error.message,
      },
      { status: 500 }
    )
  }
}

/**
 * Process posts from the social_media_queue
 */
async function processScheduledPosts() {
  const results = {
    posted: 0,
    errors: [] as string[],
  }

  try {
    // Get pending posts that are due
    const { data: pendingPosts, error } = await supabaseAdmin
      .from('social_media_queue')
      .select('*')
      .eq('status', 'pending')
      .lte('scheduled_for', new Date().toISOString())
      .limit(10) // Process 10 at a time

    if (error) throw error

    if (!pendingPosts || pendingPosts.length === 0) {
      console.log('No pending social media posts')
      return results
    }

    console.log(`Processing ${pendingPosts.length} scheduled posts...`)

    // Post each one
    for (const post of pendingPosts) {
      try {
        let result

        const socialPost = {
          platform: post.platform,
          content: post.content,
          url: post.url,
          imageUrl: post.image_url,
        }

        switch (post.platform) {
          case 'twitter':
            result = await postToTwitter(socialPost as any)
            break
          case 'facebook':
            result = await postToFacebook(socialPost as any)
            break
          case 'pinterest':
            result = await postToPinterest(socialPost as any)
            break
          case 'instagram':
            result = await postToInstagram(socialPost as any)
            break
          default:
            throw new Error(`Unsupported platform: ${post.platform}`)
        }

        // Mark as posted
        await supabaseAdmin
          .from('social_media_queue')
          .update({
            status: 'posted',
            posted_at: new Date().toISOString(),
            post_id: result.postId,
          })
          .eq('id', post.id)

        results.posted++
        console.log(`✓ Posted to ${post.platform}: ${post.content.substring(0, 50)}...`)
      } catch (error: any) {
        console.error(`✗ Failed to post ${post.id}:`, error.message)
        
        // Mark as failed
        await supabaseAdmin
          .from('social_media_queue')
          .update({
            status: 'failed',
            error_message: error.message,
          })
          .eq('id', post.id)

        results.errors.push(`${post.platform}: ${error.message}`)
      }
    }
  } catch (error: any) {
    console.error('Error processing queue:', error)
    results.errors.push(`Queue processing: ${error.message}`)
  }

  return results
}

/**
 * Create new automatic promotional posts
 */
async function createAutomaticPosts() {
  const results = {
    created: 0,
    errors: [] as string[],
  }

  try {
    // Determine what to post about
    const postType = determinePostType()

    switch (postType) {
      case 'trending-product':
        await postTrendingProduct(results)
        break
      case 'price-drop':
        await postPriceDrop(results)
        break
      case 'new-products':
        await postNewProducts(results)
        break
      case 'blog-post':
        await postRecentBlog(results)
        break
      default:
        console.log('No automatic post created this cycle')
    }
  } catch (error: any) {
    console.error('Error creating automatic posts:', error)
    results.errors.push(`Auto-post creation: ${error.message}`)
  }

  return results
}

/**
 * Determine what type of content to post
 */
function determinePostType(): string {
  const hour = new Date().getHours()

  // Morning (6-10): Trending products
  if (hour >= 6 && hour < 10) return 'trending-product'

  // Afternoon (12-14): Price drops
  if (hour >= 12 && hour < 14) return 'price-drop'

  // Evening (18-20): New products
  if (hour >= 18 && hour < 20) return 'new-products'

  // Night (21-23): Blog posts
  if (hour >= 21 && hour < 23) return 'blog-post'

  return 'none'
}

/**
 * Post about trending product
 */
async function postTrendingProduct(results: any) {
  const { data: products } = await supabaseAdmin
    .from('products')
    .select('*')
    .eq('is_trending', true)
    .order('created_at', { ascending: false })
    .limit(1)

  if (!products || products.length === 0) return

  const product = products[0]
  const post = createProductPost(product)

  // Post to Twitter
  try {
    await postToTwitter(post as any)
    results.created++
    console.log(`✓ Posted trending product: ${product.name}`)
  } catch (error: any) {
    console.error('Failed to post trending product:', error)
    results.errors.push(`Trending product: ${error.message}`)
  }
}

/**
 * Post about price drop
 */
async function postPriceDrop(results: any) {
  // Find products with recent price updates and discounts
  const { data: products } = await supabaseAdmin
    .from('products')
    .select('*')
    .gte('discount_percentage', 20) // At least 20% off
    .order('updated_at', { ascending: false })
    .limit(1)

  if (!products || products.length === 0) return

  const product = products[0]
  const content = `🚨 PRICE DROP ALERT! 🚨\n\n${product.name}\n\n💰 ${product.discount_percentage}% OFF\nNow: $${product.price}\nWas: $${product.original_price}\n\nGrab it while you can! 👇`

  // Post to Twitter
  try {
    await postToTwitter({
      platform: 'twitter',
      content,
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/products/${product.id}`,
      imageUrl: product.image_url,
      hashtags: ['deal', 'sale', product.category?.toLowerCase()],
    } as any)
    
    results.created++
    console.log(`✓ Posted price drop: ${product.name}`)
  } catch (error: any) {
    console.error('Failed to post price drop:', error)
    results.errors.push(`Price drop: ${error.message}`)
  }
}

/**
 * Post about new products
 */
async function postNewProducts(results: any) {
  const threeDaysAgo = new Date()
  threeDaysAgo.setDate(threeDaysAgo.getDate() - 3)

  const { data: products } = await supabaseAdmin
    .from('products')
    .select('*')
    .gte('created_at', threeDaysAgo.toISOString())
    .order('created_at', { ascending: false })
    .limit(1)

  if (!products || products.length === 0) return

  const product = products[0]
  const content = `✨ NEW ARRIVAL!\n\n${product.name}\n\n${product.description?.substring(0, 100)}...\n\nCheck it out! 👇`

  try {
    await postToTwitter({
      platform: 'twitter',
      content,
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/products/${product.id}`,
      imageUrl: product.image_url,
      hashtags: generateHashtags(product.name, product.category),
    } as any)
    
    results.created++
    console.log(`✓ Posted new product: ${product.name}`)
  } catch (error: any) {
    console.error('Failed to post new product:', error)
    results.errors.push(`New product: ${error.message}`)
  }
}

/**
 * Post about recent blog post
 */
async function postRecentBlog(results: any) {
  const threeDaysAgo = new Date()
  threeDaysAgo.setDate(threeDaysAgo.getDate() - 3)

  const { data: posts } = await supabaseAdmin
    .from('blog_posts')
    .select('*')
    .eq('is_published', true)
    .gte('published_at', threeDaysAgo.toISOString())
    .order('published_at', { ascending: false })
    .limit(1)

  if (!posts || posts.length === 0) return

  const post = posts[0]
  const content = `📝 Latest from the blog:\n\n${post.title}\n\nRead it here! 👇`

  try {
    await postToTwitter({
      platform: 'twitter',
      content,
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/blog/${post.slug}`,
      imageUrl: post.featured_image,
      hashtags: post.tags?.slice(0, 3) || ['blog'],
    } as any)
    
    results.created++
    console.log(`✓ Posted blog: ${post.title}`)
  } catch (error: any) {
    console.error('Failed to post blog:', error)
    results.errors.push(`Blog post: ${error.message}`)
  }
}

/**
 * MANUAL TRIGGER
 * 
 * You can manually trigger social media posting:
 * GET /api/cron/social-media-post?type=product&id=123
 * 
 * Query params:
 * - type: product, blog, custom
 * - id: Product or blog post ID
 */
