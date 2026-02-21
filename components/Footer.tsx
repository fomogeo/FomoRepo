import Link from 'next/link'
import Image from 'next/image'
import { Mail, Twitter, Facebook, Instagram } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gradient-to-b from-white to-gray-50 border-t border-gray-200">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Image src="/logo.png" alt="FomoGeo" width={160} height={55} className="h-12 w-auto mb-4" />
            <p className="text-sm text-fg-body leading-relaxed">
              Your trusted source for verified deals from around the world. Discover trending products and exclusive discounts daily.
            </p>
            <div className="flex space-x-4 mt-4">
              <a href="https://twitter.com/fomogeo" className="text-fg-muted hover:text-fg-blue transition"><Twitter className="h-5 w-5" /></a>
              <a href="https://facebook.com/fomogeo" className="text-fg-muted hover:text-fg-blue transition"><Facebook className="h-5 w-5" /></a>
              <a href="https://instagram.com/fomogeo" className="text-fg-muted hover:text-fg-blue transition"><Instagram className="h-5 w-5" /></a>
            </div>
          </div>

          <div>
            <h3 className="text-base font-bold mb-4 text-fg-heading">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              {[['/', 'Home'], ['/categories', 'Categories'], ['/deals', 'Deals'], ['/blog', 'Blog']].map(([href, label]) => (
                <li key={href}><Link href={href} className="text-fg-body hover:text-fg-blue transition">› {label}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-base font-bold mb-4 text-fg-heading">Legal</h3>
            <ul className="space-y-2 text-sm">
              {[['/legal/privacy', 'Privacy Policy'], ['/legal/terms', 'Terms of Service'], ['/legal/disclosure', 'Affiliate Disclosure'], ['/legal/unsubscribe', 'Unsubscribe']].map(([href, label]) => (
                <li key={href}><Link href={href} className="text-fg-body hover:text-fg-blue transition">› {label}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-base font-bold mb-4 text-fg-heading">Stay Updated</h3>
            <p className="text-sm mb-4 text-fg-body">Get exclusive deals delivered to your inbox</p>
            <Link href="/#email-signup" className="btn-primary inline-flex items-center gap-2 px-5 py-3 text-sm">
              <Mail className="h-4 w-4" />
              Subscribe Free
            </Link>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-gray-200 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-fg-muted">
          <p>© {currentYear} FomoGeo. All rights reserved.</p>
          <p>We may earn a commission from purchases via affiliate links. <Link href="/legal/disclosure" className="link-primary">See disclosure</Link></p>
        </div>
      </div>
    </footer>
  )
}
