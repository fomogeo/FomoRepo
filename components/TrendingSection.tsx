import Link from 'next/link'
import ProductCard from './ProductCard'

export default function TrendingSection({ products }: { products: any[] }) {
  if (products.length === 0) return null

  return (
    <div>
      {/* BIGGER TITLE + COLORED SUBTITLE */}
      <div className="text-center mb-12">
        <h2 className="text-5xl sm:text-6xl font-bold mb-4">
          <span className="text-4xl mr-2">🔥</span>
          <span className="text-white">Trending </span>
          <span className="text-orange-400">Now</span>
        </h2>
        <p className="text-orange-300 text-xl font-semibold">
          Hot deals everyone is buying right now
        </p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.slice(0, 4).map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}
