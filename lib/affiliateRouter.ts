// Affiliate link routing and tracking

export function getAffiliateLink(product: any): string {
  if (!product) return '#'
  
  const baseUrl = product.affiliate_url || product.url || '#'
  
  // Add affiliate tags based on network
  if (baseUrl.includes('amazon')) {
    return `${baseUrl}${baseUrl.includes('?') ? '&' : '?'}tag=fomogeo-20`
  }
  
  if (baseUrl.includes('awin')) {
    return baseUrl // Awin links usually already have tracking
  }
  
  if (baseUrl.includes('shareasale')) {
    return baseUrl // ShareASale links already have tracking
  }
  
  return baseUrl
}

export function trackAffiliateClick(productId: string, affiliateNetwork: string) {
  if (typeof window !== 'undefined') {
    console.log(`Affiliate click tracked: ${productId} via ${affiliateNetwork}`)
    
    // Track in analytics if available
    if ((window as any).gtag) {
      (window as any).gtag('event', 'affiliate_click', {
        product_id: productId,
        network: affiliateNetwork
      })
    }
  }
}

export async function getUserCountry(): Promise<string> {
  try {
    const response = await fetch('https://ipapi.co/json/')
    const data = await response.json()
    return data.country_code || 'US'
  } catch (error) {
    console.error('Error getting user country:', error)
    return 'US' // Default to US
  }
}

export function getLocalizedAffiliateLink(product: any, countryCode: string): string {
  if (!product) return '#'
  
  const baseUrl = product.affiliate_url || product.url || '#'
  
  // Amazon country-specific domains
  if (baseUrl.includes('amazon')) {
    const amazonDomains: { [key: string]: string } = {
      'US': 'amazon.com',
      'UK': 'amazon.co.uk',
      'DE': 'amazon.de',
      'FR': 'amazon.fr',
      'IT': 'amazon.it',
      'ES': 'amazon.es',
      'CA': 'amazon.ca',
      'JP': 'amazon.co.jp',
      'AU': 'amazon.com.au',
      'IN': 'amazon.in',
    }
    
    const domain = amazonDomains[countryCode] || 'amazon.com'
    
    // Replace domain in URL
    const url = new URL(baseUrl)
    url.hostname = domain
    
    return `${url.toString()}${url.search ? '&' : '?'}tag=fomogeo-20`
  }
  
  return getAffiliateLink(product)
}

export interface AffiliateMetrics {
  clicks: number
  conversions: number
  revenue: number
  commission: number
}

export async function getAffiliateMetrics(productId?: string): Promise<AffiliateMetrics> {
  // This would integrate with your analytics/tracking system
  // Placeholder for now
  return {
    clicks: 0,
    conversions: 0,
    revenue: 0,
    commission: 0
  }
}

export function formatAffiliateUrl(url: string, params?: Record<string, string>): string {
  try {
    const urlObj = new URL(url)
    
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        urlObj.searchParams.set(key, value)
      })
    }
    
    return urlObj.toString()
  } catch (error) {
    console.error('Error formatting affiliate URL:', error)
    return url
  }
}
