export function getAffiliateLink(product: any): string {
  if (!product) return '#'
  
  const baseUrl = product.affiliate_url || product.url || '#'
  
  if (baseUrl.includes('amazon')) {
    return `${baseUrl}?tag=fomogeo-20`
  }
  
  return baseUrl
}

export function trackAffiliateClick(productId: string, affiliateNetwork: string) {
  if (typeof window !== 'undefined') {
    console.log(`Affiliate click tracked: ${productId} via ${affiliateNetwork}`)
  }
}
