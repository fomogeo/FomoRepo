'use client'

import { useState } from 'react'

export default function GenerateBlogImagesPage() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'complete'>('idle')
  const [logs, setLogs] = useState<string[]>([])
  const [error, setError] = useState<string | null>(null)

  const addLog = (message: string) => {
    setLogs(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`])
  }

  const generateImages = async () => {
    setStatus('loading')
    setLogs([])
    setError(null)
    
    addLog('🎨 Starting blog image generation...')

    try {
      // Fetch posts without images
      addLog('📝 Fetching blog posts without images...')
      const postsResponse = await fetch('/api/blog/get-posts-without-images')
      
      if (!postsResponse.ok) {
        throw new Error('Failed to fetch blog posts')
      }

      const { posts } = await postsResponse.json()

      if (!posts || posts.length === 0) {
        addLog('✅ All blog posts already have images!')
        setStatus('complete')
        return
      }

      addLog(`📝 Found ${posts.length} blog posts without images`)

      // Generate images for each post
      for (let i = 0; i < posts.length; i++) {
        const post = posts[i]
        addLog(`\n🖼️  [${i + 1}/${posts.length}] Generating image for: "${post.title}"`)
        
        try {
          const generateResponse = await fetch('/api/generate-blog-image', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              blogPostId: post.id,
              title: post.title,
              excerpt: post.excerpt,
            }),
          })

          if (generateResponse.ok) {
            const result = await generateResponse.json()
            addLog(`   ✅ Generated successfully!`)
          } else {
            const errorData = await generateResponse.json()
            addLog(`   ❌ Failed: ${errorData.error}`)
          }

          // Wait 2 seconds between requests
          if (i < posts.length - 1) {
            addLog('   ⏳ Waiting 2 seconds...')
            await new Promise(resolve => setTimeout(resolve, 2000))
          }
        } catch (err: any) {
          addLog(`   ❌ Error: ${err.message}`)
        }
      }

      addLog('\n🎉 Blog image generation complete!')
      setStatus('complete')
    } catch (err: any) {
      setError(err.message)
      addLog(`❌ Script failed: ${err.message}`)
      setStatus('idle')
    }
  }

  return (
    <div className="min-h-screen py-16" style={{ background: '#071828' }}>
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="rounded-xl shadow-2xl p-8" style={{ background: '#0D2840', border: '1px solid rgba(0,212,200,0.2)' }}>
          
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4" style={{ color: '#E8F4FD' }}>
              🎨 Generate Blog Images
            </h1>
            <p className="text-lg" style={{ color: '#B8D4E8' }}>
              Automatically generate AI images for all blog posts using DALL-E 3
            </p>
          </div>

          {/* Generate Button */}
          <div className="text-center mb-8">
            <button
              onClick={generateImages}
              disabled={status === 'loading'}
              className="px-8 py-4 rounded-lg font-bold text-lg transition-all hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
              style={{
                background: status === 'loading' 
                  ? 'rgba(0,212,200,0.3)' 
                  : 'linear-gradient(135deg, #00D4C8, #00E5FF)',
                color: '#fff',
                boxShadow: '0 4px 15px rgba(0, 212, 200, 0.3)'
              }}
            >
              {status === 'loading' ? 'Generating Images...' : 'Start Generation'}
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 rounded-lg" style={{ background: 'rgba(255,107,0,0.2)', border: '1px solid rgba(255,107,0,0.3)' }}>
              <p className="font-semibold" style={{ color: '#FF6B00' }}>
                ❌ Error: {error}
              </p>
            </div>
          )}

          {/* Logs */}
          {logs.length > 0 && (
            <div className="p-6 rounded-lg font-mono text-sm" style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(0,212,200,0.2)' }}>
              <div className="mb-4 font-bold" style={{ color: '#00D4C8' }}>
                📋 Generation Log:
              </div>
              <div className="space-y-1 max-h-96 overflow-y-auto" style={{ color: '#B8D4E8' }}>
                {logs.map((log, index) => (
                  <div key={index} className="whitespace-pre-wrap">
                    {log}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Status */}
          {status === 'complete' && (
            <div className="mt-6 p-4 rounded-lg text-center" style={{ background: 'rgba(0,197,83,0.2)', border: '1px solid rgba(0,197,83,0.3)' }}>
              <p className="font-semibold text-lg" style={{ color: '#00C853' }}>
                ✅ Generation Complete! Check your blog page to see the images.
              </p>
            </div>
          )}

          {/* Info */}
          <div className="mt-8 p-6 rounded-lg" style={{ background: 'rgba(0,212,200,0.1)', border: '1px solid rgba(0,212,200,0.3)' }}>
            <h3 className="font-bold mb-3" style={{ color: '#00D4C8' }}>
              📋 How it works:
            </h3>
            <ul className="space-y-2 text-sm" style={{ color: '#B8D4E8' }}>
              <li>• Finds all blog posts without featured images</li>
              <li>• Generates AI images using DALL-E 3 based on title and excerpt</li>
              <li>• Saves image URLs to the database</li>
              <li>• Waits 2 seconds between each to avoid rate limits</li>
              <li>• Cost: $0.04 per image (very affordable!)</li>
            </ul>
          </div>

          {/* Navigation */}
          <div className="mt-8 text-center">
            <a 
              href="/blog" 
              className="inline-block px-6 py-3 rounded-lg font-semibold transition-all hover:scale-105"
              style={{ background: 'rgba(255,179,0,0.2)', color: '#FFB300', border: '1px solid rgba(255,179,0,0.3)' }}
            >
              View Blog Page →
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
