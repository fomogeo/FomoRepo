'use client'

import { useState, useEffect } from 'react'
import { X, Mail } from 'lucide-react'

export default function EmailPopup() {
  const [isVisible, setIsVisible] = useState(false)
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle')

  useEffect(() => {
    const dismissed = localStorage.getItem('email-popup-dismissed')
    if (!dismissed) {
      const timer = setTimeout(() => setIsVisible(true), 30000)
      return () => clearTimeout(timer)
    }
  }, [])

  const handleClose = () => {
    setIsVisible(false)
    localStorage.setItem('email-popup-dismissed', 'true')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      const data = await res.json()
      if (data.success) {
        setStatus('success')
        setTimeout(handleClose, 2500)
      } else {
        setStatus('idle')
      }
    } catch {
      setStatus('idle')
    }
  }

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4"
      style={{ background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(4px)' }}>
      <div className="relative max-w-md w-full rounded-2xl p-8"
        style={{
          background: 'linear-gradient(135deg, #0D2840, #091E30)',
          border: '1px solid rgba(0,212,200,0.3)',
          boxShadow: '0 0 60px rgba(0,212,200,0.1), 0 30px 80px rgba(0,0,0,0.5)',
        }}>
        <button onClick={handleClose} className="absolute top-4 right-4 transition-colors"
          style={{ color: '#4A7A9B' }}
          onMouseEnter={e => (e.currentTarget.style.color = '#E8F4FD')}
          onMouseLeave={e => (e.currentTarget.style.color = '#4A7A9B')}>
          <X className="h-6 w-6" />
        </button>

        {/* Decorative glow */}
        <div className="absolute top-0 right-0 w-32 h-32 pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(255,179,0,0.08) 0%, transparent 70%)' }} />

        {status === 'success' ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
              style={{ background: 'rgba(0,200,83,0.15)', border: '2px solid rgba(0,200,83,0.4)' }}>
              <Mail className="h-8 w-8" style={{ color: '#00C853' }} />
            </div>
            <h3 className="text-2xl font-bold mb-2" style={{ color: '#E8F4FD' }}>You&apos;re In! 🎉</h3>
            <p style={{ color: '#7EB8D8' }}>Check your inbox for exclusive deals</p>
          </div>
        ) : (
          <>
            <div className="text-center mb-6">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                style={{ background: 'rgba(255,179,0,0.15)', border: '2px solid rgba(255,179,0,0.3)' }}>
                <Mail className="h-8 w-8" style={{ color: '#FFB300' }} />
              </div>
              <h3 className="text-2xl font-bold mb-2" style={{ color: '#E8F4FD' }}>
                🎯 Get Deals First!
              </h3>
              <p style={{ color: '#7EB8D8' }}>
                Exclusive access to new deals before anyone else
              </p>
            </div>

            <form onSubmit={handleSubmit}>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                disabled={status === 'loading'}
                className="w-full px-4 py-3 rounded-xl mb-4 outline-none"
                style={{
                  background: 'rgba(7,24,40,0.8)',
                  border: '1px solid rgba(0,212,200,0.3)',
                  color: '#E8F4FD',
                }}
                onFocus={e => (e.currentTarget.style.borderColor = '#00D4C8')}
                onBlur={e => (e.currentTarget.style.borderColor = 'rgba(0,212,200,0.3)')}
              />
              <button type="submit" disabled={status === 'loading'}
                className="btn-gold w-full py-3 font-bold rounded-xl disabled:opacity-60">
                {status === 'loading' ? 'Subscribing...' : '🔥 Get Exclusive Deals'}
              </button>
            </form>

            <p className="text-xs text-center mt-4" style={{ color: '#4A7A9B' }}>
              No spam. Unsubscribe anytime.
            </p>
          </>
        )}
      </div>
    </div>
  )
}
