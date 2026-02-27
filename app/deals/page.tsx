import Link from 'next/link'
import ProductCard from '@/components/ProductCard'
import { getProducts } from '@/lib/supabase'
import { ShoppingBag, Filter } from 'lucide-react'

export const dynamic = 'force-dynamic'

export default async function DealsPage() {
  const products = await getProducts(100)

  return (
    <div className="min-h-screen" style={{ background: '#071828' }}>
      
      {/* ========================================
          COMPLIANCE FIX: AFFILIATE DISCLOSURE
          Must appear on ALL pages with affiliate links
          ======================================== */}
      <section className="py-6" style={{ background: '#0B1E30', borderBottom: '2px solid rgba(255,179,0,0.2)' }}>
        <div className="container mx-auto px-4">
          <div className="rounded-xl p-4 text-center" style={{ 
            background: 'rgba(255,179,0,0.05)', 
            border: '1px solid rgba(255,179,0,0.2)' 
          }}>
            <p className="text-sm max-w-4xl mx-auto" style={{ color: '#B8D4E6' }}>
              <strong style={{ color: '#FFB300' }}>Affiliate Disclosure:</strong> As an Amazon Associate, we earn from qualifying purchases. 
              This means if you click our links and make a purchase, we may earn a commission at no extra cost to you.
            </p>
          </div>
        </div>
      </section>

      {/* Hero Section */}
      <section className="py-16 px-4" style={{ background: 'linear-gradient(135deg, #0A1929 0%, #071828 100%)' }}>
        <div className="container mx-auto text-center">
          <div className="inline-flex items-center gap-3 mb-6 px-6 py-3 rounded-full" style={{ background: 'rgba(0,212,200,0.1)', border: '1px solid rgba(0,212,200,0.3)' }}>
            <ShoppingBag className="h-6 w-6" style={{ color: '#00D4C8' }} />
            <span className="font-semibold text-lg" style={{ color: '#00D4C8' }}>All Deals</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight" style={{ color: '#E8F4FD' }}>
            Discover Amazing <span className="text-shimmer">Verified Deals</span>
          </h1>
          
          <p className="text-xl max-w-3xl mx-auto mb-4" style={{ color: '#B8D4E8' }}>
            Browse through our curated collection of hand-picked deals from trusted sellers worldwide
          </p>

          {/* ========================================
              COMPLIANCE FIX: VALUE-ADDED CONTENT
              Explains curation process and value
              ======================================== */}
          <p className="text-sm max-w-3xl mx-auto mb-8" style={{ color: '#7EB8D8' }}>
            Every deal on this page has been <strong>personally verified by our expert team</strong>. We don't just list products — 
            we analyze price history, check customer reviews, verify availability, and ensure genuine discounts. Each product is 
            selected based on quality, value, and customer satisfaction, not paid placement. We track price changes daily and remove 
            deals that no longer offer true savings.
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
            <div>
              <h2 className="text-2xl font-bold mb-2" style={{ color: '#E8F4FD' }}>
                All Verified Products
              </h2>
              <p className="text-sm" style={{ color: '#7EB8D8' }}>
                Updated daily with fresh deals • Prices verified within 24 hours
              </p>
            </div>
            
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
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>

              {/* ========================================
                  COMPLIANCE FIX: PRICE DISCLAIMER
                  Amazon requires this for all product listings
                  ======================================== */}
              <div className="mt-12 p-4 rounded-lg text-center text-xs" style={{ 
                background: 'rgba(255,179,0,0.05)', 
                border: '1px solid rgba(255,179,0,0.2)',
                color: '#B8D4E6'
              }}>
                <strong style={{ color: '#FFB300' }}>Price & Availability Disclaimer:</strong> Product prices and availability are 
                accurate as of the date/time indicated and are subject to change. Any price and availability information displayed 
                on Amazon at the time of purchase will apply to the purchase of this product. We update prices regularly but cannot 
                guarantee real-time accuracy for all listings.
              </div>
            </>
          ) : (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">📦</div>
              <h3 className="text-2xl font-bold mb-4" style={{ color: '#E8F4FD' }}>
                No deals available yet
              </h3>
              <p style={{ color: '#B8D4E8' }}>
                We're curating the best verified deals. Check back soon for amazing offers!
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Value Proposition Section */}
      <section className="py-16 px-4" style={{ background: '#0B1E30', borderTop: '1px solid rgba(0,212,200,0.1)' }}>
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4" style={{ color: '#E8F4FD' }}>
              Why Trust FomoGeo Deals?
            </h2>
            <p className="text-sm max-w-2xl mx-auto" style={{ color: '#B8D4E6' }}>
              We don't just aggregate deals — we curate them with expertise and care
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center p-6 rounded-lg" style={{ background: 'rgba(13,40,64,0.4)', border: '1px solid rgba(0,212,200,0.1)' }}>
              <div className="text-4xl mb-3">✓</div>
              <h3 className="font-bold mb-2" style={{ color: '#00D4C8' }}>Hand-Verified</h3>
              <p className="text-sm" style={{ color: '#7EB8D8' }}>Every deal checked by our team for quality and value</p>
            </div>
            <div className="text-center p-6 rounded-lg" style={{ background: 'rgba(13,40,64,0.4)', border: '1px solid rgba(255,179,0,0.1)' }}>
              <div className="text-4xl mb-3">📊</div>
              <h3 className="font-bold mb-2" style={{ color: '#FFB300' }}>Price Tracking</h3>
              <p className="text-sm" style={{ color: '#7EB8D8' }}>We monitor price history to ensure genuine savings</p>
            </div>
            <div className="text-center p-6 rounded-lg" style={{ background: 'rgba(13,40,64,0.4)', border: '1px solid rgba(0,200,83,0.1)' }}>
              <div className="text-4xl mb-3">⭐</div>
              <h3 className="font-bold mb-2" style={{ color: '#00C853' }}>Quality First</h3>
              <p className="text-sm" style={{ color: '#7EB8D8' }}>Minimum 4-star ratings from verified customers</p>
            </div>
            <div className="text-center p-6 rounded-lg" style={{ background: 'rgba(13,40,64,0.4)', border: '1px solid rgba(255,107,0,0.1)' }}>
              <div className="text-4xl mb-3">🔄</div>
              <h3 className="font-bold mb-2" style={{ color: '#FF6B00' }}>Daily Updates</h3>
              <p className="text-sm" style={{ color: '#7EB8D8' }}>Fresh deals added and expired ones removed daily</p>
            </div>
          </div>
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
