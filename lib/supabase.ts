import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

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

export async function getBlogPosts(limit: number = 20) {
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

export async function getBlogPost(slug: string) {
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
