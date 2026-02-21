export const dynamic = 'force-dynamic'

import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { getProductById } from '@/lib/supabase'
import { ExternalLink, TrendingUp, Star, ShoppingCart } from 'lucide-react'

export default async function ProductPage({ params }: { params: { id: string } }) {
  const product = await getProductById(params.id)
  
  if (!product) {
    notFound()
  }

  return (
    <div className="min-h-screen section-dark">
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-12">
          {/* Product Image */}
          <div className="relative aspect-square rounded-2xl overflow-hidden bg-slate-800 border border-cyan-500/30">
            <Image
              src={product.image_url}
              alt={product.name}
              fill
              className="object-cover"
            />
            {product.discount_percentage && product.discount_percentage > 0 && (
              <div className="discount-badge">-{product.discount_percentage}%</div>
            )}
            {product.is_trending && (
              <div className="absolute top-3 left-3 badge-trending z-10">
                <TrendingUp className="h-3 w-3" /> Trending
              </div>
            )}
            {product.is_best_seller && (
              <div className="absolute top-3 left-3 badge-best-seller z-10">
                <Star className="h-3 w-3 fill-current" /> Best Seller
              </div>
            )}
          </div>

          {/* Product Info */}
          <div>
            <div className="mb-4">
              <Link
                href={`/category/${product.category}`}
                className="text-cyan-400 hover:text-cyan-300 text-sm font-semibold"
              >
                {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
              </Link>
            </div>

            <h1 className="text-4xl font-bold mb-4 text-white">{product.name}</h1>

            {product.tags && product.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {product.tags.map((tag: string) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-700 text-cyan-300 border border-cyan-500/30"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            {/* Price */}
            <div className="mb-8 p-6 rounded-xl bg-gradient-to-r from-cyan-900/30 to-blue-900/30 border border-cyan-500/30">
              <div className="flex items-baseline gap-3 mb-2">
                <span className="text-5xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                  ${product.price.toFixed(2)}
                </span>
                {product.original_price && (
                  <span className="text-xl text-gray-400 line-through">
                    ${product.original_price.toFixed(2)}
                  </span>
                )}
              </div>
              {product.original_price && (
                <p className="text-green-400 font-semibold">
                  Save ${(product.original_price - product.price).toFixed(2)}
                  {product.discount_percentage && ` (${product.discount_percentage}% off)`}
                </p>
              )}
            </div>

            {/* CTA */}
            <Link
              href={`/api/affiliate-router?productId=${product.id}`}
              className="btn-primary w-full justify-center text-lg py-4 mb-6"
              target="_blank"
            >
              <ShoppingCart className="h-5 w-5" />
              View This Deal
              <ExternalLink className="h-5 w-5" />
            </Link>

            {/* Description */}
            {product.description && (
              <div className="prose prose-invert max-w-none">
                <h2 className="text-2xl font-bold mb-4 text-white">Product Details</h2>
                <p className="text-gray-300 leading-relaxed">{product.description}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
