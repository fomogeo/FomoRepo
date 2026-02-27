'use client'

import { useState } from 'react'

export default function FixDuplicateUrlsPage() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'complete'>('idle')
  const [result, setResult] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  const fixUrls = async () => {
    setStatus('loading')
    setError(null)
    
    try {
      const response = await fetch('/api/fix-duplicate-urls', {
        method: 'POST',
      })

      if (response.ok) {
        const data = await response.json()
        setResult(data)
        setStatus('complete')
      } else {
        const errorData = await response.json()
        setError(errorData.error || 'Failed to fix URLs')
        setStatus('idle')
      }
    } catch (err: any) {
      setError(err.message)
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
              🔧 Fix Duplicate Image URLs
            </h1>
            <p className="text-lg" style={{ color: '#B8D4E8' }}>
              Clean up duplicated URLs in blog post featured images
            </p>
          </div>

          {/* Info */}
          <div className="mb-8 p-6 rounded-lg" style={{ background: 'rgba(255,179,0,0.1)', border: '1px solid rgba(255,179,0,0.3)' }}>
            <h3 className="font-bold mb-3" style={{ color: '#FFB300' }}>
              ⚠️ What this does:
            </h3>
            <ul className="space-y-2 text-sm" style={{ color: '#B8D4E8' }}>
              <li>• Finds blog posts with duplicated image URLs</li>
              <li>• Extracts the first (valid) URL from each duplicated entry</li>
              <li>• Updates the database with the cleaned URL</li>
              <li>• Safe to run multiple times</li>
            </ul>
          </div>

          {/* Fix Button */}
          <div className="text-center mb-8">
            <button
              onClick={fixUrls}
              disabled={status === 'loading'}
              className="px-8 py-4 rounded-lg font-bold text-lg transition-all hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
              style={{
                background: status === 'loading' 
                  ? 'rgba(0,212,200,0.3)' 
                  : 'linear-gradient(135deg, #FF6B00, #FF8F00)',
                color: '#fff',
                boxShadow: '0 4px 15px rgba(255, 107, 0, 0.3)'
              }}
            >
              {status === 'loading' ? 'Fixing URLs...' : 'Fix Duplicate URLs'}
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

          {/* Results */}
          {result && status === 'complete' && (
            <div className="space-y-4">
              {/* Summary */}
              <div className="p-6 rounded-lg" style={{ background: 'rgba(0,197,83,0.2)', border: '1px solid rgba(0,197,83,0.3)' }}>
                <h3 className="font-bold mb-4 text-lg" style={{ color: '#00C853' }}>
                  ✅ Fix Complete!
                </h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p style={{ color: '#B8D4E8' }}>URLs Fixed:</p>
                    <p className="text-3xl font-bold" style={{ color: '#00C853' }}>{result.fixed}</p>
                  </div>
                  <div>
                    <p style={{ color: '#B8D4E8' }}>Already Clean:</p>
                    <p className="text-3xl font-bold" style={{ color: '#00D4C8' }}>{result.skipped}</p>
                  </div>
                </div>
              </div>

              {/* Details */}
              {result.details && (
                <div className="p-6 rounded-lg" style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(0,212,200,0.2)' }}>
                  <h4 className="font-bold mb-3" style={{ color: '#00D4C8' }}>
                    📋 Details:
                  </h4>
                  
                  {result.details.fixed.length > 0 && (
                    <div className="mb-4">
                      <p className="font-semibold mb-2" style={{ color: '#00C853' }}>Fixed Posts:</p>
                      <ul className="list-disc pl-6 text-sm space-y-1" style={{ color: '#B8D4E8' }}>
                        {result.details.fixed.map((title: string, i: number) => (
                          <li key={i}>{title}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {result.details.skipped.length > 0 && (
                    <div>
                      <p className="font-semibold mb-2" style={{ color: '#00D4C8' }}>Already Clean:</p>
                      <ul className="list-disc pl-6 text-sm space-y-1" style={{ color: '#B8D4E8' }}>
                        {result.details.skipped.map((title: string, i: number) => (
                          <li key={i}>{title}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Navigation */}
          <div className="mt-8 flex gap-4 justify-center">
            <a 
              href="/admin/debug-blog-images"
              className="px-6 py-3 rounded-lg font-semibold transition-all hover:scale-105"
              style={{ background: 'rgba(0,212,200,0.2)', color: '#00D4C8', border: '1px solid rgba(0,212,200,0.3)' }}
            >
              Debug Images
            </a>
            <a 
              href="/blog"
              className="px-6 py-3 rounded-lg font-semibold transition-all hover:scale-105"
              style={{ background: 'rgba(255,179,0,0.2)', color: '#FFB300', border: '1px solid rgba(255,179,0,0.3)' }}
            >
              View Blog
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
