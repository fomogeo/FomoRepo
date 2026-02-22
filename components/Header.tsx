import Link from 'next/link'
import { Tag, FileText, Grid3x3 } from 'lucide-react'
import LiveClock from './LiveClock'

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur-sm border-b border-cyan-500/30 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Left: FomoGeo Text + Clock */}
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center hover:opacity-90 transition-opacity shrink-0">
              <span className="text-2xl font-bold">
                <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Fomo</span>
                <span className="bg-gradient-to-r from-orange-400 to-yellow-500 bg-clip-text text-transparent">Geo</span>
              </span>
            </Link>
            <LiveClock />
          </div>

          {/* Right: Navigation */}
          <nav className="flex items-center space-x-2 md:space-x-4 shrink-0">
            <Link href="/categories" className="text-gray-300 hover:text-cyan-400 flex items-center space-x-1 font-semibold text-sm px-3 py-2 rounded-lg hover:bg-slate-800 transition-colors">
              <Grid3x3 className="h-4 w-4" />
              <span className="hidden sm:inline">Categories</span>
            </Link>
            <Link href="/deals" className="text-gray-300 hover:text-cyan-400 flex items-center space-x-1 font-semibold text-sm px-3 py-2 rounded-lg hover:bg-slate-800 transition-colors">
              <Tag className="h-4 w-4" />
              <span className="hidden sm:inline">Deals</span>
            </Link>
            <Link href="/blog" className="text-gray-300 hover:text-cyan-400 flex items-center space-x-1 font-semibold text-sm px-3 py-2 rounded-lg hover:bg-slate-800 transition-colors">
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
