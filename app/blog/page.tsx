export const dynamic = 'force-dynamic'

import Script from 'next/script'
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
    <div className="min-h-screen section-dark">
      <Script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4317381401188026"
        crossOrigin="anonymous"
        strategy="afterInteractive"
      />
      
      {/* Full height banner with overlay */}
      <div className="w-full relative">
        <img src="/hero-light.png" alt="Blog" className="w-full h-auto" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 via-slate-900/60 to-transparent flex items-center justify-center">
          <div className="text-center px-4">
            <h1 className="text-5xl md:text-6xl font-bold mb-4 text-white drop-shadow-lg">
              Deal Hunter's <span className="bg-gradient-to-r from-orange-400 to-yellow-500 bg-clip-text text-transparent">Blog</span>
            </h1>
            <p className="text-lg text-cyan-300 max-w-2xl mx-auto drop-shadow">Expert tips, buying guides, and insider secrets</p>
          </div>
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
            <p className="text-lg mb-2 text-white">No blog posts yet. Check back soon!</p>
          </div>
        )}

        <div className="my-8"><AdSpace size="leaderboard" /></div>
      </div>

      <section className="py-14 section-teal border-t border-cyan-500/30">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4 text-white">Never Miss a <span className="text-yellow-400">Deal!</span></h2>
          <p className="mb-6 text-white">Subscribe to get expert buying guides and exclusive deals</p>
          <Link href="/#email-signup" className="btn-orange px-8 py-4 font-bold">Subscribe Now</Link>
        </div>
      </section>
    </div>
  )
}

function BlogCard({ post }: { post: any }) {
  const author = post.author === 'FOMO Finds Team' ? 'FomoGeo Team' : post.author

  return (
    <article className="deal-card flex flex-col">
      {post.featured_image && (
        <Link href={`/blog/${post.slug}`} className="block h-48 overflow-hidden bg-slate-800">
          <img src={post.featured_image} alt={post.title} className="w-full h-full object-cover hover:scale-110 transition-transform duration-300" />
        </Link>
      )}

      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-center gap-4 text-xs mb-3 text-gray-300">
          <span className="flex items-center gap-1">
            <Calendar className="h-3.5 w-3.5 text-cyan-400" />
            {format(new Date(post.published_at || post.created_at), 'MMM d, yyyy')}
          </span>
          <span className="flex items-center gap-1">
            <User className="h-3.5 w-3.5 text-orange-400" />
            {author}
          </span>
        </div>

        <Link href={`/blog/${post.slug}`}>
          <h2 className="text-lg font-bold mb-3 line-clamp-2 cursor-pointer text-white hover:text-cyan-400 transition">{post.title}</h2>
        </Link>

        <p className="text-sm line-clamp-3 mb-4 flex-1 text-gray-300">{stripMarkdown(post.excerpt || '')}</p>

        {post.tags?.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.slice(0, 3).map((tag: string) => (
              <span key={tag} className="px-2 py-0.5 rounded-full text-xs font-semibold bg-cyan-900/50 text-cyan-300 border border-cyan-500/30">
                #{tag}
              </span>
            ))}
          </div>
        )}

        <Link href={`/blog/${post.slug}`} className="inline-flex items-center gap-2 text-sm font-bold group text-orange-400 hover:text-orange-300 transition">
          <span>Read More</span>
          <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </article>
  )
}
