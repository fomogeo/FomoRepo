import Link from 'next/link'
import { CATEGORIES, getTrendingCategories } from '@/lib/categories/categories'

interface CategoryGridProps { showAll?: boolean; limit?: number }

export default function CategoryGrid({ showAll = false, limit = 12 }: CategoryGridProps) {
  const categories = showAll ? CATEGORIES : getTrendingCategories().slice(0, limit)

  return (
    <section className="py-16 section-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {!showAll && (
          <div className="text-center mb-12">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-white">
              Trending <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Categories</span>
            </h2>
            <p className="text-gray-300 text-lg">
              Shop the hottest product categories with verified deals
            </p>
          </div>
        )}

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-10">
          {categories.map((category) => (
            <Link 
              key={category.id} 
              href={`/category/${category.slug}`} 
              className="relative group bg-white rounded-xl p-4 text-center shadow-lg hover:shadow-2xl transition-all hover:-translate-y-1"
            >
              {category.trending && (
                <div className="absolute top-2 right-2 text-xs font-bold px-2 py-0.5 rounded-full bg-orange-100 text-orange-600 border border-orange-300">
                  🔥
                </div>
              )}
              
              <span 
                className="text-4xl mb-3 block group-hover:scale-110 transition-transform" 
                style={{filter: `drop-shadow(0 0 8px ${category.color || '#4DD0E1'}60)`}}
              >
                {category.icon}
              </span>
              
              <h3 className="text-sm font-bold mb-1 text-gray-900 group-hover:text-cyan-600 transition">
                {category.name}
              </h3>
              
              <p className="text-xs line-clamp-2 text-gray-600">
                {category.description.split(',')[0]}
              </p>
            </Link>
          ))}
        </div>

        {!showAll && (
          <div className="text-center">
            <Link href="/categories" className="btn-primary px-8 py-4 font-bold">
              View All 30 Categories →
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}
