import Link from 'next/link'
import Image from 'next/image'
import { Mail, Twitter, Facebook, Instagram } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About with Logo */}
          <div>
            <Image 
              src="/logo.png" 
              alt="FomoGeo" 
              width={160} 
              height={55}
              className="h-12 w-auto mb-4"
            />
            <p className="text-slate-400 text-sm">
              Your trusted source for verified deals from around the world. 
              Discover trending products and exclusive discounts daily.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-blue-400">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-slate-400 hover:text-blue-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/categories" className="text-slate-400 hover:text-blue-400 transition-colors">
                  Categories
                </Link>
              </li>
              <li>
                <Link href="/deals" className="text-slate-400 hover:text-blue-400 transition-colors">
                  Deals
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-slate-400 hover:text-blue-400 transition-colors">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-orange-400">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/legal/privacy" className="text-slate-400 hover:text-orange-400 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/legal/terms" className="text-slate-400 hover:text-orange-400 transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/legal/disclosure" className="text-slate-400 hover:text-orange-400 transition-colors">
                  Affiliate Disclosure
                </Link>
              </li>
            </ul>
          </div>

          {/* Social & Newsletter */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-green-400">Connect</h3>
            <div className="flex space-x-4 mb-4">
              <a 
                href="https://twitter.com/fomogeo" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-blue-400 transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a 
                href="https://facebook.com/fomogeo" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-blue-600 transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a 
                href="https://instagram.com/fomogeo" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-pink-500 transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>
            </div>
            <Link 
              href="/#email-signup"
              className="inline-flex items-center space-x-2 text-sm text-slate-400 hover:text-white transition-colors"
            >
              <Mail className="h-4 w-4" />
              <span>Subscribe to deals</span>
            </Link>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-700 mt-8 pt-8 text-center text-sm text-slate-400">
          <p>&copy; {currentYear} FomoGeo. All rights reserved.</p>
          <p className="mt-2 text-xs">
            We may earn a commission from purchases made through our affiliate links. 
            See our <Link href="/legal/disclosure" className="text-blue-400 hover:underline">disclosure</Link> for details.
          </p>
        </div>
      </div>
    </footer>
  )

                <Link href="/deals" className="text-gray-400 hover:text-white transition-colors">
                  Deals
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-400 hover:text-white transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-gray-400 hover:text-white transition-colors">
                  Products
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/legal/disclosure" className="text-gray-400 hover:text-white transition-colors">
                  Affiliate Disclosure
                </Link>
              </li>
              <li>
                <Link href="/legal/privacy" className="text-gray-400 hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/legal/terms" className="text-gray-400 hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/legal/unsubscribe" className="text-gray-400 hover:text-white transition-colors">
                  Unsubscribe
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Stay Updated</h3>
            <p className="text-gray-400 text-sm mb-4">
              Get the latest deals delivered to your inbox.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Mail className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>© {currentYear} {siteName}. All rights reserved.</p>
          <p className="mt-2">
            We may earn a commission from purchases made through our affiliate links.
          </p>
        </div>
      </div>
    </footer>
  )
}
