import Link from 'next/link'
import Image from 'next/image'
import { TrendingUp, Star } from 'lucide-react'

interface ProductCardProps {
  product: {
    id: string
    name: string
    price: number
    original_price: number | null
    image_url: string
    category: string
    discount_percentage: number | null
    is_trending?: boolean
    is_best_seller?: boolean
  }
}

export default function ProductCard({ product }: ProductCardProps) {
  const discount = product.discount_percentage || 
    (product.original_price ? Math.round(((product.original_price - product.price) / product.original_price) * 100) : 0)

  return (
    <Link href={`/products/${product.id}`} className="deal-card group">
      {/* Image with ALWAYS VISIBLE badges */}
      <div className="relative aspect-square bg-slate-800 overflow-hidden">
        <Image
          src={product.image_url}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Discount badge - ALWAYS VISIBLE */}
        {discount > 0 && (
          <div className="discount-badge">
            -{discount}%
          </div>
        )}
        
        {/* Trending badge - ALWAYS VISIBLE */}
        {product.is_trending && (
          <div className="absolute top-3 left-3 badge-trending z-10">
            <TrendingUp className="h-3 w-3" /> Trending
          </div>
        )}
        
        {/* Best Seller badge - ALWAYS VISIBLE */}
        {product.is_best_seller && (
          <div className="absolute top-3 left-3 badge-best-seller z-10">
            <Star className="h-3 w-3 fill-current" /> Best Seller
          </div>
        )}
      </div>

      {/* Content - ALWAYS VISIBLE with white text */}
      <div className="p-4">
        <p className="text-xs text-cyan-400 mb-2 font-semibold uppercase tracking-wide">
          {product.category}
        </p>
        
        <h3 className="text-base font-bold mb-3 line-clamp-2 text-white group-hover:text-cyan-400 transition">
          {product.name}
        </h3>

        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
            ${product.price.toFixed(2)}
          </span>
          {product.original_price && (
            <span className="text-sm text-gray-400 line-through">
              ${product.original_price.toFixed(2)}
            </span>
          )}
        </div>

        {product.original_price && (
          <p className="text-xs text-green-400 mt-1 font-semibold">
            Save ${(product.original_price - product.price).toFixed(2)}
          </p>
        )}
      </div>
    </Link>
  )
}
