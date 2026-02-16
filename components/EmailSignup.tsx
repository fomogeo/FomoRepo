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
    <div className="text-center">
      <Mail className="h-12 w-12 mx-auto mb-4 text-white" />
      <h2 className="text-3xl font-bold text-white mb-2">
        Never Miss a Deal
      </h2>
      <p className="text-white opacity-90 mb-6">
        Get exclusive discounts and trending products delivered to your inbox
      </p>

      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            className="flex-1 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-white text-gray-900"
            disabled={status === 'loading'}
          />
          <button
            type="submit"
            disabled={status === 'loading'}
            className="bg-white text-emerald-700 font-bold px-6 py-3 rounded-lg hover:bg-emerald-50 transition-colors disabled:opacity-50 shadow-lg"
          >
            {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
          </button>
        </div>

        {message && (
          <p className={`mt-3 text-sm ${status === 'success' ? 'text-white' : 'text-red-200'}`}>
            {message}
          </p>
        )}
      </form>

      <p className="text-xs text-white opacity-75 mt-4">
        We respect your privacy. Unsubscribe anytime.
      </p>
    </div>
  )
}
