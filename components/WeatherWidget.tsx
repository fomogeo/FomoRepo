'use client'

import { useEffect, useState } from 'react'
import { Cloud, Sun, CloudRain, CloudSnow, CloudLightning, Droplets } from 'lucide-react'

interface DayForecast {
  date: string; dayName: string; maxTemp: number; minTemp: number
  description: string; weatherCode: number; precipitation: number
}
interface WeatherData { city: string; country: string; forecast: DayForecast[] }

function weatherIcon(code: number) {
  if (code === 0 || code === 1) return <Sun className="h-6 w-6" style={{ color: '#FFB300' }} />
  if (code <= 3) return <Cloud className="h-6 w-6" style={{ color: '#7EB8D8' }} />
  if (code <= 67) return <CloudRain className="h-6 w-6" style={{ color: '#00D4C8' }} />
  if (code <= 77) return <CloudSnow className="h-6 w-6" style={{ color: '#B2EBF2' }} />
  if (code <= 82) return <CloudRain className="h-6 w-6" style={{ color: '#0091EA' }} />
  return <CloudLightning className="h-6 w-6" style={{ color: '#FFB300' }} />
}

function weatherLabel(code: number): string {
  if (code === 0) return 'Clear sky'
  if (code <= 2) return 'Partly cloudy'
  if (code === 3) return 'Overcast'
  if (code <= 49) return 'Foggy'
  if (code <= 59) return 'Drizzle'
  if (code <= 67) return 'Rainy'
  if (code <= 77) return 'Snowy'
  if (code <= 82) return 'Showers'
  return 'Thunderstorm'
}

export default function WeatherWidget() {
  const [weather, setWeather] = useState<WeatherData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function load() {
      try {
        const geoRes = await fetch('https://ipapi.co/json/')
        const geo = await geoRes.json()
        if (!geo.latitude || !geo.longitude) throw new Error('Location unavailable')
        const { latitude, longitude, city, country_name } = geo
        const wRes = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=weathercode,temperature_2m_max,temperature_2m_min,precipitation_sum&timezone=auto&forecast_days=7`
        )
        const data = await wRes.json()
        const days: DayForecast[] = data.daily.time.map((dateStr: string, i: number) => {
          const d = new Date(dateStr)
          return {
            date: dateStr,
            dayName: i === 0 ? 'Today' : i === 1 ? 'Tmrw' : d.toLocaleDateString('en-GB', { weekday: 'short' }),
            maxTemp: Math.round(data.daily.temperature_2m_max[i]),
            minTemp: Math.round(data.daily.temperature_2m_min[i]),
            description: weatherLabel(data.daily.weathercode[i]),
            weatherCode: data.daily.weathercode[i],
            precipitation: Math.round(data.daily.precipitation_sum[i]),
          }
        })
        setWeather({ city, country: country_name, forecast: days })
      } catch {
        setError('Weather unavailable')
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  if (loading) {
    return (
      <div className="rounded-2xl p-6 animate-pulse" style={{ background: 'linear-gradient(135deg, #0D2840, #091E30)', border: '1px solid rgba(0,212,200,0.2)' }}>
        <div className="h-6 rounded w-48 mb-4" style={{ background: 'rgba(0,212,200,0.1)' }} />
        <div className="grid grid-cols-7 gap-2">
          {[...Array(7)].map((_, i) => <div key={i} className="h-24 rounded-xl" style={{ background: 'rgba(0,212,200,0.05)' }} />)}
        </div>
      </div>
    )
  }

  if (error || !weather) {
    return (
      <div className="rounded-2xl p-6 text-center" style={{ background: 'rgba(13,40,64,0.5)', border: '2px dashed rgba(0,212,200,0.2)', color: '#4A7A9B' }}>
        <Cloud className="h-10 w-10 mx-auto mb-2" />
        <p className="font-medium">Weather data unavailable</p>
      </div>
    )
  }

  return (
    <div className="rounded-2xl p-6" style={{ background: 'linear-gradient(135deg, #0D2840 0%, #091E30 100%)', border: '1px solid rgba(0,212,200,0.25)', boxShadow: '0 0 40px rgba(0,212,200,0.08)' }}>
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="font-bold text-lg" style={{ color: '#E8F4FD' }}>
            📍 {weather.city}, {weather.country}
          </h3>
          <p className="text-sm" style={{ color: '#7EB8D8' }}>7-Day Delivery Forecast</p>
        </div>
        <div className="text-right text-xs" style={{ color: '#4A7A9B' }}>
          <p>Open-Meteo</p>
          <p>Auto-detected</p>
        </div>
      </div>

      {/* 7-day grid */}
      <div className="grid grid-cols-7 gap-2">
        {weather.forecast.map(day => (
          <div key={day.date} className="rounded-xl p-2 text-center transition-all hover:scale-105"
            style={{ background: 'rgba(0,212,200,0.06)', border: '1px solid rgba(0,212,200,0.15)' }}
          >
            <p className="text-xs font-bold mb-2" style={{ color: '#7EB8D8' }}>{day.dayName}</p>
            <div className="flex justify-center mb-2">{weatherIcon(day.weatherCode)}</div>
            <p className="text-sm font-bold" style={{ color: '#E8F4FD' }}>{day.maxTemp}°</p>
            <p className="text-xs" style={{ color: '#4A7A9B' }}>{day.minTemp}°</p>
            {day.precipitation > 0 && (
              <div className="flex items-center justify-center gap-0.5 mt-1">
                <Droplets className="h-3 w-3" style={{ color: '#00D4C8' }} />
                <span className="text-xs" style={{ color: '#00D4C8' }}>{day.precipitation}mm</span>
              </div>
            )}
          </div>
        ))}
      </div>

      <p className="text-xs mt-4 text-center" style={{ color: '#4A7A9B' }}>
        🌍 Location auto-detected from your IP •{' '}
        <a href="/legal/privacy" style={{ color: '#00D4C8' }} className="hover:underline">Privacy Policy</a>
      </p>
    </div>
  )
}
