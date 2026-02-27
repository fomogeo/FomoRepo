import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Admin client for server-side operations
export const supabaseAdmin = createClient(
  supabaseUrl,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

// Types
export interface Product {
  id: string
  name: string
  description: string | null
  price: number
  original_price: number | null
  discount_percentage: number | null
  image_url: string | null
  category: string
  tags: string[] | null
  is_trending: boolean
  is_best_seller: boolean
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

export interface BlogPost {
  id: string
  title: string
  slug: string
  content: string
  excerpt: string | null
  author: string
  published_at: string | null
  is_published: boolean
  featured_image: string | null
  tags: string[] | null
  created_at: string
  updated_at: string
}

export interface EmailSubscriber {
  id: string
  email: string
  is_subscribed: boolean
  subscribed_at: string
  unsubscribed_at: string | null
}

export interface Coupon {
  id: string
  code: string
  description: string | null
  discount_type: 'percentage' | 'fixed'
  discount_value: number
  expires_at: string
  product_id: string | null
  is_active: boolean
  created_at: string
}

// Products
export async function getProducts(limit = 50) {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(limit)

  if (error) {
    console.error('Error fetching products:', error)
    return []
  }

  return data as Product[]
}

export async function getProductById(id: string) {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    console.error('Error fetching product:', error)
    return null
  }

  return data as Product
}

export async function getProductBySlug(slug: string) {
  // For now, treating slug as ID since products use ID in URL
  // If you have a separate slug field, change 'id' to 'slug'
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', slug)
    .single()

  if (error) {
    console.error('Error fetching product by slug:', error)
    return null
  }

  return data as Product
}

export async function getTrendingProducts(limit = 10) {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('is_trending', true)
    .order('created_at', { ascending: false })
    .limit(limit)

  if (error) {
    console.error('Error fetching trending products:', error)
    return []
  }

  return data as Product[]
}

export async function getBestSellers(limit = 10) {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('is_best_seller', true)
    .order('created_at', { ascending: false })
    .limit(limit)

  if (error) {
    console.error('Error fetching best sellers:', error)
    return []
  }

  return data as Product[]
}

export async function getProductsByCategory(category: string, limit = 50) {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('category', category)
    .order('created_at', { ascending: false })
    .limit(limit)

  if (error) {
    console.error('Error fetching products by category:', error)
    return []
  }

  return data as Product[]
}

// Affiliate Links
export async function getAffiliateLinks(productId: string) {
  const { data, error } = await supabase
    .from('affiliate_links')
    .select('*')
    .eq('product_id', productId)
    .order('priority', { ascending: false })

  if (error) {
    console.error('Error fetching affiliate links:', error)
    return []
  }

  return data as AffiliateLink[]
}

// Blog Posts
export async function getBlogPosts(limit = 20) {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('id, title, slug, content, excerpt, author, published_at, is_published, featured_image, tags, created_at, updated_at')
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
    .select('id, title, slug, content, excerpt, author, published_at, is_published, featured_image, tags, created_at, updated_at')
    .eq('slug', slug)
    .single()

  if (error) {
    console.error('Error fetching blog post:', error)
    return null
  }

  return data as BlogPost
}

// Email Subscribers
export async function addEmailSubscriber(email: string) {
  const { data, error } = await supabaseAdmin
    .from('email_subscribers')
    .insert([{ email, is_subscribed: true }])
    .select()
    .single()

  if (error) {
    console.error('Error adding email subscriber:', error)
    return { success: false, error: error.message }
  }

  return { success: true, data }
}

// Alias for addEmailSubscriber (for compatibility)
export async function subscribeEmail(email: string) {
  return await addEmailSubscriber(email)
}

export async function unsubscribeEmail(email: string) {
  const { data, error } = await supabaseAdmin
    .from('email_subscribers')
    .update({ is_subscribed: false, unsubscribed_at: new Date().toISOString() })
    .eq('email', email)
    .select()
    .single()

  if (error) {
    console.error('Error unsubscribing email:', error)
    return { success: false, error: error.message }
  }

  return { success: true, data }
}

export async function checkEmailExists(email: string) {
  const { data, error } = await supabase
    .from('email_subscribers')
    .select('*')
    .eq('email', email)
    .single()

  if (error) {
    return { exists: false }
  }

  return { exists: true, isSubscribed: data.is_subscribed }
}

// Coupons
export async function getActiveCoupons() {
  const { data, error } = await supabase
    .from('coupons')
    .select('*')
    .eq('is_active', true)
    .gte('expires_at', new Date().toISOString())
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching coupons:', error)
    return []
  }

  return data as Coupon[]
}

export async function getCouponsByProduct(productId: string) {
  const { data, error } = await supabase
    .from('coupons')
    .select('*')
    .eq('product_id', productId)
    .eq('is_active', true)
    .gte('expires_at', new Date().toISOString())
    .order('discount_value', { ascending: false })

  if (error) {
    console.error('Error fetching product coupons:', error)
    return []
  }

  return data as Coupon[]
}
