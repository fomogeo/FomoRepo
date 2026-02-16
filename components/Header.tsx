import Link from 'next/link'
import Image from 'next/image'
import { Tag, FileText, Grid3x3 } from 'lucide-react'

export default function Header() {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50 border-b border-slate-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center hover:opacity-90 transition-opacity">
            <Image 
              src="/logo.png" 
              alt="FomoGeo - Verified Deals from Around the World" 
              width={200} 
              height={65}
              className="h-14 w-auto"
              priority
            />
          </Link>

          {/* Navigation */}
          <nav className="flex items-center space-x-4 md:space-x-6">
            <Link 
              href="/categories" 
              className="flex items-center space-x-1 text-slate-700 hover:text-blue-600 transition-colors font-medium"
            >
              <Grid3x3 className="h-4 w-4" />
              <span className="hidden sm:inline">Categories</span>
            </Link>
            <Link 
              href="/deals" 
              className="flex items-center space-x-1 text-slate-700 hover:text-blue-600 transition-colors font-medium"
            >
              <Tag className="h-4 w-4" />
              <span className="hidden sm:inline">Deals</span>
            </Link>
            <Link 
              href="/blog" 
              className="flex items-center space-x-1 text-slate-700 hover:text-blue-600 transition-colors font-medium"
            >
              <FileText className="h-4 w-4" />
              <span className="hidden sm:inline">Blog</span>
            </Link>
            <Link 
              href="/#email-signup" 
              className="px-4 py-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold rounded-lg hover:from-orange-600 hover:to-amber-600 transition-all shadow-md hover:shadow-lg"
            >
              Get Deals
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
  const now = new Date()
  const month = now.getMonth() + 1
  
  if (month === 11) {
    return (
      <div className="bg-gradient-to-r from-orange-500 to-red-600 text-white py-2 text-center text-sm font-bold">
        🛍️ Black Friday Sale - Up to 70% Off! Limited Time Only
      </div>
    )
  }

  if (month === 12) {
    return (
      <div className="bg-gradient-to-r from-green-600 to-red-600 text-white py-2 text-center text-sm font-bold">
        🎄 Holiday Deals - Don&apos;t Miss Out!
      </div>
    )
  }

  return null
}
