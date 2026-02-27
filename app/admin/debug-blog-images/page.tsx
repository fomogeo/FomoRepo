import { getBlogPosts } from '@/lib/supabase'

export const dynamic = 'force-dynamic'

export default async function DebugBlogImagesPage() {
  const posts = await getBlogPosts(50)

  return (
    <div className="min-h-screen py-16" style={{ background: '#071828' }}>
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="rounded-xl shadow-2xl p-8" style={{ background: '#0D2840', border: '1px solid rgba(0,212,200,0.2)' }}>
          
          <h1 className="text-4xl font-bold mb-8" style={{ color: '#E8F4FD' }}>
            🔍 Blog Images Debug
          </h1>

          <div className="space-y-6">
            {posts.map((post) => (
              <div key={post.id} className="p-4 rounded-lg" style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(0,212,200,0.2)' }}>
                <h3 className="font-bold mb-2" style={{ color: '#00D4C8' }}>
                  {post.title}
                </h3>
                
                <div className="text-sm space-y-1" style={{ color: '#B8D4E8' }}>
                  <div>
                    <strong style={{ color: '#FFB300' }}>Slug:</strong> {post.slug}
                  </div>
                  <div>
                    <strong style={{ color: '#FFB300' }}>Published:</strong> {post.is_published ? '✅ Yes' : '❌ No'}
                  </div>
                  <div>
                    <strong style={{ color: '#FFB300' }}>Featured Image:</strong>
                  </div>
                  
                  {post.featured_image ? (
                    <div className="mt-2">
                      <div className="p-2 rounded font-mono text-xs overflow-x-auto" style={{ background: 'rgba(0,197,83,0.2)', color: '#00C853' }}>
                        ✅ {post.featured_image}
                      </div>
                      
                      {/* Show the actual image */}
                      <div className="mt-2">
                        <img 
                          src={post.featured_image} 
                          alt={post.title}
                          className="w-full h-48 object-cover rounded"
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="p-2 rounded font-mono text-xs" style={{ background: 'rgba(255,107,0,0.2)', color: '#FF6B00' }}>
                      ❌ No image URL in database
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 p-4 rounded-lg" style={{ background: 'rgba(0,212,200,0.1)', border: '1px solid rgba(0,212,200,0.3)' }}>
            <h3 className="font-bold mb-2" style={{ color: '#00D4C8' }}>
              Summary:
            </h3>
            <div style={{ color: '#B8D4E8' }}>
              <div>Total posts: {posts.length}</div>
              <div>Posts with images: {posts.filter(p => p.featured_image).length}</div>
              <div>Posts without images: {posts.filter(p => !p.featured_image).length}</div>
            </div>
          </div>

          <div className="mt-6 flex gap-4">
            <a 
              href="/blog"
              className="px-6 py-3 rounded-lg font-semibold transition-all hover:scale-105"
              style={{ background: 'linear-gradient(135deg, #00D4C8, #00E5FF)', color: '#fff' }}
            >
              View Blog Page
            </a>
            <a 
              href="/admin/generate-blog-images"
              className="px-6 py-3 rounded-lg font-semibold transition-all hover:scale-105"
              style={{ background: 'rgba(255,179,0,0.2)', color: '#FFB300', border: '1px solid rgba(255,179,0,0.3)' }}
            >
              Generate More Images
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
