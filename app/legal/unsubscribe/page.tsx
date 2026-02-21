'use client'

import { useState } from 'react'
import { Mail } from 'lucide-react'

export default function UnsubscribePage() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await fetch('/api/unsubscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      })
      const data = await res.json()
      
      if (data.success) {
        setStatus('success')
        setMessage('Successfully unsubscribed. Sorry to see you go!')
        setEmail('')
      } else {
        setStatus('error')
        setMessage(data.error || 'Something went wrong')
      }
    } catch (error) {
      setStatus('error')
      setMessage('Failed to unsubscribe. Please try again.')
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-sky-gradient py-16 border-b border-gray-200">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-center text-fg-heading">Unsubscribe</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-2xl">
        <div className="card-light p-8 text-center">
          <Mail className="h-12 w-12 mx-auto mb-4 text-fg-orange" />
          <h2 className="text-2xl font-bold mb-4 text-fg-heading">Unsubscribe from our mailing list</h2>
          <p className="text-fg-body mb-6">
            Enter your email address to unsubscribe from receiving deal alerts and newsletters.
          </p>
          
          <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full mb-4"
              required
              disabled={status === 'loading'}
            />
            <button type="submit" className="btn-primary w-full" disabled={status === 'loading'}>
              {status === 'loading' ? 'Processing...' : 'Unsubscribe'}
            </button>
          </form>
          
          {message && (
            <p className={`mt-4 text-sm ${status === 'success' ? 'text-fg-green' : 'text-red-500'}`}>
              {message}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
