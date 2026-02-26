import type { Metadata } from 'next'
import { Inter, Space_Grotesk } from 'next/font/google'
import './globals.css'

// Font optimization
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

// SEO Metadata
export const metadata: Metadata = {
  title: {
    template: '%s | FomoGeo - Best Deals from Around the World',
    default: 'FomoGeo - Discover the Best Deals from Around the World',
  },
  description: 'FomoGeo curates verified deals from trusted sellers worldwide. Discover trending products, exclusive discounts, and never miss out on the hottest deals.',
  keywords: ['deals', 'discounts', 'shopping', 'products', 'online shopping', 'best prices', 'affiliate deals', 'trending products'],
  authors: [{ name: 'FomoGeo Team' }],
  creator: 'FomoGeo',
  publisher: 'FomoGeo',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://fomogeo.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'FomoGeo - Best Deals from Around the World',
    description: 'Discover verified deals from trusted sellers. Trending products, exclusive discounts, daily updates.',
    url: 'https://fomogeo.com',
    siteName: 'FomoGeo',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/hero-light.png',
        width: 1200,
        height: 630,
        alt: 'FomoGeo - Best Deals',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FomoGeo - Best Deals from Around the World',
    description: 'Discover verified deals from trusted sellers worldwide',
    creator: '@fomogeo_',
    images: ['/hero-light.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <head>
        {/* AdSense */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4317381401188026"
          crossOrigin="anonymous"
        ></script>
        
        {/* Preconnect to important domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        
        {/* Theme color */}
        <meta name="theme-color" content="#1a1f2e" />
      </head>
      <body className="antialiased">
        {/* Header */}
        <LegendaryHeader />
        
        {/* Main Content */}
        <main className="min-h-screen">
          {children}
        </main>
        
        {/* Footer */}
        <LegendaryFooter />
      </body>
    </html>
  )
}

// ═══════════════════════════════════════════════════════════
// LEGENDARY HEADER - Semi-Dark with Gradient Accents
// ═══════════════════════════════════════════════════════════

function LegendaryHeader() {
  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-slate-900/95 via-slate-800/95 to-slate-900/95 backdrop-blur-md border-b border-white/10 shadow-lg">
      <div className="container-custom">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a href="/" className="flex items-center gap-3 group">
            <img 
              src="/FomoGeo.png" 
              alt="FomoGeo" 
              className="h-10 transition-transform group-hover:scale-105"
            />
          </a>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {[
              { name: 'Categories', href: '/categories' },
              { name: 'Deals', href: '/deals' },
              { name: 'Blog', href: '/blog' },
            ].map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-white/80 hover:text-cyan-400 font-medium transition-colors relative group"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-teal-400 group-hover:w-full transition-all"></span>
              </a>
            ))}
          </nav>

          {/* CTA Button */}
          <a href="#email-signup" className="btn btn-primary">
            Subscribe Free
          </a>
        </div>
      </div>
    </header>
  )
}

// ═══════════════════════════════════════════════════════════
// LEGENDARY FOOTER - Dark with Colorful Accents
// ═══════════════════════════════════════════════════════════

function LegendaryFooter() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 border-t border-white/10 texture-noise">
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <img src="/FomoGeo.png" alt="FomoGeo" className="h-10 mb-4" />
            <p className="text-secondary leading-relaxed">
              Your trusted source for <span className="text-cyan-400 font-semibold">verified deals</span> from around the world.
            </p>
            <div className="flex gap-4 mt-6">
              {[
                { icon: '𝕏', href: 'https://x.com/fomogeo_', color: 'hover:text-cyan-400' },
                { icon: '📘', href: '#', color: 'hover:text-blue-400' },
                { icon: '📌', href: '#', color: 'hover:text-red-400' },
                { icon: '📷', href: '#', color: 'hover:text-pink-400' },
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-2xl text-white/60 ${social.color} transition-colors`}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="heading-gradient-teal font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {['Home', 'Categories', 'Deals', 'Blog'].map((link) => (
                <li key={link}>
                  <a href="#" className="text-secondary hover:text-cyan-400 transition-colors">
                    › {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="heading-gradient-orange font-bold mb-4">Legal</h4>
            <ul className="space-y-2">
              {['Privacy Policy', 'Terms of Service', 'Affiliate Disclosure', 'Unsubscribe'].map((link) => (
                <li key={link}>
                  <a href="#" className="text-secondary hover:text-orange-400 transition-colors">
                    › {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="heading-gradient-emerald font-bold mb-4">Stay Updated</h4>
            <p className="text-secondary text-sm mb-4">
              Get exclusive deals delivered to your inbox
            </p>
            <a href="#email-signup" className="btn btn-primary w-full">
              📧 Subscribe Free
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="divider-gradient mb-8"></div>
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-secondary">
          <p>
            © {currentYear} <span className="text-cyan-400 font-semibold">FomoGeo</span>. All rights reserved.
          </p>
          <p>
            We may earn commission via affiliate links.{' '}
            <a href="/legal/disclosure" className="text-orange-400 hover:text-orange-300 underline">
              See disclosure
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
