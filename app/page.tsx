export const dynamic = 'force-dynamic'

import { getProducts } from '@/lib/supabase'
import Hero from '@/components/Hero'
import TrendingSection from '@/components/TrendingSection'
import ProductGrid from '@/components/ProductGrid'
import CategoryGrid from '@/components/CategoryGrid'
import EmailSignup from '@/components/EmailSignup'
import WeatherWidget from '@/components/WeatherWidget'
import AdSpace from '@/components/AdSpace'

export default async function Home() {
  const products = await getProducts()

  return (
    <main className="min-h-screen" style={{ background: '#071828' }}>

      {/* Hero — full-width image */}
      <Hero />

      {/* Top leaderboard ad */}
      <div className="container mx-auto px-4 py-4">
        <AdSpace size="leaderboard" />
      </div>

      {/* Category Grid */}
      <CategoryGrid />

      {/* Trending Products */}
      <TrendingSection />

      {/* Products + sidebar */}
      <section className="py-16 starfield" style={{ background: '#0B1E30' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl sm:text-5xl font-bold mb-3" style={{ color: '#E8F4FD' }}>
              Today&apos;s Best <span className="text-shimmer">Deals</span>
            </h2>
            <p style={{ color: '#7EB8D8' }}>Hand-picked deals updated daily</p>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            <div className="flex-1">
              <ProductGrid products={products || []} />
            </div>
            <div className="lg:w-72 flex flex-col gap-6">
              <AdSpace size="rectangle" label="Sidebar Ad" />
              <AdSpace size="rectangle" label="Sidebar Ad 2" />
            </div>
          </div>

          <div className="mt-12">
            <AdSpace size="wide" />
          </div>
        </div>
      </section>

      {/* Weather Widget */}
      <section className="py-14" style={{ background: '#071828' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-2" style={{ color: '#E8F4FD' }}>
              🌤️ Delivery <span style={{ color: '#00D4C8' }}>Weather Forecast</span>
            </h2>
            <p style={{ color: '#7EB8D8' }}>Know the weather at your location before your order arrives</p>
          </div>
          <WeatherWidget />
        </div>
      </section>

      {/* Email Signup */}
      <section id="email-signup" className="py-20 relative overflow-hidden" style={{ background: '#0B1E30' }}>
        {/* Decorative glows */}
        <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(255,179,0,0.08) 0%, transparent 70%)', transform: 'translate(-50%, -50%)' }} />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(0,212,200,0.06) 0%, transparent 70%)', transform: 'translate(50%, 50%)' }} />

        <div className="relative container mx-auto px-4 text-center mb-10">
          <div className="inline-block px-5 py-2 rounded-full text-sm font-bold mb-5"
            style={{ background: 'rgba(255,179,0,0.1)', border: '1px solid rgba(255,179,0,0.3)', color: '#FFB300' }}>
            💰 Exclusive Subscriber Benefits
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: '#E8F4FD' }}>
            Get the Best Deals <span className="text-shimmer">First!</span>
          </h2>
          <p className="text-lg max-w-2xl mx-auto mb-2" style={{ color: '#7EB8D8' }}>
            Join thousands of smart shoppers who never miss a deal
          </p>
        </div>

        <EmailSignup />

        {/* Benefits */}
        <div className="container mx-auto px-4 mt-14">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              { emoji: '🎯', title: 'Early Access', text: 'Get deals before they go public', color: '#FFB300' },
              { emoji: '📧', title: 'Weekly Roundup', text: 'Best deals curated just for you', color: '#00D4C8' },
              { emoji: '🎁', title: 'Exclusive Codes', text: 'Subscriber-only discount codes', color: '#00C853' },
            ].map(({ emoji, title, text, color }) => (
              <div key={title} className="rounded-xl p-6 text-center glow-border"
                style={{ background: 'rgba(13,40,64,0.5)' }}
              >
                <div className="text-4xl mb-3">{emoji}</div>
                <h3 className="font-bold mb-2" style={{ color }}>{title}</h3>
                <p className="text-sm" style={{ color: '#7EB8D8' }}>{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust strip */}
      <section className="py-14" style={{ background: '#071828', borderTop: '1px solid rgba(0,212,200,0.08)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: '✓', title: 'Verified Deals', text: 'Every deal checked and verified for accuracy', color: '#00C853' },
              { icon: '🔄', title: 'Updated Daily', text: 'Fresh deals added every single day', color: '#00D4C8' },
              { icon: '🌍', title: 'Worldwide Shipping', text: 'Deals available in your country', color: '#FFB300' },
            ].map(({ icon, title, text, color }) => (
              <div key={title} className="text-center p-8 rounded-2xl glow-border" style={{ background: 'rgba(13,40,64,0.4)' }}>
                <div className="text-5xl mb-4" style={{ filter: `drop-shadow(0 0 15px ${color})` }}>{icon}</div>
                <h3 className="text-xl font-bold mb-2" style={{ color }}>{title}</h3>
                <p style={{ color: '#7EB8D8' }}>{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom ad */}
      <div className="container mx-auto px-4 pb-10" style={{ background: '#071828' }}>
        <AdSpace size="leaderboard" label="Bottom Leaderboard" />
      </div>

    </main>
  )
}
