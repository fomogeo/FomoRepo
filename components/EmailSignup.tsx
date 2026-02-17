'use client'

import { useState } from 'react'

function isValidEmail(email: string): boolean {
  return /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/.test(email) && email.length <= 254
}
function sanitizeEmail(email: string): string {
  return email.trim().toLowerCase().replace(/['";\\\*<>]/g, '').slice(0, 254)
}

export default function EmailSignup() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'already' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const sanitized = sanitizeEmail(email)
    if (!isValidEmail(sanitized)) {
      setStatus('error')
      setMessage('Please enter a valid email address.')
      return
    }
    setStatus('loading')
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: sanitized }),
      })
      const data = await res.json()
      if (data.already) {
        setStatus('already')
        setMessage("You're already on our mailing list! 🎉 Check your inbox for deals.")
      } else if (data.success) {
        setStatus('success')
        setMessage('🎉 Welcome aboard! Check your inbox for exclusive deals.')
        setEmail('')
      } else {
        setStatus('error')
        setMessage(data.error || 'Something went wrong. Please try again.')
      }
    } catch {
      setStatus('error')
      setMessage('Something went wrong. Please try again.')
    }
  }

  const msgColor: Record<string, string> = {
    success: '#00C853',
    already: '#00D4C8',
    error:   '#FF6B00',
  }

  return (
    <div className="text-center max-w-2xl mx-auto px-4">
      <form onSubmit={handleSubmit} noValidate className="max-w-lg mx-auto">
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Enter your email address"
            required
            maxLength={254}
            autoComplete="email"
            disabled={status === 'loading' || status === 'success' || status === 'already'}
            className="flex-1 px-5 py-4 rounded-xl font-medium outline-none"
            style={{
              background: 'rgba(7, 24, 40, 0.9)',
              border: '1px solid rgba(0,212,200,0.4)',
              color: '#E8F4FD',
              boxShadow: 'inset 0 0 20px rgba(0,212,200,0.05)',
            }}
            onFocus={e => (e.currentTarget.style.borderColor = '#00D4C8')}
            onBlur={e => (e.currentTarget.style.borderColor = 'rgba(0,212,200,0.4)')}
          />
          <button
            type="submit"
            disabled={status === 'loading' || status === 'success' || status === 'already'}
            className="btn-gold px-8 py-4 whitespace-nowrap disabled:opacity-60"
          >
            {status === 'loading' ? 'Subscribing...' : status === 'success' || status === 'already' ? '✓ Subscribed' : 'Subscribe Free →'}
          </button>
        </div>
        {message && (
          <p className="mt-4 text-sm font-semibold py-3 px-5 rounded-xl"
            style={{
              color: msgColor[status] || '#E8F4FD',
              background: 'rgba(0,0,0,0.3)',
              border: `1px solid ${msgColor[status] || 'rgba(255,255,255,0.1)'}30`,
            }}
          >
            {message}
          </p>
        )}
      </form>
      <p className="text-sm mt-4 flex items-center justify-center gap-2" style={{ color: '#4A7A9B' }}>
        <span>🔒</span>
        <span>We respect your privacy. Unsubscribe anytime. No spam, ever.</span>
      </p>
    </div>
  )
}
