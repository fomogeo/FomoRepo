export const dynamic = 'force-dynamic'

import { notFound } from 'next/navigation'
import { getBlogPostBySlug } from '@/lib/supabase'
import Link from 'next/link'
import { Calendar, Clock, ArrowLeft, Tag } from 'lucide-react'

// Sanitize HTML to prevent XSS — strips dangerous tags and attributes
function sanitizeHtml(html: string): string {
  // Remove script tags and their content
  let safe = html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
  // Remove event handlers (onclick, onerror, onload, etc.)
  safe = safe.replace(/\s+on\w+\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]*)/gi, '')
  // Remove javascript: URLs
  safe = safe.replace(/href\s*=\s*["']javascript:[^"']*["']/gi, 'href="#"')
  // Remove iframe, object, embed, form tags
  safe = safe.replace(/<\/?(?:iframe|object|embed|form|input|button|textarea)\b[^>]*>/gi, '')
  // Remove style attributes that could hide content
  safe = safe.replace(/\s+style\s*=\s*(?:"[^"]*"|'[^']*')/gi, '')
  return safe
}

// Convert markdown to styled HTML matching the site's dark theme
function markdownToHtml(markdown: string): string {
  let html = markdown

  // Headers — styled with accent colors like the Terms of Service page
  html = html.replace(/^#### (.+)$/gm, '<h4 class="text-lg font-bold mt-6 mb-3" style="color: #FFB300;">$1</h4>')
  html = html.replace(/^### (.+)$/gm, '<div class="mt-10 mb-4 p-4 rounded-lg" style="background: rgba(0,212,200,0.05); border-left: 4px solid #00D4C8;"><h3 class="text-xl font-bold" style="color: #00D4C8;">$1</h3></div>')
  html = html.replace(/^## (.+)$/gm, '<div class="mt-12 mb-6 pb-3" style="border-bottom: 2px solid rgba(255,179,0,0.2);"><h2 class="text-2xl font-bold" style="color: #FFB300;">$1</h2></div>')
  html = html.replace(/^# (.+)$/gm, '<h1 class="text-3xl font-bold mt-12 mb-6" style="color: #E8F4FD;">$1</h1>')

  // Bold — white to stand out against body text
  html = html.replace(/\*\*(.+?)\*\*/g, '<strong style="color: #E8F4FD; font-weight: 700;">$1</strong>')

  // Italic — cyan accent
  html = html.replace(/\*(.+?)\*/g, '<em style="color: #7EB8D8; font-style: italic;">$1</em>')

  // Inline code
  html = html.replace(/`([^`]+)`/g, '<code class="px-2 py-1 rounded text-sm" style="background: rgba(0,212,200,0.1); border: 1px solid rgba(0,212,200,0.2); color: #00E5FF;">$1</code>')

  // Links
  html = html.replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" style="color: #00D4C8; text-decoration: underline;" target="_blank" rel="noopener noreferrer">$1</a>')

  // Horizontal rules
  html = html.replace(/^---$/gm, '<hr class="my-8" style="border: none; height: 1px; background: linear-gradient(to right, transparent, rgba(0,212,200,0.3), transparent);" />')

  // Process line by line for lists and paragraphs
  const lines = html.split('\n')
  const processed: string[] = []
  let inList = false
  let listType = ''

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim()

    // Bullet list items
    const bulletMatch = line.match(/^[-*] (.+)$/)
    if (bulletMatch) {
      if (!inList || listType !== 'ul') {
        if (inList) processed.push(listType === 'ol' ? '</ol>' : '</ul>')
        processed.push('<ul class="space-y-2 mb-6 ml-2">')
        inList = true
        listType = 'ul'
      }
      processed.push(`<li class="flex gap-3 items-start"><span style="color: #00D4C8; font-weight: bold; flex-shrink: 0;">•</span><span style="color: #B8D4E8;">${bulletMatch[1]}</span></li>`)
      continue
    }

    // Numbered list items
    const numMatch = line.match(/^(\d+)\. (.+)$/)
    if (numMatch) {
      if (!inList || listType !== 'ol') {
        if (inList) processed.push(listType === 'ol' ? '</ol>' : '</ul>')
        processed.push('<ol class="space-y-2 mb-6 ml-2">')
        inList = true
        listType = 'ol'
      }
      processed.push(`<li class="flex gap-3 items-start"><span class="font-bold flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs" style="background: rgba(255,179,0,0.15); color: #FFB300;">${numMatch[1]}</span><span style="color: #B8D4E8;">${numMatch[2]}</span></li>`)
      continue
    }

    // Close list if we're no longer in one
    if (inList) {
      processed.push(listType === 'ol' ? '</ol>' : '</ul>')
      inList = false
    }

    // Empty lines
    if (!line) {
      continue
    }

    // Skip lines that already have HTML tags (headings, hrs, divs)
    if (line.startsWith('<')) {
      processed.push(line)
      continue
    }

    // Regular paragraph
    processed.push(`<p class="mb-5 leading-relaxed text-base" style="color: #B8D4E8;">${line}</p>`)
  }

  if (inList) {
    processed.push(listType === 'ol' ? '</ol>' : '</ul>')
  }

  return processed.join('\n')
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getBlogPostBySlug(params.slug)

  if (!post || !post.is_published) {
    notFound()
  }

  const publishDate = post.published_at
    ? new Date(post.published_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    : 'Draft'

  const readTime = Math.ceil(post.content.split(' ').length / 200)
  const htmlContent = sanitizeHtml(markdownToHtml(post.content))

  return (
    <div className="min-h-screen" style={{ background: '#071828' }}>

      {/* Article Header */}
      <section className="py-16" style={{ background: 'linear-gradient(135deg, #0A1929 0%, #071828 100%)', borderBottom: '1px solid rgba(0,212,200,0.1)' }}>
        <div className="max-w-4xl mx-auto px-4">
          {/* Back link */}
          <Link href="/blog" className="inline-flex items-center gap-2 mb-8 text-sm font-semibold hover:opacity-80 transition-opacity" style={{ color: '#7EB8D8' }}>
            <ArrowLeft className="h-4 w-4" /> Back to Blog
          </Link>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.map((tag: string, i: number) => (
                <span key={i} className="px-3 py-1 rounded-full text-xs font-semibold" style={{ background: 'rgba(0,212,200,0.15)', color: '#00E5FF', border: '1px solid rgba(0,212,200,0.3)' }}>
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight" style={{ color: '#E8F4FD' }}>
            {post.title}
          </h1>

          {/* Excerpt */}
          {post.excerpt && (
            <p className="text-xl mb-6 leading-relaxed" style={{ color: '#B8D4E8' }}>
              {post.excerpt}
            </p>
          )}

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-6 text-sm" style={{ color: '#7EB8D8' }}>
            <span className="flex items-center gap-2">
              <Calendar className="h-4 w-4" style={{ color: '#FFB300' }} /> {publishDate}
            </span>
            <span className="flex items-center gap-2">
              <Clock className="h-4 w-4" style={{ color: '#00D4C8' }} /> {readTime} min read
            </span>
            <span className="flex items-center gap-2">
              <Tag className="h-4 w-4" style={{ color: '#00C853' }} /> By {post.author || 'FomoGeo Team'}
            </span>
          </div>
        </div>
      </section>

      {/* Featured Image */}
      {post.featured_image && (
        <div className="max-w-4xl mx-auto px-4 -mt-2">
          <div className="rounded-xl overflow-hidden" style={{ border: '1px solid rgba(0,212,200,0.2)' }}>
            <img src={post.featured_image} alt={post.title} className="w-full h-auto max-h-96 object-cover" />
          </div>
        </div>
      )}

      {/* Article Body */}
      <article className="py-12">
        <div className="max-w-4xl mx-auto px-4">
          <div className="rounded-xl p-8 md:p-12" style={{ background: '#0D2840', border: '1px solid rgba(0,212,200,0.15)' }}>
            
            {/* Affiliate Disclosure */}
            <div className="mb-8 p-4 rounded-lg text-sm" style={{ background: 'rgba(255,179,0,0.05)', border: '1px solid rgba(255,179,0,0.2)', color: '#B8D4E8' }}>
              <strong style={{ color: '#FFB300' }}>Disclosure:</strong> This article may contain affiliate links. As an Amazon Associate, we earn from qualifying purchases at no extra cost to you.
            </div>

            {/* Rendered content */}
            <div dangerouslySetInnerHTML={{ __html: htmlContent }} />

          </div>
        </div>
      </article>

      {/* Share and Navigation */}
      <section className="py-12" style={{ background: '#0B1E30', borderTop: '1px solid rgba(0,212,200,0.1)' }}>
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
            <Link href="/blog" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold hover:opacity-80 transition-opacity" style={{ background: 'rgba(0,212,200,0.1)', color: '#00D4C8', border: '1px solid rgba(0,212,200,0.3)' }}>
              <ArrowLeft className="h-4 w-4" /> More Articles
            </Link>
            <Link href="/deals" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-bold transition-all hover:scale-105" style={{ background: 'linear-gradient(135deg, #FFB300, #FF8F00)', color: '#fff' }}>
              Browse Today&apos;s Deals →
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
