export const dynamic = 'force-dynamic'
import { NextRequest, NextResponse } from 'next/server'
import { getProductBySlug, getAffiliateLinks } from '@/lib/supabase'
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

    // Get the product
    const product = await getProductBySlug(productId)

    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      )
    }

    // Get affiliate links for this product
    const affiliateLinks = await getAffiliateLinks(product.id)

    if (!affiliateLinks || affiliateLinks.length === 0) {
      return NextResponse.json(
        { error: 'No affiliate links available for this product' },
        { status: 404 }
      )
    }

    // Get user's country from headers
    const userCountry = getUserCountry(request.headers)

    // Get the best affiliate link for this user
    const affiliateUrl = getAffiliateLink(affiliateLinks, userCountry)

    if (!affiliateUrl) {
      return NextResponse.json(
        { error: 'No affiliate link available for your region' },
        { status: 404 }
      )
    }

    // Track the click (optional - for analytics)
    const affiliateLinkId = affiliateLinks.find(link => link.affiliate_url === affiliateUrl)?.id
    if (affiliateLinkId) {
      await trackAffiliateClick(product.id, affiliateLinkId, userCountry)
    }

    // Redirect to the affiliate URL
    return NextResponse.redirect(affiliateUrl)
  } catch (error) {
    console.error('Affiliate router error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
