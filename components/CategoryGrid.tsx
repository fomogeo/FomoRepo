import Link from 'next/link'
import { CATEGORIES, getTrendingCategories } from '@/lib/categories/categories'

interface CategoryGridProps {
  showAll?: boolean
  limit?: number
}

export default function CategoryGrid({ showAll = false, limit = 12 }: CategoryGridProps) {
  const categories = showAll ? CATEGORIES : getTrendingCategories().slice(0, limit)

  return (
    <section className="py-16 bg-white" id="categories">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
            {showAll ? 'All Categories' : 'Trending Categories'}
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            {showAll 
              ? 'Explore all 30 product categories and find the perfect deals'
              : 'Shop the hottest product categories with verified deals'}
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-8">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/category/${category.slug}`}
              className="group relative p-6 bg-gradient-to-br from-white to-slate-50 rounded-2xl border-2 border-slate-200 hover:border-emerald-500 transition-all hover:shadow-lg hover:-translate-y-1"
              style={{
                borderColor: `${category.color}30`,
              }}
            >
              {/* Trending Badge */}
              {category.trending && (
                <div className="absolute top-2 right-2 bg-amber-100 text-amber-800 text-xs font-bold px-2 py-1 rounded-full">
                  🔥
                </div>
              )}

              <div className="text-center">
                <div 
                  className="text-5xl mb-3 group-hover:scale-110 transition-transform inline-block"
                  style={{
                    filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))',
                  }}
                >
                  {category.icon}
                </div>
                <h3 className="text-sm font-bold text-slate-900 group-hover:text-emerald-600 transition-colors mb-1">
                  {category.name}
                </h3>
                <p className="text-xs text-slate-500 line-clamp-2">
                  {category.description.split(',')[0]}
                </p>
              </div>

              {/* Hover Effect */}
              <div 
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity"
                style={{ backgroundColor: category.color }}
              />
            </Link>
          ))}
        </div>

        {!showAll && (
          <div className="text-center">
            <Link
              href="/categories"
              className="inline-flex items-center gap-2 px-8 py-4 bg-slate-900 text-white font-semibold rounded-xl hover:bg-slate-800 transition-colors shadow-lg hover:shadow-xl"
            >
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
