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
      
      {/* Banner - full, no overlay */}
      <div className="w-full">
        <img src="/hero-light.png" alt="Privacy Policy" className="w-full h-auto" />
      </div>

      {/* Title below banner */}
      <div className="py-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-white">Privacy Policy</h1>
        <p className="text-cyan-300 mt-4">Last Updated: {new Date().toLocaleDateString()}</p>
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

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">Data Sharing and Disclosure</h2>
            <p className="text-gray-200 mb-4">
              We do not sell, trade, or rent your personal information to third parties. We may share your information with:
            </p>
            <ul className="list-disc pl-6 text-gray-200 mb-6 space-y-2">
              <li><strong className="text-white">Service Providers:</strong> Supabase (database), Vercel (hosting), ipapi.co (geolocation), Open-Meteo (weather data), and Google AdSense (advertising)</li>
              <li><strong className="text-white">Affiliate Partners:</strong> When you click on affiliate links, we may share that you came from our site (but not your personal information)</li>
              <li><strong className="text-white">Legal Requirements:</strong> If required by law or to protect our rights</li>
              <li><strong className="text-white">Business Transfers:</strong> In connection with any merger, sale, or transfer of our business</li>
            </ul>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">Cookies and Tracking Technologies</h2>
            <p className="text-gray-200 mb-4">
              We use cookies and similar technologies to enhance your experience. You can control cookies through your browser settings. Types of cookies we use:
            </p>
            <ul className="list-disc pl-6 text-gray-200 mb-6 space-y-2">
              <li><strong className="text-white">Essential Cookies:</strong> Required for website functionality</li>
              <li><strong className="text-white">Analytics Cookies:</strong> Help us understand how visitors use our site</li>
              <li><strong className="text-white">Advertising Cookies:</strong> Used by Google AdSense to show relevant ads</li>
            </ul>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">Your Privacy Rights</h2>
            <p className="text-gray-200 mb-4">You have the right to:</p>
            <ul className="list-disc pl-6 text-gray-200 mb-6 space-y-2">
              <li><strong className="text-white">Access:</strong> Request a copy of your personal data</li>
              <li><strong className="text-white">Correction:</strong> Request corrections to inaccurate data</li>
              <li><strong className="text-white">Deletion:</strong> Request deletion of your personal data</li>
              <li><strong className="text-white">Opt-Out:</strong> Unsubscribe from marketing emails at any time</li>
              <li><strong className="text-white">Data Portability:</strong> Request your data in a portable format</li>
              <li><strong className="text-white">Object:</strong> Object to processing of your data for certain purposes</li>
            </ul>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">Data Security</h2>
            <p className="text-gray-200 mb-6">
              We implement appropriate technical and organizational security measures to protect your personal information. However, no method of transmission over the internet is 100% secure. We use industry-standard encryption, secure servers, and regular security audits to protect your data.
            </p>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">Children's Privacy</h2>
            <p className="text-gray-200 mb-6">
              Our website is not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and believe your child has provided us with personal information, please contact us.
            </p>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">Third-Party Links</h2>
            <p className="text-gray-200 mb-6">
              Our website contains links to third-party websites and affiliate partners. We are not responsible for the privacy practices of these sites. We encourage you to read their privacy policies.
            </p>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">International Users</h2>
            <p className="text-gray-200 mb-6">
              If you are accessing our website from outside the United States, please be aware that your information may be transferred to, stored, and processed in the United States where our servers are located.
            </p>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">Changes to This Privacy Policy</h2>
            <p className="text-gray-200 mb-6">
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date. Continued use of our website after changes constitutes acceptance of the updated policy.
            </p>

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
