export const dynamic = 'force-dynamic'

import Link from 'next/link'
import { getBlogPosts } from '@/lib/supabase'
import { Calendar, User, ArrowRight } from 'lucide-react'
import { format } from 'date-fns'

function stripMarkdown(text: string): string {
  return text
    .replace(/#{1,6}\s/g, '').replace(/\*\*(.*?)\*\*/g, '$1')
    .replace(/\*(.*?)\*/g, '$1').replace(/\[(.*?)\]\(.*?\)/g, '$1')
    .replace(/`(.*?)`/g, '$1').replace(/\n/g, ' ').trim()
}

function AdSpaceInline({ label }: { label: string }) {
  return (
    <div className="w-full min-h-[100px] rounded-xl flex items-center justify-center text-sm font-medium my-8"
      style={{ background: 'rgba(0,212,200,0.03)', border: '2px dashed rgba(0,212,200,0.15)', color: '#4A7A9B' }}>
      📢 Ad Space — {label}
    </div>
  )
}

export default async function BlogPage() {
  const posts = await getBlogPosts(20)

  return (
    <div className="min-h-screen" style={{ background: '#071828' }}>

      {/* Header */}
      <div className="relative py-20 overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #0B1E30 0%, #071828 100%)', borderBottom: '1px solid rgba(0,212,200,0.15)' }}>
        {/* Glow orbs */}
        <div className="absolute top-0 right-0 w-96 h-96 pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(255,179,0,0.06) 0%, transparent 70%)' }} />
        <div className="absolute bottom-0 left-0 w-64 h-64 pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(0,212,200,0.08) 0%, transparent 70%)' }} />
        <div className="container mx-auto px-4 text-center relative">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            Deal Hunter&apos;s <span style={{ color: '#FFB300' }}>Blog</span>
          </h1>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: '#7EB8D8' }}>
            Expert tips, buying guides, and insider secrets to help you save money on every purchase
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-10">
        <AdSpaceInline label="Top Banner (728×90)" />

        {posts.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {posts.slice(0, 3).map(post => <BlogCard key={post.id} post={post} />)}
            </div>
            {posts.length > 3 && <AdSpaceInline label="Mid-page Banner (970×250)" />}
            {posts.length > 3 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts.slice(3).map(post => <BlogCard key={post.id} post={post} />)}
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-20 rounded-2xl glow-border" style={{ background: 'rgba(13,40,64,0.5)' }}>
            <div className="text-6xl mb-4">📝</div>
            <p className="text-lg mb-2" style={{ color: '#7EB8D8' }}>No blog posts yet. Check back soon!</p>
            <p style={{ color: '#4A7A9B' }}>We&apos;re working on creating amazing content for you.</p>
          </div>
        )}

        <AdSpaceInline label="Bottom Banner (728×90)" />
      </div>

      {/* CTA */}
      <section className="py-14" style={{ background: '#0B1E30', borderTop: '1px solid rgba(255,179,0,0.1)' }}>
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4" style={{ color: '#E8F4FD' }}>Never Miss a <span style={{ color: '#FFB300' }}>Deal!</span></h2>
          <p className="mb-6" style={{ color: '#7EB8D8' }}>Subscribe to get expert buying guides and exclusive deals delivered to your inbox</p>
          <Link href="/#email-signup" className="btn-gold inline-block px-8 py-4 font-bold rounded-xl">
            Subscribe Now
          </Link>
        </div>
      </section>
    </div>
  )
}

function BlogCard({ post }: { post: any }) {
  return (
    <article className="rounded-2xl overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-1"
      style={{ background: 'linear-gradient(135deg, #0D2840, #091E30)', border: '1px solid #1A3A55' }}
      onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(0,212,200,0.5)')}
      onMouseLeave={e => (e.currentTarget.style.borderColor = '#1A3A55')}
    >
      {post.featured_image ? (
        <Link href={`/blog/${post.slug}`} className="block h-48 overflow-hidden" style={{ background: '#0B1E30' }}>
          <img src={post.featured_image} alt={post.title} className="w-full h-full object-cover hover:scale-110 transition-transform duration-300" />
        </Link>
      ) : (
        <Link href={`/blog/${post.slug}`} className="block h-48" style={{ background: 'linear-gradient(135deg, #0D2840, #0B1E30)' }} />
      )}

      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-center gap-4 text-xs mb-3" style={{ color: '#4A7A9B' }}>
          <span className="flex items-center gap-1">
            <Calendar className="h-3.5 w-3.5" style={{ color: '#00D4C8' }} />
            {format(new Date(post.published_at || post.created_at), 'MMM d, yyyy')}
          </span>
          <span className="flex items-center gap-1">
            <User className="h-3.5 w-3.5" style={{ color: '#FFB300' }} />
            {post.author}
          </span>
        </div>

        {/* Clickable title */}
        <Link href={`/blog/${post.slug}`}>
          <h2 className="text-lg font-bold mb-3 line-clamp-2 transition-colors cursor-pointer"
            style={{ color: '#E8F4FD' }}
            onMouseEnter={e => (e.currentTarget.style.color = '#00D4C8')}
            onMouseLeave={e => (e.currentTarget.style.color = '#E8F4FD')}
          >
            {post.title}
          </h2>
        </Link>

        <p className="text-sm line-clamp-3 mb-4 flex-1" style={{ color: '#7EB8D8' }}>
          {stripMarkdown(post.excerpt || '')}
        </p>

        {post.tags?.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.slice(0, 3).map((tag: string) => (
              <span key={tag} className="px-2 py-0.5 rounded-full text-xs font-semibold"
                style={{ background: 'rgba(0,212,200,0.1)', color: '#00D4C8', border: '1px solid rgba(0,212,200,0.2)' }}>
                #{tag}
              </span>
            ))}
          </div>
        )}

        <Link href={`/blog/${post.slug}`}
          className="inline-flex items-center gap-2 text-sm font-bold group transition-all"
          style={{ color: '#FFB300' }}>
          <span>Read More</span>
          <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </article>
  )
}
