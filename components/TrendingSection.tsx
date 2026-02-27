import ProductCard from './ProductCard'
import { getTrendingProducts } from '@/lib/supabase'

export default async function TrendingSection() {
  const trendingProducts = await getTrendingProducts(10) // Use getTrendingProducts instead

  if (!trendingProducts || trendingProducts.length === 0) return null

  return (
    <section className="py-20 px-4" style={{ background: '#071828' }}>
      <div className="container mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full" style={{ background: 'rgba(255,107,0,0.1)', border: '1px solid rgba(255,107,0,0.3)' }}>
            <span className="text-2xl">🔥</span>
            <span className="font-semibold" style={{ color: '#FF6B00' }}>Trending Now</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: '#E8F4FD' }}>
            Hot Deals Everyone Loves
          </h2>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: '#B8D4E8' }}>
            Don't miss out on these popular deals that are flying off the shelves
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {trendingProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <a 
            href="/deals" 
            className="inline-block px-8 py-4 rounded-lg font-bold text-lg transition-all hover:scale-105"
            style={{ 
              background: 'linear-gradient(135deg, #FF6B00, #FF8F00)',
              color: '#fff',
              boxShadow: '0 4px 15px rgba(255, 107, 0, 0.3)'
            }}
          >
            View All Deals
          </a>
        </div>
      </div>
    </section>
  )
}
