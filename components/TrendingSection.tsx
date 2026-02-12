import { Product } from '@/lib/supabase'
import ProductCard from './ProductCard'

interface TrendingSectionProps {
  products: Product[]
}

export default function TrendingSection({ products }: TrendingSectionProps) {
  return (
    <div className="relative">
      {/* Scroll container */}
      <div className="overflow-x-auto pb-4">
        <div className="flex space-x-6 min-w-max">
          {products.map((product) => (
            <div key={product.id} className="w-80 flex-shrink-0">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>

      {/* Show all link */}
      {products.length > 0 && (
        <div className="text-center mt-6">
          <a
            href="/deals?category=trending"
            className="text-primary-600 hover:text-primary-700 font-semibold"
          >
            View all trending products →
          </a>
        </div>
      )}
    </div>
  )
}
