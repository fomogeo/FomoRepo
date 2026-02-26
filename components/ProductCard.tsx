'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

export default function ProductCard({ product }: { product: any }) {
  const [imgError, setImgError] = useState(false)
  
  const hasDiscount = product.discount_percentage && product.discount_percentage > 0
  
  // Fallback image if product image fails
  const imgSrc = imgError 
    ? 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400'
    : product.image_url || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400'

  return (
    <article className="deal-card group">
      {/* Product Image */}
      <Link href={`/products/${product.id}`} className="block relative h-48 overflow-hidden rounded-lg mb-3">
        <Image
          src={imgSrc}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-300"
          onError={() => setImgError(true)}
          unoptimized
        />
        
        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-2">
          {hasDiscount && (
            <span className="discount-badge px-2 py-1 rounded-full text-xs font-bold">
              -{product.discount_percentage}%
            </span>
          )}
          {product.is_trending && (
            <span className="px-2 py-1 rounded-full text-xs font-bold" 
              style={{ background: 'rgba(255,107,0,0.9)', color: '#fff' }}>
              🔥 Trending
            </span>
          )}
          {product.is_best_seller && (
            <span className="px-2 py-1 rounded-full text-xs font-bold"
              style={{ background: 'rgba(255,179,0,0.9)', color: '#071828' }}>
              ⭐ Best Seller
            </span>
          )}
        </div>
      </Link>

      {/* Product Info */}
      <div className="px-3 pb-3">
        {/* Category */}
        <span className="text-xs font-semibold uppercase tracking-wider mb-2 block"
          style={{ color: '#00D4C8' }}>
          {product.category}
        </span>

        {/* Product Name */}
        <Link href={`/products/${product.id}`}>
          <h3 className="font-bold text-base mb-2 line-clamp-2 hover:text-fg-cyan transition-colors cursor-pointer"
            style={{ color: '#E8F4FD' }}>
            {product.name}
          </h3>
        </Link>

        {/* Price */}
        <div className="flex items-baseline gap-2 mb-3">
          <span className="text-2xl font-bold" style={{ color: '#FFB300' }}>
            ${product.price.toFixed(2)}
          </span>
          {product.original_price && product.original_price > product.price && (
            <>
              <span className="text-sm line-through" style={{ color: '#7EB8D8' }}>
                ${product.original_price.toFixed(2)}
              </span>
              <span className="text-xs font-semibold" style={{ color: '#00C853' }}>
                Save ${(product.original_price - product.price).toFixed(2)}
              </span>
            </>
          )}
        </div>

        {/* CTA Button */}
        <Link
          href={`/api/affiliate-router?productId=${product.id}`}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-gold w-full text-center block py-2 px-4 rounded-lg font-bold text-sm"
        >
          View Deal →
        </Link>
      </div>
    </article>
  )
}