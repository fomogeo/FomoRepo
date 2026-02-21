'use client'

import { useState, useEffect } from 'react'
import { Cloud, Sun, CloudRain, Wind } from 'lucide-react'

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
    <section className="py-12 section-sky border-y border-blue-100">
      <div className="container mx-auto px-4">
        <h3 className="text-3xl font-bold text-center mb-8 text-fg-heading">
          7-Day Forecast: <span className="text-fg-blue">{location}</span>
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4">
          {weather.daily.time.map((date: string, i: number) => (
            <div key={i} className="card-light text-center bg-white/80 backdrop-blur">
              <p className="text-xs text-fg-muted mb-2 font-semibold">{new Date(date).toLocaleDateString('en', {weekday: 'short'})}</p>
              <Sun className="h-10 w-10 mx-auto text-fg-orange mb-2" />
              <p className="font-bold text-lg text-fg-heading">{Math.round(weather.daily.temperature_2m_max[i])}°</p>
              <p className="text-xs text-fg-muted">{Math.round(weather.daily.temperature_2m_min[i])}°</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
