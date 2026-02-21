export const dynamic = 'force-dynamic'

import { notFound } from 'next/navigation'
import { CATEGORIES } from '@/lib/categories/categories'
import ProductGrid from '@/components/ProductGrid'
import { getProducts } from '@/lib/supabase'
import AdSpace from '@/components/AdSpace'

export default async function CategoryPage({ params }: { params: { slug: string } }) {
  const category = CATEGORIES.find(c => c.slug === params.slug)
  
  if (!category) {
    notFound()
  }

  // FIX: Pass category slug to filter products
  const products = await getProducts({ category: params.slug, limit: 100 })

  return (
    <div className="min-h-screen section-dark">
      {/* Header with banner */}
      <div className="w-full relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 to-transparent z-10"></div>
        <img src="/hero-light.png" alt={category.name} className="w-full h-48 object-cover opacity-40" />
        <div className="absolute inset-0 z-20 flex items-center">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-4 mb-4">
              <span className="text-6xl" style={{filter: `drop-shadow(0 0 10px ${category.color})`}}>
                {category.icon}
              </span>
              <div>
                <h1 className="text-5xl font-bold text-white mb-2">{category.name}</h1>
                <p className="text-cyan-300 text-lg">{category.description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-10">
        {products.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-3">
              <ProductGrid products={products} />
            </div>
            <div className="space-y-6">
              <AdSpace size="sidebar" />
              <AdSpace size="sidebar" />
            </div>
          </div>
        ) : (
          <div className="text-center py-20 card-light">
            <div className="text-6xl mb-4">{category.icon}</div>
            <p className="text-lg mb-2 text-white">No products in this category yet.</p>
            <p className="text-gray-400">Check back soon for amazing deals!</p>
          </div>
        )}
      </div>
    </div>
  )
}
