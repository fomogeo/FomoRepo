export const dynamic = 'force-dynamic'

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
      <Hero />
      <CategoryGrid />
      
      <section className="py-16 section-white">
        <div className="container mx-auto px-4">
          <TrendingSection products={products.filter(p => p.is_trending)} />
        </div>
      </section>
      
      <section className="py-16 section-warm">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-fg-heading">
              <span className="text-fg-blue">Latest</span> Deals
            </h2>
            <p className="text-fg-body text-lg">Fresh deals added daily from trusted sellers worldwide</p>
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
      
      <section className="py-16 section-mint">
        <div className="container mx-auto px-4">
          <EmailSignup />
        </div>
      </section>

      <section className="py-12 section-white border-t border-gray-200">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold bg-gradient-to-r from-blue-500 to-blue-600 bg-clip-text text-transparent">10k+</div>
              <p className="text-sm text-fg-muted mt-2">Products</p>
            </div>
            <div>
              <div className="text-4xl font-bold bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">30</div>
              <p className="text-sm text-fg-muted mt-2">Categories</p>
            </div>
            <div>
              <div className="text-4xl font-bold bg-gradient-to-r from-green-500 to-green-600 bg-clip-text text-transparent">50k+</div>
              <p className="text-sm text-fg-muted mt-2">Happy Customers</p>
            </div>
            <div>
              <div className="text-4xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">24/7</div>
              <p className="text-sm text-fg-muted mt-2">Deal Updates</p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
