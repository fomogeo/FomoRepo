'use client'

import { useState, useEffect } from 'react'

export default function LiveClock() {
  const [time, setTime] = useState<string>('')
  const [date, setDate] = useState<string>('')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    
    const updateTime = () => {
      const now = new Date()
      
      // Format time: HH:MM:SS
      const hours = now.getHours().toString().padStart(2, '0')
      const minutes = now.getMinutes().toString().padStart(2, '0')
      const seconds = now.getSeconds().toString().padStart(2, '0')
      setTime(`${hours}:${minutes}:${seconds}`)
      
      // Format date: Day, DD Mon
      const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
      const dayName = days[now.getDay()]
      const day = now.getDate()
      const month = months[now.getMonth()]
      setDate(`${dayName}, ${day} ${month}`)
    }

    updateTime()
    const interval = setInterval(updateTime, 1000)

    return () => clearInterval(interval)
  }, [])

  // Show placeholder while loading
  if (!mounted) {
    return (
      <div 
        className="flex items-center gap-2 font-mono text-sm"
        style={{ 
          color: '#7EB8D8',
          minWidth: '180px'
        }}
      >
        <span>--:--:--</span>
        <span>|</span>
        <span>---, -- ---</span>
      </div>
    )
  }

  return (
    <div 
      className="flex items-center gap-2 font-mono text-sm font-semibold"
      style={{ 
        color: '#00D4C8',
        minWidth: '180px'
      }}
    >
      <span className="font-bold" style={{ color: '#00D4C8' }}>
        {time}
      </span>
      <span style={{ color: '#7EB8D8' }}>|</span>
      <span style={{ color: '#7EB8D8' }}>
        {date}
      </span>
    </div>
  )
}