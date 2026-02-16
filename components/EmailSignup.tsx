'use client'

import { useState } from 'react'
import { Mail } from 'lucide-react'

export default function EmailSignup() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (data.success) {
        setStatus('success')
        setMessage('Thanks for subscribing! Check your inbox for exclusive deals.')
        setEmail('')
      } else {
        setStatus('error')
        setMessage(data.error || 'Something went wrong. Please try again.')
      }
    } catch (error) {
      setStatus('error')
      setMessage('Something went wrong. Please try again.')
    }
  }

  return (
    <div className="text-center max-w-2xl mx-auto px-4">
      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            required
            className="flex-1 px-5 py-4 rounded-xl focus:outline-none focus:ring-4 focus:ring-white/50 text-slate-900 font-medium shadow-lg"
            disabled={status === 'loading'}
          />
          <button
            type="submit"
            disabled={status === 'loading'}
            className="bg-white text-orange-600 font-bold px-8 py-4 rounded-xl hover:bg-orange-50 transition-all disabled:opacity-50 shadow-xl hover:shadow-2xl hover:-translate-y-0.5 whitespace-nowrap"
          >
            {status === 'loading' ? 'Subscribing...' : 'Subscribe Free →'}
          </button>
        </div>

        {message && (
          <p className={`mt-4 text-sm font-medium ${status === 'success' ? 'text-white bg-green-500/20 backdrop-blur-sm py-2 px-4 rounded-lg' : 'text-red-100 bg-red-500/20 backdrop-blur-sm py-2 px-4 rounded-lg'}`}>
            {message}
          </p>
        )}
      </form>

      <p className="text-sm text-orange-50 mt-4 flex items-center justify-center gap-2">
        <span className="text-lg">🔒</span>
        <span>We respect your privacy. Unsubscribe anytime. No spam, ever.</span>
      </p>
    </div>
  )
}
