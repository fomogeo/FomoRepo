import { AffiliateLink } from '@/lib/supabase'

/**
 * Affiliate Router
 * 
 * Routes users to the best affiliate link based on their country
 * Falls back gracefully if no link is available for their region
 * 
 * CRITICAL: Uses proper Amazon Associate tags for each region
 * Amazon requires different tags for different stores!
 */

export interface GeoLocation {
  country_code: string
  country_name: string
}

/**
 * Detect user's country from request headers
 * Works with Vercel's geo headers
 * 
 * IMPORTANT: Vercel uses ISO 3166-1 alpha-2 codes (e.g., 'GB' for United Kingdom)
 * but Amazon/affiliate systems often use 'UK'. We normalize here.
 */
export function getUserCountry(headers: Headers): string {
  const rawCountry = headers.get('x-vercel-ip-country') || 
                     headers.get('cf-ipcountry') || 
                     'US'

  const country = rawCountry.toUpperCase()

  // Normalize ISO codes to match our affiliate_links table
  const countryMap: Record<string, string> = {
    'GB': 'UK',
  }

  return countryMap[country] || country
}

/**
 * Route to the best affiliate link for the user's country
 * 
 * STRATEGY: Since products are sourced from Amazon US, the US link is
 * always guaranteed to work. Regional links (UK, DE, etc.) may 404 if
 * the ASIN doesn't exist on that regional store.
 * 
 * RECOMMENDED: Set up Amazon OneLink in your Associates dashboard.
 * OneLink automatically redirects international users to their local
 * Amazon store when the product exists there, while keeping the US
 * store as fallback. This means we can safely always use the US link
 * and OneLink handles the rest.
 * 
 * Priority:
 * 1. US link (always works, OneLink handles international redirect)
 * 2. Exact country match (only if you manually verify ASINs exist regionally)
 * 3. First available link as final fallback
 */
export function getAffiliateLink(
  affiliateLinks: AffiliateLink[],
  userCountry: string
): string | null {
  if (!affiliateLinks || affiliateLinks.length === 0) {
    return null
  }

  // Sort by priority (higher priority first)
  const sortedLinks = [...affiliateLinks].sort((a, b) => b.priority - a.priority)

  // Always prefer the US link — it's guaranteed to work since products
  // are scraped from amazon.com. Amazon OneLink will handle redirecting
  // international users to their local store automatically.
  const usLink = sortedLinks.find(link => link.country_code === 'US')
  if (usLink) {
    return usLink.affiliate_url
  }

  // Fallback to first available link
  return sortedLinks[0]?.affiliate_url || null
}

/**
 * ========================================
 * COMPLIANCE FIX: MULTI-REGION AMAZON TAGS
 * Amazon requires DIFFERENT tags for each region!
 * ========================================
 * 
 * Get the correct Amazon Associate tag for a specific country
 * 
 * CRITICAL: You MUST set these environment variables in Vercel:
 * - AMAZON_TAG_US (for amazon.com)
 * - AMAZON_TAG_UK (for amazon.co.uk)
 * - AMAZON_TAG_DE (for amazon.de)
 * - AMAZON_TAG_FR (for amazon.fr)
 * - AMAZON_TAG_IT (for amazon.it)
 * - AMAZON_TAG_ES (for amazon.es)
 * - AMAZON_TAG_CA (for amazon.ca)
 * - AMAZON_TAG_JP (for amazon.co.jp)
 * - AMAZON_TAG_AU (for amazon.com.au)
 * - AMAZON_TAG_IN (for amazon.in)
 * 
 * Example values:
 * - AMAZON_TAG_US=yoursite-20
 * - AMAZON_TAG_UK=yoursite-21
 * - AMAZON_TAG_DE=yoursite1-21
 * - AMAZON_TAG_FR=yoursite0d-21
 */
function getAmazonTag(countryCode: string): string {
  const tagMap: Record<string, string> = {
    US: process.env.AMAZON_TAG_US || process.env.NEXT_PUBLIC_AMAZON_TAG_US || 'fomogeo-20',
    UK: process.env.AMAZON_TAG_UK || process.env.NEXT_PUBLIC_AMAZON_TAG_UK || 'fomogeo-21',
    DE: process.env.AMAZON_TAG_DE || process.env.NEXT_PUBLIC_AMAZON_TAG_DE || 'fomogeo03-21',
    FR: process.env.AMAZON_TAG_FR || process.env.NEXT_PUBLIC_AMAZON_TAG_FR || 'fomogeo0e-21',
    IT: process.env.AMAZON_TAG_IT || process.env.NEXT_PUBLIC_AMAZON_TAG_IT || 'fomogeo02-21',
    ES: process.env.AMAZON_TAG_ES || process.env.NEXT_PUBLIC_AMAZON_TAG_ES || 'fomogeo09-21',
    CA: process.env.AMAZON_TAG_CA || process.env.NEXT_PUBLIC_AMAZON_TAG_CA || 'fomogeo0a-20',
    JP: process.env.AMAZON_TAG_JP || process.env.NEXT_PUBLIC_AMAZON_TAG_JP || 'fomogeo-22',
    AU: process.env.AMAZON_TAG_AU || process.env.NEXT_PUBLIC_AMAZON_TAG_AU || 'fomogeo-22',
    IN: process.env.AMAZON_TAG_IN || process.env.NEXT_PUBLIC_AMAZON_TAG_IN || 'fomogeo-21',
  }

  return tagMap[countryCode] || tagMap.US
}

/**
 * Network-specific link generators
 * Creates properly formatted affiliate links with correct tags
 */
export function createAmazonAffiliateLink(
  asin: string,
  countryCode: string = 'US'
): string {
  const amazonDomains: Record<string, string> = {
    US: 'amazon.com',
    UK: 'amazon.co.uk',
    DE: 'amazon.de',
    FR: 'amazon.fr',
    IT: 'amazon.it',
    ES: 'amazon.es',
    CA: 'amazon.ca',
    JP: 'amazon.co.jp',
    AU: 'amazon.com.au',
    IN: 'amazon.in',
  }

  const domain = amazonDomains[countryCode] || amazonDomains.US
  const tag = getAmazonTag(countryCode)

  // Proper Amazon affiliate link format
  return `https://${domain}/dp/${asin}?tag=${tag}`
}

/**
 * Track affiliate click
 * This can be expanded to include analytics
 */
export async function trackAffiliateClick(
  productId: string,
  affiliateLinkId: string,
  userCountry: string
) {
  // In production, you would log this to your database or analytics service
  console.log('Affiliate click:', {
    productId,
    affiliateLinkId,
    userCountry,
    timestamp: new Date().toISOString(),
  })

  // Example: Send to analytics
  // await fetch('/api/analytics/click', {
  //   method: 'POST',
  //   body: JSON.stringify({ productId, affiliateLinkId, userCountry }),
  // })
}

/**
 * Check if seasonal campaign is active
 */
export function isSeasonalCampaignActive(): {
  isActive: boolean
  campaignType?: 'prime-day' | 'black-friday' | 'cyber-monday' | 'holiday'
  message?: string
} {
  const now = new Date()
  const month = now.getMonth() + 1
  const day = now.getDate()

  // Prime Day (July 11-12)
  if (month === 7 && (day === 11 || day === 12)) {
    return {
      isActive: true,
      campaignType: 'prime-day',
      message: '🎉 Prime Day Deals!',
    }
  }

  // Black Friday (Last Friday of November)
  if (month === 11 && day >= 23 && day <= 29) {
    return {
      isActive: true,
      campaignType: 'black-friday',
      message: '🛍️ Black Friday Sale!',
    }
  }

  // Cyber Monday (Monday after Black Friday)
  if (month === 11 && day >= 26 && day <= 30) {
    return {
      isActive: true,
      campaignType: 'cyber-monday',
      message: '💻 Cyber Monday Deals!',
    }
  }

  // Holiday season (December 1-25)
  if (month === 12 && day <= 25) {
    return {
      isActive: true,
      campaignType: 'holiday',
      message: '🎄 Holiday Deals!',
    }
  }

  return { isActive: false }
}
