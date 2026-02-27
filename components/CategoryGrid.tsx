import Link from 'next/link'
import { CATEGORIES, getTrendingCategories } from '@/lib/categories/categories'

interface CategoryGridProps { 
  showAll?: boolean
  limit?: number 
}

export default function CategoryGrid({ showAll = false, limit = 12 }: CategoryGridProps) {
  const categories = showAll ? CATEGORIES : getTrendingCategories().slice(0, limit)

  return (
    <section className="py-16" id="categories" style={{ background: '#071828' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4" style={{ color: '#E8F4FD' }}>
            {showAll ? 'All ' : 'Trending '}
            <span style={{ color: '#00D4C8' }}>Categories</span>
          </h2>
          <p className="text-lg mb-4" style={{ color: '#7EB8D8' }}>
            {showAll
              ? 'Explore all 30 product categories and find the perfect deals'
              : 'Shop the hottest product categories with verified deals'}
          </p>

          {/* ========================================
              COMPLIANCE FIX: VALUE-ADDED INTRO
              Explains category curation process
              ======================================== */}
          <p className="text-sm max-w-3xl mx-auto" style={{ color: '#B8D4E6' }}>
            Each category features <strong>hand-curated deals from trusted sellers</strong> on Amazon and verified international stores. 
            We monitor price trends, customer reviews, and product quality to bring you the best deals in every category. 
            Categories are updated daily with fresh deals based on seasonal trends, customer demand, and genuine savings opportunities.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-10">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/category/${category.slug}`}
              className="fg-cat-card relative group"
            >
              {category.trending && (
                <div className="absolute top-2 right-2 text-xs font-bold px-2 py-0.5 rounded-full z-10"
                  style={{ background: 'rgba(255,179,0,0.2)', color: '#FFB300', border: '1px solid rgba(255,179,0,0.3)' }}>
                  🔥
                </div>
              )}
              <span className="fg-cat-icon text-4xl mb-3 block group-hover:scale-110 transition-transform"
                style={{ filter: `drop-shadow(0 0 12px ${category.color || '#00D4C8'}60)` }}>
                {category.icon}
              </span>
              <h3 className="text-sm font-bold mb-1" style={{ color: '#E8F4FD' }}>
                {category.name}
              </h3>
              
              {/* ========================================
                  COMPLIANCE FIX: EXPANDED DESCRIPTIONS
                  More context about what's in category
                  ======================================== */}
              <p className="text-xs line-clamp-2 mb-2" style={{ color: '#4A7A9B' }}>
                {category.description}
              </p>
              
              {/* Show deal count or value prop */}
              <div className="text-xs mt-auto pt-2" style={{ color: '#00D4C8' }}>
                Browse deals →
              </div>
            </Link>
          ))}
        </div>

        {!showAll && (
          <div className="text-center">
            <Link href="/categories" className="btn-gold inline-flex items-center gap-2 px-8 py-4 font-bold rounded-xl hover:scale-105 transition-transform">
              <span>View All 30 Categories</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        )}

        {/* ========================================
            COMPLIANCE FIX: CATEGORY VALUE PROP
            Explains why categories matter
            ======================================== */}
        <div className="mt-16 pt-12 border-t" style={{ borderColor: 'rgba(0,212,200,0.1)' }}>
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold mb-2" style={{ color: '#E8F4FD' }}>
              Why Shop by Category?
            </h3>
            <p className="text-sm max-w-2xl mx-auto" style={{ color: '#B8D4E6' }}>
              We organize deals into 30 distinct categories to help you find exactly what you need quickly. 
              Each category is monitored by our team for the best prices, highest-rated products, and genuine discounts.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center text-sm">
            <div className="p-4 rounded-lg" style={{ background: 'rgba(13,40,64,0.4)' }}>
              <div className="text-3xl mb-2">🎯</div>
              <strong style={{ color: '#00D4C8' }}>Focused Selection</strong>
              <p style={{ color: '#7EB8D8' }}>Only the best deals in each category</p>
            </div>
            <div className="p-4 rounded-lg" style={{ background: 'rgba(13,40,64,0.4)' }}>
              <div className="text-3xl mb-2">📊</div>
              <strong style={{ color: '#FFB300' }}>Price Tracking</strong>
              <p style={{ color: '#7EB8D8' }}>We monitor price history for genuine savings</p>
            </div>
            <div className="p-4 rounded-lg" style={{ background: 'rgba(13,40,64,0.4)' }}>
              <div className="text-3xl mb-2">⭐</div>
              <strong style={{ color: '#00C853' }}>Quality First</strong>
              <p style={{ color: '#7EB8D8' }}>Minimum 4-star ratings required</p>
            </div>
            <div className="p-4 rounded-lg" style={{ background: 'rgba(13,40,64,0.4)' }}>
              <div className="text-3xl mb-2">🔄</div>
              <strong style={{ color: '#FF6B00' }}>Daily Updates</strong>
              <p style={{ color: '#7EB8D8' }}>Fresh deals added every day</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
