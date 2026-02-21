export const dynamic = 'force-dynamic'

import Script from 'next/script'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getBlogPostBySlug } from '@/lib/supabase'
import { Calendar, User, ArrowLeft } from 'lucide-react'
import { format } from 'date-fns'

// Simple markdown to HTML converter
function markdownToHtml(markdown: string): string {
  if (!markdown) return ''
  
  let html = markdown
  
  // Convert headers
  html = html.replace(/^### (.*$)/gm, '<h3 class="text-2xl font-bold text-white mt-8 mb-4">$1</h3>')
  html = html.replace(/^## (.*$)/gm, '<h2 class="text-3xl font-bold text-white mt-10 mb-6">$1</h2>')
  html = html.replace(/^# (.*$)/gm, '<h1 class="text-4xl font-bold text-white mt-12 mb-6">$1</h1>')
  
  // Convert bold
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong class="text-white font-semibold">$1</strong>')
  
  // Convert italic
  html = html.replace(/\*(.*?)\*/g, '<em class="text-cyan-300">$1</em>')
  
  // Convert lists
  html = html.replace(/^\* (.*$)/gm, '<li class="ml-6 mb-2 text-gray-200">$1</li>')
  html = html.replace(/^- (.*$)/gm, '<li class="ml-6 mb-2 text-gray-200">$1</li>')
  
  // Wrap consecutive list items in ul
  html = html.replace(/(<li.*?<\/li>\n?)+/g, '<ul class="list-disc pl-6 mb-6 space-y-2">$&</ul>')
  
  // Convert paragraphs (lines that aren't headers or lists)
  const lines = html.split('\n')
  const processedLines = lines.map(line => {
    const trimmed = line.trim()
    if (!trimmed) return '<br/>'
    if (trimmed.startsWith('<h') || trimmed.startsWith('<ul') || trimmed.startsWith('<li') || trimmed.startsWith('</ul')) {
      return line
    }
    if (!trimmed.startsWith('<')) {
      return `<p class="text-gray-200 mb-4 leading-relaxed">${line}</p>`
    }
    return line
  })
  
  html = processedLines.join('\n')
  
  // Clean up extra breaks
  html = html.replace(/<br\/>\s*<br\/>/g, '<br/>')
  
  return html
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getBlogPostBySlug(params.slug)
  
  if (!post) {
    notFound()
  }

  const author = post.author === 'FOMO Finds Team' ? 'FomoGeo Team' : post.author
  const htmlContent = markdownToHtml(post.content)

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
          <div className="relative w-full h-96 rounded-2xl overflow-hidden mb-8 border border-cyan-500/30">
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

        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white leading-tight">{post.title}</h1>

        {post.excerpt && (
          <p className="text-xl text-gray-300 mb-8 leading-relaxed border-l-4 border-cyan-400 pl-6 italic">
            {post.excerpt}
          </p>
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

        <div className="border-t border-cyan-500/20 pt-8 mb-8"></div>

        <div 
          className="blog-content"
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />

        <div className="border-t border-cyan-500/20 mt-12 pt-8">
          <p className="text-gray-400 text-sm">
            Written by <span className="text-cyan-400 font-semibold">{author}</span> on {format(new Date(post.published_at || post.created_at), 'MMMM d, yyyy')}
          </p>
        </div>
      </article>
    </div>
  )
}
