'use client'

import { useState } from 'react'
import { Target, Mail, Gift, CheckCircle, RefreshCw, Globe } from 'lucide-react'

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
    <div id="email-signup" className="text-center max-w-4xl mx-auto">
      {/* Exclusive Subscriber Benefits Badge */}
      <div className="inline-flex items-center gap-2 bg-orange-500/20 border border-orange-500/50 rounded-full px-4 py-2 mb-6">
        <span className="text-2xl">💎</span>
        <span className="text-orange-400 font-bold text-sm">Exclusive Subscriber Benefits</span>
      </div>

      {/* Main Heading */}
      <h2 className="text-3xl md:text-4xl font-bold mb-4">
        <span className="text-white">Get the Best Deals </span>
        <span className="text-orange-400">First!</span>
      </h2>
      <p className="text-gray-300 mb-8">
        Join thousands of smart shoppers who never miss a deal
      </p>
      
      {/* Email Form */}
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto mb-4">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email address"
          className="flex-1 bg-slate-800/50 border border-cyan-500/30 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400"
          required
          disabled={status === 'loading'}
        />
        <button 
          type="submit" 
          className="btn-orange px-8 py-3 whitespace-nowrap font-bold"
          disabled={status === 'loading'}
        >
          {status === 'loading' ? 'Subscribing...' : 'Subscribe Free'}
        </button>
      </form>
      
      {/* Privacy Message */}
      <p className="text-xs text-gray-400 mb-8 flex items-center justify-center gap-2">
        <span>🔒</span>
        We respect your privacy. Unsubscribe anytime. No spam, ever.
      </p>

      {message && (
        <p className={`mb-8 text-sm ${status === 'success' || status === 'already' ? 'text-green-400' : 'text-red-400'}`}>
          {message}
        </p>
      )}

      {/* Benefits Grid - 3 columns */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-slate-800/50 border border-cyan-500/30 rounded-xl p-6 text-center hover:border-cyan-400 transition">
          <div className="w-12 h-12 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Target className="h-6 w-6 text-red-400" />
          </div>
          <h3 className="text-yellow-400 font-bold mb-2">Early Access</h3>
          <p className="text-gray-400 text-sm">Get deals before they go public</p>
        </div>

        <div className="bg-slate-800/50 border border-cyan-500/30 rounded-xl p-6 text-center hover:border-cyan-400 transition">
          <div className="w-12 h-12 bg-cyan-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Mail className="h-6 w-6 text-cyan-400" />
          </div>
          <h3 className="text-yellow-400 font-bold mb-2">Weekly Roundup</h3>
          <p className="text-gray-400 text-sm">Best deals curated just for you</p>
        </div>

        <div className="bg-slate-800/50 border border-cyan-500/30 rounded-xl p-6 text-center hover:border-cyan-400 transition">
          <div className="w-12 h-12 bg-orange-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Gift className="h-6 w-6 text-orange-400" />
          </div>
          <h3 className="text-yellow-400 font-bold mb-2">Exclusive Codes</h3>
          <p className="text-gray-400 text-sm">Subscriber-only discount codes</p>
        </div>
      </div>

      {/* Features Grid - 3 columns */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-slate-800/30 border border-slate-700 rounded-xl p-6 text-center">
          <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="h-6 w-6 text-green-400" />
          </div>
          <h3 className="text-green-400 font-bold mb-2">Verified Deals</h3>
          <p className="text-gray-400 text-sm">Every deal checked and verified for accuracy</p>
        </div>

        <div className="bg-slate-800/30 border border-slate-700 rounded-xl p-6 text-center">
          <div className="w-12 h-12 bg-cyan-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <RefreshCw className="h-6 w-6 text-cyan-400" />
          </div>
          <h3 className="text-cyan-400 font-bold mb-2">Updated Daily</h3>
          <p className="text-gray-400 text-sm">Fresh deals added every single day</p>
        </div>

        <div className="bg-slate-800/30 border border-slate-700 rounded-xl p-6 text-center">
          <div className="w-12 h-12 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Globe className="h-6 w-6 text-yellow-400" />
          </div>
          <h3 className="text-yellow-400 font-bold mb-2">Worldwide Shipping</h3>
          <p className="text-gray-400 text-sm">Deals available in your country</p>
        </div>
      </div>
    </div>
  )
}
