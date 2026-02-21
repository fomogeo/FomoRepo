import Link from 'next/link'
import Image from 'next/image'
import { Tag, FileText, Grid3x3 } from 'lucide-react'
import LiveClock from './LiveClock'

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 gap-4">
          <Link href="/" className="flex items-center hover:opacity-90 transition-opacity shrink-0">
            <Image src="/logo.png" alt="FomoGeo" width={200} height={65} className="h-11 w-auto" priority />
          </Link>

          {/* Issue 3 FIX: Clock now ALWAYS visible (removed hidden md:flex) */}
          <LiveClock />

          <nav className="flex items-center space-x-2 md:space-x-4 shrink-0">
            <Link href="/categories" className="text-fg-body hover:text-fg-blue flex items-center space-x-1 font-semibold text-sm px-2 py-1 rounded-lg hover:bg-sky-gradient transition-colors">
              <Grid3x3 className="h-4 w-4" />
              <span className="hidden sm:inline">Categories</span>
            </Link>
            <Link href="/deals" className="text-fg-body hover:text-fg-blue flex items-center space-x-1 font-semibold text-sm px-2 py-1 rounded-lg hover:bg-sky-gradient transition-colors">
              <Tag className="h-4 w-4" />
              <span className="hidden sm:inline">Deals</span>
            </Link>
            <Link href="/blog" className="text-fg-body hover:text-fg-blue flex items-center space-x-1 font-semibold text-sm px-2 py-1 rounded-lg hover:bg-sky-gradient transition-colors">
              <FileText className="h-4 w-4" />
              <span className="hidden sm:inline">Blog</span>
            </Link>
            <Link href="/#email-signup" className="btn-orange px-4 py-2 text-sm whitespace-nowrap">
              🔥 Get Deals
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}
