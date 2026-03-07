import Link from 'next/link'
import Image from 'next/image'
import { Tag, FileText, Grid3x3, Users, Mail } from 'lucide-react'
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
      {/* Top Row: Logo + Clock + CTA */}
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-14">
          
          {/* Logo */}
          <Link href="/" className="flex items-center hover:opacity-90 transition-opacity shrink-0">
            <Image src="/logo.png" alt="FomoGeo" width={160} height={55} className="h-10 w-auto" priority />
          </Link>

          {/* Clock - desktop only */}
          <div className="hidden md:flex items-center clock-container" style={{ minWidth: '180px', flex: '0 0 auto' }}>
            <LiveClock />
          </div>

          {/* Get Deals CTA */}
          <Link href="/#email-signup" className="btn-gold px-4 py-2 text-sm whitespace-nowrap shrink-0">
            🔥 Get Deals
          </Link>
        </div>
      </div>

      {/* Thin separator */}
      <div style={{ height: '1px', background: 'linear-gradient(90deg, transparent, rgba(0,212,200,0.15), transparent)' }} />

      {/* Bottom Row: Navigation */}
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-center gap-1 sm:gap-2 h-11 overflow-x-auto">
          <Link href="/categories" className="fg-nav-link flex items-center gap-1.5 font-semibold text-sm px-3 py-1.5 rounded-lg hover:bg-white/5 whitespace-nowrap">
            <Grid3x3 className="h-4 w-4" />
            <span>Categories</span>
          </Link>
          <Link href="/deals" className="fg-nav-link flex items-center gap-1.5 font-semibold text-sm px-3 py-1.5 rounded-lg hover:bg-white/5 whitespace-nowrap">
            <Tag className="h-4 w-4" />
            <span>Deals</span>
          </Link>
          <Link href="/blog" className="fg-nav-link flex items-center gap-1.5 font-semibold text-sm px-3 py-1.5 rounded-lg hover:bg-white/5 whitespace-nowrap">
            <FileText className="h-4 w-4" />
            <span>Blog</span>
          </Link>
          <Link href="/about" className="fg-nav-link flex items-center gap-1.5 font-semibold text-sm px-3 py-1.5 rounded-lg hover:bg-white/5 whitespace-nowrap">
            <Users className="h-4 w-4" />
            <span>About</span>
          </Link>
          <Link href="/contact" className="fg-nav-link flex items-center gap-1.5 font-semibold text-sm px-3 py-1.5 rounded-lg hover:bg-white/5 whitespace-nowrap">
            <Mail className="h-4 w-4" />
            <span>Contact</span>
          </Link>
        </nav>
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
