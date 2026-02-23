'use client'

import { useState, useEffect } from 'react'
import { X, Mail } from 'lucide-react'

export default function EmailPopup() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setShow(true), 30000)
    return () => clearTimeout(timer)
  }, [])

  if (!show) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShow(false)}>
      <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-large relative" onClick={(e) => e.stopPropagation()}>
        <button onClick={() => setShow(false)} className="absolute top-4 right-4 text-fg-muted hover:text-fg-heading">
          <X className="h-6 w-6" />
        </button>
        
        <Mail className="h-16 w-16 mx-auto mb-4 text-fg-orange" />
        <h3 className="text-2xl font-bold text-center mb-2 text-fg-heading">Don't Miss Out!</h3>
        <p className="text-center text-fg-body mb-6">Join thousands getting the best deals daily</p>
        
        <a href="/#email-signup" className="btn-orange w-full justify-center" onClick={() => setShow(false)}>
          Subscribe Now
        </a>
      </div>
    </div>
  )
}
