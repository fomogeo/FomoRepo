/**
 * SOCIAL MEDIA AUTOMATION LIBRARY
 * 
 * Routes all posts through Buffer API to connected platforms:
 * - Facebook Page
 * - Instagram Business
 * - Pinterest Business
 * 
 * Buffer handles the actual posting to each platform,
 * so we only need one API key (BUFFER_ACCESS_TOKEN).
 */

import { supabaseAdmin } from '@/lib/supabase'

interface SocialPost {
  content: string
  url?: string
  imageUrl?: string
  hashtags?: string[]
}

/**
 * Post to ALL connected Buffer profiles at once
 * This sends to Facebook, Instagram, and Pinterest in one call
 */
export async function postToAllPlatforms(post: SocialPost) {
  const bufferAccessToken = process.env.BUFFER_ACCESS_TOKEN

  if (!bufferAccessToken) {
    throw new Error('BUFFER_ACCESS_TOKEN not configured in environment variables')
  }

  // Step 1: Get all connected Buffer profiles
  const profilesResponse = await fetch('https://api.bufferapp.com/1/profiles.json', {
    headers: { 'Authorization': `Bearer ${bufferAccessToken}` },
  })

  if (!profilesResponse.ok) {
    const err = await profilesResponse.text()
    throw new Error(`Buffer profiles fetch failed: ${err}`)
  }

  const profiles = await profilesResponse.json()

  if (!Array.isArray(profiles) || profiles.length === 0) {
    throw new Error('No Buffer profiles found. Connect accounts at buffer.com')
  }

  // Get all profile IDs
  const profileIds = profiles.map((p: any) => p.id)
  const profileNames = profiles.map((p: any) => `${p.service} (${p.service_username || p.service_id})`).join(', ')

  console.log(`Posting to ${profiles.length} Buffer profiles: ${profileNames}`)

  // Step 2: Build the post content
  let text = post.content

  // Add hashtags
  if (post.hashtags && post.hashtags.length > 0) {
    const tags = post.hashtags.slice(0, 5).map(h => `#${h.replace(/\s+/g, '')}`).join(' ')
    text = `${text}\n\n${tags}`
  }

  // Add link
  if (post.url) {
    text = `${text}\n\n${post.url}`
  }

  // Step 3: Create update for ALL profiles at once
  const body: any = {
    profile_ids: profileIds,
    text,
    shorten: true,
    now: true,
  }

  // Add image if available (important for Pinterest and Instagram)
  if (post.imageUrl) {
    body.media = {
      photo: post.imageUrl,
      picture: post.imageUrl,
      thumbnail: post.imageUrl,
    }
  }

  const updateResponse = await fetch('https://api.bufferapp.com/1/updates/create.json', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${bufferAccessToken}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      'text': text,
      'now': 'true',
      'shorten': 'true',
      ...(post.imageUrl ? { 'media[photo]': post.imageUrl, 'media[picture]': post.imageUrl, 'media[thumbnail]': post.imageUrl } : {}),
      ...Object.fromEntries(profileIds.map((id: string, i: number) => [`profile_ids[${i}]`, id])),
    }),
  })

  const result = await updateResponse.json()

  if (!updateResponse.ok || result.success === false) {
    const errMsg = result.message || result.error || JSON.stringify(result)
    throw new Error(`Buffer posting failed: ${errMsg}`)
  }

  const postedCount = result.updates?.length || 0
  console.log(`Successfully queued ${postedCount} posts via Buffer`)

  return {
    success: true,
    postedTo: profileNames,
    count: postedCount,
    updates: result.updates?.map((u: any) => ({
      id: u.id,
      service: u.profile_service,
      status: u.status,
    })),
  }
}

/**
 * Generate relevant hashtags for a post
 */
export function generateHashtags(content: string, category?: string): string[] {
  const hashtags = ['FomoGeo', 'deals', 'sale']

  if (category) {
    // Convert "Home & Kitchen" to "HomeKitchen"
    hashtags.push(category.replace(/[&\s]+/g, ''))
  }

  // Category-specific popular hashtags
  const catHashtags: Record<string, string[]> = {
    'Electronics': ['tech', 'gadgets', 'electronics'],
    'Home & Kitchen': ['homedecor', 'kitchen', 'homeessentials'],
    'Audio & Headphones': ['audio', 'headphones', 'music'],
    'Computers & Tablets': ['laptop', 'computer', 'tech'],
    'Gaming': ['gaming', 'gamer', 'videogames'],
    'Fashion & Apparel': ['fashion', 'style', 'ootd'],
    'Beauty & Personal Care': ['beauty', 'skincare', 'selfcare'],
    'Sports & Outdoors': ['fitness', 'outdoors', 'active'],
    'Smart Home': ['smarthome', 'iot', 'hometech'],
    'Phones & Accessories': ['smartphone', 'phonecase', 'mobile'],
  }

  if (category && catHashtags[category]) {
    hashtags.push(...catHashtags[category])
  }

  // Deduplicate and return top 5
  return [...new Set(hashtags)].slice(0, 5)
}

/**
 * Create product promotion post content
 */
export function createProductPost(product: any): SocialPost {
  const discount = product.discount_percentage
  const hasDiscount = discount && discount > 0

  let content = ''

  if (hasDiscount && hasDiscount >= 20) {
    content = `🔥 ${discount}% OFF Alert!\n\n${product.name}\n\n💰 Now only $${product.price}`
    if (product.original_price) {
      content += ` (was $${product.original_price})`
    }
    content += `\n\nVerified deal — curated by our team.`
  } else if (hasDiscount) {
    content = `💡 Smart Deal Alert\n\n${product.name}\n\n${discount}% off at $${product.price}\n\nHand-picked and price-verified.`
  } else {
    content = `✨ Trending Now\n\n${product.name}\n\nCustomer-reviewed and FomoGeo approved.\n\nSee why it's trending 👇`
  }

  return {
    content,
    url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://fomogeo.com'}/products/${product.id}`,
    imageUrl: product.image_url,
    hashtags: generateHashtags(product.name, product.category),
  }
}

/**
 * Create blog post promotion content
 */
export function createBlogPromotionPost(blogPost: any): SocialPost {
  return {
    content: `📝 New on the FomoGeo Blog\n\n${blogPost.title}\n\n${blogPost.excerpt ? blogPost.excerpt.substring(0, 120) + '...' : 'Read the full article 👇'}`,
    url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://fomogeo.com'}/blog/${blogPost.slug}`,
    imageUrl: blogPost.featured_image,
    hashtags: blogPost.tags?.slice(0, 3) || ['FomoGeo', 'deals', 'blog'],
  }
}

/**
 * Create price drop alert content
 */
export function createPriceDropPost(product: any): SocialPost {
  return {
    content: `🚨 PRICE DROP ALERT\n\n${product.name}\n\n💰 ${product.discount_percentage}% OFF — Now $${product.price} (was $${product.original_price})\n\nVerified by FomoGeo. Grab it before it's gone!`,
    url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://fomogeo.com'}/products/${product.id}`,
    imageUrl: product.image_url,
    hashtags: generateHashtags(product.name, product.category),
  }
}

/**
 * Create new arrival content
 */
export function createNewArrivalPost(product: any): SocialPost {
  return {
    content: `✨ Just Added to FomoGeo\n\n${product.name}\n\n${product.discount_percentage ? `${product.discount_percentage}% off at $${product.price}` : `$${product.price}`}\n\nFreshly curated and verified.`,
    url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://fomogeo.com'}/products/${product.id}`,
    imageUrl: product.image_url,
    hashtags: generateHashtags(product.name, product.category),
  }
}
