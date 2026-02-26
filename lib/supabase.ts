import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

// Regular client for client-side operations
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Admin client for server-side operations (cron jobs, etc.)
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey || supabaseAnonKey)

// TypeScript interfaces
export interface Product {
  id: string
  name: string
  slug?: string
  description?: string
  price: number
  original_price?: number
  discount_percentage?: number
  category: string
  affiliate_url: string
  image_url?: string
  is_trending?: boolean
  is_best_seller?: boolean
  tags?: string[]
  created_at?: string
  updated_at?: string
}

export interface BlogPost {
  id: string
  title: string
  slug: string
  content: string
  excerpt?: string
  featured_image?: string
  author?: string
  tags?: string[]
  category?: string
  published_at?: string
  created_at: string
  updated_at?: string
}

export interface AffiliateLink {
  id: string
  product_id: string
  url: string
  network: string
  commission_rate?: number
}

// ===============================
// PRODUCT FUNCTIONS
// ===============================

export async function getProducts(options: {
  limit?: number
  category?: string
  trending?: boolean
} = {}) {
  let query = supabase.from('products').select('*')
  
  if (options.category) {
    query = query.eq('category', options.category)
  }
  
  if (options.trending) {
    query = query.eq('is_trending', true)
  }
  
  if (options.limit) {
    query = query.limit(options.limit)
  }
  
  const { data, error } = await query
  
  if (error) {
    console.error('Error fetching products:', error)
    return []
  }
  
  return data || []
}

export async function getProductById(id: string): Promise<Product | null> {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single()
  
  if (error) {
    console.error('Error fetching product:', error)
    return null
  }
  
  return data
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('slug', slug)
    .single()
  
  if (error) {
    console.error('Error fetching product by slug:', error)
    return null
  }
  
  return data
}

// ===============================
// BLOG FUNCTIONS
// ===============================

export async function getBlogPosts(limit: number = 20): Promise<BlogPost[]> {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(limit)
  
  if (error) {
    console.error('Error fetching blog posts:', error)
    return []
  }
  
  return data || []
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('slug', slug)
    .single()
  
  if (error) {
    console.error('Error fetching blog post:', error)
    return null
  }
  
  return data
}

// Alias for consistency
export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  return getBlogPost(slug)
}

// ===============================
// SUBSCRIBER FUNCTIONS
// ===============================

export async function subscribeEmail(email: string) {
  const { data, error } = await supabase
    .from('subscribers')
    .insert([{ email, subscribed_at: new Date().toISOString() }])
    .select()
  
  if (error) {
    if (error.code === '23505') {
      return { success: true, already: true }
    }
    throw error
  }
  
  return { success: true, already: false }
}

export async function unsubscribeEmail(email: string) {
  const { error } = await supabase
    .from('subscribers')
    .delete()
    .eq('email', email)
  
  if (error) throw error
  
  return { success: true }
}

// ===============================
// ADMIN FUNCTIONS (for cron jobs)
// ===============================

export async function updateProduct(id: string, updates: Partial<Product>) {
  const { data, error } = await supabaseAdmin
    .from('products')
    .update(updates)
    .eq('id', id)
    .select()
  
  if (error) {
    console.error('Error updating product:', error)
    return null
  }
  
  return data?.[0] || null
}

export async function createBlogPost(post: Omit<BlogPost, 'id' | 'created_at'>) {
  const { data, error } = await supabaseAdmin
    .from('blog_posts')
    .insert([post])
    .select()
  
  if (error) {
    console.error('Error creating blog post:', error)
    return null
  }
  
  return data?.[0] || null
}

export async function updateTrendingProducts(productIds: string[]) {
  // First, set all products to not trending
  await supabaseAdmin
    .from('products')
    .update({ is_trending: false })
    .neq('id', '00000000-0000-0000-0000-000000000000')
  
  // Then set specified products as trending
  if (productIds.length > 0) {
    await supabaseAdmin
      .from('products')
      .update({ is_trending: true })
      .in('id', productIds)
  }
}
