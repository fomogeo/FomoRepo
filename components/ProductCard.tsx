'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Tag, TrendingUp, Star, ExternalLink } from 'lucide-react'
import { Product } from '@/lib/supabase'
import { useState } from 'react'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const [imageError, setImageError] = useState(false)

  const discount = product.discount_percentage
  const hasDiscount = discount && discount > 0

  return (
    <div className="deal-card group">
      {/* Image */}
      <div className="relative h-64 bg-gray-100">
        {!imageError ? (
          <Image
            src={product.image_url || '/placeholder-product.jpg'}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="h-full flex items-center justify-center bg-gray-200">
            <Tag className="h-16 w-16 text-gray-400" />
          </div>
        )}

        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-2">
          {product.is_trending && (
            <span className="fomo-badge flex items-center space-x-1">
              <TrendingUp className="h-3 w-3" />
              <span>Trending</span>
            </span>
          )}
          {hasDiscount && (
            <span className="bg-green-600 text-white px-2 py-1 rounded-full text-xs font-semibold">
              {discount}% OFF
            </span>
          )}
        </div>

        {product.is_best_seller && (
          <div className="absolute top-2 right-2">
            <Star className="h-6 w-6 text-yellow-400 fill-yellow-400" />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 line-clamp-2 mb-2 group-hover:text-primary-600 transition-colors">
          {product.name}
        </h3>

        <p className="text-sm text-gray-600 line-clamp-2 mb-3">
          {product.description}
        </p>

        {/* Price */}
        <div className="flex items-center space-x-2 mb-4">
          <span className="text-2xl font-bold text-gray-900">
            ${product.price.toFixed(2)}
          </span>
          {product.original_price && product.original_price > product.price && (
            <span className="text-sm text-gray-500 line-through">
              ${product.original_price.toFixed(2)}
            </span>
          )}
        </div>

        {/* CTA */}
        <Link
          href={`/products/${product.id}`}
          className="cta-button w-full flex items-center justify-center space-x-2"
        >
          <span>View Deal</span>
          <ExternalLink className="h-4 w-4" />
        </Link>
      </div>
    </div>
  )
}
