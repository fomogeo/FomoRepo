export const dynamic = 'force-dynamic'
import Link from 'next/link'
import ProductCard from '@/components/ProductCard'
import { getProducts } from '@/lib/supabase'
import { ShoppingBag, Filter } from 'lucide-react'

export const dynamic = 'force-dynamic'

export default async function DealsPage() {
  const products = await getProducts(100) // Pass number directly, not object

  return (
    <div className="min-h-screen" style={{ background: '#071828' }}>
      {/* Hero Section */}
      <section className="py-16 px-4" style={{ background: 'linear-gradient(135deg, #0A1929 0%, #071828 100%)' }}>
        <div className="container mx-auto text-center">
          <div className="inline-flex items-center gap-3 mb-6 px-6 py-3 rounded-full" style={{ background: 'rgba(0,212,200,0.1)', border: '1px solid rgba(0,212,200,0.3)' }}>
            <ShoppingBag className="h-6 w-6" style={{ color: '#00D4C8' }} />
            <span className="font-semibold text-lg" style={{ color: '#00D4C8' }}>All Deals</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight" style={{ color: '#E8F4FD' }}>
            Discover Amazing Deals
          </h1>
          
          <p className="text-xl max-w-2xl mx-auto mb-8" style={{ color: '#B8D4E8' }}>
            Browse through our curated collection of verified deals from trusted sellers worldwide
          </p>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-8 mt-8">
            <div className="text-center">
              <div className="text-4xl font-bold mb-2" style={{ color: '#FFB300' }}>
                {products.length}+
              </div>
              <div className="text-sm" style={{ color: '#7EB8D8' }}>Active Deals</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2" style={{ color: '#00D4C8' }}>
                30+
              </div>
              <div className="text-sm" style={{ color: '#7EB8D8' }}>Categories</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2" style={{ color: '#00C853' }}>
                100%
              </div>
              <div className="text-sm" style={{ color: '#7EB8D8' }}>Verified</div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          
          {/* Filter Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <h2 className="text-2xl font-bold" style={{ color: '#E8F4FD' }}>
              All Products
            </h2>
            
            <div className="flex items-center gap-4">
              <Link 
                href="/categories" 
                className="flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-sm transition-all hover:scale-105"
                style={{ background: 'rgba(0,212,200,0.1)', color: '#00D4C8', border: '1px solid rgba(0,212,200,0.3)' }}
              >
                <Filter className="h-4 w-4" />
                Browse by Category
              </Link>
            </div>
          </div>

          {/* Products Grid */}
          {products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">📦</div>
              <h3 className="text-2xl font-bold mb-4" style={{ color: '#E8F4FD' }}>
                No deals available yet
              </h3>
              <p style={{ color: '#B8D4E8' }}>
                Check back soon for amazing deals!
              </p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4" style={{ background: 'linear-gradient(135deg, #0A1929 0%, #071828 100%)' }}>
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6" style={{ color: '#E8F4FD' }}>
            Never Miss a Deal
          </h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto" style={{ color: '#B8D4E8' }}>
            Subscribe to our newsletter and get exclusive deals delivered to your inbox
          </p>
          <Link 
            href="/#email-signup" 
            className="inline-block px-8 py-4 rounded-lg font-bold text-lg transition-all hover:scale-105"
            style={{ 
              background: 'linear-gradient(135deg, #FFB300, #FF8F00)',
              color: '#fff',
              boxShadow: '0 4px 15px rgba(255, 179, 0, 0.3)'
            }}
          >
            Subscribe Now
          </Link>
        </div>
      </section>
    </div>
  )
}
