import Link from 'next/link'
import { getBlogPosts } from '@/lib/supabase'
import { Calendar, User, ArrowRight } from 'lucide-react'
import { format } from 'date-fns'

export const revalidate = 3600 // Revalidate every hour

// Simple function to strip markdown from excerpt
function stripMarkdown(text: string): string {
  return text
    .replace(/#{1,6}\s/g, '') // Remove headers
    .replace(/\*\*(.*?)\*\*/g, '$1') // Remove bold
    .replace(/\*(.*?)\*/g, '$1') // Remove italic
    .replace(/\[(.*?)\]\(.*?\)/g, '$1') // Remove links
    .replace(/`(.*?)`/g, '$1') // Remove code
    .replace(/\n/g, ' ') // Remove line breaks
    .trim()
}

export default async function BlogPage() {
  const posts = await getBlogPosts(20)

  return (
    <div className="min-h-screen">
      {/* Header with Gradient */}
      <div className="bg-gradient-to-br from-blue-600 via-blue-500 to-cyan-400 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 drop-shadow-lg">
            Deal Hunter's Blog
          </h1>
          <p className="text-xl text-blue-50 max-w-2xl mx-auto">
            Expert tips, buying guides, and insider secrets to help you save money on every purchase
          </p>
        </div>
      </div>

      {/* Decorative Wave */}
      <div className="bg-gradient-to-b from-blue-50 to-white -mt-1">
        <svg className="w-full h-12" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" fill="#EFF6FF"></path>
        </svg>
      </div>

      {/* Blog Posts Grid */}
      <div className="bg-gradient-to-b from-white via-blue-50 to-white py-12">
        <div className="container mx-auto px-4">
          {posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <article 
                  key={post.id} 
                  className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-2xl transition-all duration-300 border-2 border-blue-100 hover:border-blue-400 hover:-translate-y-1"
                >
                  {post.featured_image && (
                    <div className="h-48 bg-gradient-to-br from-blue-100 to-cyan-100 overflow-hidden">
                      <img
                        src={post.featured_image}
                        alt={post.title}
                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                  )}
                  
                  <div className="p-6">
                    <div className="flex items-center space-x-4 text-sm text-slate-600 mb-3">
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4 text-blue-500" />
                        <span>
                          {format(new Date(post.published_at || post.created_at), 'MMM d, yyyy')}
                        </span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <User className="h-4 w-4 text-orange-500" />
                        <span>{post.author}</span>
                      </div>
                    </div>

                    <h2 className="text-xl font-bold text-slate-900 mb-3 line-clamp-2 hover:text-blue-600 transition-colors">
                      {post.title}
                    </h2>

                    <p className="text-slate-600 line-clamp-3 mb-4">
                      {stripMarkdown(post.excerpt || '')}
                    </p>

                    {post.tags && post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {post.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}

                    <Link
                      href={`/blog/${post.slug}`}
                      className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-bold group"
                    >
                      <span>Read More</span>
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white rounded-2xl shadow-md border-2 border-blue-100">
              <div className="text-6xl mb-4">📝</div>
              <p className="text-slate-600 text-lg mb-4">No blog posts yet. Check back soon!</p>
              <p className="text-slate-500">We're working on creating amazing content for you.</p>
            </div>
          )}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-br from-orange-500 to-amber-500 py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Never Miss a Deal!
          </h2>
          <p className="text-orange-50 mb-6 text-lg">
            Subscribe to get expert buying guides and exclusive deals delivered to your inbox
          </p>
          <Link 
            href="/#email-signup"
            className="inline-block px-8 py-4 bg-white text-orange-600 font-bold rounded-xl hover:bg-orange-50 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
          >
            Subscribe Now
          </Link>
        </div>
      </div>
    </div>
  )
}
