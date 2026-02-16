import { getProducts } from '@/lib/supabase'
import Hero from '@/components/Hero'
import TrendingSection from '@/components/TrendingSection'
import ProductGrid from '@/components/ProductGrid'
import CategoryGrid from '@/components/CategoryGrid'
import EmailSignup from '@/components/EmailSignup'

export const revalidate = 3600 // Revalidate every hour

export default async function Home() {
  const products = await getProducts()

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <Hero />

      {/* Category Grid */}
      <CategoryGrid />

      {/* Trending Products */}
      <TrendingSection />

      {/* All Products */}
      <section className="py-16 bg-gradient-to-b from-white to-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              Today's Best Deals
            </h2>
            <p className="text-lg text-slate-600">
              Hand-picked deals updated daily
            </p>
          </div>
          <ProductGrid products={products || []} />
        </div>
      </section>

      {/* Email Signup - Prominent Section */}
      <section id="email-signup" className="py-20 bg-gradient-to-br from-orange-500 via-amber-500 to-orange-400 relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-64 h-64 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative">
          <div className="container mx-auto px-4 text-center mb-8">
            <div className="inline-block px-4 py-2 bg-white/20 rounded-full text-white font-semibold mb-4 backdrop-blur-sm">
              💰 Exclusive Subscriber Benefits
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg">
              Get the Best Deals First!
            </h2>
            <p className="text-xl text-orange-50 max-w-2xl mx-auto mb-2">
              Join thousands of smart shoppers who never miss a deal
            </p>
          </div>
          
          <EmailSignup />
          
          {/* Benefits */}
          <div className="container mx-auto px-4 mt-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center border border-white/20">
                <div className="text-4xl mb-3">🎯</div>
                <h3 className="text-white font-bold mb-2">Early Access</h3>
                <p className="text-orange-50 text-sm">Get deals before they go public</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center border border-white/20">
                <div className="text-4xl mb-3">📧</div>
                <h3 className="text-white font-bold mb-2">Weekly Roundup</h3>
                <p className="text-orange-50 text-sm">Best deals curated just for you</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center border border-white/20">
                <div className="text-4xl mb-3">🎁</div>
                <h3 className="text-white font-bold mb-2">Exclusive Codes</h3>
                <p className="text-orange-50 text-sm">Subscriber-only discount codes</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="text-4xl mb-4">✓</div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                Verified Deals
              </h3>
              <p className="text-slate-600">
                Every deal checked and verified for accuracy
              </p>
            </div>
            <div className="text-center p-6">
              <div className="text-4xl mb-4">🔄</div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                Updated Daily
              </h3>
              <p className="text-slate-600">
                Fresh deals added every single day
              </p>
            </div>
            <div className="text-center p-6">
              <div className="text-4xl mb-4">🌍</div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                Worldwide Shipping
              </h3>
              <p className="text-slate-600">
                Deals available in your country
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
