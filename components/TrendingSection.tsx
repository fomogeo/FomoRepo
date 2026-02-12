import { getProducts } from '@/lib/supabase'
import ProductCard from './ProductCard'

export default async function TrendingSection() {
  // Fetch trending products
  const trendingProducts = await getProducts({ category: 'trending', limit: 10 })

  if (!trendingProducts || trendingProducts.length === 0) {
    return null
  }

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
            🔥 Trending Now
          </h2>
          <p className="text-lg text-slate-600">
            Hot deals everyone is buying
          </p>
        </div>

        <div className="relative">
          {/* Scroll container */}
          <div className="overflow-x-auto pb-4 scrollbar-hide">
            <div className="flex space-x-6 min-w-max px-4">
              {trendingProducts.map((product) => (
                <div key={product.id} className="w-80 flex-shrink-0">
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          </div>

          {/* Show all link */}
          <div className="text-center mt-6">
            <a
              href="/deals?category=trending"
              className="inline-block px-6 py-3 bg-emerald-600 text-white font-semibold rounded-xl hover:bg-emerald-700 transition-colors"
            >
              View All Trending Deals →
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
