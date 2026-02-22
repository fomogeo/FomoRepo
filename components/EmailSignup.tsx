'use client'

import { useState } from 'react'
import { Mail } from 'lucide-react'

export default function EmailSignup() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'already' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      })
      
      const data = await res.json()
      
      if (data.success && data.already) {
        setStatus('already')
        setMessage('You are already subscribed!')
      } else if (data.success) {
        setStatus('success')
        setMessage('Successfully subscribed! Check your inbox.')
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
    <div id="email-signup" className="card-light p-8 text-center max-w-2xl mx-auto">
      <Mail className="h-12 w-12 mx-auto mb-4 text-orange-400" />
      <h2 className="text-2xl font-bold mb-4 text-white">Never Miss a Deal!</h2>
      <p className="text-gray-300 mb-6">
        Get exclusive deals and expert buying guides delivered straight to your inbox
      </p>
      
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="flex-1"
          required
          disabled={status === 'loading'}
        />
        <button 
          type="submit" 
          className="btn-orange px-6 py-3 whitespace-nowrap"
          disabled={status === 'loading'}
        >
          {status === 'loading' ? 'Subscribing...' : 'Subscribe Free'}
        </button>
      </form>
      
      {message && (
        <p className={`mt-4 text-sm ${status === 'success' || status === 'already' ? 'text-green-400' : 'text-red-400'}`}>
          {message}
        </p>
      )}
      
      <p className="text-xs text-gray-400 mt-4">
        We respect your privacy. Unsubscribe anytime.
      </p>
    </div>
  )
}
