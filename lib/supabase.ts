import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Server-side client with service role key
export const supabaseAdmin = createClient(
  supabaseUrl,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
)

// Types
export interface Product {
  id: string
  name: string
  description: string
  price: number
  original_price?: number
  discount_percentage?: number
  image_url: string
  category: string
  tags: string[]
  is_trending: boolean
  is_best_seller: boolean
  affiliate_links: AffiliateLink[]
  created_at: string
  updated_at: string
}

export interface AffiliateLink {
  id: string
  product_id: string
  network: string
  country_code: string
  affiliate_url: string
  priority: number
  created_at: string
}

export interface Coupon {
  id: string
  code: string
  description: string
  discount_type: 'percentage' | 'fixed'
  discount_value: number
  expires_at: string
  product_id?: string
  is_active: boolean
  created_at: string
}

export interface EmailSubscriber {
  id: string
  email: string
  is_subscribed: boolean
  subscribed_at: string
  unsubscribed_at?: string
}

export interface BlogPost {
  id: string
  title: string
  slug: string
  content: string
  excerpt: string
  author: string
  published_at: string
  is_published: boolean
  featured_image?: string
  tags: string[]
  created_at: string
}

// Product functions
export async function getProducts(options: {
  category?: string
  limit?: number
  offset?: number
} = {}) {
  const { category, limit = 10, offset = 0 } = options

  let query = supabase
    .from('products')
    .select('*, affiliate_links(*)')
    .order('created_at', { ascending: false })
    .range(offset, offset + limit - 1)

  if (category === 'trending') {
    query = query.eq('is_trending', true)
  } else if (category === 'best-sellers') {
    query = query.eq('is_best_seller', true)
  } else if (category) {
    query = query.eq('category', category)
  }

  const { data, error } = await query

  if (error) {
    console.error('Error fetching products:', error)
    return []
  }

  return data as Product[]
}

export async function getProductBySlug(slug: string) {
  const { data, error } = await supabase
    .from('products')
    .select('*, affiliate_links(*)')
    .eq('id', slug)
    .single()

  if (error) {
    console.error('Error fetching product:', error)
    return null
  }

  return data as Product
}

// Email subscription functions - use supabaseAdmin to bypass RLS
export async function subscribeEmail(email: string) {
  // First check if already subscribed
  const { data: existing } = await supabaseAdmin
    .from('email_subscribers')
    .select('id, is_subscribed')
    .eq('email', email)
    .single()

  if (existing) {
    if (existing.is_subscribed) {
      return { success: true, already: true }
    }
    // Re-subscribe if previously unsubscribed
    const { error } = await supabaseAdmin
      .from('email_subscribers')
      .update({ is_subscribed: true, subscribed_at: new Date().toISOString(), unsubscribed_at: null })
      .eq('email', email)
    if (error) return { success: false, error: error.message }
    return { success: true }
  }

  // New subscriber
  const { error } = await supabaseAdmin
    .from('email_subscribers')
    .insert([{ email, is_subscribed: true, subscribed_at: new Date().toISOString() }])

  if (error) {
    console.error('Error subscribing email:', error)
    return { success: false, error: error.message }
  }

  return { success: true }
}

export async function unsubscribeEmail(email: string) {
  const { error } = await supabaseAdmin
    .from('email_subscribers')
    .update({
      is_subscribed: false,
      unsubscribed_at: new Date().toISOString(),
    })
    .eq('email', email)

  if (error) {
    console.error('Error unsubscribing email:', error)
    return { success: false, error: error.message }
  }

  return { success: true }
}

// Coupon functions
export async function getActiveCoupons() {
  const { data, error } = await supabase
    .from('coupons')
    .select('*')
    .eq('is_active', true)
    .gte('expires_at', new Date().toISOString())

  if (error) {
    console.error('Error fetching coupons:', error)
    return []
  }

  return data as Coupon[]
}

// Blog functions
export async function getBlogPosts(limit = 10) {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('is_published', true)
    .order('published_at', { ascending: false })
    .limit(limit)

  if (error) {
    console.error('Error fetching blog posts:', error)
    return []
  }

  return data as BlogPost[]
}

export async function getBlogPostBySlug(slug: string) {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('slug', slug)
    .eq('is_published', true)
    .single()

  if (error) {
    console.error('Error fetching blog post:', error)
    return null
  }

  return data as BlogPost
}
