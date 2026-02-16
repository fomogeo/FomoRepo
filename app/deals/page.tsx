export const dynamic = 'force-dynamic'

import ProductGrid from '@/components/ProductGrid'
import { getProducts } from '@/lib/supabase'
import { Zap } from 'lucide-react'

export const revalidate = 1800 // Revalidate every 30 minutes

export default async function DealsPage() {
  const products = await getProducts({ limit: 24 })

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="flex items-center justify-center space-x-3 mb-4">
          <Zap className="h-10 w-10 text-primary-600" />
          <h1 className="text-4xl font-bold text-gray-900">Hot Deals</h1>
        </div>
        <p className="text-gray-600 text-lg">
          Discover trending products and exclusive discounts
        </p>
        <div className="mt-4">
          <span className="fomo-badge text-base px-4 py-2">
            🔥 Updated hourly with fresh deals
          </span>
        </div>
      </div>

      {/* Filters - Future Enhancement */}
      <div className="mb-8 flex flex-wrap gap-4 justify-center">
        <button className="px-4 py-2 bg-primary-600 text-white rounded-lg font-semibold">
          All Deals
        </button>
        <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300">
          Electronics
        </button>
        <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300">
          Home & Garden
        </button>
        <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300">
          Fashion
        </button>
        <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300">
          Sports
        </button>
      </div>

      {/* Products Grid */}
      <ProductGrid products={products} />

      {/* Load More - Future Enhancement */}
      <div className="text-center mt-12">
        <button className="cta-button">
          Load More Deals
        </button>
      </div>
    </div>
  )
}
