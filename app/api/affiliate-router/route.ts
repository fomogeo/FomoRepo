export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'
import { getProductBySlug, AffiliateLink } from '@/lib/supabase'
import { getUserCountry, getAffiliateLink, trackAffiliateClick } from '@/lib/affiliateRouter'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const productId = searchParams.get('productId')

    if (!productId) {
      return NextResponse.json(
        { error: 'Product ID is required' },
        { status: 400 }
      )
    }

    // Get product with affiliate links
    const product = await getProductBySlug(productId)

    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      )
    }

    // Get user's country
    const userCountry = await getUserCountry(request.headers)

    // Get the best affiliate link for this user
	const affiliateUrl = getAffiliateLink(product, userCountry)

    if (!affiliateUrl) {
      return NextResponse.json(
        { error: 'No affiliate link available for your region' },
        { status: 404 }
      )
    }

    // Track the click
	  trackAffiliateClick(product.id, 'direct')

    // Redirect to affiliate link
    return NextResponse.redirect(affiliateUrl)
  } catch (error) {
    console.error('Affiliate routing error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
