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

      {/* Email Signup */}
      <section className="py-16 bg-gradient-to-br from-blue-600 to-blue-500">
        <EmailSignup />
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
