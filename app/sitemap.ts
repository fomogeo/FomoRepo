import { MetadataRoute } from 'next'
import { supabase } from '@/lib/supabase'
import { CATEGORIES } from '@/lib/categories/categories'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://fomogeo.com'

  // Static pages
  const staticPages = [
    { url: baseUrl, changeFrequency: 'daily' as const, priority: 1.0 },
    { url: `${baseUrl}/deals`, changeFrequency: 'daily' as const, priority: 0.9 },
    { url: `${baseUrl}/categories`, changeFrequency: 'weekly' as const, priority: 0.8 },
    { url: `${baseUrl}/blog`, changeFrequency: 'daily' as const, priority: 0.8 },
    { url: `${baseUrl}/about`, changeFrequency: 'monthly' as const, priority: 0.6 },
    { url: `${baseUrl}/contact`, changeFrequency: 'monthly' as const, priority: 0.5 },
    { url: `${baseUrl}/legal/privacy`, changeFrequency: 'monthly' as const, priority: 0.3 },
    { url: `${baseUrl}/legal/terms`, changeFrequency: 'monthly' as const, priority: 0.3 },
    { url: `${baseUrl}/legal/disclosure`, changeFrequency: 'monthly' as const, priority: 0.3 },
  ]

  // Category pages
  const categoryPages = CATEGORIES.map(cat => ({
    url: `${baseUrl}/category/${cat.slug}`,
    changeFrequency: 'daily' as const,
    priority: 0.7,
  }))

  // Blog posts
  let blogPages: MetadataRoute.Sitemap = []
  try {
    const { data: posts } = await supabase
      .from('blog_posts')
      .select('slug, updated_at')
      .eq('is_published', true)
    
    if (posts) {
      blogPages = posts.map(post => ({
        url: `${baseUrl}/blog/${post.slug}`,
        lastModified: post.updated_at,
        changeFrequency: 'weekly' as const,
        priority: 0.6,
      }))
    }
  } catch (e) {
    console.error('Sitemap: error fetching blog posts', e)
  }

  // Product pages
  let productPages: MetadataRoute.Sitemap = []
  try {
    const { data: products } = await supabase
      .from('products')
      .select('id, updated_at')
    
    if (products) {
      productPages = products.map(product => ({
        url: `${baseUrl}/products/${product.id}`,
        lastModified: product.updated_at,
        changeFrequency: 'daily' as const,
        priority: 0.5,
      }))
    }
  } catch (e) {
    console.error('Sitemap: error fetching products', e)
  }

  return [...staticPages, ...categoryPages, ...blogPages, ...productPages]
}
