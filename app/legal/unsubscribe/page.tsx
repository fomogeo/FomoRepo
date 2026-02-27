'use client'

import { useState } from 'react'
import { Mail, Check } from 'lucide-react'

export default function UnsubscribePage() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    
    try {
      const response = await fetch('/api/unsubscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      
      const data = await response.json()
      
      if (data.success) {
        setStatus('success')
        setMessage('You have been successfully unsubscribed.')
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
    <div className="min-h-screen py-16" style={{ background: '#071828' }}>
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-2xl p-8">
          {status === 'success' ? (
            <div className="text-center">
              <div 
                className="rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6"
                style={{ background: 'linear-gradient(135deg, #00C853, #69F0AE)' }}
              >
                <Check className="h-10 w-10 text-white" />
              </div>
              <h1 className="text-3xl font-bold mb-4" style={{ color: '#071828' }}>
                Unsubscribed Successfully
              </h1>
              <p className="text-gray-600 mb-6">
                {message}
              </p>
              <p className="text-gray-600">
                You won't receive any more emails from us. We're sorry to see you go!
              </p>
              <div className="mt-8 pt-6 border-t border-gray-200">
                <p className="text-sm text-gray-500 mb-4">
                  Changed your mind?
                </p>
                <a 
                  href="/#email-signup" 
                  className="inline-block px-6 py-2 rounded-lg font-semibold text-sm transition-all hover:scale-105"
                  style={{ 
                    background: 'linear-gradient(135deg, #00D4C8, #00E5FF)',
                    color: '#fff'
                  }}
                >
                  Resubscribe
                </a>
              </div>
            </div>
          ) : (
            <>
              <div className="text-center mb-8">
                <div 
                  className="rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6"
                  style={{ background: 'linear-gradient(135deg, #FFB300, #FF8F00)' }}
                >
                  <Mail className="h-10 w-10 text-white" />
                </div>
                <h1 className="text-3xl font-bold mb-4" style={{ color: '#071828' }}>
                  Unsubscribe from Emails
                </h1>
                <p className="text-gray-600">
                  We're sorry to see you go. Enter your email address below to unsubscribe from our mailing list.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label 
                    htmlFor="email" 
                    className="block text-sm font-semibold mb-2"
                    style={{ color: '#071828' }}
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    required
                    className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:border-orange-400 transition-colors"
                    style={{ borderColor: '#E0E0E0' }}
                    disabled={status === 'loading'}
                  />
                </div>

                {status === 'error' && (
                  <div 
                    className="p-4 rounded-lg text-sm"
                    style={{ background: '#FFEBEE', color: '#C62828' }}
                  >
                    {message}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full font-bold py-3 rounded-lg transition-all hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
                  style={{
                    background: 'linear-gradient(135deg, #FF6B00, #FF8F00)',
                    color: '#fff',
                    boxShadow: '0 4px 15px rgba(255, 107, 0, 0.3)'
                  }}
                >
                  {status === 'loading' ? 'Unsubscribing...' : 'Unsubscribe'}
                </button>
              </form>

              <p className="text-xs text-gray-500 text-center mt-6">
                Changed your mind? You can always resubscribe later from our{' '}
                <a href="/" className="underline hover:text-gray-700">homepage</a>.
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
