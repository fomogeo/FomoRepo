import { Product } from '@/lib/supabase'
import ProductCard from './ProductCard'

interface ProductGridProps {
  products: Product[]
  showIntro?: boolean
}

export default function ProductGrid({ products, showIntro = false }: ProductGridProps) {
  if (!products || products.length === 0) {
    return (
      <div className="text-center py-16 px-4">
        {/* ========================================
            COMPLIANCE FIX: VALUE-ADDED EMPTY STATE
            Not just "No products" - helpful content
            ======================================== */}
        <div className="max-w-2xl mx-auto">
          <div className="text-6xl mb-6">🔍</div>
          <h3 className="text-2xl font-bold mb-4" style={{ color: '#E8F4FD' }}>
            No Deals Available Right Now
          </h3>
          <p className="mb-6" style={{ color: '#B8D4E6' }}>
            We're currently curating the best verified deals in this category. 
            Our team manually reviews each product to ensure quality and genuine value.
            Check back soon for hand-picked deals!
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="p-4 rounded-lg" style={{ background: 'rgba(13,40,64,0.4)', border: '1px solid rgba(0,212,200,0.2)' }}>
              <div className="text-2xl mb-2">✓</div>
              <strong style={{ color: '#00D4C8' }}>Verified Deals</strong>
              <p style={{ color: '#7EB8D8' }}>Every deal manually checked</p>
            </div>
            <div className="p-4 rounded-lg" style={{ background: 'rgba(13,40,64,0.4)', border: '1px solid rgba(255,179,0,0.2)' }}>
              <div className="text-2xl mb-2">📊</div>
              <strong style={{ color: '#FFB300' }}>Price History</strong>
              <p style={{ color: '#7EB8D8' }}>We track genuine savings</p>
            </div>
            <div className="p-4 rounded-lg" style={{ background: 'rgba(13,40,64,0.4)', border: '1px solid rgba(0,200,83,0.2)' }}>
              <div className="text-2xl mb-2">⭐</div>
              <strong style={{ color: '#00C853' }}>Expert Reviews</strong>
              <p style={{ color: '#7EB8D8' }}>Quality over quantity</p>
            </div>
          </div>
          <div className="mt-8">
            <a 
              href="/deals" 
              className="inline-block px-6 py-3 rounded-lg font-bold"
              style={{ 
                background: 'linear-gradient(135deg, #00D4C8, #00A896)',
                color: '#071828'
              }}
            >
              Browse All Deals
            </a>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div>
      {/* ========================================
          COMPLIANCE FIX: OPTIONAL INTRO CONTENT
          Can be enabled for deal listing pages
          ======================================== */}
      {showIntro && (
        <div className="mb-8 text-center max-w-3xl mx-auto">
          <p className="text-sm leading-relaxed" style={{ color: '#B8D4E6' }}>
            Each deal below has been <strong>personally verified by our team</strong>. We check availability, 
            compare prices across sellers, and ensure genuine discounts. Products are selected based on 
            customer reviews, quality ratings, and actual value - not just flashy marketing.
          </p>
        </div>
      )}

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Bottom context - reminds users about value */}
      {products.length > 0 && (
        <div className="mt-8 text-center text-xs" style={{ color: '#7EB8D8' }}>
          <p>
            Showing {products.length} verified {products.length === 1 ? 'deal' : 'deals'}. 
            Updated regularly throughout the day. 
            <strong className="text-yellow-400"> Prices may change - check Amazon for current pricing.</strong>
          </p>
        </div>
      )}
    </div>
  )
}
