import Link from 'next/link'
import Image from 'next/image'
import { Mail, Twitter, Facebook, Instagram } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer style={{ background: '#050E1A', borderTop: '1px solid rgba(0,212,200,0.15)' }}>
      {/* Top glow line */}
      <div style={{ height: 2, background: 'linear-gradient(90deg, transparent, #00D4C8, #FFB300, #FF6B00, #00D4C8, transparent)' }} />

      <div className="container mx-auto px-4 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

          {/* Brand */}
          <div>
            <Image src="/logo.png" alt="FomoGeo" width={160} height={55} className="h-12 w-auto mb-4" />
            <p className="text-sm leading-relaxed" style={{ color: '#7EB8D8' }}>
              Your trusted source for verified deals from around the world.
              Discover trending products and exclusive discounts daily.
            </p>
            <div className="flex space-x-4 mt-5">
              {[
                { href: 'https://twitter.com/fomogeo', Icon: Twitter, color: '#00D4C8' },
                { href: 'https://facebook.com/fomogeo', Icon: Facebook, color: '#4A90D9' },
                { href: 'https://instagram.com/fomogeo', Icon: Instagram, color: '#FF6B00' },
              ].map(({ href, Icon, color }) => (
                <a key={href} href={href} target="_blank" rel="noopener noreferrer"
                  className="transition-all hover:scale-110"
                  style={{ color: '#7EB8D8' }}
                  onMouseEnter={e => (e.currentTarget.style.color = color)}
                  onMouseLeave={e => (e.currentTarget.style.color = '#7EB8D8')}
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-base font-bold mb-5 uppercase tracking-wider" style={{ color: '#00D4C8' }}>
              Quick Links
            </h3>
            <ul className="space-y-3 text-sm">
              {[['/', 'Home'], ['/categories', 'Categories'], ['/deals', 'Deals'], ['/blog', 'Blog']].map(([href, label]) => (
                <li key={href}>
                  <Link href={href} className="transition-colors hover:translate-x-1 inline-flex items-center gap-1"
                    style={{ color: '#7EB8D8' }}
                    onMouseEnter={e => (e.currentTarget.style.color = '#00D4C8')}
                    onMouseLeave={e => (e.currentTarget.style.color = '#7EB8D8')}
                  >
                    <span style={{ color: '#00D4C8' }}>›</span> {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-base font-bold mb-5 uppercase tracking-wider" style={{ color: '#FFB300' }}>
              Legal
            </h3>
            <ul className="space-y-3 text-sm">
              {[
                ['/legal/privacy', 'Privacy Policy'],
                ['/legal/terms', 'Terms of Service'],
                ['/legal/disclosure', 'Affiliate Disclosure'],
                ['/legal/unsubscribe', 'Unsubscribe'],
              ].map(([href, label]) => (
                <li key={href}>
                  <Link href={href} className="transition-colors"
                    style={{ color: '#7EB8D8' }}
                    onMouseEnter={e => (e.currentTarget.style.color = '#FFB300')}
                    onMouseLeave={e => (e.currentTarget.style.color = '#7EB8D8')}
                  >
                    <span style={{ color: '#FFB300' }}>›</span> {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-base font-bold mb-5 uppercase tracking-wider" style={{ color: '#00C853' }}>
              Stay Updated
            </h3>
            <p className="text-sm mb-4" style={{ color: '#7EB8D8' }}>Get exclusive deals delivered to your inbox</p>
            <Link href="/#email-signup"
              className="btn-gold inline-flex items-center gap-2 px-5 py-3 text-sm"
            >
              <Mail className="h-4 w-4" />
              Subscribe Free
            </Link>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-3 text-xs" style={{ borderTop: '1px solid rgba(0,212,200,0.1)', color: '#4A7A9B' }}>
          <p>© {currentYear} FomoGeo. All rights reserved.</p>
          <p>
            We may earn a commission from purchases made through our affiliate links. &nbsp;
            <Link href="/legal/disclosure" className="hover:text-fg-teal transition-colors" style={{ color: '#00D4C8' }}>See disclosure</Link>
          </p>
        </div>
      </div>
    </footer>
  )
}
