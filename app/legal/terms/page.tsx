import Script from 'next/script'
import Link from 'next/link'

export default function TermsPage() {
  return (
    <div className="min-h-screen section-dark">
      <Script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4317381401188026"
        crossOrigin="anonymous"
        strategy="afterInteractive"
      />
      
      {/* NO BANNER - Just title section */}
      <div className="py-16 text-center bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Terms of Service</h1>
        <p className="text-cyan-300">Last Updated: {new Date().toLocaleDateString()}</p>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="card-light p-8">
          <div className="prose prose-lg prose-invert max-w-none">
            
            <p className="text-gray-200 text-lg mb-6">
              Welcome to FomoGeo. By accessing and using our website, you accept and agree to be bound by the terms and provisions of this agreement.
            </p>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">1. Acceptance of Terms</h2>
            <p className="text-gray-200 mb-6">
              By accessing and using FomoGeo, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service and our Privacy Policy.
            </p>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">Contact Information</h2>
            <p className="text-gray-200 mb-4">
              If you have any questions about these Terms of Service, please contact us:
            </p>
            <ul className="list-none text-gray-200 mb-6 space-y-2">
              <li><strong className="text-white">Email:</strong> <a href="mailto:support@fomogeo.com" className="text-cyan-400 hover:text-cyan-300">support@fomogeo.com</a></li>
            </ul>

          </div>
        </div>
      </div>
    </div>
  )
}
