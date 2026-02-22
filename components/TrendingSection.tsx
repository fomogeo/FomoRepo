import Link from 'next/link'
import ProductCard from './ProductCard'

export default function TrendingSection({ products }: { products: any[] }) {
  if (products.length === 0) return null

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-4xl font-bold text-white">
          <span className="text-orange-400">🔥 Trending</span>{' '}
          <span className="text-cyan-400">Now</span>
        </h2>
        <Link href="/deals" className="text-cyan-400 hover:text-cyan-300 font-semibold text-lg transition">
          View All →
        </Link>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.slice(0, 4).map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}
