import Link from 'next/link'
import Image from 'next/image'
import { Mail, Facebook, Instagram } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer style={{ background: '#050E1A', borderTop: '1px solid rgba(0,212,200,0.15)' }}>
      <div style={{ height: 2, background: 'linear-gradient(90deg, transparent, #00D4C8, #FFB300, #FF6B00, #00D4C8, transparent)' }} />

      <div className="container mx-auto px-4 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

          {/* Brand */}
          <div>
            <Link href="/" className="inline-block hover:opacity-80 transition-opacity">
              <Image src="/logo.png" alt="FomoGeo" width={160} height={55} className="h-12 w-auto mb-4" />
            </Link>
            <p className="text-sm leading-relaxed" style={{ color: '#7EB8D8' }}>
              Your trusted source for verified deals from around the world.
              Discover trending products and exclusive discounts daily.
            </p>
            <div className="flex space-x-4 mt-5">
              {/* X (Twitter) Icon */}
              <a href="https://x.com/fomogeo_" target="_blank" rel="noopener noreferrer" className="fg-footer-link-teal transition-all hover:scale-110" aria-label="X (Twitter)">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              
              {/* Facebook Icon */}
              <a href="https://www.facebook.com/profile.php?id=61587989941776" target="_blank" rel="noopener noreferrer" className="fg-footer-link-teal transition-all hover:scale-110" aria-label="Facebook">
                <Facebook className="h-5 w-5" />
              </a>
              
              {/* Instagram Icon */}
              <a href="https://instagram.com/fomogeo" target="_blank" rel="noopener noreferrer" className="fg-footer-link-teal transition-all hover:scale-110" aria-label="Instagram">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-base font-bold mb-5 uppercase tracking-wider" style={{ color: '#00D4C8' }}>Quick Links</h3>
            <ul className="space-y-3 text-sm">
              {[['/', 'Home'], ['/categories', 'Categories'], ['/deals', 'Deals'], ['/blog', 'Blog']].map(([href, label]) => (
                <li key={href}>
                  <Link href={href} className="fg-footer-link-teal inline-flex items-center gap-1">
                    <span style={{ color: '#00D4C8' }}>›</span> {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-base font-bold mb-5 uppercase tracking-wider" style={{ color: '#FFB300' }}>Legal</h3>
            <ul className="space-y-3 text-sm">
              {[
                ['/legal/privacy', 'Privacy Policy'],
                ['/legal/terms', 'Terms of Service'],
                ['/legal/disclosure', 'Affiliate Disclosure'],
                ['/legal/unsubscribe', 'Unsubscribe'],
              ].map(([href, label]) => (
                <li key={href}>
                  <Link href={href} className="fg-footer-link-gold inline-flex items-center gap-1">
                    <span style={{ color: '#FFB300' }}>›</span> {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-base font-bold mb-5 uppercase tracking-wider" style={{ color: '#00C853' }}>Stay Updated</h3>
            <p className="text-sm mb-4" style={{ color: '#7EB8D8' }}>Get exclusive deals delivered to your inbox</p>
            <Link href="/#email-signup" className="btn-gold inline-flex items-center gap-2 px-5 py-3 text-sm">
              <Mail className="h-4 w-4" />
              Subscribe Free
            </Link>
          </div>
        </div>

        <div className="mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-3 text-xs"
          style={{ borderTop: '1px solid rgba(0,212,200,0.1)', color: '#4A7A9B' }}>
          <p>© {currentYear} FomoGeo. All rights reserved.</p>
          <p>
            We may earn a commission from purchases via affiliate links. &nbsp;
            <Link href="/legal/disclosure" className="fg-footer-link-teal">See disclosure</Link>
          </p>
        </div>
      </div>
    </footer>
  )
}
