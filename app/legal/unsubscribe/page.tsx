export const dynamic = 'force-dynamic'

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
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-md mx-auto">
        {status === 'success' ? (
          <div className="text-center">
            <div className="bg-green-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
              <Check className="h-10 w-10 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Unsubscribed Successfully
            </h1>
            <p className="text-gray-600 mb-6">
              {message}
            </p>
            <p className="text-gray-600">
              You won't receive any more emails from us. We're sorry to see you go!
            </p>
          </div>
        ) : (
          <>
            <div className="text-center mb-8">
              <div className="bg-gray-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                <Mail className="h-10 w-10 text-gray-600" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                Unsubscribe from Emails
              </h1>
              <p className="text-gray-600">
                We're sorry to see you go. Enter your email address below to unsubscribe from our mailing list.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  disabled={status === 'loading'}
                />
              </div>

              {status === 'error' && (
                <p className="text-sm text-red-600">{message}</p>
              )}

              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 rounded-lg transition-colors disabled:opacity-50"
              >
                {status === 'loading' ? 'Unsubscribing...' : 'Unsubscribe'}
              </button>
            </form>

            <p className="text-xs text-gray-500 text-center mt-6">
              Changed your mind? You can always resubscribe later.
            </p>
          </>
        )}
      </div>
    </div>
  )
}
