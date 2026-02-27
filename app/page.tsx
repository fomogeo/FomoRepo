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

      {/* ========================================
          COMPLIANCE FIX #1: AFFILIATE DISCLOSURE
          Must appear BEFORE any affiliate links
          ======================================== */}
      <section className="py-6" style={{ background: '#0B1E30', borderBottom: '2px solid rgba(255,179,0,0.2)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-xl p-6 text-center" style={{ 
            background: 'rgba(255,179,0,0.05)', 
            border: '1px solid rgba(255,179,0,0.2)' 
          }}>
            <div className="flex items-center justify-center gap-2 mb-2">
              <span className="text-2xl">📢</span>
              <h3 className="text-lg font-bold" style={{ color: '#FFB300' }}>
                Affiliate Disclosure
              </h3>
            </div>
            <p className="text-sm max-w-4xl mx-auto leading-relaxed" style={{ color: '#B8D4E6' }}>
              <strong>FomoGeo is a participant in the Amazon Services LLC Associates Program and Amazon EU Associates Programme</strong>, 
              affiliate advertising programs designed to provide a means for sites to earn advertising fees by advertising and linking to 
              Amazon.com, Amazon.co.uk, and other Amazon stores worldwide. 
              <span className="font-semibold" style={{ color: '#FFB300' }}> As an Amazon Associate, we earn from qualifying purchases.</span> 
              This means if you click our links and make a purchase, we may earn a commission at no extra cost to you. 
              We only recommend products we believe provide genuine value.
            </p>
          </div>
        </div>
      </section>

      {/* ========================================
          COMPLIANCE FIX #2: SEO-DRIVEN INTRO CONTENT
          Original, value-added content about the site
          ======================================== */}
      <section className="py-12" style={{ background: '#071828' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: '#E8F4FD' }}>
            Discover the World's Best <span className="text-shimmer">Product Deals</span>
          </h1>
          <div className="space-y-4 text-left" style={{ color: '#B8D4E6' }}>
            <p className="text-lg leading-relaxed">
              Welcome to <strong>FomoGeo</strong> — your trusted source for hand-curated product deals from verified sellers worldwide. 
              Every deal you see here has been personally researched, verified for authenticity, and selected based on genuine value, 
              quality, and customer reviews.
            </p>
            <p className="leading-relaxed">
              We don't just list products — we provide <strong>expert insights, price history analysis, and honest recommendations</strong> to 
              help you make confident purchasing decisions. Our team monitors thousands of products daily across multiple categories including 
              electronics, home & kitchen, gaming, fashion, and more to bring you only the best deals that are actually worth your time.
            </p>
            <p className="leading-relaxed">
              Whether you're looking for the latest tech gadgets, home essentials, or seasonal must-haves, FomoGeo cuts through the noise 
              to deliver deals that matter. <strong>Updated daily</strong> with fresh verified deals from Amazon and trusted international sellers.
            </p>
          </div>
        </div>
      </section>

      {/* Top leaderboard ad */}
      <div className="container mx-auto px-4 py-4">
        <AdSpace size="leaderboard" />
      </div>

      {/* Category Grid */}
      <CategoryGrid />

      {/* Trending Products */}
      <TrendingSection />

      {/* ========================================
          COMPLIANCE FIX #3: ENHANCED DEALS SECTION
          Added context and value proposition
          ======================================== */}
      <section className="py-16 starfield" style={{ background: '#0B1E30' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-4xl sm:text-5xl font-bold mb-3" style={{ color: '#E8F4FD' }}>
              Today&apos;s Best <span className="text-shimmer">Verified Deals</span>
            </h2>
            <p className="text-lg mb-4" style={{ color: '#7EB8D8' }}>
              Hand-picked deals updated daily • Verified by our expert team
            </p>
            <p className="text-sm max-w-2xl mx-auto" style={{ color: '#B8D4E6' }}>
              Each deal below includes our expert analysis, why we recommend it, and who it's best for. 
              We track price history and verify availability before featuring any product. 
              <strong className="text-yellow-400"> Prices and availability are accurate as of the time listed and subject to change.</strong>
            </p>
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

          {/* Price disclaimer - Amazon requirement */}
          <div className="mt-8 p-4 rounded-lg text-center text-xs" style={{ 
            background: 'rgba(255,179,0,0.05)', 
            border: '1px solid rgba(255,179,0,0.2)',
            color: '#B8D4E6'
          }}>
            <strong style={{ color: '#FFB300' }}>Price Disclaimer:</strong> Product prices and availability are accurate as of the date/time 
            indicated and are subject to change. Any price and availability information displayed on Amazon at the time of purchase will 
            apply to the purchase of this product. We update prices regularly but cannot guarantee real-time accuracy for all listings.
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
