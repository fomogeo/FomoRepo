export const dynamic = 'force-dynamic'

import Script from 'next/script'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getBlogPostBySlug } from '@/lib/supabase'
import { Calendar, User, ArrowLeft } from 'lucide-react'
import { format } from 'date-fns'

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getBlogPostBySlug(params.slug)
  
  if (!post) {
    notFound()
  }

  const author = post.author === 'FOMO Finds Team' ? 'FomoGeo Team' : post.author

  return (
    <div className="min-h-screen section-dark">
      <Script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4317381401188026"
        crossOrigin="anonymous"
        strategy="afterInteractive"
      />
      
      <article className="container mx-auto px-4 py-10 max-w-4xl">
        <Link href="/blog" className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 mb-8 transition">
          <ArrowLeft className="h-4 w-4" />
          Back to Blog
        </Link>

        {post.featured_image && (
          <div className="relative w-full h-96 rounded-2xl overflow-hidden mb-8">
            <img src={post.featured_image} alt={post.title} className="w-full h-full object-cover" />
          </div>
        )}

        <div className="flex items-center gap-6 text-sm mb-6 text-gray-300">
          <span className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-cyan-400" />
            {format(new Date(post.published_at || post.created_at), 'MMMM d, yyyy')}
          </span>
          <span className="flex items-center gap-2">
            <User className="h-4 w-4 text-orange-400" />
            {author}
          </span>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">{post.title}</h1>

        {post.excerpt && (
          <p className="text-xl text-gray-300 mb-8 leading-relaxed">{post.excerpt}</p>
        )}

        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-8">
            {post.tags.map((tag: string) => (
              <span key={tag} className="px-3 py-1 rounded-full text-sm font-semibold bg-cyan-900/50 text-cyan-300 border border-cyan-500/30">
                #{tag}
              </span>
            ))}
          </div>
        )}

        <div 
          className="prose prose-lg prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </article>
    </div>
  )
}
