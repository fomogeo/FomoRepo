import Link from 'next/link'
import { CATEGORIES, getTrendingCategories } from '@/lib/categories/categories'

interface CategoryGridProps { showAll?: boolean; limit?: number }

export default function CategoryGrid({ showAll = false, limit = 12 }: CategoryGridProps) {
  const categories = showAll ? CATEGORIES : getTrendingCategories().slice(0, limit)

  return (
    <section className="py-16 bg-sky-gradient">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-fg-heading">
            {showAll ? 'All ' : 'Trending '}
            <span className="text-fg-blue">Categories</span>
          </h2>
          <p className="text-fg-body">
            {showAll ? 'Explore all 30 product categories and find the perfect deals' : 'Shop the hottest product categories with verified deals'}
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-10">
          {categories.map((category) => (
            <Link key={category.id} href={`/category/${category.slug}`} className="card-light text-center relative group">
              {category.trending && (
                <div className="absolute top-2 right-2 text-xs font-bold px-2 py-0.5 rounded-full bg-orange-100 text-fg-orange border border-fg-orange/20">🔥</div>
              )}
              <span className="text-4xl mb-3 block group-hover:scale-110 transition-transform" style={{filter: `drop-shadow(0 0 8px ${category.color || '#1E88E5'}60)`}}>
                {category.icon}
              </span>
              <h3 className="text-sm font-bold mb-1 text-fg-heading">{category.name}</h3>
              <p className="text-xs line-clamp-2 text-fg-muted">{category.description.split(',')[0]}</p>
            </Link>
          ))}
        </div>

        {!showAll && (
          <div className="text-center">
            <Link href="/categories" className="btn-primary px-8 py-4 font-bold">View All 30 Categories →</Link>
          </div>
        )}
      </div>
    </section>
  )
}
