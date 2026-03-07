'use client'

import { useState } from 'react'
import { Mail, MessageSquare, Clock, Globe } from 'lucide-react'

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Build mailto link with form data pre-filled
    const mailtoLink = `mailto:support@fomogeo.com?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`)}`
    window.location.href = mailtoLink
  }

  return (
    <div className="min-h-screen" style={{ background: '#071828' }}>

      {/* Hero */}
      <section className="py-20 text-center" style={{ background: 'linear-gradient(135deg, #0A1929 0%, #071828 50%, #0B1E30 100%)' }}>
        <div className="max-w-4xl mx-auto px-4">
          <div className="inline-flex items-center gap-2 mb-6 px-5 py-2 rounded-full" style={{ background: 'rgba(0,212,200,0.1)', border: '1px solid rgba(0,212,200,0.3)' }}>
            <Mail className="h-5 w-5" style={{ color: '#00D4C8' }} />
            <span className="font-semibold" style={{ color: '#00D4C8' }}>Get in Touch</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6" style={{ color: '#E8F4FD' }}>
            Contact <span style={{ color: '#FFB300' }}>Us</span>
          </h1>
          <p className="text-xl max-w-2xl mx-auto" style={{ color: '#B8D4E8' }}>
            Have a question, suggestion, or feedback? We'd love to hear from you.
          </p>
        </div>
      </section>

      <section className="py-16" style={{ background: '#071828' }}>
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">

            {/* Contact Info - Left Side */}
            <div className="lg:col-span-2 space-y-6">
              <div className="rounded-xl p-6" style={{ background: '#0D2840', border: '1px solid rgba(0,212,200,0.2)' }}>
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg" style={{ background: 'rgba(0,212,200,0.1)' }}>
                    <Mail className="h-6 w-6" style={{ color: '#00D4C8' }} />
                  </div>
                  <div>
                    <h3 className="font-bold mb-1" style={{ color: '#E8F4FD' }}>Email Us</h3>
                    <a href="mailto:support@fomogeo.com" className="text-sm hover:underline" style={{ color: '#00D4C8' }}>support@fomogeo.com</a>
                    <p className="text-xs mt-1" style={{ color: '#7EB8D8' }}>General inquiries and support</p>
                  </div>
                </div>
              </div>

              <div className="rounded-xl p-6" style={{ background: '#0D2840', border: '1px solid rgba(255,179,0,0.2)' }}>
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg" style={{ background: 'rgba(255,179,0,0.1)' }}>
                    <Clock className="h-6 w-6" style={{ color: '#FFB300' }} />
                  </div>
                  <div>
                    <h3 className="font-bold mb-1" style={{ color: '#E8F4FD' }}>Response Time</h3>
                    <p className="text-sm" style={{ color: '#FFB300' }}>Within 24–48 hours</p>
                    <p className="text-xs mt-1" style={{ color: '#7EB8D8' }}>We respond to every message</p>
                  </div>
                </div>
              </div>

              <div className="rounded-xl p-6" style={{ background: '#0D2840', border: '1px solid rgba(0,200,83,0.2)' }}>
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg" style={{ background: 'rgba(0,200,83,0.1)' }}>
                    <MessageSquare className="h-6 w-6" style={{ color: '#00C853' }} />
                  </div>
                  <div>
                    <h3 className="font-bold mb-1" style={{ color: '#E8F4FD' }}>What We Can Help With</h3>
                    <ul className="text-sm space-y-1 mt-2" style={{ color: '#B8D4E8' }}>
                      <li>• Product questions or suggestions</li>
                      <li>• Deal submissions and tips</li>
                      <li>• Technical issues with the site</li>
                      <li>• Partnership and collaboration</li>
                      <li>• Press and media inquiries</li>
                      <li>• Privacy and data requests</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="rounded-xl p-6" style={{ background: '#0D2840', border: '1px solid rgba(255,107,0,0.2)' }}>
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg" style={{ background: 'rgba(255,107,0,0.1)' }}>
                    <Globe className="h-6 w-6" style={{ color: '#FF6B00' }} />
                  </div>
                  <div>
                    <h3 className="font-bold mb-1" style={{ color: '#E8F4FD' }}>Serving Worldwide</h3>
                    <p className="text-sm" style={{ color: '#B8D4E8' }}>We serve deal-hunters across the US, UK, Germany, France, Spain, Italy, and beyond.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form - Right Side */}
            <div className="lg:col-span-3">
              <div className="rounded-xl p-8" style={{ background: '#0D2840', border: '1px solid rgba(0,212,200,0.2)' }}>
                <h2 className="text-2xl font-bold mb-6" style={{ color: '#E8F4FD' }}>Send Us a Message</h2>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-semibold mb-2" style={{ color: '#B8D4E8' }}>Your Name</label>
                        <input type="text" required value={formData.name} onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))} placeholder="John Smith" className="w-full px-4 py-3 rounded-lg text-sm focus:outline-none" style={{ background: '#071828', border: '1px solid rgba(0,212,200,0.2)', color: '#E8F4FD' }} />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold mb-2" style={{ color: '#B8D4E8' }}>Your Email</label>
                        <input type="email" required value={formData.email} onChange={e => setFormData(prev => ({ ...prev, email: e.target.value }))} placeholder="john@example.com" className="w-full px-4 py-3 rounded-lg text-sm focus:outline-none" style={{ background: '#071828', border: '1px solid rgba(0,212,200,0.2)', color: '#E8F4FD' }} />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2" style={{ color: '#B8D4E8' }}>Subject</label>
                      <input type="text" required value={formData.subject} onChange={e => setFormData(prev => ({ ...prev, subject: e.target.value }))} placeholder="What's this about?" className="w-full px-4 py-3 rounded-lg text-sm focus:outline-none" style={{ background: '#071828', border: '1px solid rgba(0,212,200,0.2)', color: '#E8F4FD' }} />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2" style={{ color: '#B8D4E8' }}>Message</label>
                      <textarea required rows={6} value={formData.message} onChange={e => setFormData(prev => ({ ...prev, message: e.target.value }))} placeholder="Tell us what's on your mind..." className="w-full px-4 py-3 rounded-lg text-sm focus:outline-none resize-none" style={{ background: '#071828', border: '1px solid rgba(0,212,200,0.2)', color: '#E8F4FD' }} />
                    </div>
                    <button type="submit" className="w-full py-4 rounded-lg font-bold text-lg transition-all hover:scale-105" style={{ background: 'linear-gradient(135deg, #FFB300, #FF8F00)', color: '#fff', boxShadow: '0 4px 15px rgba(255,179,0,0.3)' }}>
                      Open in Email Client
                    </button>
                    <p className="text-xs text-center" style={{ color: '#7EB8D8' }}>
                      This will open your email app with your message pre-filled. You can also email us directly at <a href="mailto:support@fomogeo.com" className="underline" style={{ color: '#00D4C8' }}>support@fomogeo.com</a>
                    </p>
                  </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
