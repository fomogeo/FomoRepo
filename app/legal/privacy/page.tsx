export const dynamic = 'force-dynamic'

import Link from 'next/link'

export default function PrivacyPage() {
  const siteName = 'FomoGeo'
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'fomogeo.com'

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-blue-600 to-cyan-500 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-2">Privacy Policy</h1>
          <p className="text-blue-100">Last Updated: {new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 md:p-12 space-y-10">

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100">Introduction</h2>
            <p className="text-slate-700 leading-relaxed">
              {siteName} (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) respects your privacy and is committed to protecting
              your personal data. This Privacy Policy explains how we collect, use, disclose, and
              safeguard your information when you visit <strong>{siteUrl}</strong>.
              Please read it carefully. By using our site, you agree to the practices described below.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100">Information We Collect</h2>

            <h3 className="text-lg font-semibold text-slate-800 mb-2 mt-6">1. Information You Provide</h3>
            <p className="text-slate-700 leading-relaxed mb-3">
              When you voluntarily interact with our site (e.g. subscribing to our newsletter), we may collect:
            </p>
            <ul className="list-disc pl-6 text-slate-700 space-y-1">
              <li>Email address (newsletter sign-up)</li>
              <li>Any other information you choose to share</li>
            </ul>

            <h3 className="text-lg font-semibold text-slate-800 mb-2 mt-6">2. Automatically Collected Information</h3>
            <p className="text-slate-700 leading-relaxed mb-3">
              When you visit our site, we automatically collect certain technical data:
            </p>
            <ul className="list-disc pl-6 text-slate-700 space-y-1">
              <li>IP address (used to determine approximate location — see below)</li>
              <li>Browser type and version</li>
              <li>Operating system</li>
              <li>Pages visited, time on page, and referring website</li>
              <li>Device type (desktop, mobile, tablet)</li>
            </ul>

            <h3 className="text-lg font-semibold text-slate-800 mb-2 mt-6">3. Location Data (Weather Feature)</h3>
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 text-slate-700 leading-relaxed space-y-3">
              <p>
                <strong>FomoGeo displays a 7-day local weather forecast</strong> on the website to help
                you plan for deliveries. To provide this feature, your <strong>IP address is used to
                estimate your approximate geographic location</strong> (city and country level) via a
                third-party geolocation service (<a href="https://ipapi.co" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">ipapi.co</a>).
              </p>
              <p>
                This location estimate (latitude and longitude) is then passed to the
                <a href="https://open-meteo.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline mx-1">Open-Meteo</a>
                weather API to retrieve your local forecast. <strong>We do not store your location
                data</strong> on our servers — the process happens entirely in your browser.
              </p>
              <p>
                <strong>What data is shared:</strong> Your IP address is sent to ipapi.co to obtain
                city-level coordinates. Those coordinates are sent to Open-Meteo to fetch weather data.
                Neither your email nor any other personal information is included in these requests.
              </p>
              <p>
                <strong>Accuracy:</strong> IP-based geolocation is approximate (typically city-level).
                It is not GPS-precise and may occasionally show the wrong city.
              </p>
              <p>
                You can review the privacy policies of these third-party services:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li><a href="https://ipapi.co/privacy/" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">ipapi.co Privacy Policy</a></li>
                <li><a href="https://open-meteo.com/en/terms" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">Open-Meteo Terms of Service</a></li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100">How We Use Your Information</h2>
            <ul className="list-disc pl-6 text-slate-700 space-y-2">
              <li>Send you our email newsletter with deals and buying guides (only if you subscribed)</li>
              <li>Display a local weather forecast using your approximate IP-based location</li>
              <li>Respond to enquiries and support requests</li>
              <li>Improve our website, content, and user experience</li>
              <li>Analyse site usage patterns and trends</li>
              <li>Display relevant advertising (see Advertising section below)</li>
              <li>Prevent fraud and maintain site security</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100">Advertising</h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              FomoGeo displays third-party advertisements on our site. These advertising networks
              may use cookies and tracking technologies to serve ads relevant to your interests
              based on your browsing activity across websites.
            </p>
            <ul className="list-disc pl-6 text-slate-700 space-y-2">
              <li><strong>Google AdSense:</strong> May collect data about your visits to serve personalised ads. You can opt out via <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">Google Ad Settings</a>.</li>
              <li><strong>Other ad networks:</strong> Any other advertising partners we work with will be listed here when active.</li>
            </ul>
            <p className="text-slate-700 leading-relaxed mt-4">
              We do not control the data practices of advertising networks. Please review their
              individual privacy policies for full details.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100">Cookies and Tracking Technologies</h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              We use cookies and similar technologies to enhance your experience. Types of cookies used:
            </p>
            <ul className="list-disc pl-6 text-slate-700 space-y-2">
              <li><strong>Essential Cookies:</strong> Required for basic site functionality</li>
              <li><strong>Analytics Cookies:</strong> Help us understand how visitors use our site (e.g. page views, referrers)</li>
              <li><strong>Advertising Cookies:</strong> Used by advertising networks to display relevant ads</li>
              <li><strong>Preference Cookies:</strong> Remember your settings and preferences</li>
            </ul>
            <p className="text-slate-700 leading-relaxed mt-4">
              You can control and manage cookies in your browser settings. Note that disabling
              certain cookies may affect site functionality.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100">Third-Party Services</h2>
            <p className="text-slate-700 leading-relaxed mb-4">We use the following third-party services:</p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-slate-100">
                    <th className="text-left p-3 font-semibold text-slate-700 border border-slate-200">Service</th>
                    <th className="text-left p-3 font-semibold text-slate-700 border border-slate-200">Purpose</th>
                    <th className="text-left p-3 font-semibold text-slate-700 border border-slate-200">Data Shared</th>
                  </tr>
                </thead>
                <tbody className="text-slate-700">
                  <tr className="even:bg-slate-50">
                    <td className="p-3 border border-slate-200">ipapi.co</td>
                    <td className="p-3 border border-slate-200">IP geolocation for weather feature</td>
                    <td className="p-3 border border-slate-200">IP address</td>
                  </tr>
                  <tr className="even:bg-slate-50">
                    <td className="p-3 border border-slate-200">Open-Meteo</td>
                    <td className="p-3 border border-slate-200">7-day weather forecast</td>
                    <td className="p-3 border border-slate-200">Latitude &amp; longitude (city-level)</td>
                  </tr>
                  <tr className="even:bg-slate-50">
                    <td className="p-3 border border-slate-200">Google AdSense</td>
                    <td className="p-3 border border-slate-200">Display advertising</td>
                    <td className="p-3 border border-slate-200">Browsing behaviour, IP address</td>
                  </tr>
                  <tr className="even:bg-slate-50">
                    <td className="p-3 border border-slate-200">Supabase</td>
                    <td className="p-3 border border-slate-200">Database (stores email subscribers)</td>
                    <td className="p-3 border border-slate-200">Email address (newsletter only)</td>
                  </tr>
                  <tr className="even:bg-slate-50">
                    <td className="p-3 border border-slate-200">Vercel</td>
                    <td className="p-3 border border-slate-200">Website hosting</td>
                    <td className="p-3 border border-slate-200">IP address, access logs</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100">Your Rights</h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              Depending on your location (e.g. UK/EU under GDPR), you may have the right to:
            </p>
            <ul className="list-disc pl-6 text-slate-700 space-y-2">
              <li><strong>Access</strong> the personal data we hold about you</li>
              <li><strong>Correct</strong> inaccurate or incomplete information</li>
              <li><strong>Delete</strong> your personal data (&quot;right to be forgotten&quot;)</li>
              <li><strong>Restrict</strong> or object to how we process your data</li>
              <li><strong>Portability</strong> — receive your data in a structured format</li>
              <li><strong>Withdraw consent</strong> at any time</li>
            </ul>
            <p className="text-slate-700 leading-relaxed mt-4">
              To exercise any of these rights, please contact us. We will respond within 30 days.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100">Email Unsubscribe</h2>
            <p className="text-slate-700 leading-relaxed">
              You can unsubscribe from our newsletter at any time by clicking the unsubscribe link
              in any email we send, or by visiting our{' '}
              <Link href="/legal/unsubscribe" className="text-blue-600 underline hover:text-blue-800">
                unsubscribe page
              </Link>.
              We will remove your email from our list promptly.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100">Data Security</h2>
            <p className="text-slate-700 leading-relaxed">
              We implement industry-standard security measures including encrypted connections (HTTPS),
              secure database access, and row-level security policies. However, no method of internet
              transmission is 100% secure and we cannot guarantee absolute security.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100">Children&apos;s Privacy</h2>
            <p className="text-slate-700 leading-relaxed">
              Our site is not directed at children under the age of 13. We do not knowingly collect
              personal information from children. If you believe a child has provided us with personal
              information, please contact us and we will delete it promptly.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100">Changes to This Policy</h2>
            <p className="text-slate-700 leading-relaxed">
              We may update this Privacy Policy periodically. We will notify you of significant changes
              by posting the new policy on this page and updating the &quot;Last Updated&quot; date above.
              We encourage you to review this policy regularly.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100">Contact Us</h2>
            <p className="text-slate-700 leading-relaxed">
              If you have any questions, concerns, or requests regarding this Privacy Policy
              or how we handle your personal data, please contact us at:{' '}
              <strong>[your-contact@fomogeo.com]</strong>
            </p>
          </section>

        </div>
      </div>
    </div>
  )
}
