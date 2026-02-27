'use client'

import { useState, useEffect } from 'react'

export default function LiveClock() {
  const [time, setTime] = useState<Date | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    setTime(new Date())
    
    const interval = setInterval(() => {
      setTime(new Date())
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  if (!mounted || !time) {
    return null // Return null instead of showing loading on mobile
  }

  const timeString = time.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  })

  const dateString = time.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  })

  return (
    <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm" style={{ background: 'rgba(0,212,200,0.1)' }}>
      <span className="font-mono font-semibold" style={{ color: '#00D4C8' }}>
        {timeString}
      </span>
      <span style={{ color: '#7EB8D8' }}>|</span>
      <span className="font-mono" style={{ color: '#B8D4E8' }}>
        {dateString}
      </span>
    </div>
  )
}
