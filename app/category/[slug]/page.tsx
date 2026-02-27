export const dynamic = 'force-dynamic'

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
    title: `${category.name} Deals | FomoGeo - Verified Amazon Deals`,
    description: `${category.description}. Find the best ${category.name.toLowerCase()} deals and discounts at FomoGeo. Hand-curated, price-verified, quality-checked.`,
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
    .eq('category', category.name) // Use name instead of category_id

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
    <div className="min-h-screen" style={{ background: '#071828' }}>
      
      {/* ========================================
          COMPLIANCE FIX: AFFILIATE DISCLOSURE
          Must appear on ALL pages with affiliate links
          ======================================== */}
      <section className="py-6" style={{ background: '#0B1E30', borderBottom: '2px solid rgba(255,179,0,0.2)' }}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="rounded-xl p-4 text-center" style={{ 
            background: 'rgba(255,179,0,0.05)', 
            border: '1px solid rgba(255,179,0,0.2)' 
          }}>
            <p className="text-sm max-w-4xl mx-auto" style={{ color: '#B8D4E6' }}>
              <strong style={{ color: '#FFB300' }}>Affiliate Disclosure:</strong> As an Amazon Associate, we earn from qualifying purchases. 
              Clicking our links helps support our work at no extra cost to you.
            </p>
          </div>
        </div>
      </section>

      {/* Category Header */}
      <div className="relative py-16 px-4 sm:px-6 lg:px-8" style={{ background: '#0A1929' }}>
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumb */}
          <nav className="mb-4 text-sm">
            <Link href="/" className="hover:opacity-80 transition-opacity" style={{ color: '#7EB8D8' }}>
              Home
            </Link>
            <span className="mx-2" style={{ color: '#4A7A9B' }}>/</span>
            <Link href="/#categories" className="hover:opacity-80 transition-opacity" style={{ color: '#7EB8D8' }}>
              Categories
            </Link>
            <span className="mx-2" style={{ color: '#4A7A9B' }}>/</span>
            <span style={{ color: '#E8F4FD' }} className="font-medium">{category.name}</span>
          </nav>

          {/* Category Title */}
          <div className="flex items-center gap-4 mb-6">
            <span className="text-6xl" style={{ filter: `drop-shadow(0 0 20px ${category.color}60)` }}>
              {category.icon}
            </span>
            <div>
              <h1 className="text-4xl sm:text-5xl font-bold mb-3" style={{ color: '#E8F4FD' }}>
                {category.name} <span style={{ color: '#00D4C8' }}>Deals</span>
              </h1>
              <p className="text-lg max-w-2xl" style={{ color: '#B8D4E6' }}>
                {category.description}
              </p>
            </div>
          </div>

          {/* ========================================
              COMPLIANCE FIX: VALUE-ADDED CONTENT
              Explains category curation and expertise
              ======================================== */}
          <div className="mt-6 p-6 rounded-lg" style={{ background: 'rgba(13,40,64,0.4)', border: '1px solid rgba(0,212,200,0.2)' }}>
            <p className="text-sm leading-relaxed" style={{ color: '#B8D4E6' }}>
              Our <strong>{category.name}</strong> category features hand-selected products that meet our quality standards. 
              Each item is chosen based on <strong>verified customer reviews, price history analysis, and genuine value</strong>. 
              We track price changes daily, verify seller authenticity, and remove products that don't maintain our standards. 
              {category.trending && " This trending category is updated multiple times per day with the hottest deals."}
            </p>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap gap-4 mt-6">
            <div className="px-4 py-3 rounded-lg" style={{ background: 'rgba(255,179,0,0.1)', border: '1px solid rgba(255,179,0,0.2)' }}>
              <span className="text-2xl font-bold" style={{ color: '#FFB300' }}>{products?.length || 0}</span>
              <span className="text-sm ml-2" style={{ color: '#B8D4E6' }}>Verified Products</span>
            </div>
            <div className="px-4 py-3 rounded-lg" style={{ background: 'rgba(0,212,200,0.1)', border: '1px solid rgba(0,212,200,0.2)' }}>
              <span className="text-2xl font-bold" style={{ color: '#00D4C8' }}>{category.commission_avg}%</span>
              <span className="text-sm ml-2" style={{ color: '#B8D4E6' }}>Avg. Savings</span>
            </div>
            {category.trending && (
              <div className="px-4 py-3 rounded-lg" style={{ background: 'rgba(255,107,0,0.1)', border: '1px solid rgba(255,107,0,0.2)' }}>
                <span className="text-sm font-semibold" style={{ color: '#FF6B00' }}>🔥 Trending Category</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Filters and Sort */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h2 className="text-2xl font-bold" style={{ color: '#E8F4FD' }}>
              All {category.name} Deals
            </h2>
            <p className="mt-1 text-sm" style={{ color: '#7EB8D8' }}>
              {products?.length || 0} verified products • Updated daily
            </p>
          </div>

          {/* Sort - This is now just visual, actual sorting happens server-side via searchParams */}
          <div className="flex items-center gap-2">
            <label htmlFor="sort" className="text-sm font-medium" style={{ color: '#B8D4E6' }}>
              Sort by:
            </label>
            <Link
              href={`/category/${category.slug}?sort=trending`}
              className={`px-3 py-1.5 rounded text-sm ${sort === 'trending' || !sort ? 'font-bold' : ''}`}
              style={{ 
                background: sort === 'trending' || !sort ? 'rgba(0,212,200,0.2)' : 'rgba(13,40,64,0.4)',
                color: sort === 'trending' || !sort ? '#00D4C8' : '#7EB8D8',
                border: `1px solid ${sort === 'trending' || !sort ? 'rgba(0,212,200,0.3)' : 'rgba(0,212,200,0.1)'}`
              }}
            >
              Trending
            </Link>
            <Link
              href={`/category/${category.slug}?sort=discount`}
              className={`px-3 py-1.5 rounded text-sm ${sort === 'discount' ? 'font-bold' : ''}`}
              style={{ 
                background: sort === 'discount' ? 'rgba(0,212,200,0.2)' : 'rgba(13,40,64,0.4)',
                color: sort === 'discount' ? '#00D4C8' : '#7EB8D8',
                border: `1px solid ${sort === 'discount' ? 'rgba(0,212,200,0.3)' : 'rgba(0,212,200,0.1)'}`
              }}
            >
              Best Discount
            </Link>
            <Link
              href={`/category/${category.slug}?sort=price-low`}
              className={`px-3 py-1.5 rounded text-sm ${sort === 'price-low' ? 'font-bold' : ''}`}
              style={{ 
                background: sort === 'price-low' ? 'rgba(0,212,200,0.2)' : 'rgba(13,40,64,0.4)',
                color: sort === 'price-low' ? '#00D4C8' : '#7EB8D8',
                border: `1px solid ${sort === 'price-low' ? 'rgba(0,212,200,0.3)' : 'rgba(0,212,200,0.1)'}`
              }}
            >
              Price: Low
            </Link>
          </div>
        </div>

        {/* Products Grid */}
        {products && products.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {/* Price Disclaimer */}
            <div className="mt-12 p-4 rounded-lg text-center text-xs" style={{ 
              background: 'rgba(255,179,0,0.05)', 
              border: '1px solid rgba(255,179,0,0.2)',
              color: '#B8D4E6'
            }}>
              <strong style={{ color: '#FFB300' }}>Price Disclaimer:</strong> Product prices and availability are accurate as of the date/time 
              indicated and are subject to change. Any price and availability information displayed on Amazon at the time of purchase will 
              apply to the purchase of this product.
            </div>
          </>
        ) : (
          <div className="text-center py-20 px-4">
            <span className="text-6xl mb-6 block" style={{ filter: `drop-shadow(0 0 20px ${category.color}60)` }}>
              {category.icon}
            </span>
            <h3 className="text-2xl font-bold mb-4" style={{ color: '#E8F4FD' }}>
              No products in this category yet
            </h3>
            <p className="mb-6 max-w-md mx-auto" style={{ color: '#B8D4E6' }}>
              We're actively curating the best {category.name.toLowerCase()} deals. Our team hand-picks each product 
              based on quality, value, and customer reviews. Check back soon for verified deals!
            </p>
            <Link
              href="/deals"
              className="inline-block px-6 py-3 rounded-lg font-bold transition-all hover:scale-105"
              style={{ background: 'linear-gradient(135deg, #00D4C8, #00A896)', color: '#071828' }}
            >
              Browse All Deals
            </Link>
          </div>
        )}

        {/* Related Categories */}
        {relatedCategories.length > 0 && (
          <div className="mt-20 pt-12" style={{ borderTop: '1px solid rgba(0,212,200,0.1)' }}>
            <h2 className="text-2xl font-bold mb-8" style={{ color: '#E8F4FD' }}>
              Explore More Categories
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {relatedCategories.map((cat) => (
                <Link
                  key={cat.id}
                  href={`/category/${cat.slug}`}
                  className="group p-4 rounded-xl transition-all hover:scale-105"
                  style={{ background: 'rgba(13,40,64,0.4)', border: '2px solid rgba(0,212,200,0.2)' }}
                >
                  <div className="text-center">
                    <span className="text-4xl mb-2 block group-hover:scale-110 transition-transform"
                      style={{ filter: `drop-shadow(0 0 15px ${cat.color}60)` }}>
                      {cat.icon}
                    </span>
                    <h3 className="text-sm font-semibold" style={{ color: '#E8F4FD' }}>
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
