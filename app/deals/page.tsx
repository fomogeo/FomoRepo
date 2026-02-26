export const dynamic = 'force-dynamic'

import ProductGrid from '@/components/ProductGrid'
import { getProducts } from '@/lib/supabase'
import AdSpace from '@/components/AdSpace'
import { Zap } from 'lucide-react'

export default async function DealsPage() {
  const products = await getProducts({ limit: 24 })

  return (
    <div className="min-h-screen" style={{ background: '#071828' }}>
      {/* Header */}
      <div className="relative py-16 overflow-hidden" style={{ background: 'linear-gradient(135deg, #0B1E30, #071828)', borderBottom: '1px solid rgba(255,179,0,0.15)' }}>
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at 70% 50%, rgba(255,179,0,0.07) 0%, transparent 60%)' }} />
        <div className="container mx-auto px-4 text-center relative">
          <div className="flex items-center justify-center gap-3 mb-3">
            <Zap className="h-10 w-10" style={{ color: '#FFB300', filter: 'drop-shadow(0 0 10px rgba(255,179,0,0.6))' }} />
            <h1 className="text-5xl font-bold" style={{ color: '#E8F4FD' }}>
              Hot <span style={{ color: '#FFB300' }}>Deals</span>
            </h1>
          </div>
          <p style={{ color: '#7EB8D8' }}>Discover trending products and exclusive discounts</p>
          <div className="mt-4 inline-block px-4 py-2 rounded-full text-sm font-bold"
            style={{ background: 'rgba(255,107,0,0.1)', border: '1px solid rgba(255,107,0,0.3)', color: '#FF6B00' }}>
            🔥 Updated daily with fresh deals
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8"><AdSpace size="leaderboard" /></div>

        {/* Filter chips */}
        <div className="mb-8 flex flex-wrap gap-3 justify-center">
          {['All Deals', 'Electronics', 'Home & Garden', 'Fashion', 'Sports', 'Beauty', 'Toys'].map((cat, i) => (
            <button key={cat}
              className="px-4 py-2 rounded-full font-semibold text-sm transition-all"
              style={i === 0 ? {
                background: 'linear-gradient(135deg, #FFB300, #FF8F00)',
                color: '#fff',
                boxShadow: '0 4px 15px rgba(255,143,0,0.3)',
              } : {
                background: 'rgba(13,40,64,0.8)',
                border: '1px solid rgba(0,212,200,0.2)',
                color: '#7EB8D8',
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Products + sidebar */}
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1"><ProductGrid products={products} /></div>
          <div className="lg:w-72 flex flex-col gap-6">
            <AdSpace size="rectangle" label="Sidebar Ad" />
            <AdSpace size="rectangle" label="Sidebar Ad 2" />
          </div>
        </div>

        <div className="mt-10"><AdSpace size="wide" label="Bottom Wide Banner" /></div>
      </div>
    </div>
  )
}
