export const dynamic = 'force-dynamic'

import { Metadata } from 'next'
import CategoryGrid from '@/components/CategoryGrid'

export const metadata: Metadata = {
  title: 'All Categories | FomoGeo',
  description: 'Browse all 30 product categories at FomoGeo. Find deals on electronics, fashion, home goods, and more.',
}

export default function CategoriesPage() {
  return (
    <div className="min-h-screen" style={{ background: '#071828' }}>
      <div className="py-16 text-center" style={{ borderBottom: '1px solid rgba(0,212,200,0.1)' }}>
        <h1 className="text-5xl font-bold mb-3" style={{ color: '#E8F4FD' }}>
          Browse <span style={{ color: '#00D4C8' }}>Categories</span>
        </h1>
        <p style={{ color: '#7EB8D8' }}>Find deals across all 30 product categories</p>
      </div>
      <div className="py-12">
        <CategoryGrid showAll={true} />
      </div>
    </div>
  )
}
