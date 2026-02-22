export const dynamic = 'force-dynamic'

import Script from 'next/script'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getBlogPostBySlug } from '@/lib/supabase'
import { Calendar, User, ArrowLeft } from 'lucide-react'
import { format } from 'date-fns'

// Enhanced markdown to HTML converter - FIXES ALL # symbols
function markdownToHtml(markdown: string): string {
  if (!markdown) return ''
  
  let html = markdown
  
  // ISSUE 4: Remove ALL comparison tables
  html = html.replace(/\|[^\n]+\|/g, '') // Remove table rows
  html = html.replace(/[-]{3,}/g, '') // Remove separator lines
  
  // CRITICAL: Convert headers BEFORE processing anything else
  // This catches ALL # patterns including at start of content
  html = html.replace(/^######\s+(.*$)/gm, '<h6 class="text-base font-bold text-purple-400 mt-4 mb-2">$1</h6>')
  html = html.replace(/^#####\s+(.*$)/gm, '<h5 class="text-lg font-bold text-pink-400 mt-5 mb-3">$1</h5>')
  html = html.replace(/^####\s+(.*$)/gm, '<h4 class="text-xl font-bold text-cyan-400 mt-6 mb-3">$1</h4>')
  html = html.replace(/^###\s+(.*$)/gm, '<h3 class="text-2xl font-bold text-orange-400 mt-8 mb-4 border-l-4 border-orange-400 pl-4">$1</h3>')
  html = html.replace(/^##\s+(.*$)/gm, '<h2 class="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mt-10 mb-6">$1</h2>')
  html = html.replace(/^#\s+(.*$)/gm, '<h1 class="text-4xl font-bold bg-gradient-to-r from-orange-400 to-yellow-500 bg-clip-text text-transparent mt-12 mb-6">$1</h1>')
  
  // Also catch headers without space after #
  html = html.replace(/^######([^\s].*$)/gm, '<h6 class="text-base font-bold text-purple-400 mt-4 mb-2">$1</h6>')
  html = html.replace(/^#####([^\s].*$)/gm, '<h5 class="text-lg font-bold text-pink-400 mt-5 mb-3">$1</h5>')
  html = html.replace(/^####([^\s].*$)/gm, '<h4 class="text-xl font-bold text-cyan-400 mt-6 mb-3">$1</h4>')
  html = html.replace(/^###([^\s].*$)/gm, '<h3 class="text-2xl font-bold text-orange-400 mt-8 mb-4 border-l-4 border-orange-400 pl-4">$1</h3>')
  html = html.replace(/^##([^\s].*$)/gm, '<h2 class="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mt-10 mb-6">$1</h2>')
  html = html.replace(/^#([^\s].*$)/gm, '<h1 class="text-4xl font-bold bg-gradient-to-r from-orange-400 to-yellow-500 bg-clip-text text-transparent mt-12 mb-6">$1</h1>')
  
  // Remove any remaining standalone # symbols
  html = html.replace(/^#{1,6}\s*$/gm, '')
  
  // Convert bold with color
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong class="text-white font-bold">$1</strong>')
  
  // Convert italic with color
  html = html.replace(/\*(.*?)\*/g, '<em class="text-cyan-300 italic">$1</em>')
  
  // Convert code blocks
  html = html.replace(/`([^`]+)`/g, '<code class="bg-slate-800 text-orange-300 px-2 py-1 rounded text-sm font-mono">$1</code>')
  
  // Convert lists
  html = html.replace(/^\* (.*$)/gm, '<li class="ml-6 mb-2 text-gray-200">• $1</li>')
  html = html.replace(/^- (.*$)/gm, '<li class="ml-6 mb-2 text-gray-200">• $1</li>')
  html = html.replace(/^\d+\. (.*$)/gm, '<li class="ml-6 mb-2 text-gray-200 list-decimal">$1</li>')
  
  // Wrap consecutive list items in ul
  html = html.replace(/(<li.*?<\/li>\n?)+/g, '<ul class="space-y-2 mb-6 ml-4">$&</ul>')
  
  // Convert paragraphs
  const lines = html.split('\n')
  const processedLines = lines.map(line => {
    const trimmed = line.trim()
    if (!trimmed) return '<br/>'
    if (trimmed.startsWith('<h') || trimmed.startsWith('<ul') || trimmed.startsWith('<li') || trimmed.startsWith('</ul') || trimmed.startsWith('<code')) {
      return line
    }
    if (!trimmed.startsWith('<')) {
      return `<p class="text-gray-200 mb-4 leading-relaxed text-lg">${line}</p>`
    }
    return line
  })
  
  html = processedLines.join('\n')
  
  // Clean up
  html = html.replace(/<br\/>\s*<br\/>/g, '<br/>')
  html = html.replace(/<p>\s*<\/p>/g, '')
  
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
          <div className="relative w-full h-96 rounded-2xl overflow-hidden mb-8 border-2 border-cyan-500/30 shadow-2xl">
            <img src={post.featured_image} alt={post.title} className="w-full h-full object-cover" />
          </div>
        )}

        <div className="flex items-center gap-6 text-sm mb-6 text-gray-300">
          <span className="flex items-center gap-2 bg-cyan-900/30 px-3 py-1 rounded-full border border-cyan-500/30">
            <Calendar className="h-4 w-4 text-cyan-400" />
            {format(new Date(post.published_at || post.created_at), 'MMMM d, yyyy')}
          </span>
          <span className="flex items-center gap-2 bg-orange-900/30 px-3 py-1 rounded-full border border-orange-500/30">
            <User className="h-4 w-4 text-orange-400" />
            {author}
          </span>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white leading-tight">{post.title}</h1>

        {post.excerpt && (
          <div className="bg-gradient-to-r from-cyan-900/20 to-blue-900/20 border-l-4 border-cyan-400 pl-6 pr-6 py-4 mb-8 rounded-r-lg">
            <p className="text-xl text-gray-200 leading-relaxed italic">
              {post.excerpt}
            </p>
          </div>
        )}

        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-8">
            {post.tags.map((tag: string) => (
              <span key={tag} className="px-3 py-1.5 rounded-full text-sm font-semibold bg-gradient-to-r from-cyan-900/50 to-blue-900/50 text-cyan-300 border border-cyan-500/30 hover:border-cyan-400 transition">
                #{tag}
              </span>
            ))}
          </div>
        )}

        <div className="border-t-2 border-cyan-500/20 pt-8 mb-8"></div>

        <div 
          className="blog-content"
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />

        <div className="border-t-2 border-cyan-500/20 mt-12 pt-8">
          <div className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-lg p-6 border border-cyan-500/20">
            <p className="text-gray-300 text-sm">
              <span className="text-orange-400 font-bold text-lg">Written by</span>{' '}
              <span className="text-cyan-400 font-semibold text-base">{author}</span>
              <span className="text-gray-400 mx-2">•</span>
              <span className="text-gray-400">{format(new Date(post.published_at || post.created_at), 'MMMM d, yyyy')}</span>
            </p>
          </div>
        </div>
      </article>
    </div>
  )
}
