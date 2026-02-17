import Link from 'next/link'
import { CATEGORIES, getTrendingCategories } from '@/lib/categories/categories'

interface CategoryGridProps { showAll?: boolean; limit?: number }

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
          <p style={{ color: '#7EB8D8' }}>
            {showAll
              ? 'Explore all 30 product categories and find the perfect deals'
              : 'Shop the hottest product categories with verified deals'}
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-10">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/category/${category.slug}`}
              className="group relative p-5 rounded-2xl transition-all duration-300 hover:-translate-y-2 text-center"
              style={{
                background: 'linear-gradient(135deg, #0D2840, #091E30)',
                border: `1px solid rgba(0,212,200,0.2)`,
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = category.color || '#00D4C8'
                e.currentTarget.style.boxShadow = `0 8px 30px ${category.color || '#00D4C8'}25`
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'rgba(0,212,200,0.2)'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              {category.trending && (
                <div className="absolute top-2 right-2 text-xs font-bold px-2 py-0.5 rounded-full"
                  style={{ background: 'rgba(255,179,0,0.2)', color: '#FFB300', border: '1px solid rgba(255,179,0,0.3)' }}>
                  🔥
                </div>
              )}
              <div className="text-4xl mb-3 group-hover:scale-110 transition-transform inline-block"
                style={{ filter: `drop-shadow(0 0 12px ${category.color || '#00D4C8'}60)` }}>
                {category.icon}
              </div>
              <h3 className="text-sm font-bold mb-1 transition-colors" style={{ color: '#E8F4FD' }}>
                {category.name}
              </h3>
              <p className="text-xs line-clamp-2" style={{ color: '#4A7A9B' }}>
                {category.description.split(',')[0]}
              </p>
            </Link>
          ))}
        </div>

        {!showAll && (
          <div className="text-center">
            <Link href="/categories"
              className="btn-gold inline-flex items-center gap-2 px-8 py-4 font-bold rounded-xl">
              <span>View All 30 Categories</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}
