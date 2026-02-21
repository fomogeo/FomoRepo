import Link from 'next/link'
import Image from 'next/image'
import { ExternalLink, TrendingUp, Star } from 'lucide-react'

interface Product {
  id: string
  name: string
  description: string | null
  price: number
  original_price: number | null
  discount_percentage: number | null
  image_url: string
  category: string
  is_trending: boolean
  is_best_seller: boolean
}

export default function ProductCard({ product }: { product: Product }) {
  return (
    <article className="deal-card group">
      {product.discount_percentage && product.discount_percentage > 0 && (
        <div className="discount-badge">-{product.discount_percentage}%</div>
      )}
      
      {product.is_trending && (
        <div className="absolute top-3 left-3 badge-trending z-10"><TrendingUp className="h-3 w-3" /> Trending</div>
      )}
      
      {product.is_best_seller && (
        <div className="absolute top-3 left-3 badge-best-seller z-10"><Star className="h-3 w-3 fill-current" /> Best Seller</div>
      )}

      <Link href={`/products/${product.id}`} className="block relative h-56 bg-gray-50">
        <Image src={product.image_url} alt={product.name} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
      </Link>

      <div className="p-5">
        <Link href={`/products/${product.id}`}>
          <h3 className="font-bold text-lg mb-2 text-fg-heading line-clamp-2 group-hover:text-fg-blue transition">{product.name}</h3>
        </Link>
        
        {product.description && (
          <p className="text-sm text-fg-body mb-3 line-clamp-2">{product.description}</p>
        )}

        <div className="flex items-baseline gap-2 mb-4">
          <span className="text-2xl font-bold text-fg-orange">${product.price.toFixed(2)}</span>
          {product.original_price && (
            <span className="text-sm text-fg-muted line-through">${product.original_price.toFixed(2)}</span>
          )}
        </div>

        <Link href={`/products/${product.id}`} className="btn-primary w-full justify-center text-sm">
          <ExternalLink className="h-4 w-4" />
          View Deal
        </Link>
      </div>
    </article>
  )
}
