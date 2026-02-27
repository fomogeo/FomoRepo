export const dynamic = 'force-dynamic'
import { notFound } from 'next/navigation'
import { getBlogPostBySlug } from '@/lib/supabase'
import { Calendar, Clock, Tag } from 'lucide-react'

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getBlogPostBySlug(params.slug)

  if (!post || !post.is_published) {
    notFound()
  }

  // Format the date
  const publishDate = post.published_at
    ? new Date(post.published_at).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : 'Draft'

  // Simple markdown parser for the content
  const renderContent = (markdown: string) => {
    // Replace #### with h4
    let html = markdown.replace(/^#### (.+)$/gm, '<h4 class="text-xl font-bold mt-6 mb-3" style="color: #FFB300;">$1</h4>')
    
    // Replace ### with h3
    html = html.replace(/^### (.+)$/gm, '<h3 class="text-2xl font-bold mt-8 mb-4" style="color: #00D4C8;">$1</h3>')
    
    // Replace ## with h2
    html = html.replace(/^## (.+)$/gm, '<h2 class="text-3xl font-bold mt-10 mb-5" style="color: #00D4C8;">$1</h2>')
    
    // Replace **bold** with strong
    html = html.replace(/\*\*(.+?)\*\*/g, '<strong style="color: #E8F4FD;">$1</strong>')
    
    // Replace *italic* with em
    html = html.replace(/\*(.+?)\*/g, '<em>$1</em>')
    
    // Replace [link](url) with anchor
    html = html.replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" class="hover:underline" style="color: #00E5FF;">$1</a>')
    
    // Replace line breaks with <br> but preserve paragraphs
    const paragraphs = html.split('\n\n')
    html = paragraphs
      .map(p => {
        // Skip if already an HTML element
        if (p.trim().startsWith('<h') || p.trim().startsWith('<ul') || p.trim().startsWith('<ol')) {
          return p
        }
        return `<p class="mb-4 leading-relaxed">${p.replace(/\n/g, '<br>')}</p>`
      })
      .join('\n')
    
    // Replace bullet points
    html = html.replace(/^- (.+)$/gm, '<li class="ml-6 mb-2">$1</li>')
    html = html.replace(/(<li.*<\/li>\n)+/g, '<ul class="list-disc mb-4">$&</ul>')
    
    // Replace numbered lists
    html = html.replace(/^\d+\. (.+)$/gm, '<li class="ml-6 mb-2">$1</li>')
    
    return html
  }

  const contentHtml = renderContent(post.content)

  return (
    <div className="min-h-screen py-16" style={{ background: '#071828' }}>
      <div className="container mx-auto px-4">
        <article className="max-w-4xl mx-auto">
          {/* Blog Post Card */}
          <div className="rounded-xl shadow-2xl overflow-hidden" style={{ background: '#0D2840', border: '1px solid rgba(0,212,200,0.2)' }}>
            
            {/* Featured Image */}
            {post.featured_image && (
              <div className="relative h-96 w-full overflow-hidden">
                <img
                  src={post.featured_image}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
                <div 
                  className="absolute bottom-0 left-0 right-0 h-32"
                  style={{
                    background: 'linear-gradient(to top, #0D2840, transparent)'
                  }}
                />
              </div>
            )}

            {/* Content */}
            <div className="p-8 md:p-12">
              {/* Meta Information */}
              <div className="flex flex-wrap items-center gap-4 mb-6 text-sm" style={{ color: '#7EB8D8' }}>
                <span className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  {publishDate}
                </span>
                <span className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  {Math.ceil(post.content.split(' ').length / 200)} min read
                </span>
                {post.author && (
                  <span>By {post.author}</span>
                )}
              </div>

              {/* Title */}
              <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight" style={{ color: '#E8F4FD' }}>
                {post.title}
              </h1>

              {/* Excerpt */}
              {post.excerpt && (
                <p className="text-xl mb-8 leading-relaxed" style={{ color: '#B8D4E8' }}>
                  {post.excerpt}
                </p>
              )}

              {/* Tags */}
              {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-8">
                  {post.tags.map((tag: string, index: number) => (
                    <span
                      key={index}
                      className="flex items-center gap-1 px-3 py-1 rounded-full text-sm font-semibold"
                      style={{ 
                        background: 'rgba(0,212,200,0.2)', 
                        color: '#00E5FF',
                        border: '1px solid rgba(0,212,200,0.3)'
                      }}
                    >
                      <Tag className="h-3 w-3" />
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Divider */}
              <div className="mb-8" style={{ height: 2, background: 'linear-gradient(90deg, transparent, rgba(0,212,200,0.3), transparent)' }} />

              {/* Blog Content */}
              <div 
                className="prose prose-lg max-w-none"
                style={{ color: '#B8D4E8' }}
                dangerouslySetInnerHTML={{ __html: contentHtml }}
              />

              {/* Bottom Divider */}
              <div className="mt-12 mb-8" style={{ height: 2, background: 'linear-gradient(90deg, transparent, rgba(0,212,200,0.3), transparent)' }} />

              {/* Share Section */}
              <div className="text-center">
                <p className="text-sm mb-4" style={{ color: '#7EB8D8' }}>
                  Found this helpful? Share it with others!
                </p>
                <div className="flex justify-center gap-4">
                  <a
                    href={`https://x.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(`https://fomogeo.com/blog/${post.slug}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-lg font-semibold text-sm transition-all hover:scale-105"
                    style={{ background: 'rgba(0,212,200,0.2)', color: '#00E5FF', border: '1px solid rgba(0,212,200,0.3)' }}
                  >
                    Share on X
                  </a>
                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`https://fomogeo.com/blog/${post.slug}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-lg font-semibold text-sm transition-all hover:scale-105"
                    style={{ background: 'rgba(0,212,200,0.2)', color: '#00E5FF', border: '1px solid rgba(0,212,200,0.3)' }}
                  >
                    Share on Facebook
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Back to Blog Button */}
          <div className="mt-8 text-center">
            <a 
              href="/blog" 
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold hover:opacity-80 transition-opacity"
              style={{ background: 'rgba(0,212,200,0.1)', color: '#00D4C8', border: '1px solid rgba(0,212,200,0.3)' }}
            >
              ← Back to Blog
            </a>
          </div>
        </article>
      </div>
    </div>
  )
}
