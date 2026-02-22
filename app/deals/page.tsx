export const dynamic = 'force-dynamic'

import Script from 'next/script'
import { getProducts } from '@/lib/supabase'
import ProductGrid from '@/components/ProductGrid'
import AdSpace from '@/components/AdSpace'

export default async function DealsPage() {
  const products = await getProducts({ limit: 100 })

  return (
    <div className="min-h-screen section-dark">
      <Script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4317381401188026"
        crossOrigin="anonymous"
        strategy="afterInteractive"
      />
      
      <div className="w-full">
        <img src="/hero-light.png" alt="All Deals" className="w-full h-auto" />
      </div>

      <div className="py-12 text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-4 text-white">
          All <span className="bg-gradient-to-r from-orange-400 to-yellow-500 bg-clip-text text-transparent">Deals</span>
        </h1>
        <p className="text-lg text-gray-300">Browse our complete collection of verified deals</p>
      </div>

      <div className="container mx-auto px-4 py-10">
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
    </div>
  )
}
