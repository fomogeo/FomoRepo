import Link from 'next/link'
import Image from 'next/image'
import { Mail, Facebook, Instagram } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative overflow-hidden bg-gradient-to-b from-slate-900 to-slate-950 border-t border-cyan-500/30">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-64 h-64 bg-cyan-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-64 h-64 bg-orange-500 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-green-500 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            {/* ISSUE 3: New logo in white tile */}
            <div className="bg-white rounded-lg p-3 inline-block border-2 border-gray-200 shadow-md mb-4">
              <Image src="/fomogeo.png" alt="FomoGeo" width={140} height={48} className="h-10 w-auto" />
            </div>
            <p className="text-sm text-gray-400 leading-relaxed mb-4">
              Your trusted source for <span className="text-cyan-400 font-semibold">verified deals</span> from around the world. Discover trending products and <span className="text-orange-400 font-semibold">exclusive discounts</span> daily.
            </p>
            <div className="flex space-x-4">
              {/* ISSUE 6 & 7: X icon and new links, open in new window */}
              <a href="https://x.com/fomogeo_" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-cyan-400 transition">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a href="https://www.facebook.com/profile.php?id=61587989941776" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-400 transition">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="https://instagram.com/fomogeo" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-pink-400 transition">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-base font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/" className="text-gray-400 hover:text-cyan-400 transition">› Home</Link></li>
              <li><Link href="/categories" className="text-gray-400 hover:text-cyan-400 transition">› Categories</Link></li>
              <li><Link href="/deals" className="text-gray-400 hover:text-orange-400 transition">› Deals</Link></li>
              <li><Link href="/blog" className="text-gray-400 hover:text-green-400 transition">› Blog</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-base font-bold mb-4 bg-gradient-to-r from-orange-400 to-yellow-500 bg-clip-text text-transparent">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/legal/privacy" className="text-gray-400 hover:text-orange-400 transition">› Privacy Policy</Link></li>
              <li><Link href="/legal/terms" className="text-gray-400 hover:text-orange-400 transition">› Terms of Service</Link></li>
              <li><Link href="/legal/disclosure" className="text-gray-400 hover:text-orange-400 transition">› Affiliate Disclosure</Link></li>
              <li><Link href="/legal/unsubscribe" className="text-gray-400 hover:text-red-400 transition">› Unsubscribe</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-base font-bold mb-4 bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">Stay Updated</h3>
            <p className="text-sm mb-4 text-gray-400">Get <span className="text-green-400 font-semibold">exclusive deals</span> delivered to your inbox</p>
            <Link href="/#email-signup" className="btn-primary inline-flex items-center gap-2 px-5 py-3 text-sm">
              <Mail className="h-4 w-4" />
              Subscribe Free
            </Link>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-cyan-500/20 flex flex-col md:flex-row items-center justify-between gap-3 text-xs">
          <p className="text-gray-400">© {currentYear} <span className="text-cyan-400 font-semibold">FomoGeo</span>. All rights reserved.</p>
          <p className="text-gray-400">We may earn a commission from purchases via affiliate links. <Link href="/legal/disclosure" className="text-orange-400 hover:text-orange-300 transition underline">See disclosure</Link></p>
        </div>
      </div>
    </footer>
  )
}
