import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { getCategoryBySlug, CATEGORIES } from '@/lib/categories/categories'
import ProductCard from '@/components/ProductCard'
import Link from 'next/link'

interface CategoryPageProps {
  params: {
    slug: string
  }
  searchParams: {
    sort?: string
  }
}

export async function generateStaticParams() {
  return CATEGORIES.map((category) => ({
    slug: category.slug,
  }))
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const category = getCategoryBySlug(params.slug)
  
  if (!category) {
    return {
      title: 'Category Not Found',
    }
  }

  return {
    title: `${category.name} Deals | FomoGeo`,
    description: `${category.description}. Find the best ${category.name.toLowerCase()} deals and discounts at FomoGeo.`,
    keywords: category.keywords.join(', '),
  }
}

export default async function CategoryPage({ params, searchParams }: CategoryPageProps) {
  const category = getCategoryBySlug(params.slug)

  if (!category) {
    notFound()
  }

  // Fetch products for this category
  let query = supabase
    .from('products')
    .select('*')
    .eq('category_id', category.id)

  // Sorting
  const sort = searchParams.sort || 'trending'
  switch (sort) {
    case 'price-low':
      query = query.order('price', { ascending: true })
      break
    case 'price-high':
      query = query.order('price', { ascending: false })
      break
    case 'discount':
      query = query.order('discount_percentage', { ascending: false, nullsFirst: false })
      break
    case 'newest':
      query = query.order('created_at', { ascending: false })
      break
    default: // trending
      query = query.order('is_trending', { ascending: false }).order('updated_at', { ascending: false })
  }

  const { data: products, error } = await query

  if (error) {
    console.error('Error fetching products:', error)
  }

  // Get related categories (trending ones)
  const relatedCategories = CATEGORIES.filter(
    cat => cat.trending && cat.id !== category.id
  ).slice(0, 6)

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Category Header */}
      <div 
        className="relative py-16 px-4 sm:px-6 lg:px-8"
        style={{
          background: `linear-gradient(135deg, ${category.color}15 0%, ${category.color}05 100%)`
        }}
      >
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumb */}
          <nav className="mb-4 text-sm">
            <Link href="/" className="text-slate-600 hover:text-slate-900 transition-colors">
              Home
            </Link>
            <span className="mx-2 text-slate-400">/</span>
            <Link href="/#categories" className="text-slate-600 hover:text-slate-900 transition-colors">
              Categories
            </Link>
            <span className="mx-2 text-slate-400">/</span>
            <span className="text-slate-900 font-medium">{category.name}</span>
          </nav>

          {/* Category Title */}
          <div className="flex items-center gap-4 mb-4">
            <span className="text-6xl">{category.icon}</span>
            <div>
              <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-2">
                {category.name}
              </h1>
              <p className="text-lg text-slate-600 max-w-2xl">
                {category.description}
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="flex gap-6 mt-6">
            <div className="bg-white px-4 py-2 rounded-lg shadow-sm border border-slate-200">
              <span className="text-2xl font-bold text-slate-900">{products?.length || 0}</span>
              <span className="text-sm text-slate-600 ml-2">Products</span>
            </div>
            <div className="bg-white px-4 py-2 rounded-lg shadow-sm border border-slate-200">
              <span className="text-2xl font-bold text-emerald-600">{category.commission_avg}%</span>
              <span className="text-sm text-slate-600 ml-2">Avg. Commission</span>
            </div>
            {category.trending && (
              <div className="bg-amber-50 px-4 py-2 rounded-lg shadow-sm border border-amber-200">
                <span className="text-sm font-semibold text-amber-900">🔥 Trending Category</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Filters and Sort */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">
              All {category.name} Deals
            </h2>
            <p className="text-slate-600 mt-1">
              {products?.length || 0} products available
            </p>
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2">
            <label htmlFor="sort" className="text-sm font-medium text-slate-700">
              Sort by:
            </label>
            <select
              id="sort"
              defaultValue={sort}
              className="px-4 py-2 border border-slate-300 rounded-lg bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="trending">Trending</option>
              <option value="discount">Highest Discount</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="newest">Newest</option>
            </select>
          </div>
        </div>

        {/* Products Grid */}
        {products && products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <span className="text-6xl mb-4 block">{category.icon}</span>
            <h3 className="text-2xl font-bold text-slate-900 mb-2">
              No products yet
            </h3>
            <p className="text-slate-600 mb-6">
              We're working on adding amazing {category.name.toLowerCase()} deals. Check back soon!
            </p>
            <Link
              href="/"
              className="inline-block px-6 py-3 bg-emerald-600 text-white font-semibold rounded-lg hover:bg-emerald-700 transition-colors"
            >
              Browse All Deals
            </Link>
          </div>
        )}

        {/* Related Categories */}
        {relatedCategories.length > 0 && (
          <div className="mt-16 pt-16 border-t border-slate-200">
            <h2 className="text-2xl font-bold text-slate-900 mb-8">
              Explore More Categories
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {relatedCategories.map((cat) => (
                <Link
                  key={cat.id}
                  href={`/category/${cat.slug}`}
                  className="group p-4 bg-white rounded-xl border-2 border-slate-200 hover:border-emerald-500 transition-all hover:shadow-md"
                >
                  <div className="text-center">
                    <span className="text-4xl mb-2 block group-hover:scale-110 transition-transform">
                      {cat.icon}
                    </span>
                    <h3 className="text-sm font-semibold text-slate-900 group-hover:text-emerald-600 transition-colors">
                      {cat.name}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
