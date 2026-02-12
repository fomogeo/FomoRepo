import { Metadata } from 'next'
import CategoryGrid from '@/components/CategoryGrid'

export const metadata: Metadata = {
  title: 'All Categories | FomoGeo',
  description: 'Browse all 30 product categories at FomoGeo. Find deals on electronics, fashion, home goods, and more.',
}

export default function CategoriesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="py-12">
        <CategoryGrid showAll={true} />
      </div>
    </div>
  )
}
