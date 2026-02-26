import { AffiliateLink } from '@/lib/supabase'

/**
 * Affiliate Router
 * 
 * Routes users to the best affiliate link based on their country
 * Falls back gracefully if no link is available for their region
 */

export interface GeoLocation {
  country_code: string
  country_name: string
}

/**
 * Detect user's country from request headers
 * Works with Vercel's geo headers
 */
export function getUserCountry(headers: Headers): string {
  // Vercel provides geo headers
  const country = headers.get('x-vercel-ip-country') || 
                  headers.get('cf-ipcountry') || // Cloudflare
                  'US' // Default fallback

  return country.toUpperCase()
}

/**
 * Route to the best affiliate link for the user's country
 * Priority: 
 * 1. Exact country match with highest priority
 * 2. Regional fallback (e.g., any EU country for EU products)
 * 3. Global link (country_code = 'GLOBAL')
 * 4. US link as final fallback
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

  // 1. Try exact country match
  const exactMatch = sortedLinks.find(
    link => link.country_code === userCountry
  )
  if (exactMatch) {
    return exactMatch.affiliate_url
  }

  // 2. Try regional fallback for EU countries
  const euCountries = [
    'AT', 'BE', 'BG', 'HR', 'CY', 'CZ', 'DK', 'EE', 'FI', 'FR',
    'DE', 'GR', 'HU', 'IE', 'IT', 'LV', 'LT', 'LU', 'MT', 'NL',
    'PL', 'PT', 'RO', 'SK', 'SI', 'ES', 'SE'
  ]

  if (euCountries.includes(userCountry)) {
    const euLink = sortedLinks.find(link => euCountries.includes(link.country_code))
    if (euLink) {
      return euLink.affiliate_url
    }
  }

  // 3. Try global link
  const globalLink = sortedLinks.find(link => link.country_code === 'GLOBAL')
  if (globalLink) {
    return globalLink.affiliate_url
  }

  // 4. Fallback to US or first available link
  const usLink = sortedLinks.find(link => link.country_code === 'US')
  if (usLink) {
    return usLink.affiliate_url
  }

  // Return first available link
  return sortedLinks[0]?.affiliate_url || null
}

/**
 * Network-specific link generators
 * These functions create affiliate links for specific networks
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
  const tag = process.env.AMAZON_ASSOCIATES_TAG || 'your-tag-20'

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
