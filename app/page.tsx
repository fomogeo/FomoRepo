export const dynamic = 'force-dynamic'

import Script from 'next/script'

// This is a COMPLETE REDESIGN showcasing the legendary semi-dark mode design system
// Every section flows together with gradients, textures, and professional polish

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
          HERO SECTION - Gradient Overlay on Banner
          ═══════════════════════════════════════════ */}
      <section className="relative min-h-[600px] flex items-center justify-center overflow-hidden texture-noise">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/hero-light.png" 
            alt="FomoGeo" 
            className="w-full h-full object-cover opacity-30"
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/80 via-teal-900/70 to-emerald-900/80"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 container-custom text-center px-4">
          <div className="badge badge-teal mb-6 text-lg animate-pulse-glow">
            🔥 Trending Deals Updated Daily
          </div>
          
          <h1 className="text-display font-bold mb-6 animate-fade-in">
            Discover the <span className="text-shimmer">Best Deals</span>
            <br />
            <span className="heading-gradient-teal">Around the World</span>
          </h1>
          
          <p className="text-xl text-secondary max-w-3xl mx-auto mb-8 animate-fade-in">
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
          TRENDING CATEGORIES - Teal Gradient BG
          ═══════════════════════════════════════════ */}
      <section id="categories" className="section bg-gradient-to-br from-teal-950 via-cyan-950 to-blue-950 texture-noise">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-heading mb-4">
              <span className="text-white">Trending </span>
              <span className="heading-gradient-teal">Categories</span>
            </h2>
            <p className="text-xl text-cyan-200 font-semibold">
              Explore our most popular product categories
            </p>
          </div>

          {/* Category Grid - Glass Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 mb-10">
            {[
              { icon: '💻', name: 'Electronics', color: 'from-cyan-500 to-blue-500' },
              { icon: '👗', name: 'Fashion', color: 'from-pink-500 to-rose-500' },
              { icon: '🏠', name: 'Home & Kitchen', color: 'from-orange-500 to-amber-500' },
              { icon: '💄', name: 'Beauty', color: 'from-purple-500 to-pink-500' },
              { icon: '⚽', name: 'Sports', color: 'from-green-500 to-emerald-500' },
              { icon: '📚', name: 'Books', color: 'from-indigo-500 to-violet-500' },
              { icon: '🎮', name: 'Gaming', color: 'from-violet-500 to-purple-500' },
              { icon: '🎸', name: 'Music', color: 'from-yellow-500 to-orange-500' },
              { icon: '🏋️', name: 'Fitness', color: 'from-red-500 to-orange-500' },
              { icon: '🐾', name: 'Pet Supplies', color: 'from-emerald-500 to-teal-500' },
              { icon: '🔧', name: 'Tools', color: 'from-gray-500 to-slate-500' },
              { icon: '🚗', name: 'Automotive', color: 'from-blue-500 to-cyan-500' },
            ].map((category, i) => (
              <a
                key={i}
                href={`/category/${category.name.toLowerCase().replace(/\s+/g, '-')}`}
                className="card-glass hover-lift text-center group p-6"
              >
                <div className={`text-5xl mb-3 inline-block transition-transform group-hover:scale-110 bg-gradient-to-br ${category.color} p-4 rounded-2xl shadow-lg`}>
                  {category.icon}
                </div>
                <h3 className="font-bold text-white group-hover:text-cyan-300 transition">
                  {category.name}
                </h3>
              </a>
            ))}
          </div>

          <div className="text-center">
            <a href="/categories" className="btn btn-outline text-lg px-8 py-4">
              View All 30 Categories →
            </a>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          TRENDING NOW - Orange Gradient BG
          ═══════════════════════════════════════════ */}
      <section id="trending" className="section bg-gradient-to-br from-orange-950 via-amber-950 to-yellow-950 texture-noise">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-heading mb-4">
              <span className="text-5xl mr-3">🔥</span>
              <span className="text-white">Trending </span>
              <span className="heading-gradient-orange">Now</span>
            </h2>
            <p className="text-xl text-orange-200 font-semibold">
              Hot deals everyone is buying right now
            </p>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="card-elevated hover-lift group">
                <div className="relative mb-4 overflow-hidden rounded-lg">
                  <img
                    src={`https://via.placeholder.com/400x300?text=Product+${item}`}
                    alt={`Product ${item}`}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="badge badge-orange absolute top-3 right-3">
                    -{20 + item * 5}%
                  </div>
                </div>
                <h3 className="font-bold text-lg mb-2 group-hover:text-orange-400 transition">
                  Amazing Product {item}
                </h3>
                <p className="text-secondary text-sm mb-4">
                  Premium quality with unbeatable price
                </p>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-2xl font-bold heading-gradient-orange">
                      ${99 - item * 10}
                    </span>
                    <span className="text-sm text-muted line-through ml-2">
                      ${149 - item * 10}
                    </span>
                  </div>
                  <a href="#" className="btn btn-secondary btn-sm">
                    View Deal
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          LATEST DEALS - Dark with Sidebar Ads
          ═══════════════════════════════════════════ */}
      <section className="section-dark texture-dots">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-heading mb-4">
              <span className="heading-gradient-teal">Latest</span>
              <span className="text-white"> Deals</span>
            </h2>
            <p className="text-xl text-secondary font-semibold">
              Fresh deals added daily from trusted sellers
            </p>
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
                  <h4 className="font-semibold mb-2">Product Deal {item}</h4>
                  <p className="text-sm text-secondary mb-3">Great value product</p>
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
                  <p className="text-sm text-muted mb-2">Advertisement</p>
                  <p className="text-xs text-muted">300x250</p>
                </div>
              </div>
              <div className="card-glass p-4 text-center min-h-[300px] flex items-center justify-center">
                <div>
                  <p className="text-sm text-muted mb-2">Advertisement</p>
                  <p className="text-xs text-muted">300x250</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          WEATHER - Emerald Gradient
          ═══════════════════════════════════════════ */}
      <section className="section bg-gradient-to-br from-emerald-950 via-teal-950 to-cyan-950 texture-noise">
        <div className="container-custom">
          <div className="text-center mb-10">
            <h3 className="text-subheading mb-4">
              <span className="text-3xl mr-2">☀️</span>
              <span className="text-white">Delivery </span>
              <span className="heading-gradient-emerald">Weather Forecast</span>
            </h3>
            <p className="text-lg text-emerald-200 font-semibold">
              Know the weather before your order arrives
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => (
              <div key={day} className="card-glass text-center p-4 hover-lift">
                <p className="text-xs font-bold text-emerald-300 mb-2">{day}</p>
                <div className="text-4xl mb-2">☀️</div>
                <p className="text-2xl font-bold heading-gradient-orange mb-1">
                  {20 + i}°
                </p>
                <p className="text-xs text-secondary">{15 + i}°</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          EMAIL SIGNUP - Glass Morphism
          ═══════════════════════════════════════════ */}
      <section className="section bg-gradient-to-br from-violet-950 via-purple-950 to-fuchsia-950 texture-noise">
        <div className="container-custom max-w-4xl">
          <div className="card-glass p-12 text-center">
            <div className="badge badge-orange mb-6 text-base">
              💎 Exclusive Subscriber Benefits
            </div>

            <h2 className="text-heading mb-4">
              <span className="text-white">Get the Best Deals </span>
              <span className="heading-gradient-orange">First!</span>
            </h2>

            <p className="text-xl text-purple-200 font-semibold mb-8">
              Join thousands of smart shoppers who never miss a deal
            </p>

            {/* Email Form */}
            <form className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto mb-8">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:border-orange-400 transition"
              />
              <button type="submit" className="btn btn-secondary px-8 py-4 whitespace-nowrap">
                Subscribe Free
              </button>
            </form>

            <p className="text-sm text-purple-300 mb-8">
              🔒 We respect your privacy. Unsubscribe anytime. No spam, ever.
            </p>

            {/* Benefits Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
              {[
                { icon: '🎯', title: 'Early Access', desc: 'Get deals first' },
                { icon: '📧', title: 'Weekly Roundup', desc: 'Best deals curated' },
                { icon: '🎁', title: 'Exclusive Codes', desc: 'Subscriber-only' },
              ].map((benefit, i) => (
                <div key={i} className="card p-6">
                  <div className="text-4xl mb-3">{benefit.icon}</div>
                  <h4 className="font-bold heading-gradient-orange mb-2">{benefit.title}</h4>
                  <p className="text-sm text-secondary">{benefit.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          STATS - Dark Background
          ═══════════════════════════════════════════ */}
      <section className="section-dark">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: '10k+', label: 'Products', gradient: 'heading-gradient-teal' },
              { value: '30', label: 'Categories', gradient: 'heading-gradient-orange' },
              { value: '50k+', label: 'Happy Customers', gradient: 'heading-gradient-emerald' },
              { value: '24/7', label: 'Deal Updates', gradient: 'text-shimmer' },
            ].map((stat, i) => (
              <div key={i}>
                <div className={`text-5xl font-bold ${stat.gradient}`}>
                  {stat.value}
                </div>
                <p className="text-secondary mt-2">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          RAINBOW DIVIDER
          ═══════════════════════════════════════════ */}
      <div className="divider-rainbow"></div>
    </>
  )
}
