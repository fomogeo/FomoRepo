'use client'

import { useState } from 'react'
import { Mail } from 'lucide-react'

function sanitizeEmail(email: string): string {
  return email.trim().toLowerCase().replace(/[<>]/g, '')
}

function isValidEmail(email: string): boolean {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  return regex.test(email)
}

export default function EmailSignup() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'already' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const cleanEmail = sanitizeEmail(email)
    
    if (!isValidEmail(cleanEmail)) {
      setStatus('error')
      setMessage('Please enter a valid email address')
      return
    }

    setStatus('loading')
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: cleanEmail })
      })
      const data = await res.json()
      
      if (data.success && data.already) {
        setStatus('already')
        setMessage('You\'re already subscribed!')
      } else if (data.success) {
        setStatus('success')
        setMessage('🎉 Successfully subscribed!')
        setEmail('')
      } else {
        setStatus('error')
        setMessage(data.error || 'Something went wrong')
      }
    } catch (error) {
      setStatus('error')
      setMessage('Failed to subscribe. Please try again.')
    }
  }

  return (
    <div className="card-light max-w-2xl mx-auto text-center p-8" id="email-signup">
      <Mail className="h-12 w-12 mx-auto mb-4 text-fg-blue" />
      <h3 className="text-2xl font-bold mb-2 text-fg-heading">Never Miss a Deal!</h3>
      <p className="text-fg-body mb-6">Get exclusive deals and offers delivered straight to your inbox</p>
      
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="flex-1"
          required
          disabled={status === 'loading'}
        />
        <button type="submit" className="btn-orange" disabled={status === 'loading'}>
          {status === 'loading' ? 'Subscribing...' : 'Subscribe Free'}
        </button>
      </form>
      
      {message && (
        <p className={`mt-4 text-sm ${status === 'success' || status === 'already' ? 'text-fg-green' : 'text-red-500'}`}>
          {message}
        </p>
      )}
    </div>
  )
}
