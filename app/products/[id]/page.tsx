export const dynamic = 'force-dynamic'

import { notFound } from 'next/navigation'
import Image from 'next/image'
import { getProductBySlug, getActiveCoupons } from '@/lib/supabase'
import { ExternalLink, Tag, Star, TrendingUp } from 'lucide-react'
import Link from 'next/link'

interface ProductPageProps {
  params: {
    id: string
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const product = await getProductBySlug(params.id)
  
  if (!product) {
    notFound()
  }

  const coupons = await getActiveCoupons()
  const productCoupons = coupons.filter(c => !c.product_id || c.product_id === product.id)

  const discount = product.discount_percentage
  const hasDiscount = discount && discount > 0

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        {/* Breadcrumb */}
        <div className="mb-6 text-sm text-gray-600">
          <Link href="/" className="hover:text-primary-600">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/deals" className="hover:text-primary-600">Deals</Link>
          <span className="mx-2">/</span>
          <span>{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="relative">
            <div className="relative h-96 lg:h-[500px] bg-gray-100 rounded-lg overflow-hidden">
              <Image
                src={product.image_url || '/placeholder-product.jpg'}
                alt={product.name}
                fill
                className="object-contain"
                priority
              />
              
              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {product.is_trending && (
                  <span className="fomo-badge flex items-center space-x-1">
                    <TrendingUp className="h-4 w-4" />
                    <span>Trending</span>
                  </span>
                )}
                {hasDiscount && (
                  <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {discount}% OFF
                  </span>
                )}
              </div>

              {product.is_best_seller && (
                <div className="absolute top-4 right-4">
                  <Star className="h-8 w-8 text-yellow-400 fill-yellow-400" />
                </div>
              )}
            </div>
          </div>

          {/* Product Info */}
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {product.name}
            </h1>

            {/* Tags */}
            {product.tags && product.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {product.tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            {/* Price */}
            <div className="mb-8">
              <div className="flex items-baseline space-x-3 mb-2">
                <span className="text-5xl font-bold text-gray-900">
                  ${product.price.toFixed(2)}
                </span>
                {product.original_price && product.original_price > product.price && (
                  <span className="text-2xl text-gray-500 line-through">
                    ${product.original_price.toFixed(2)}
                  </span>
                )}
              </div>
              {hasDiscount && (
                <p className="text-green-600 font-semibold">
                  You save ${(product.original_price! - product.price).toFixed(2)} ({discount}%)
                </p>
              )}
            </div>

            {/* Description */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">About This Product</h2>
              <p className="text-gray-700 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Coupons */}
            {productCoupons.length > 0 && (
              <div className="mb-8 bg-yellow-50 border-2 border-yellow-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                  <Tag className="h-5 w-5 mr-2 text-yellow-600" />
                  Available Coupons
                </h3>
                <div className="space-y-2">
                  {productCoupons.map((coupon) => (
                    <div key={coupon.id} className="flex items-center justify-between bg-white p-3 rounded">
                      <div>
                        <code className="bg-gray-100 px-2 py-1 rounded font-mono font-semibold">
                          {coupon.code}
                        </code>
                        <p className="text-sm text-gray-600 mt-1">{coupon.description}</p>
                      </div>
                      <span className="text-green-600 font-semibold">
                        {coupon.discount_type === 'percentage' 
                          ? `${coupon.discount_value}% OFF`
                          : `$${coupon.discount_value} OFF`
                        }
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* CTA Button */}
            <div className="space-y-4">
              <Link
                href={`/api/affiliate-router?productId=${product.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="cta-button w-full flex items-center justify-center space-x-2 text-lg py-4"
              >
                <span>View This Deal</span>
                <ExternalLink className="h-5 w-5" />
              </Link>

              <p className="text-xs text-gray-500 text-center">
                This is an affiliate link. We may earn a commission if you make a purchase.
                <Link href="/legal/disclosure" className="text-primary-600 hover:underline ml-1">
                  Learn more
                </Link>
              </p>
            </div>

            {/* Additional Info */}
            <div className="mt-8 border-t pt-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Details</h3>
              <dl className="space-y-3">
                <div className="flex justify-between">
                  <dt className="text-gray-600">Category:</dt>
                  <dd className="font-semibold">{product.category}</dd>
                </div>
                {product.is_trending && (
                  <div className="flex justify-between">
                    <dt className="text-gray-600">Status:</dt>
                    <dd className="font-semibold text-primary-600">🔥 Trending Now</dd>
                  </div>
                )}
                {product.is_best_seller && (
                  <div className="flex justify-between">
                    <dt className="text-gray-600">Recognition:</dt>
                    <dd className="font-semibold text-yellow-600">⭐ Best Seller</dd>
                  </div>
                )}
              </dl>
            </div>
          </div>
        </div>

        {/* Legal Disclaimer */}
        <div className="mt-12 bg-gray-50 rounded-lg p-6 text-sm text-gray-600">
          <p className="mb-2">
            <strong>Disclaimer:</strong> Prices and availability are subject to change. 
            We make every effort to provide accurate information, but please verify on 
            the merchant's website before making a purchase.
          </p>
          <p>
            We are a participant in various affiliate programs and may earn commissions 
            from qualifying purchases made through our links, at no additional cost to you.
          </p>
        </div>
      </div>
    </div>
  )
}
