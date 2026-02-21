import Link from 'next/link'
import ProductCard from './ProductCard'

export default function TrendingSection({ products }: { products: any[] }) {
  if (products.length === 0) return null

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-fg-heading">
            <span className="text-fg-orange">🔥 Trending</span> Now
          </h2>
          <Link href="/deals" className="text-fg-blue hover:text-fg-blue-hover font-semibold">
            View All →
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.slice(0, 4).map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}
