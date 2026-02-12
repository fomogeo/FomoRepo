import Link from 'next/link'
import { getBlogPosts } from '@/lib/supabase'
import { Calendar, User } from 'lucide-react'
import { format } from 'date-fns'

export const revalidate = 3600 // Revalidate every hour

export default async function BlogPage() {
  const posts = await getBlogPosts(20)

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Deal Hunter's Blog
        </h1>
        <p className="text-gray-600 text-lg">
          Tips, tricks, and insights to help you save money
        </p>
      </div>

      {/* Blog Posts Grid */}
      {posts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <article key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow">
              {post.featured_image && (
                <div className="h-48 bg-gray-200">
                  <img
                    src={post.featured_image}
                    alt={post.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              
              <div className="p-6">
                <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-4 w-4" />
                    <span>
                      {format(new Date(post.published_at || post.created_at), 'MMM d, yyyy')}
                    </span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <User className="h-4 w-4" />
                    <span>{post.author}</span>
                  </div>
                </div>

                <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                  {post.title}
                </h2>

                <p className="text-gray-600 line-clamp-3 mb-4">
                  {post.excerpt}
                </p>

                {post.tags && post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}

                <Link
                  href={`/blog/${post.slug}`}
                  className="text-primary-600 hover:text-primary-700 font-semibold"
                >
                  Read More →
                </Link>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-600">No blog posts yet. Check back soon!</p>
        </div>
      )}
    </div>
  )
}
