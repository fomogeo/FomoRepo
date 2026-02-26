'use client'

import { useState } from 'react'

export default function EmailSignup() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email) {
      setStatus('error')
      setMessage('Please enter your email address')
      return
    }

    setStatus('loading')
    setMessage('')

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (data.success) {
        setStatus('success')
        setMessage(data.message || 'Successfully subscribed! Check your inbox.')
        setEmail('')
      } else {
        setStatus('error')
        setMessage(data.error || 'Something went wrong. Please try again.')
      }
    } catch (error) {
      setStatus('error')
      setMessage('Failed to subscribe. Please try again later.')
    }
  }

  return (
    <section id="email-signup" className="section bg-gradient-to-br from-violet-950 via-purple-950 to-fuchsia-950 texture-noise py-20">
      <div className="container-custom max-w-4xl">
        <div className="card-glass p-12 text-center">
          <div className="badge badge-orange mb-6 text-base inline-flex">
            💎 Exclusive Subscriber Benefits
          </div>

          <h2 className="text-heading mb-4">
            <span className="text-white">Get the Best Deals </span>
            <span className="heading-gradient-orange">First!</span>
          </h2>

          <p className="text-xl text-purple-200 font-semibold mb-8">
            Join thousands of smart shoppers who never miss a deal
          </p>

          {/* Email Form */}
          <form onSubmit={handleSubmit} className="max-w-lg mx-auto mb-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                disabled={status === 'loading'}
                className="flex-1 px-6 py-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-400/50 transition disabled:opacity-50"
              />
              <button 
                type="submit" 
                disabled={status === 'loading'}
                className="btn btn-secondary px-8 py-4 whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === 'loading' ? 'Subscribing...' : 'Subscribe Free'}
              </button>
            </div>

            {/* Status Messages */}
            {message && (
              <div className={`mt-4 p-4 rounded-lg ${
                status === 'success' 
                  ? 'bg-emerald-500/20 border border-emerald-500/50 text-emerald-200' 
                  : 'bg-rose-500/20 border border-rose-500/50 text-rose-200'
              }`}>
                {message}
              </div>
            )}
          </form>

          <p className="text-sm text-purple-300 mb-8">
            🔒 We respect your privacy. Unsubscribe anytime. No spam, ever.
          </p>

          {/* Benefits Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
            {[
              { icon: '🎯', title: 'Early Access', desc: 'Get deals before anyone else' },
              { icon: '📧', title: 'Weekly Roundup', desc: 'Best deals curated for you' },
              { icon: '🎁', title: 'Exclusive Codes', desc: 'Subscriber-only discounts' },
            ].map((benefit, i) => (
              <div key={i} className="card p-6">
                <div className="text-4xl mb-3">{benefit.icon}</div>
                <h4 className="font-bold heading-gradient-orange mb-2">{benefit.title}</h4>
                <p className="text-sm text-slate-300">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
