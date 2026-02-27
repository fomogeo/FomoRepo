'use client'

import { useState, useEffect } from 'react'
import { Clock } from 'lucide-react'

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
    return (
      <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm" style={{ background: 'rgba(0,212,200,0.1)', color: '#00D4C8' }}>
        <Clock className="h-4 w-4" />
        <span className="font-mono">Loading...</span>
      </div>
    )
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
    <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm" style={{ background: 'rgba(0,212,200,0.1)', color: '#00D4C8' }}>
      <Clock className="h-4 w-4 flex-shrink-0" />
      
      {/* Mobile: Date only */}
      <span className="font-mono md:hidden">
        {dateString}
      </span>

      {/* Desktop: Time and Date */}
      <span className="font-mono hidden md:inline">
        {timeString} | {dateString}
      </span>
    </div>
  )
}
