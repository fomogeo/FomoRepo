export const dynamic = 'force-dynamic'

import { getProducts } from '@/lib/supabase'
import ProductGrid from '@/components/ProductGrid'
import AdSpace from '@/components/AdSpace'

export default async function DealsPage() {
  const products = await getProducts(100)

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-sky-gradient py-16 border-b border-gray-200">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 text-fg-heading">
            All <span className="text-fg-orange">Deals</span>
          </h1>
          <p className="text-lg text-fg-body">Browse our complete collection of verified deals from around the world</p>
        </div>
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
