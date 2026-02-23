import Script from 'next/script'
import Link from 'next/link'

export default function PrivacyPage() {
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
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Privacy Policy</h1>
        <p className="text-cyan-300">Last Updated: {new Date().toLocaleDateString()}</p>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="card-light p-8">
          <div className="prose prose-lg prose-invert max-w-none">
            
            <p className="text-gray-200 text-lg mb-6">
              At FomoGeo, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website.
            </p>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">Information We Collect</h2>
            <p className="text-gray-200 mb-4">We collect information that you provide directly to us, including:</p>
            <ul className="list-disc pl-6 text-gray-200 mb-6 space-y-2">
              <li><strong className="text-white">Email Addresses:</strong> When you subscribe to our newsletter or create an account</li>
              <li><strong className="text-white">Location Data:</strong> We use ipapi.co to determine your approximate location (city and country) to provide personalized weather information via the Open-Meteo API</li>
              <li><strong className="text-white">Usage Data:</strong> Information about how you use our website, including pages visited, time spent, and links clicked</li>
              <li><strong className="text-white">Device Information:</strong> Browser type, operating system, IP address, and device identifiers</li>
              <li><strong className="text-white">Cookies:</strong> We use cookies and similar tracking technologies to track activity on our website</li>
            </ul>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">How We Use Your Information</h2>
            <p className="text-gray-200 mb-4">We use the information we collect to:</p>
            <ul className="list-disc pl-6 text-gray-200 mb-6 space-y-2">
              <li>Send you newsletters, deal alerts, and promotional communications</li>
              <li>Provide personalized weather forecasts based on your location</li>
              <li>Improve and optimize our website and user experience</li>
              <li>Analyze usage patterns and trends</li>
              <li>Prevent fraud and enhance security</li>
              <li>Comply with legal obligations</li>
              <li>Respond to your inquiries and provide customer support</li>
            </ul>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">Contact Us</h2>
            <p className="text-gray-200 mb-4">
              If you have questions or concerns about this Privacy Policy, please contact us:
            </p>
            <ul className="list-none text-gray-200 mb-6 space-y-2">
              <li><strong className="text-white">Email:</strong> <a href="mailto:support@fomogeo.com" className="text-cyan-400 hover:text-cyan-300">support@fomogeo.com</a></li>
              <li><strong className="text-white">Unsubscribe:</strong> <Link href="/legal/unsubscribe" className="text-cyan-400 hover:text-cyan-300">Unsubscribe Page</Link></li>
            </ul>

          </div>
        </div>
      </div>
    </div>
  )
}
