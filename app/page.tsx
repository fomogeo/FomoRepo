export const dynamic = 'force-dynamic'

import Script from 'next/script'
import Hero from '@/components/Hero'
import CategoryGrid from '@/components/CategoryGrid'
import TrendingSection from '@/components/TrendingSection'
import ProductGrid from '@/components/ProductGrid'
import EmailSignup from '@/components/EmailSignup'
import WeatherWidget from '@/components/WeatherWidget'
import AdSpace from '@/components/AdSpace'
import { getProducts } from '@/lib/supabase'

export default async function Home() {
  const products = await getProducts({ limit: 20 })

  return (
    <>
      <Script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4317381401188026"
        crossOrigin="anonymous"
        strategy="afterInteractive"
      />
      <Hero />
      <CategoryGrid />
      
      {/* ISSUE 2: Trending Now - subtle dark gradient (works with orange AND cyan text) */}
      <section className="py-16 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border-y border-slate-700">
        <div className="container mx-auto px-4">
          <TrendingSection products={products.filter(p => p.is_trending)} />
        </div>
      </section>
      
      <section className="py-16 section-card">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-white">
              <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Latest</span> Deals
            </h2>
            <p className="text-gray-300 text-lg">Fresh deals added daily from trusted sellers worldwide</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-3">
              <ProductGrid products={products} />
            </div>
            <div className="space-y-6">
              <AdSpace size="sidebar" />
              <AdSpace size="sidebar" />
            </div>
          </div>
        </div>
      </section>

      <WeatherWidget />
      
      <section className="py-16 section-teal">
        <div className="container mx-auto px-4">
          <EmailSignup />
        </div>
      </section>

      <section className="py-12 section-dark border-t border-cyan-500/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-5xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">10k+</div>
              <p className="text-sm text-gray-300 mt-2">Products</p>
            </div>
            <div>
              <div className="text-5xl font-bold bg-gradient-to-r from-orange-400 to-yellow-500 bg-clip-text text-transparent">30</div>
              <p className="text-sm text-gray-300 mt-2">Categories</p>
            </div>
            <div>
              <div className="text-5xl font-bold bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">50k+</div>
              <p className="text-sm text-gray-300 mt-2">Happy Customers</p>
            </div>
            <div>
              <div className="text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">24/7</div>
              <p className="text-sm text-gray-300 mt-2">Deal Updates</p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
