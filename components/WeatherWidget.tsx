'use client'

import { useState, useEffect } from 'react'
import { Sun } from 'lucide-react'
import Script from 'next/script'

export default function WeatherWidget() {
  const [weather, setWeather] = useState<any>(null)
  const [location, setLocation] = useState('')

  useEffect(() => {
    fetch('https://ipapi.co/json/')
      .then(r => r.json())
      .then(data => {
        setLocation(`${data.city}, ${data.country_name}`)
        return fetch(`https://api.open-meteo.com/v1/forecast?latitude=${data.latitude}&longitude=${data.longitude}&daily=temperature_2m_max,temperature_2m_min,precipitation_probability_max&timezone=auto&forecast_days=7`)
      })
      .then(r => r.json())
      .then(data => setWeather(data))
      .catch(() => {})
  }, [])

  if (!weather) return null

  return (
    <>
      <Script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4317381401188026"
        crossOrigin="anonymous"
        strategy="afterInteractive"
      />
      <section className="py-12 bg-gradient-to-br from-slate-800 to-slate-900 border-y border-cyan-500/30">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-center mb-8 text-white">
            7-Day Forecast: <span className="text-cyan-400">{location}</span>
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4">
            {weather.daily.time.map((date: string, i: number) => (
              <div key={i} className="bg-white/90 backdrop-blur rounded-xl p-4 text-center shadow-lg hover:shadow-xl transition-shadow">
                <p className="text-xs text-gray-600 mb-2 font-semibold">{new Date(date).toLocaleDateString('en', {weekday: 'short'})}</p>
                <Sun className="h-10 w-10 mx-auto text-orange-500 mb-2" />
                <p className="font-bold text-lg text-gray-900">{Math.round(weather.daily.temperature_2m_max[i])}°</p>
                <p className="text-xs text-gray-600">{Math.round(weather.daily.temperature_2m_min[i])}°</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
