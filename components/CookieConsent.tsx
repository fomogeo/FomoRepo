'use client'

import { useState, useEffect } from 'react'

export default function CookieConsent() {
  const [visible, setVisible] = useState(false)
  const [showPreferences, setShowPreferences] = useState(false)
  const [preferences, setPreferences] = useState({
    essential: true, // Always on
    analytics: false,
    advertising: false,
  })

  useEffect(() => {
    // Check if consent has already been given
    const consent = getCookieConsent()
    if (!consent) {
      // Small delay so it doesn't flash on page load
      const timer = setTimeout(() => setVisible(true), 1000)
      return () => clearTimeout(timer)
    }
  }, [])

  function getCookieConsent(): string | null {
    if (typeof document === 'undefined') return null
    const match = document.cookie.match(/fomogeo_consent=([^;]+)/)
    return match ? match[1] : null
  }

  function setConsentCookie(value: string) {
    const expires = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toUTCString()
    document.cookie = `fomogeo_consent=${value}; expires=${expires}; path=/; SameSite=Lax`
  }

  function acceptAll() {
    setConsentCookie('all')
    setVisible(false)
    // Reload to allow AdSense/analytics scripts to load
    window.location.reload()
  }

  function rejectNonEssential() {
    setConsentCookie('essential')
    setVisible(false)
  }

  function savePreferences() {
    const value = [
      'essential',
      preferences.analytics ? 'analytics' : '',
      preferences.advertising ? 'advertising' : '',
    ].filter(Boolean).join(',')
    setConsentCookie(value)
    setVisible(false)
    if (preferences.analytics || preferences.advertising) {
      window.location.reload()
    }
  }

  if (!visible) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[9999] p-4" style={{ background: 'rgba(7,24,40,0.98)', borderTop: '2px solid rgba(0,212,200,0.3)', boxShadow: '0 -10px 40px rgba(0,0,0,0.5)' }}>
      <div className="max-w-5xl mx-auto">

        {!showPreferences ? (
          /* Main Banner */
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
            <div className="flex-1">
              <h3 className="text-base font-bold mb-1" style={{ color: '#E8F4FD' }}>
                🍪 We Value Your Privacy
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: '#B8D4E8' }}>
                We use cookies to enhance your experience, serve personalised ads via Google AdSense, and analyse traffic. 
                You can accept all cookies, reject non-essential ones, or customise your preferences. 
                See our{' '}
                <a href="/legal/privacy" className="underline" style={{ color: '#00D4C8' }}>Privacy Policy</a> for details.
              </p>
            </div>
            <div className="flex flex-wrap gap-2 shrink-0">
              <button onClick={rejectNonEssential} className="px-4 py-2 rounded-lg text-sm font-semibold transition-all hover:scale-105" style={{ background: 'rgba(0,212,200,0.1)', color: '#7EB8D8', border: '1px solid rgba(0,212,200,0.2)' }}>
                Reject Non-Essential
              </button>
              <button onClick={() => setShowPreferences(true)} className="px-4 py-2 rounded-lg text-sm font-semibold transition-all hover:scale-105" style={{ background: 'rgba(255,179,0,0.1)', color: '#FFB300', border: '1px solid rgba(255,179,0,0.2)' }}>
                Manage Preferences
              </button>
              <button onClick={acceptAll} className="px-5 py-2 rounded-lg text-sm font-bold transition-all hover:scale-105" style={{ background: 'linear-gradient(135deg, #00D4C8, #00A896)', color: '#071828' }}>
                Accept All
              </button>
            </div>
          </div>
        ) : (
          /* Preferences Panel */
          <div>
            <h3 className="text-base font-bold mb-4" style={{ color: '#E8F4FD' }}>Cookie Preferences</h3>
            <div className="space-y-3 mb-5">
              {/* Essential */}
              <div className="flex items-center justify-between p-3 rounded-lg" style={{ background: 'rgba(0,200,83,0.05)', border: '1px solid rgba(0,200,83,0.2)' }}>
                <div>
                  <span className="text-sm font-semibold" style={{ color: '#00C853' }}>Essential Cookies</span>
                  <p className="text-xs mt-1" style={{ color: '#7EB8D8' }}>Required for the site to function. Cannot be disabled.</p>
                </div>
                <div className="px-3 py-1 rounded-full text-xs font-bold" style={{ background: 'rgba(0,200,83,0.2)', color: '#00C853' }}>Always On</div>
              </div>
              {/* Analytics */}
              <label className="flex items-center justify-between p-3 rounded-lg cursor-pointer" style={{ background: 'rgba(0,212,200,0.05)', border: '1px solid rgba(0,212,200,0.15)' }}>
                <div>
                  <span className="text-sm font-semibold" style={{ color: '#00D4C8' }}>Analytics Cookies</span>
                  <p className="text-xs mt-1" style={{ color: '#7EB8D8' }}>Help us understand how visitors use the site (Google Analytics).</p>
                </div>
                <input type="checkbox" checked={preferences.analytics} onChange={e => setPreferences(p => ({ ...p, analytics: e.target.checked }))} className="w-5 h-5 rounded accent-cyan-500" />
              </label>
              {/* Advertising */}
              <label className="flex items-center justify-between p-3 rounded-lg cursor-pointer" style={{ background: 'rgba(255,179,0,0.05)', border: '1px solid rgba(255,179,0,0.15)' }}>
                <div>
                  <span className="text-sm font-semibold" style={{ color: '#FFB300' }}>Advertising Cookies</span>
                  <p className="text-xs mt-1" style={{ color: '#7EB8D8' }}>Used by Google AdSense to show relevant ads based on your interests.</p>
                </div>
                <input type="checkbox" checked={preferences.advertising} onChange={e => setPreferences(p => ({ ...p, advertising: e.target.checked }))} className="w-5 h-5 rounded accent-yellow-500" />
              </label>
            </div>
            <div className="flex gap-2">
              <button onClick={() => setShowPreferences(false)} className="px-4 py-2 rounded-lg text-sm font-semibold" style={{ color: '#7EB8D8' }}>
                ← Back
              </button>
              <button onClick={savePreferences} className="px-5 py-2 rounded-lg text-sm font-bold transition-all hover:scale-105" style={{ background: 'linear-gradient(135deg, #00D4C8, #00A896)', color: '#071828' }}>
                Save Preferences
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
