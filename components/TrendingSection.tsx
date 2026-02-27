import ProductCard from './ProductCard'
import { getTrendingProducts } from '@/lib/supabase'

export default async function TrendingSection() {
  const trendingProducts = await getTrendingProducts(10)

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
          <p className="text-lg max-w-2xl mx-auto mb-4" style={{ color: '#B8D4E6' }}>
            Don't miss out on these popular deals that are flying off the shelves
          </p>
          
          {/* ========================================
              COMPLIANCE FIX: VALUE-ADDED CONTEXT
              Explains why these are trending
              ======================================== */}
          <p className="text-sm max-w-3xl mx-auto" style={{ color: '#7EB8D8' }}>
            These products are trending based on <strong>real customer demand, verified reviews, and genuine savings</strong>. 
            Our algorithm tracks popularity, stock levels, and price drops to surface the best deals that people are actually buying. 
            Each trending item is manually verified to ensure quality and value.
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

        {/* ========================================
            COMPLIANCE FIX: TRENDING CRITERIA
            Transparency about selection process
            ======================================== */}
        <div className="mt-12 pt-8 border-t" style={{ borderColor: 'rgba(0,212,200,0.1)' }}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center text-sm">
            <div>
              <div className="text-2xl mb-2">📈</div>
              <strong style={{ color: '#00D4C8' }}>Rising Popularity</strong>
              <p style={{ color: '#7EB8D8' }}>Based on customer views and purchases</p>
            </div>
            <div>
              <div className="text-2xl mb-2">⭐</div>
              <strong style={{ color: '#FFB300' }}>High Ratings</strong>
              <p style={{ color: '#7EB8D8' }}>Minimum 4-star verified reviews</p>
            </div>
            <div>
              <div className="text-2xl mb-2">💰</div>
              <strong style={{ color: '#00C853' }}>Genuine Savings</strong>
              <p style={{ color: '#7EB8D8' }}>Real discounts, not inflated prices</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
