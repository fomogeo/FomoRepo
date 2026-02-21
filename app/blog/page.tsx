export const dynamic = 'force-dynamic'

import Link from 'next/link'
import { getBlogPosts } from '@/lib/supabase'
import { Calendar, User, ArrowRight } from 'lucide-react'
import { format } from 'date-fns'
import AdSpace from '@/components/AdSpace'

function stripMarkdown(text: string): string {
  return text.replace(/#{1,6}\s/g, '').replace(/\*\*(.*?)\*\*/g, '$1').replace(/\*(.*?)\*/g, '$1').replace(/\[(.*?)\]\(.*?\)/g, '$1').replace(/`(.*?)`/g, '$1').replace(/\n/g, ' ').trim()
}

export default async function BlogPage() {
  const posts = await getBlogPosts(20)

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-sky-gradient py-16 border-b border-gray-200">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 text-fg-heading">
            Deal Hunter's <span className="text-fg-orange">Blog</span>
          </h1>
          <p className="text-lg text-fg-body max-w-2xl mx-auto">Expert tips, buying guides, and insider secrets to help you save money</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-10">
        <AdSpace size="leaderboard" />

        {posts.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8 mb-8">
              {posts.slice(0, 3).map(post => <BlogCard key={post.id} post={post} />)}
            </div>
            {posts.length > 3 && <div className="my-8"><AdSpace size="banner" /></div>}
            {posts.length > 3 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts.slice(3).map(post => <BlogCard key={post.id} post={post} />)}
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-20 card-light my-8">
            <div className="text-6xl mb-4">📝</div>
            <p className="text-lg mb-2 text-fg-body">No blog posts yet. Check back soon!</p>
          </div>
        )}

        <div className="my-8"><AdSpace size="leaderboard" /></div>
      </div>

      <section className="py-14 bg-warm-gradient border-t border-gray-200">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4 text-fg-heading">Never Miss a <span className="text-fg-orange">Deal!</span></h2>
          <p className="mb-6 text-fg-body">Subscribe to get expert buying guides and exclusive deals</p>
          <Link href="/#email-signup" className="btn-orange px-8 py-4 font-bold">Subscribe Now</Link>
        </div>
      </section>
    </div>
  )
}

function BlogCard({ post }: { post: any }) {
  return (
    <article className="deal-card flex flex-col">
      {/* Issue 4 FIX: Only render image if it exists */}
      {post.featured_image && (
        <Link href={`/blog/${post.slug}`} className="block h-48 overflow-hidden bg-gray-100">
          <img src={post.featured_image} alt={post.title} className="w-full h-full object-cover hover:scale-110 transition-transform duration-300" />
        </Link>
      )}

      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-center gap-4 text-xs mb-3 text-fg-muted">
          <span className="flex items-center gap-1">
            <Calendar className="h-3.5 w-3.5 text-fg-blue" />
            {format(new Date(post.published_at || post.created_at), 'MMM d, yyyy')}
          </span>
          <span className="flex items-center gap-1">
            <User className="h-3.5 w-3.5 text-fg-orange" />
            {post.author}
          </span>
        </div>

        <Link href={`/blog/${post.slug}`}>
          <h2 className="text-lg font-bold mb-3 line-clamp-2 cursor-pointer text-fg-heading hover:text-fg-blue transition">{post.title}</h2>
        </Link>

        <p className="text-sm line-clamp-3 mb-4 flex-1 text-fg-body">{stripMarkdown(post.excerpt || '')}</p>

        {post.tags?.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.slice(0, 3).map((tag: string) => (
              <span key={tag} className="px-2 py-0.5 rounded-full text-xs font-semibold bg-sky-100 text-fg-blue border border-fg-blue/20">
                #{tag}
              </span>
            ))}
          </div>
        )}

        <Link href={`/blog/${post.slug}`} className="inline-flex items-center gap-2 text-sm font-bold group text-fg-orange hover:text-fg-orange-hover transition">
          <span>Read More</span>
          <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </article>
  )
}
