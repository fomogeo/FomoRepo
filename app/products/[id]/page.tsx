export const dynamic = 'force-dynamic'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { getProductById } from '@/lib/supabase'
import { Tag, ExternalLink, Clock } from 'lucide-react'

export default async function ProductDetailPage({ params }: { params: { id: string } }) {
  const product = await getProductById(params.id)

  if (!product) {
    notFound()
  }

  const hasDiscount = product.discount_percentage && product.discount_percentage > 0

  return (
    <div className="min-h-screen py-16" style={{ background: '#071828' }}>
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          {/* Product Card with Background */}
          <div className="rounded-xl shadow-2xl overflow-hidden" style={{ background: '#0D2840', border: '1px solid rgba(0,212,200,0.2)' }}>
            <div className="grid md:grid-cols-2 gap-8 p-8">
              
              {/* Product Image */}
              <div className="relative aspect-square rounded-lg overflow-hidden" style={{ background: 'rgba(0,0,0,0.3)' }}>
                <Image
                  src={product.image_url || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600'}
                  alt={product.name}
                  fill
                  className="object-cover"
                  priority
                />
                
                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  {hasDiscount && (
                    <span className="px-3 py-1 rounded-full text-sm font-bold" style={{ background: '#FF6B00', color: '#fff' }}>
                      -{product.discount_percentage}% OFF
                    </span>
                  )}
                  {product.is_trending && (
                    <span className="px-3 py-1 rounded-full text-sm font-bold" style={{ background: '#FF6B00', color: '#fff' }}>
                      🔥 Trending
                    </span>
                  )}
                  {product.is_best_seller && (
                    <span className="px-3 py-1 rounded-full text-sm font-bold" style={{ background: '#FFB300', color: '#071828' }}>
                      ⭐ Best Seller
                    </span>
                  )}
                </div>
              </div>

              {/* Product Details */}
              <div className="flex flex-col justify-between">
                {/* Category */}
                <div className="mb-4">
                  <Link href={`/category/${product.category}`} className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider hover:opacity-80 transition-opacity" style={{ color: '#00D4C8' }}>
                    <Tag className="h-4 w-4" />
                    {product.category}
                  </Link>
                </div>

                {/* Product Name */}
                <h1 className="text-4xl font-bold mb-4" style={{ color: '#E8F4FD' }}>
                  {product.name}
                </h1>

                {/* Description */}
                {product.description && (
                  <p className="text-lg mb-6 leading-relaxed" style={{ color: '#B8D4E8' }}>
                    {product.description}
                  </p>
                )}

                {/* Price Section */}
                <div className="mb-6 p-6 rounded-lg" style={{ background: 'rgba(0,212,200,0.1)', border: '1px solid rgba(0,212,200,0.3)' }}>
                  <div className="flex items-baseline gap-3 mb-2">
                    <span className="text-4xl font-bold" style={{ color: '#FFB300' }}>
                      ${product.price.toFixed(2)}
                    </span>
                    {product.original_price && product.original_price > product.price && (
                      <>
                        <span className="text-xl line-through" style={{ color: '#7EB8D8' }}>
                          ${product.original_price.toFixed(2)}
                        </span>
                        <span className="text-lg font-semibold px-3 py-1 rounded-full" style={{ background: '#00C853', color: '#fff' }}>
                          Save ${(product.original_price - product.price).toFixed(2)}
                        </span>
                      </>
                    )}
                  </div>
                  {hasDiscount && (
                    <p className="text-sm" style={{ color: '#7EB8D8' }}>
                      <Clock className="inline h-4 w-4 mr-1" />
                      Limited time deal - save {product.discount_percentage}% now!
                    </p>
                  )}
                </div>

                {/* CTA Button */}
                <Link
                  href={`/api/affiliate-router?productId=${product.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-gold w-full text-center py-4 px-6 rounded-lg font-bold text-lg flex items-center justify-center gap-2 transition-all hover:scale-105"
                >
                  View Deal <ExternalLink className="h-5 w-5" />
                </Link>

                {/* Trust Signal */}
                <p className="text-xs text-center mt-4" style={{ color: '#7EB8D8' }}>
                  ✓ Price verified today | ✓ Secure checkout | ✓ Free returns
                </p>
              </div>
            </div>

            {/* Additional Info Section */}
            {product.tags && product.tags.length > 0 && (
              <div className="px-8 pb-8">
                <div className="p-6 rounded-lg" style={{ background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(0,212,200,0.2)' }}>
                  <h2 className="text-lg font-bold mb-3" style={{ color: '#00D4C8' }}>Product Tags</h2>
                  <div className="flex flex-wrap gap-2">
                    {product.tags.map((tag: string, index: number) => (
                      <span
                        key={index}
                        className="px-3 py-1 rounded-full text-sm font-semibold"
                        style={{ background: 'rgba(0,212,200,0.2)', color: '#00E5FF', border: '1px solid rgba(0,212,200,0.3)' }}
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Back to Deals Button */}
          <div className="mt-8 text-center">
            <Link href="/deals" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold hover:opacity-80 transition-opacity" style={{ background: 'rgba(0,212,200,0.1)', color: '#00D4C8', border: '1px solid rgba(0,212,200,0.3)' }}>
              ← Back to All Deals
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
