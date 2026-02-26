import Link from 'next/link'
import { Tag, FileText, Grid3x3 } from 'lucide-react'
import LiveClock from './LiveClock'

export default function Header() {
  return (
    <header
      className="sticky top-0 z-50"
      style={{
        background: 'rgba(7, 24, 40, 0.95)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(0, 212, 200, 0.2)',
        boxShadow: '0 4px 30px rgba(0,0,0,0.5)',
      }}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Logo - Links to Homepage */}
          <Link href="/" className="flex items-center gap-2 hover:opacity-90 transition-opacity shrink-0">
            {/* Text logo as fallback if image doesn't load */}
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold" style={{ color: '#00D4C8' }}>Fomo</span>
              <span className="text-2xl font-bold" style={{ color: '#FFB300' }}>Geo</span>
            </div>
          </Link>
          
          {/* CLOCK - Always visible */}
          <div 
            className="flex items-center clock-container"
            style={{
              minWidth: '180px',
              flex: '0 0 auto'
            }}
          >
            <LiveClock />
          </div>
          
          {/* Navigation */}
          <nav className="flex items-center space-x-2 md:space-x-4 shrink-0">
            <Link href="/categories" className="fg-nav-link flex items-center space-x-1 font-semibold text-sm px-2 py-1 rounded-lg hover:bg-white/5">
              <Grid3x3 className="h-4 w-4" />
              <span className="hidden sm:inline">Categories</span>
            </Link>
            <Link href="/deals" className="fg-nav-link flex items-center space-x-1 font-semibold text-sm px-2 py-1 rounded-lg hover:bg-white/5">
              <Tag className="h-4 w-4" />
              <span className="hidden sm:inline">Deals</span>
            </Link>
            <Link href="/blog" className="fg-nav-link flex items-center space-x-1 font-semibold text-sm px-2 py-1 rounded-lg hover:bg-white/5">
              <FileText className="h-4 w-4" />
              <span className="hidden sm:inline">Blog</span>
            </Link>
            <Link href="/#email-signup" className="btn-gold px-4 py-2 text-sm whitespace-nowrap">
              🔥 Get Deals
            </Link>
          </nav>
        </div>
      </div>
      <SeasonalBanner />
    </header>
  )
}

function SeasonalBanner() {
  const month = new Date().getMonth() + 1
  if (month === 11) return (
    <div className="py-2 text-center text-sm font-bold text-white" style={{ background: 'linear-gradient(90deg, #FF6B00, #FFB300, #FF6B00)' }}>
      🛍️ Black Friday Sale – Up to 70% Off! Limited Time Only
    </div>
  )
  if (month === 12) return (
    <div className="py-2 text-center text-sm font-bold text-white" style={{ background: 'linear-gradient(90deg, #00C853, #00D4C8)' }}>
      🎄 Holiday Deals – Don&apos;t Miss Out!
    </div>
  )
  return null
}
