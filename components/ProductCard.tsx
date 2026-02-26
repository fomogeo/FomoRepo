'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Tag, TrendingUp, Star, ExternalLink } from 'lucide-react'
import { Product } from '@/lib/supabase'
import { useState } from 'react'

export default function ProductCard({ product }: { product: Product }) {
  const [imageError, setImageError] = useState(false)
  const hasDiscount = product.discount_percentage && product.discount_percentage > 0

  return (
    <div className="deal-card group relative rounded-2xl overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #0D2840, #091E30)', border: '1px solid #1A3A55' }}
    >
      {/* Image */}
      <div className="relative h-56" style={{ background: '#0B1E30' }}>
        {!imageError ? (
          <Image
            src={product.image_url || '/placeholder-product.jpg'}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="h-full flex items-center justify-center">
            <Tag className="h-16 w-16" style={{ color: '#1A3A55' }} />
          </div>
        )}

        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1.5">
          {product.is_trending && (
            <span className="flex items-center gap-1 px-2 py-1 rounded-full text-xs font-bold"
              style={{ background: 'rgba(255,107,0,0.9)', color: '#fff' }}>
              <TrendingUp className="h-3 w-3" /> Trending
            </span>
          )}
          {hasDiscount && (
            <span className="px-2 py-1 rounded-full text-xs font-bold"
              style={{ background: 'linear-gradient(135deg, #FFB300, #FF6B00)', color: '#fff' }}>
              {product.discount_percentage}% OFF
            </span>
          )}
        </div>

        {product.is_best_seller && (
          <div className="absolute top-2 right-2">
            <Star className="h-6 w-6" style={{ color: '#FFB300', filter: 'drop-shadow(0 0 6px rgba(255,179,0,0.8))' }} fill="#FFB300" />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-semibold line-clamp-2 mb-2 transition-colors" style={{ color: '#E8F4FD' }}>
          {product.name}
        </h3>
        <p className="text-sm line-clamp-2 mb-3" style={{ color: '#7EB8D8' }}>
          {product.description}
        </p>

        {/* Price */}
        <div className="flex items-center gap-3 mb-4">
          <span className="text-2xl font-bold" style={{ color: '#FFB300' }}>
            ${product.price.toFixed(2)}
          </span>
          {product.original_price && product.original_price > product.price && (
            <span className="text-sm line-through" style={{ color: '#4A7A9B' }}>
              ${product.original_price.toFixed(2)}
            </span>
          )}
        </div>

        <Link href={`/products/${product.id}`}
          className="btn-gold w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold">
          View Deal <ExternalLink className="h-4 w-4" />
        </Link>
      </div>
    </div>
  )
}
