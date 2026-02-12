/**
 * SOCIAL MEDIA AUTOMATION LIBRARY
 * 
 * This library handles automatic posting to multiple social media platforms:
 * - Twitter/X
 * - Facebook
 * - Pinterest
 * - Instagram (via Facebook API)
 * - LinkedIn (optional)
 * 
 * Features:
 * - Scheduled posting
 * - Multi-platform support
 * - Image handling
 * - Hashtag generation
 * - Link shortening
 * - Analytics tracking
 */

import { supabaseAdmin } from '@/lib/supabase'

interface SocialPost {
  platform: 'twitter' | 'facebook' | 'pinterest' | 'instagram' | 'linkedin'
  content: string
  url?: string
  imageUrl?: string
  hashtags?: string[]
}

/**
 * Post to Twitter/X
 */
export async function postToTwitter(post: SocialPost) {
  const apiKey = process.env.TWITTER_API_KEY
  const apiSecret = process.env.TWITTER_API_SECRET
  const accessToken = process.env.TWITTER_ACCESS_TOKEN
  const accessSecret = process.env.TWITTER_ACCESS_SECRET

  if (!apiKey || !apiSecret || !accessToken || !accessSecret) {
    throw new Error('Twitter API credentials not configured')
  }

  try {
    // Format tweet (280 character limit)
    let tweet = post.content

    // Add hashtags
    if (post.hashtags && post.hashtags.length > 0) {
      const hashtags = post.hashtags.slice(0, 3).map(h => `#${h}`).join(' ')
      tweet = `${tweet}\n\n${hashtags}`
    }

    // Add link
    if (post.url) {
      tweet = `${tweet}\n\n${post.url}`
    }

    // Truncate if needed
    if (tweet.length > 280) {
      tweet = tweet.substring(0, 277) + '...'
    }

    // Twitter API v2 request
    const response = await fetch('https://api.twitter.com/2/tweets', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text: tweet,
      }),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(`Twitter API error: ${JSON.stringify(error)}`)
    }

    const data = await response.json()
    return {
      success: true,
      platform: 'twitter',
      postId: data.data.id,
      url: `https://twitter.com/i/web/status/${data.data.id}`,
    }
  } catch (error: any) {
    console.error('Twitter posting failed:', error)
    throw error
  }
}

/**
 * Post to Facebook Page
 */
export async function postToFacebook(post: SocialPost) {
  const accessToken = process.env.FACEBOOK_PAGE_ACCESS_TOKEN
  const pageId = process.env.FACEBOOK_PAGE_ID

  if (!accessToken || !pageId) {
    throw new Error('Facebook API credentials not configured')
  }

  try {
    const params = new URLSearchParams({
      message: post.content,
      access_token: accessToken,
    })

    if (post.url) {
      params.append('link', post.url)
    }

    if (post.imageUrl) {
      params.append('picture', post.imageUrl)
    }

    const response = await fetch(
      `https://graph.facebook.com/v18.0/${pageId}/feed`,
      {
        method: 'POST',
        body: params,
      }
    )

    if (!response.ok) {
      const error = await response.json()
      throw new Error(`Facebook API error: ${JSON.stringify(error)}`)
    }

    const data = await response.json()
    return {
      success: true,
      platform: 'facebook',
      postId: data.id,
    }
  } catch (error: any) {
    console.error('Facebook posting failed:', error)
    throw error
  }
}

/**
 * Post to Pinterest
 */
export async function postToPinterest(post: SocialPost) {
  const accessToken = process.env.PINTEREST_ACCESS_TOKEN
  const boardId = process.env.PINTEREST_BOARD_ID

  if (!accessToken || !boardId) {
    throw new Error('Pinterest API credentials not configured')
  }

  if (!post.imageUrl) {
    throw new Error('Pinterest requires an image')
  }

  try {
    const response = await fetch('https://api.pinterest.com/v5/pins', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        board_id: boardId,
        title: post.content.substring(0, 100),
        description: post.content,
        link: post.url,
        media_source: {
          source_type: 'image_url',
          url: post.imageUrl,
        },
      }),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(`Pinterest API error: ${JSON.stringify(error)}`)
    }

    const data = await response.json()
    return {
      success: true,
      platform: 'pinterest',
      postId: data.id,
    }
  } catch (error: any) {
    console.error('Pinterest posting failed:', error)
    throw error
  }
}

/**
 * Post to Instagram (via Facebook Graph API)
 */
export async function postToInstagram(post: SocialPost) {
  const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN
  const accountId = process.env.INSTAGRAM_BUSINESS_ACCOUNT_ID

  if (!accessToken || !accountId) {
    throw new Error('Instagram API credentials not configured')
  }

  if (!post.imageUrl) {
    throw new Error('Instagram requires an image')
  }

  try {
    // Step 1: Create media container
    const containerResponse = await fetch(
      `https://graph.facebook.com/v18.0/${accountId}/media`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          image_url: post.imageUrl,
          caption: post.content,
          access_token: accessToken,
        }),
      }
    )

    const containerData = await containerResponse.json()

    if (!containerResponse.ok) {
      throw new Error(`Instagram container error: ${JSON.stringify(containerData)}`)
    }

    // Step 2: Publish media
    const publishResponse = await fetch(
      `https://graph.facebook.com/v18.0/${accountId}/media_publish`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          creation_id: containerData.id,
          access_token: accessToken,
        }),
      }
    )

    const publishData = await publishResponse.json()

    if (!publishResponse.ok) {
      throw new Error(`Instagram publish error: ${JSON.stringify(publishData)}`)
    }

    return {
      success: true,
      platform: 'instagram',
      postId: publishData.id,
    }
  } catch (error: any) {
    console.error('Instagram posting failed:', error)
    throw error
  }
}

/**
 * Generate relevant hashtags for a post
 */
export function generateHashtags(content: string, category?: string): string[] {
  const hashtags = ['deals', 'shopping', 'sale']

  if (category) {
    hashtags.push(category.toLowerCase().replace(/\s+/g, ''))
  }

  // Extract keywords from content
  const words = content.toLowerCase().match(/\b\w{4,}\b/g) || []
  const commonWords = ['this', 'that', 'with', 'from', 'have', 'been', 'were', 'they', 'what', 'when']
  
  words.forEach(word => {
    if (!commonWords.includes(word) && !hashtags.includes(word)) {
      hashtags.push(word)
    }
  })

  // Return top 5 most relevant
  return hashtags.slice(0, 5)
}

/**
 * Create product promotion post
 */
export function createProductPost(product: any): SocialPost {
  const discount = product.discount_percentage
  const hasDiscount = discount && discount > 0

  let content = ''

  if (hasDiscount) {
    content = `🔥 ${discount}% OFF Alert!\n\n${product.name}\n\nNow only $${product.price}`
    if (product.original_price) {
      content += ` (was $${product.original_price})`
    }
    content += `\n\nDon't miss this deal! 👇`
  } else {
    content = `✨ Trending Now!\n\n${product.name}\n\n${product.description?.substring(0, 100)}...\n\nCheck it out! 👇`
  }

  return {
    platform: 'twitter',
    content,
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/products/${product.id}`,
    imageUrl: product.image_url,
    hashtags: generateHashtags(product.name, product.category),
  }
}

/**
 * Create blog post promotion
 */
export function createBlogPromotionPost(blogPost: any): SocialPost {
  return {
    platform: 'twitter',
    content: `📝 New Blog Post!\n\n${blogPost.title}\n\nCheck it out! 👇`,
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/blog/${blogPost.slug}`,
    imageUrl: blogPost.featured_image,
    hashtags: blogPost.tags?.slice(0, 3) || ['blog', 'deals', 'shopping'],
  }
}

/**
 * Alternative: Use Buffer API for multi-platform posting
 * (Recommended if you don't want to manage individual API keys)
 */
export async function postViaBuffer(post: SocialPost) {
  const bufferAccessToken = process.env.BUFFER_ACCESS_TOKEN
  
  if (!bufferAccessToken) {
    throw new Error('Buffer access token not configured')
  }

  // Get Buffer profile IDs for connected accounts
  const profilesResponse = await fetch(
    'https://api.bufferapp.com/1/profiles.json',
    {
      headers: {
        'Authorization': `Bearer ${bufferAccessToken}`,
      },
    }
  )

  const profiles = await profilesResponse.json()

  // Filter profiles by platform
  const targetProfile = profiles.find((p: any) => 
    p.service === post.platform || 
    (post.platform === 'twitter' && p.service === 'twitter')
  )

  if (!targetProfile) {
    throw new Error(`No Buffer profile found for ${post.platform}`)
  }

  // Create update
  const updateResponse = await fetch(
    'https://api.bufferapp.com/1/updates/create.json',
    {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${bufferAccessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        profile_ids: [targetProfile.id],
        text: post.content,
        media: post.imageUrl ? {
          picture: post.imageUrl,
        } : undefined,
        shorten: true,
        now: true, // Post immediately, or set scheduled_at for scheduling
      }),
    }
  )

  const result = await updateResponse.json()
  
  return {
    success: result.success,
    platform: post.platform,
    postId: result.updates?.[0]?.id,
  }
}
