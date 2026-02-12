'use client'

import { useState, useEffect } from 'react'
import { X, Mail } from 'lucide-react'

export default function EmailPopup() {
  const [isVisible, setIsVisible] = useState(false)
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle')

  useEffect(() => {
    // Show popup after 30 seconds if not previously dismissed
    const dismissed = localStorage.getItem('email-popup-dismissed')
    if (!dismissed) {
      const timer = setTimeout(() => {
        setIsVisible(true)
      }, 30000) // 30 seconds

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
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (data.success) {
        setStatus('success')
        setTimeout(() => {
          handleClose()
        }, 2000)
      }
    } catch (error) {
      setStatus('idle')
    }
  }

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-2xl max-w-md w-full p-8 relative">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X className="h-6 w-6" />
        </button>

        {status === 'success' ? (
          <div className="text-center py-8">
            <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Mail className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              You&apos;re In!
            </h3>
            <p className="text-gray-600">
              Check your inbox for exclusive deals
            </p>
          </div>
        ) : (
          <>
            <div className="text-center mb-6">
              <div className="bg-primary-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Mail className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Get 10% Off Your First Purchase
              </h3>
              <p className="text-gray-600">
                Plus exclusive access to new deals before anyone else
              </p>
            </div>

            <form onSubmit={handleSubmit}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 mb-4"
                disabled={status === 'loading'}
              />
              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 rounded-lg transition-colors disabled:opacity-50"
              >
                {status === 'loading' ? 'Subscribing...' : 'Get My Discount'}
              </button>
            </form>

            <p className="text-xs text-gray-500 text-center mt-4">
              No spam. Unsubscribe anytime.
            </p>
          </>
        )}
      </div>
    </div>
  )
}
