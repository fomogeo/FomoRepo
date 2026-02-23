'use client'

import { useState, useEffect } from 'react'
import { Sun, Cloud, CloudRain, Wind } from 'lucide-react'

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

  const getWeatherIcon = (temp: number, precip: number) => {
    if (precip > 60) return <CloudRain className="h-10 w-10 text-blue-400" />
    if (precip > 30) return <Cloud className="h-10 w-10 text-gray-400" />
    if (temp > 25) return <Sun className="h-10 w-10 text-yellow-400" />
    return <Wind className="h-10 w-10 text-cyan-400" />
  }

  return (
    <div className="container mx-auto px-4">
      {/* BIGGER TITLE + COLORED SUBTITLE */}
      <div className="text-center mb-8">
        <h3 className="text-4xl sm:text-5xl font-bold mb-4">
          <span className="text-3xl mr-2">☀️</span>
          <span className="text-white">Delivery </span>
          <span className="text-cyan-400">Weather Forecast</span>
        </h3>
        <p className="text-cyan-300 text-lg font-semibold">
          Know the weather at your location before your order arrives
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4">
        {weather.daily.time.map((date: string, i: number) => (
          <div key={i} className="bg-gradient-to-br from-white/95 to-sky-50/95 backdrop-blur rounded-xl p-4 text-center shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1 border border-sky-200">
            <p className="text-xs font-bold text-gray-700 mb-2 uppercase tracking-wide">
              {new Date(date).toLocaleDateString('en', {weekday: 'short'})}
            </p>
            <div className="flex justify-center mb-2">
              {getWeatherIcon(weather.daily.temperature_2m_max[i], weather.daily.precipitation_probability_max[i])}
            </div>
            <p className="font-black text-2xl mb-1 bg-gradient-to-br from-orange-500 to-red-500 bg-clip-text text-transparent">
              {Math.round(weather.daily.temperature_2m_max[i])}°
            </p>
            <p className="text-xs text-gray-600 font-semibold">
              {Math.round(weather.daily.temperature_2m_min[i])}°
            </p>
            {weather.daily.precipitation_probability_max[i] > 30 && (
              <p className="text-xs text-blue-600 mt-1 font-semibold">
                💧 {weather.daily.precipitation_probability_max[i]}%
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
