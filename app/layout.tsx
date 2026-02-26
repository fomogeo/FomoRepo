import type { Metadata } from 'next'
import { Inter, Space_Grotesk } from 'next/font/google'
import './globals.css'
import Link from 'next/link'
import LiveClock from '@/components/LiveClock'

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

const spaceGrotesk = Space_Grotesk({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-space-grotesk',
})

export const metadata: Metadata = {
  title: {
    template: '%s | FomoGeo - Best Deals from Around the World',
    default: 'FomoGeo - Discover the Best Deals from Around the World',
  },
  description: 'FomoGeo curates verified deals from trusted sellers worldwide. Discover trending products, exclusive discounts, and never miss out on the hottest deals.',
  keywords: ['deals', 'discounts', 'shopping', 'products', 'online shopping', 'best prices', 'affiliate deals', 'trending products'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <head>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4317381401188026"
          crossOrigin="anonymous"
        ></script>
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#1a1f2e" />
      </head>
      <body className="antialiased">
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}

function Header() {
  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-slate-900/95 via-slate-800/95 to-slate-900/95 backdrop-blur-md border-b border-white/10 shadow-lg">
      <div className="container-custom">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <img 
              src="/logo-main.png" 
              alt="FomoGeo" 
              className="h-12 transition-transform group-hover:scale-105"
            />
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="/categories"
              className="text-white/80 hover:text-cyan-400 font-medium transition-colors relative group"
            >
              Categories
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-teal-400 group-hover:w-full transition-all"></span>
            </Link>
            <Link
              href="/deals"
              className="text-white/80 hover:text-cyan-400 font-medium transition-colors relative group"
            >
              Deals
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-teal-400 group-hover:w-full transition-all"></span>
            </Link>
            <Link
              href="/blog"
              className="text-white/80 hover:text-cyan-400 font-medium transition-colors relative group"
            >
              Blog
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-teal-400 group-hover:w-full transition-all"></span>
            </Link>
          </nav>

          {/* Right Side - Clock & Social */}
          <div className="flex items-center gap-6">
            {/* Live Clock */}
            <div className="hidden lg:block text-sm text-cyan-400 font-mono">
              <LiveClock />
            </div>
            
            {/* Social Icons */}
            <div className="hidden md:flex items-center gap-3">
              <a href="https://x.com/fomogeo_" target="_blank" rel="noopener noreferrer" 
                 className="text-white/60 hover:text-cyan-400 transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a href="https://pinterest.com/fomogeo" target="_blank" rel="noopener noreferrer"
                 className="text-white/60 hover:text-red-400 transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 border-t border-white/10 texture-noise">
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <img src="/logo-main.png" alt="FomoGeo" className="h-10 mb-4" />
            <p className="text-slate-400 leading-relaxed">
              Your trusted source for <span className="text-cyan-400 font-semibold">verified deals</span> from around the world.
            </p>
            <div className="flex gap-4 mt-6">
              <a href="https://x.com/fomogeo_" target="_blank" rel="noopener noreferrer"
                 className="text-slate-400 hover:text-cyan-400 transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a href="https://pinterest.com/fomogeo" target="_blank" rel="noopener noreferrer"
                 className="text-slate-400 hover:text-red-400 transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-cyan-400 font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link href="/" className="text-slate-400 hover:text-cyan-400 transition-colors">Home</Link></li>
              <li><Link href="/categories" className="text-slate-400 hover:text-cyan-400 transition-colors">Categories</Link></li>
              <li><Link href="/deals" className="text-slate-400 hover:text-cyan-400 transition-colors">Deals</Link></li>
              <li><Link href="/blog" className="text-slate-400 hover:text-cyan-400 transition-colors">Blog</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-orange-400 font-bold mb-4">Legal</h4>
            <ul className="space-y-2">
              <li><Link href="/legal/privacy" className="text-slate-400 hover:text-orange-400 transition-colors">Privacy Policy</Link></li>
              <li><Link href="/legal/terms" className="text-slate-400 hover:text-orange-400 transition-colors">Terms of Service</Link></li>
              <li><Link href="/legal/disclosure" className="text-slate-400 hover:text-orange-400 transition-colors">Affiliate Disclosure</Link></li>
              <li><Link href="/legal/unsubscribe" className="text-slate-400 hover:text-orange-400 transition-colors">Unsubscribe</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-emerald-400 font-bold mb-4">Stay Updated</h4>
            <p className="text-slate-400 text-sm mb-4">
              Get exclusive deals delivered to your inbox
            </p>
            <Link href="/#email-signup" className="btn btn-primary w-full inline-block text-center">
              📧 Subscribe Free
            </Link>
          </div>
        </div>

        <div className="divider-gradient mb-8"></div>
        
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-400">
          <p>
            © {currentYear} <span className="text-cyan-400 font-semibold">FomoGeo</span>. All rights reserved.
          </p>
          <p>
            We may earn commission via affiliate links.{' '}
            <Link href="/legal/disclosure" className="text-orange-400 hover:text-orange-300 underline">
              See disclosure
            </Link>
          </p>
        </div>
      </div>
    </footer>
  )
}
