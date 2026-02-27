import Link from 'next/link'
import Image from 'next/image'
import { getBlogPosts } from '@/lib/supabase'
import { Calendar, Clock, ArrowRight } from 'lucide-react'

export const dynamic = 'force-dynamic'

export default async function BlogPage() {
  const posts = await getBlogPosts(50)

  return (
    <div className="min-h-screen py-16" style={{ background: '#071828' }}>
      <div className="container mx-auto px-4">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full" style={{ background: 'rgba(0,212,200,0.1)', border: '1px solid rgba(0,212,200,0.3)' }}>
            <span className="text-2xl">📝</span>
            <span className="font-semibold" style={{ color: '#00D4C8' }}>Our Blog</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6" style={{ color: '#E8F4FD' }}>
            Latest Articles & Insights
          </h1>
          <p className="text-xl max-w-2xl mx-auto" style={{ color: '#B8D4E8' }}>
            Stay updated with the latest deals, shopping tips, and product recommendations
          </p>
        </div>

        {/* Blog Grid */}
        {posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => {
              const publishDate = post.published_at
                ? new Date(post.published_at).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })
                : 'Draft'

              const readTime = Math.ceil(post.content.split(' ').length / 200)

              return (
                <Link
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  className="group rounded-xl overflow-hidden transition-all hover:scale-105"
                  style={{ 
                    background: '#0D2840', 
                    border: '1px solid rgba(0,212,200,0.2)',
                    boxShadow: '0 4px 15px rgba(0,0,0,0.3)'
                  }}
                >
                  {/* Featured Image */}
                  <div className="relative w-full h-48 overflow-hidden" style={{ background: 'rgba(0,0,0,0.3)' }}>
                    {post.featured_image ? (
                      <Image
                        src={post.featured_image}
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #0A1929 0%, #071828 100%)' }}>
                        <span className="text-6xl opacity-30">📝</span>
                      </div>
                    )}
                    
                    {/* Gradient Overlay */}
                    <div 
                      className="absolute bottom-0 left-0 right-0 h-16"
                      style={{ background: 'linear-gradient(to top, #0D2840, transparent)' }}
                    />
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    {/* Meta Info */}
                    <div className="flex items-center gap-4 mb-3 text-xs" style={{ color: '#7EB8D8' }}>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {publishDate}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {readTime} min read
                      </span>
                    </div>

                    {/* Title */}
                    <h2 className="text-xl font-bold mb-3 line-clamp-2 group-hover:underline" style={{ color: '#E8F4FD' }}>
                      {post.title}
                    </h2>

                    {/* Excerpt */}
                    {post.excerpt && (
                      <p className="text-sm mb-4 line-clamp-3" style={{ color: '#B8D4E8' }}>
                        {post.excerpt}
                      </p>
                    )}

                    {/* Tags */}
                    {post.tags && post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {post.tags.slice(0, 3).map((tag: string, index: number) => (
                          <span
                            key={index}
                            className="px-2 py-1 rounded-full text-xs font-semibold"
                            style={{ 
                              background: 'rgba(0,212,200,0.2)', 
                              color: '#00E5FF',
                              border: '1px solid rgba(0,212,200,0.3)'
                            }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Read More */}
                    <div className="flex items-center gap-2 text-sm font-semibold" style={{ color: '#FFB300' }}>
                      Read Article
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">📝</div>
            <h3 className="text-2xl font-bold mb-4" style={{ color: '#E8F4FD' }}>
              No blog posts yet
            </h3>
            <p style={{ color: '#B8D4E8' }}>
              Check back soon for amazing content!
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
