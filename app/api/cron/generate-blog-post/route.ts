import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { generateBlogPostWithImages, getTrendingTopics } from '@/lib/content-generation/blogGenerator'

/**
 * AUTOMATIC BLOG POST GENERATION CRON JOB
 * 
 * This endpoint automatically generates SEO-optimized blog posts using AI.
 * 
 * Schedule Options:
 * - Daily: 1 post per day
 * - 3x per week: Monday, Wednesday, Friday
 * - Weekly: Every Monday
 * 
 * Default: 3x per week (0 9 * * 1,3,5)
 * 
 * Features:
 * - AI-generated content using OpenAI GPT-4
 * - SEO-optimized with keywords
 * - Auto-includes product links
 * - Auto-finds relevant images
 * - Varies content types (reviews, guides, comparisons)
 */
export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    // Security check - accept both Authorization header and query parameter
    const authHeader = request.headers.get('authorization')
    const querySecret = request.nextUrl.searchParams.get('secret')
    const cronSecret = process.env.CRON_SECRET
    
    // Check if secret matches (either in header or query param)
    const isAuthorized = cronSecret && (
      authHeader === `Bearer ${cronSecret}` ||
      querySecret === cronSecret
    )
    
    if (cronSecret && !isAuthorized) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    console.log('Starting automatic blog post generation...')

    // Check if OpenAI is configured
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json({
        error: 'OpenAI API key not configured',
        message: 'Add OPENAI_API_KEY to environment variables'
      }, { status: 400 })
    }

    // Get trending topics
    const trendingTopics = await getTrendingTopics()
    
    if (trendingTopics.length === 0) {
      return NextResponse.json({
        error: 'No trending topics found',
        message: 'Add some products to your database first'
      }, { status: 400 })
    }

    // Determine what type of post to write
    const postType = getNextPostType()
    const category = trendingTopics[Math.floor(Math.random() * trendingTopics.length)]

    console.log(`Generating ${postType} post about ${category}...`)

    // Get products for this category if needed
    let products = []
    if (['top-10', 'comparison', 'product-review'].includes(postType)) {
      const { data } = await supabaseAdmin
        .from('products')
        .select('*')
        .eq('category', category)
        .eq('is_trending', true)
        .limit(10)

      products = data || []
    }

    // Generate keywords for SEO
    const keywords = generateKeywords(postType, category)

    // Generate the blog post
    const blogPost = await generateBlogPostWithImages({
      type: postType as any,
      category,
      keywords,
      products,
      minWords: 1500,
    })

    // Save to database
    const { data: savedPost, error: saveError } = await supabaseAdmin
      .from('blog_posts')
      .insert([{
        title: blogPost.title,
        slug: blogPost.slug,
        content: blogPost.content,
        excerpt: blogPost.excerpt,
        author: 'FOMO Finds Team',
        published_at: new Date().toISOString(),
        is_published: true, // Auto-publish, or set to false for review
        featured_image: blogPost.featured_image,
        tags: blogPost.tags,
      }])
      .select()
      .single()

    if (saveError) {
      throw saveError
    }

    console.log(`Blog post created: ${blogPost.title}`)

    // Schedule social media posts about this blog
    if (savedPost) {
      await scheduleSocialMediaPosts(savedPost)
    }

    return NextResponse.json({
      success: true,
      message: 'Blog post generated successfully',
      post: {
        id: savedPost.id,
        title: blogPost.title,
        slug: blogPost.slug,
        wordCount: blogPost.content.split(' ').length,
      },
      timestamp: new Date().toISOString(),
    })
  } catch (error: any) {
    console.error('Error generating blog post:', error)
    return NextResponse.json(
      { 
        error: 'Failed to generate blog post',
        details: error.message,
      },
      { status: 500 }
    )
  }
}

/**
 * Determine what type of post to write next
 * Rotates through different types for variety
 */
function getNextPostType(): string {
  const types = [
    'top-10',        // "Top 10 X Products of 2026"
    'buying-guide',  // "How to Choose X"
    'product-review',// "X Review: Is It Worth Buying?"
    'comparison',    // "X vs Y: Which Should You Buy?"
    'how-to',        // "How to Choose the Perfect X"
  ]

  // Get current day of week to vary content
  const dayOfWeek = new Date().getDay()
  const typeIndex = dayOfWeek % types.length

  return types[typeIndex]
}

/**
 * Generate SEO keywords based on post type and category
 */
function generateKeywords(postType: string, category: string): string[] {
  const year = new Date().getFullYear()
  const baseKeywords = [category.toLowerCase(), 'deals', 'best']

  const typeKeywords: Record<string, string[]> = {
    'top-10': [`best ${category} ${year}`, `top ${category}`, `${category} recommendations`],
    'buying-guide': [`${category} buying guide`, `how to choose ${category}`, `${category} guide`],
    'product-review': [`${category} review`, `${category} worth it`, `should i buy ${category}`],
    'comparison': [`${category} comparison`, `${category} vs`, `best ${category} comparison`],
    'how-to': [`how to buy ${category}`, `choosing ${category}`, `${category} tips`],
  }

  return [...baseKeywords, ...(typeKeywords[postType] || [])]
}

/**
 * Schedule social media posts to promote this blog post
 */
async function scheduleSocialMediaPosts(blogPost: any) {
  try {
    // Create social media posts for different times
    const socialPosts = [
      {
        platform: 'twitter',
        content: `📝 New Blog Post: ${blogPost.title}\n\nCheck it out! 👇`,
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/blog/${blogPost.slug}`,
        scheduled_for: new Date(Date.now() + 2 * 60 * 60 * 1000), // 2 hours from now
      },
      {
        platform: 'facebook',
        content: `We just published a new guide: ${blogPost.title}\n\n${blogPost.excerpt}`,
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/blog/${blogPost.slug}`,
        scheduled_for: new Date(Date.now() + 4 * 60 * 60 * 1000), // 4 hours from now
      },
      {
        platform: 'pinterest',
        content: blogPost.title,
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/blog/${blogPost.slug}`,
        image_url: blogPost.featured_image,
        scheduled_for: new Date(Date.now() + 6 * 60 * 60 * 1000), // 6 hours from now
      },
    ]

    // Save to social_media_queue table
    for (const post of socialPosts) {
      await supabaseAdmin
        .from('social_media_queue')
        .insert([{
          platform: post.platform,
          content: post.content,
          url: post.url,
          image_url: post.image_url || null,
          scheduled_for: post.scheduled_for.toISOString(),
          status: 'pending',
        }])
    }

    console.log(`Scheduled ${socialPosts.length} social media posts`)
  } catch (error) {
    console.error('Failed to schedule social media posts:', error)
  }
}

/**
 * MANUAL TRIGGER
 * 
 * You can also manually trigger blog post generation:
 * 
 * GET /api/cron/generate-blog-post?type=top-10&category=Electronics
 * 
 * Query params:
 * - type: top-10, buying-guide, product-review, comparison, how-to
 * - category: Category name from your products
 */
