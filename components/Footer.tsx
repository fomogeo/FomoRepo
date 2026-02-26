import Link from 'next/link'
import Image from 'next/image'

export default function Footer() {
  return (
    <footer style={{ background: '#0B1E30', borderTop: '1px solid rgba(0,212,200,0.2)' }}>
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          {/* Brand Section */}
          <div className="space-y-4">
            {/* Logo - Original version */}
            <Link href="/" className="flex items-center hover:opacity-80 transition-opacity">
              <Image src="/logo.png" alt="FomoGeo" width={200} height={65} className="h-11 w-auto" />
            </Link>
            
            <p className="text-sm" style={{ color: '#7EB8D8' }}>
              Verified deals from around the world. Find trending products and exclusive discounts.
            </p>
            
            {/* Social Links */}
            <div className="flex gap-4">
              <a 
                href="https://twitter.com/fomogeo" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:opacity-80 transition-opacity"
                style={{ color: '#00D4C8' }}
                aria-label="Twitter"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              
              <a 
                href="https://facebook.com/fomogeo" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:opacity-80 transition-opacity"
                style={{ color: '#00D4C8' }}
                aria-label="Facebook"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              
              <a 
                href="https://pinterest.com/fomogeo" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:opacity-80 transition-opacity"
                style={{ color: '#00D4C8' }}
                aria-label="Pinterest"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.39 18.592.026 11.985.026L12.017 0z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-sm uppercase tracking-wider mb-4" style={{ color: '#E8F4FD' }}>
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/" className="fg-footer-link-teal">Home</Link></li>
              <li><Link href="/categories" className="fg-footer-link-teal">Categories</Link></li>
              <li><Link href="/deals" className="fg-footer-link-teal">All Deals</Link></li>
              <li><Link href="/blog" className="fg-footer-link-teal">Blog</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-bold text-sm uppercase tracking-wider mb-4" style={{ color: '#E8F4FD' }}>
              Legal
            </h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/legal/privacy" className="fg-footer-link-gold">Privacy Policy</Link></li>
              <li><Link href="/legal/terms" className="fg-footer-link-gold">Terms of Service</Link></li>
              <li><Link href="/legal/disclosure" className="fg-footer-link-gold">Affiliate Disclosure</Link></li>
              <li><Link href="/legal/unsubscribe" className="fg-footer-link-gold">Unsubscribe</Link></li>
            </ul>
          </div>

          {/* Stay Updated */}
          <div>
            <h3 className="font-bold text-sm uppercase tracking-wider mb-4" style={{ color: '#E8F4FD' }}>
              Stay Updated
            </h3>
            <p className="text-sm mb-4" style={{ color: '#7EB8D8' }}>
              Get the latest deals and exclusive offers delivered to your inbox.
            </p>
            <Link 
              href="/#email-signup" 
              className="btn-gold inline-block px-4 py-2 text-sm font-bold rounded-lg"
            >
              Subscribe Now
            </Link>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 border-t" style={{ borderColor: 'rgba(0,212,200,0.1)' }}>
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm" style={{ color: '#7EB8D8' }}>
              © {new Date().getFullYear()} FomoGeo. All rights reserved.
            </p>
            <p className="text-xs" style={{ color: '#4A7A9B' }}>
              We earn commissions from qualifying purchases as an Amazon Associate and through other affiliate programs.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
