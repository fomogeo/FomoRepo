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
      <TrendingSection products={products.filter(p => p.is_trending)} />
      
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center text-fg-heading">
            <span className="text-fg-blue">Latest</span> Deals
          </h2>
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
      
      <section className="py-16 bg-sky-gradient">
        <div className="container mx-auto px-4">
          <EmailSignup />
        </div>
      </section>

      <section className="py-8 bg-white border-t border-gray-200">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div><div className="text-3xl font-bold text-fg-blue">10k+</div><p className="text-sm text-fg-muted">Products</p></div>
            <div><div className="text-3xl font-bold text-fg-orange">30</div><p className="text-sm text-fg-muted">Categories</p></div>
            <div><div className="text-3xl font-bold text-fg-green">50k+</div><p className="text-sm text-fg-muted">Happy Customers</p></div>
            <div><div className="text-3xl font-bold text-fg-blue">24/7</div><p className="text-sm text-fg-muted">Deal Updates</p></div>
          </div>
        </div>
      </section>
    </>
  )
}
