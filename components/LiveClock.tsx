'use client'

import { useEffect, useState } from 'react'

export default function LiveClock() {
  const [time, setTime] = useState('')
  const [date, setDate] = useState('')

  useEffect(() => {
    function tick() {
      const now = new Date()
      setTime(now.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit' }))
      setDate(now.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' }))
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  if (!time) return null

  return (
    <div className="hidden md:flex flex-col items-center leading-tight text-xs font-medium">
      <span className="font-mono font-bold text-sm" style={{ color: '#00D4C8', textShadow: '0 0 10px rgba(0,212,200,0.5)' }}>{time}</span>
      <span style={{ color: '#7EB8D8' }}>{date}</span>
    </div>
  )
}
