import { getProducts } from '@/lib/supabase'
import ProductCard from './ProductCard'

export default async function TrendingSection() {
  const trendingProducts = await getProducts({ category: 'trending', limit: 10 })

  if (!trendingProducts || trendingProducts.length === 0) return null

  return (
    <section className="py-16" style={{ background: '#0B1E30', borderTop: '1px solid rgba(0,212,200,0.08)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl font-bold mb-3" style={{ color: '#E8F4FD' }}>
            🔥 Trending <span style={{ color: '#FF6B00' }}>Now</span>
          </h2>
          <p style={{ color: '#7EB8D8' }}>Hot deals everyone is buying right now</p>
        </div>

        <div className="overflow-x-auto pb-4">
          <div className="flex space-x-6 min-w-max px-4">
            {trendingProducts.map((product) => (
              <div key={product.id} className="w-80 flex-shrink-0">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mt-8">
          <a href="/deals?category=trending" className="btn-gold inline-block px-6 py-3 font-bold rounded-xl">
            View All Trending Deals →
          </a>
        </div>
      </div>
    </section>
  )
}
