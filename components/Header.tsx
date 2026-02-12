import Link from 'next/link'
import { TrendingUp, Tag, Home, FileText } from 'lucide-react'

export default function Header() {
  const siteName = process.env.NEXT_PUBLIC_SITE_NAME || 'FOMO Finds'
  const tagline = process.env.NEXT_PUBLIC_SITE_TAGLINE || "Don't Miss What Everyone Is Buying"

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <TrendingUp className="h-8 w-8 text-primary-600" />
            <div>
              <h1 className="text-xl font-bold text-gray-900">{siteName}</h1>
              <p className="text-xs text-gray-600 hidden sm:block">{tagline}</p>
            </div>
          </Link>

          {/* Navigation */}
          <nav className="flex items-center space-x-6">
            <Link 
              href="/" 
              className="flex items-center space-x-1 text-gray-700 hover:text-primary-600 transition-colors"
            >
              <Home className="h-4 w-4" />
              <span className="hidden sm:inline">Home</span>
            </Link>
            <Link 
              href="/deals" 
              className="flex items-center space-x-1 text-gray-700 hover:text-primary-600 transition-colors"
            >
              <Tag className="h-4 w-4" />
              <span className="hidden sm:inline">Deals</span>
            </Link>
            <Link 
              href="/blog" 
              className="flex items-center space-x-1 text-gray-700 hover:text-primary-600 transition-colors"
            >
              <FileText className="h-4 w-4" />
              <span className="hidden sm:inline">Blog</span>
            </Link>
          </nav>
        </div>
      </div>

      {/* Seasonal Banner */}
      <SeasonalBanner />
    </header>
  )
}

function SeasonalBanner() {
  // This would check for active campaigns
  const now = new Date()
  const month = now.getMonth() + 1
  
  if (month === 11) {
    return (
      <div className="bg-gradient-to-r from-orange-500 to-red-600 text-white py-2 text-center text-sm font-semibold">
        🛍️ Black Friday Sale - Up to 70% Off! Limited Time Only
      </div>
    )
  }

  if (month === 12) {
    return (
      <div className="bg-gradient-to-r from-green-600 to-red-600 text-white py-2 text-center text-sm font-semibold">
        🎄 Holiday Deals - Don&apos;t Miss Out!
      </div>
    )
  }

  return null
}
