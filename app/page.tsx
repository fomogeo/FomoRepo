export const dynamic = 'force-dynamic'

import Script from 'next/script'
import CategoryGrid from '@/components/CategoryGrid'
import TrendingSection from '@/components/TrendingSection'
import EmailSignup from '@/components/EmailSignup'
import WeatherWidget from '@/components/WeatherWidget'
import ColorfulDivider from '@/components/ColorfulDivider'

export default async function LegendaryHomepage() {
  return (
    <>
      <Script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4317381401188026"
        crossOrigin="anonymous"
        strategy="afterInteractive"
      />

      {/* ═══════════════════════════════════════════
          HERO SECTION - Light Overlay for Visibility
          ═══════════════════════════════════════════ */}
      <section className="relative min-h-[600px] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/hero-light.png" 
            alt="FomoGeo" 
            className="w-full h-full object-cover"
          />
          {/* LIGHTER Gradient Overlay - So banner is visible */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/40 via-teal-900/30 to-emerald-900/40"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 container-custom text-center px-4 py-20">
          <div className="badge badge-teal mb-6 text-lg animate-pulse-glow">
            🔥 Trending Deals Updated Daily
          </div>
          
          <h1 className="text-display font-bold mb-6 animate-fade-in drop-shadow-lg">
            Discover the <span className="text-shimmer">Best Deals</span>
            <br />
            <span className="heading-gradient-teal">Around the World</span>
          </h1>
          
          <p className="text-xl text-white max-w-3xl mx-auto mb-8 animate-fade-in drop-shadow-md">
            FomoGeo curates verified deals from trusted sellers worldwide. 
            Never miss out on the hottest products and exclusive discounts.
          </p>

          <div className="flex flex-wrap gap-4 justify-center animate-fade-in">
            <a href="#categories" className="btn btn-primary text-lg px-8 py-4">
              Browse Categories
            </a>
            <a href="#trending" className="btn btn-secondary text-lg px-8 py-4">
              🔥 See Trending Now
            </a>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          TRENDING CATEGORIES
          ═══════════════════════════════════════════ */}
      <section id="categories" className="section bg-gradient-to-br from-teal-950 via-cyan-950 to-blue-950 texture-noise py-20">
        <CategoryGrid />
      </section>

      {/* ═══════════════════════════════════════════
          TRENDING NOW
          ═══════════════════════════════════════════ */}
      <section id="trending" className="section bg-gradient-to-br from-orange-950 via-amber-950 to-yellow-950 texture-noise py-20">
        <TrendingSection />
      </section>

      {/* ═══════════════════════════════════════════
          LATEST DEALS
          ═══════════════════════════════════════════ */}
      <section className="section-dark texture-dots py-20">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-heading mb-4">
              <span className="heading-gradient-teal">Latest</span>
              <span className="text-white"> Deals</span>
            </h2>
            <p className="text-xl text-slate-400 font-semibold">
              Fresh deals added daily from trusted sellers
            </p>
          </div>

          {/* AdSense Leaderboard */}
          <div className="mb-10">
            <div className="card-glass p-4 text-center min-h-[90px] flex items-center justify-center">
              <p className="text-sm text-slate-500">Advertisement - 728×90</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Main Content - 3 columns */}
            <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <div key={item} className="card hover-lift">
                  <img
                    src={`https://via.placeholder.com/300x200?text=Deal+${item}`}
                    alt={`Deal ${item}`}
                    className="w-full h-40 object-cover rounded-lg mb-3"
                  />
                  <h4 className="font-semibold mb-2 text-white">Product Deal {item}</h4>
                  <p className="text-sm text-slate-400 mb-3">Great value product</p>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-lg heading-gradient-teal">
                      ${49 + item * 5}
                    </span>
                    <span className="badge badge-emerald">New</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Sidebar - Ads */}
            <div className="space-y-6">
              <div className="card-glass p-4 text-center min-h-[300px] flex items-center justify-center">
                <div>
                  <p className="text-sm text-slate-500 mb-2">Advertisement</p>
                  <p className="text-xs text-slate-600">300×250</p>
                </div>
              </div>
              <div className="card-glass p-4 text-center min-h-[300px] flex items-center justify-center">
                <div>
                  <p className="text-sm text-slate-500 mb-2">Advertisement</p>
                  <p className="text-xs text-slate-600">300×250</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          WEATHER WIDGET
          ═══════════════════════════════════════════ */}
      <section className="section bg-gradient-to-br from-emerald-950 via-teal-950 to-cyan-950 texture-noise py-20">
        <WeatherWidget />
      </section>

      {/* ═══════════════════════════════════════════
          EMAIL SIGNUP
          ═══════════════════════════════════════════ */}
      <EmailSignup />

      {/* ═══════════════════════════════════════════
          STATS SECTION
          ═══════════════════════════════════════════ */}
      <section className="section-dark py-20">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: '10k+', label: 'Products', gradient: 'heading-gradient-teal' },
              { value: '30', label: 'Categories', gradient: 'heading-gradient-orange' },
              { value: '50k+', label: 'Happy Customers', gradient: 'heading-gradient-emerald' },
              { value: '24/7', label: 'Deal Updates', gradient: 'text-shimmer' },
            ].map((stat, i) => (
              <div key={i}>
                <div className={`text-5xl font-bold ${stat.gradient} mb-2`}>
                  {stat.value}
                </div>
                <p className="text-slate-400">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          RAINBOW DIVIDER
          ═══════════════════════════════════════════ */}
      <ColorfulDivider />
    </>
  )
}
