export const dynamic = 'force-dynamic'

import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getBlogPostBySlug } from '@/lib/supabase'
import Link from 'next/link'

function markdownToHtml(markdown: string): string {
  let html = markdown
  html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>')
  html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>')
  html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>')
  html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
  html = html.replace(/\*(.+?)\*/g, '<em>$1</em>')
  html = html.replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" style="color:#00D4C8">$1</a>')
  html = html.split('\n\n').map(para => {
    para = para.trim()
    if (!para) return ''
    if (para.startsWith('<h') || para.startsWith('<ul') || para.startsWith('<ol')) return para
    if (para.includes('\n- ')) {
      const items = para.split('\n- ').filter(i => i.trim())
      return `<ul>${items.map(item => `<li>${item.trim()}</li>`).join('\n')}</ul>`
    }
    return `<p>${para}</p>`
  }).join('\n')
  html = html.replace(/\n/g, '<br>')
  return html
}

interface Props { params: { slug: string } }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getBlogPostBySlug(params.slug)
  if (!post) return { title: 'Post Not Found' }
  return { title: `${post.title} | FomoGeo Blog`, description: post.excerpt || post.title }
}

export default async function BlogPostPage({ params }: Props) {
  const post = await getBlogPostBySlug(params.slug)
  if (!post) notFound()

  const publishedDate = new Date(post.published_at).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric'
  })

  const htmlContent = markdownToHtml(post.content)

  const cleanExcerpt = post.excerpt
    ? post.excerpt.replace(/#{1,6}\s/g, '').replace(/\*\*(.*?)\*\*/g, '$1')
        .replace(/\*(.*?)\*/g, '$1').replace(/\[(.*?)\]\(.*?\)/g, '$1').trim()
    : ''

  return (
    <div className="min-h-screen" style={{ background: '#071828' }}>

      {/* Article */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* Breadcrumb */}
        <nav className="mb-8 text-sm" style={{ color: '#4A7A9B' }}>
          <Link href="/" className="hover:text-fg-teal transition-colors" style={{ color: '#7EB8D8' }}>Home</Link>
          <span className="mx-2" style={{ color: '#1A3A55' }}>/</span>
          <Link href="/blog" className="hover:text-fg-teal transition-colors" style={{ color: '#7EB8D8' }}>Blog</Link>
          <span className="mx-2" style={{ color: '#1A3A55' }}>/</span>
          <span style={{ color: '#E8F4FD' }}>{post.title}</span>
        </nav>

        {/* Title */}
        <h1 className="text-4xl sm:text-5xl font-bold mb-6" style={{ color: '#E8F4FD' }}>
          {post.title}
        </h1>

        {/* Meta */}
        <div className="flex flex-wrap items-center gap-4 mb-8 text-sm" style={{ color: '#7EB8D8' }}>
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: '#FFB300' }}>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <span>{post.author || 'FomoGeo Team'}</span>
          </div>
          <span style={{ color: '#1A3A55' }}>•</span>
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: '#00D4C8' }}>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <time dateTime={post.published_at}>{publishedDate}</time>
          </div>
        </div>

        {/* Featured Image */}
        {post.featured_image && (
          <div className="mb-10 rounded-2xl overflow-hidden" style={{ border: '1px solid rgba(0,212,200,0.2)' }}>
            <img src={post.featured_image} alt={post.title} className="w-full h-auto" />
          </div>
        )}

        {/* Excerpt */}
        {cleanExcerpt && (
          <div className="mb-8 p-6 rounded-xl italic text-lg leading-relaxed"
            style={{ background: 'rgba(255,179,0,0.06)', borderLeft: '4px solid #FFB300', color: '#E8F4FD' }}>
            {cleanExcerpt}
          </div>
        )}

        {/* Main content — dark prose styles */}
        <div
          className="prose-dark max-w-none leading-relaxed text-base"
          style={{
            color: '#B2D0E8',
            lineHeight: '1.9',
          }}
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />

        {/* Tags */}
        {post.tags?.length > 0 && (
          <div className="mt-12 pt-8" style={{ borderTop: '1px solid rgba(0,212,200,0.1)' }}>
            <h3 className="text-sm font-bold mb-3 uppercase tracking-wider" style={{ color: '#7EB8D8' }}>Tags:</h3>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag: string) => (
                <span key={tag} className="px-3 py-1 rounded-full text-xs font-semibold"
                  style={{ background: 'rgba(0,212,200,0.1)', border: '1px solid rgba(0,212,200,0.2)', color: '#00D4C8' }}>
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Share */}
        <div className="mt-10 pt-8" style={{ borderTop: '1px solid rgba(0,212,200,0.1)' }}>
          <h3 className="text-base font-bold mb-4" style={{ color: '#E8F4FD' }}>Share this article</h3>
          <div className="flex flex-wrap gap-3">
            {[
              { label: 'Twitter/X', href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(`https://fomogeo.com/blog/${post.slug}`)}`, color: '#00D4C8' },
              { label: 'Facebook', href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`https://fomogeo.com/blog/${post.slug}`)}`, color: '#4A90D9' },
              { label: 'LinkedIn', href: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(`https://fomogeo.com/blog/${post.slug}`)}&title=${encodeURIComponent(post.title)}`, color: '#7EB8D8' },
            ].map(({ label, href, color }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                className="px-4 py-2 rounded-lg text-sm font-bold transition-all hover:opacity-90"
                style={{ background: 'rgba(13,40,64,0.8)', border: `1px solid ${color}40`, color }}>
                {label}
              </a>
            ))}
          </div>
        </div>

        {/* Back */}
        <div className="mt-10 pt-8" style={{ borderTop: '1px solid rgba(0,212,200,0.1)' }}>
          <Link href="/blog" className="inline-flex items-center gap-2 font-bold transition-colors"
            style={{ color: '#00D4C8' }}>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Blog
          </Link>
        </div>
      </article>

      {/* In-article ad */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="w-full min-h-[100px] rounded-xl flex items-center justify-center text-sm font-medium"
          style={{ background: 'rgba(0,212,200,0.03)', border: '2px dashed rgba(0,212,200,0.15)', color: '#4A7A9B' }}>
          📢 Ad Space — In-Article Banner (728×90)
        </div>
      </div>

      {/* CTA */}
      <section className="py-16" style={{ background: '#0B1E30', borderTop: '1px solid rgba(255,179,0,0.1)' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4" style={{ color: '#E8F4FD' }}>
            Want More Deals &amp; Tips?
          </h2>
          <p className="text-lg mb-8" style={{ color: '#7EB8D8' }}>
            Subscribe to get the latest product reviews, buying guides, and exclusive deals delivered to your inbox.
          </p>
          <Link href="/#email-signup" className="btn-gold inline-block px-8 py-4 font-bold rounded-xl">
            Subscribe Now
          </Link>
        </div>
      </section>
    </div>
  )
}
