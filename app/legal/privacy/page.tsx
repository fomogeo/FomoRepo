export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen py-16" style={{ background: '#071828' }}>
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white rounded-xl shadow-2xl p-8 md:p-12">
          <h1 className="text-4xl font-bold mb-2" style={{ color: '#071828' }}>Privacy Policy</h1>
          <p className="text-sm text-gray-500 mb-8">Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>

          <div className="prose prose-lg max-w-none space-y-8" style={{ color: '#2C3E50' }}>
            <section>
              <h2 className="text-2xl font-bold mb-4" style={{ color: '#071828' }}>1. Introduction</h2>
              <p>
                FomoGeo ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our services. Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the site.
              </p>
              <p>
                We reserve the right to make changes to this Privacy Policy at any time and for any reason. We will alert you about any changes by updating the "Last Updated" date of this Privacy Policy. You are encouraged to periodically review this Privacy Policy to stay informed of updates.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4" style={{ color: '#071828' }}>2. Information We Collect</h2>
              
              <h3 className="text-xl font-semibold mb-3" style={{ color: '#00D4C8' }}>Personal Data</h3>
              <p>
                We may collect personal information that you voluntarily provide to us when you:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Subscribe to our email newsletter</li>
                <li>Contact us via email or contact forms</li>
                <li>Interact with our website</li>
                <li>Make purchases through affiliate links</li>
              </ul>
              <p className="mt-4">
                This personal information may include:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Email address</li>
                <li>Name (if provided)</li>
                <li>IP address</li>
                <li>Browser type and version</li>
                <li>Device information</li>
              </ul>

              <h3 className="text-xl font-semibold mb-3 mt-6" style={{ color: '#00D4C8' }}>Automatically Collected Information</h3>
              <p>
                When you visit our website, we may automatically collect certain information about your device, including:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Your IP address</li>
                <li>Browser type and version</li>
                <li>Operating system</li>
                <li>Referring website</li>
                <li>Pages visited on our site</li>
                <li>Time and date of visits</li>
                <li>Time spent on pages</li>
                <li>Click patterns and other usage data</li>
              </ul>

              <h3 className="text-xl font-semibold mb-3 mt-6" style={{ color: '#00D4C8' }}>Cookies and Tracking Technologies</h3>
              <p>
                We use cookies, web beacons, tracking pixels, and other tracking technologies to collect information about your browsing behavior. Cookies are small data files stored on your device. We use both session cookies (which expire when you close your browser) and persistent cookies (which remain until deleted or expire).
              </p>
              <p className="mt-3">
                Types of cookies we use:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Essential Cookies:</strong> Necessary for the website to function properly</li>
                <li><strong>Analytics Cookies:</strong> Help us understand how visitors use our website (Google Analytics, Vercel Analytics)</li>
                <li><strong>Advertising Cookies:</strong> Used to deliver relevant advertisements (Google AdSense)</li>
                <li><strong>Affiliate Cookies:</strong> Track referrals from our affiliate links</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4" style={{ color: '#071828' }}>3. How We Use Your Information</h2>
              <p>
                We use the information we collect in the following ways:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>To send you our email newsletter with deals, promotions, and updates (only if you've subscribed)</li>
                <li>To respond to your inquiries and provide customer support</li>
                <li>To improve our website and user experience</li>
                <li>To analyze website traffic and user behavior</li>
                <li>To track affiliate referrals and commissions</li>
                <li>To display personalized advertisements</li>
                <li>To detect and prevent fraud or security issues</li>
                <li>To comply with legal obligations</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4" style={{ color: '#071828' }}>4. Disclosure of Your Information</h2>
              <p>
                We may share your information in the following situations:
              </p>
              
              <h3 className="text-xl font-semibold mb-3 mt-6" style={{ color: '#00D4C8' }}>Third-Party Service Providers</h3>
              <p>
                We may share your information with third-party service providers who perform services on our behalf, including:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Email Service Providers:</strong> To send newsletters and marketing emails</li>
                <li><strong>Analytics Providers:</strong> Google Analytics, Vercel Analytics</li>
                <li><strong>Advertising Networks:</strong> Google AdSense</li>
                <li><strong>Hosting Providers:</strong> Vercel, Supabase</li>
                <li><strong>Payment Processors:</strong> For any direct transactions</li>
              </ul>

              <h3 className="text-xl font-semibold mb-3 mt-6" style={{ color: '#00D4C8' }}>Affiliate Partners</h3>
              <p>
                When you click on affiliate links and make purchases, we may share limited information with our affiliate partners (Amazon Associates, Awin, ShareASale, CJ Affiliate, Impact, etc.) to track referrals and earn commissions. This typically includes:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Click timestamp</li>
                <li>Referring URL</li>
                <li>Anonymous user identifier</li>
                <li>Device type and browser information</li>
              </ul>

              <h3 className="text-xl font-semibold mb-3 mt-6" style={{ color: '#00D4C8' }}>Legal Requirements</h3>
              <p>
                We may disclose your information if required to do so by law or in response to valid requests by public authorities (e.g., a court or government agency).
              </p>

              <h3 className="text-xl font-semibold mb-3 mt-6" style={{ color: '#00D4C8' }}>Business Transfers</h3>
              <p>
                If we are involved in a merger, acquisition, or sale of assets, your information may be transferred as part of that transaction.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4" style={{ color: '#071828' }}>5. Third-Party Websites and Affiliate Links</h2>
              <p>
                Our website contains links to third-party websites and affiliate partners. We are not responsible for the privacy practices or content of these external sites. When you click on affiliate links or visit third-party websites, you are subject to their own privacy policies.
              </p>
              <p className="mt-3">
                We participate in affiliate marketing programs with the following networks (but not limited to):
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Amazon Associates</li>
                <li>Awin</li>
                <li>ShareASale</li>
                <li>CJ Affiliate (Commission Junction)</li>
                <li>Impact</li>
                <li>Rakuten Advertising</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4" style={{ color: '#071828' }}>6. Data Security</h2>
              <p>
                We use administrative, technical, and physical security measures to protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable, and no method of data transmission can be guaranteed against any interception or other type of misuse.
              </p>
              <p className="mt-3">
                Our security measures include:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>SSL/TLS encryption for data transmission</li>
                <li>Secure database storage with Supabase</li>
                <li>Regular security audits and updates</li>
                <li>Access controls and authentication</li>
                <li>Encrypted backups</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4" style={{ color: '#071828' }}>7. Data Retention</h2>
              <p>
                We will retain your personal information only for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law.
              </p>
              <p className="mt-3">
                Specific retention periods:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Email Subscribers:</strong> Until you unsubscribe or request deletion</li>
                <li><strong>Analytics Data:</strong> Typically 26 months (Google Analytics default)</li>
                <li><strong>Affiliate Click Data:</strong> Up to 2 years for commission tracking</li>
                <li><strong>Contact Form Inquiries:</strong> Up to 1 year</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4" style={{ color: '#071828' }}>8. Your Privacy Rights</h2>
              <p>
                Depending on your location, you may have the following rights regarding your personal information:
              </p>

              <h3 className="text-xl font-semibold mb-3 mt-6" style={{ color: '#00D4C8' }}>GDPR Rights (EU/UK Residents)</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Right to Access:</strong> Request a copy of your personal data</li>
                <li><strong>Right to Rectification:</strong> Request correction of inaccurate data</li>
                <li><strong>Right to Erasure:</strong> Request deletion of your data ("right to be forgotten")</li>
                <li><strong>Right to Restrict Processing:</strong> Request limitation on how we use your data</li>
                <li><strong>Right to Data Portability:</strong> Receive your data in a structured format</li>
                <li><strong>Right to Object:</strong> Object to our processing of your data</li>
                <li><strong>Right to Withdraw Consent:</strong> Withdraw consent at any time</li>
              </ul>

              <h3 className="text-xl font-semibold mb-3 mt-6" style={{ color: '#00D4C8' }}>CCPA Rights (California Residents)</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Right to Know:</strong> Request information about data collection and use</li>
                <li><strong>Right to Delete:</strong> Request deletion of your personal information</li>
                <li><strong>Right to Opt-Out:</strong> Opt-out of the sale of personal information</li>
                <li><strong>Right to Non-Discrimination:</strong> Not be discriminated against for exercising your rights</li>
              </ul>

              <h3 className="text-xl font-semibold mb-3 mt-6" style={{ color: '#00D4C8' }}>Email Unsubscribe</h3>
              <p>
                You can unsubscribe from our email newsletter at any time by:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Clicking the "Unsubscribe" link in any email we send</li>
                <li>Visiting our <a href="/legal/unsubscribe" className="text-blue-600 hover:underline">Unsubscribe page</a></li>
                <li>Contacting us directly at the email below</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4" style={{ color: '#071828' }}>9. Children's Privacy</h2>
              <p>
                Our website is not intended for children under the age of 13 (or 16 in the EU). We do not knowingly collect personal information from children. If you believe we have collected information from a child, please contact us immediately and we will delete it.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4" style={{ color: '#071828' }}>10. International Data Transfers</h2>
              <p>
                Your information may be transferred to and maintained on servers located outside of your state, province, country, or other governmental jurisdiction where data protection laws may differ. By using our website, you consent to the transfer of your information to these locations.
              </p>
              <p className="mt-3">
                Our hosting and database providers are located in:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>United States (Vercel, Supabase)</li>
                <li>European Union (Supabase EU region option)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4" style={{ color: '#071828' }}>11. Do Not Track Signals</h2>
              <p>
                Some browsers have a "Do Not Track" feature that lets you tell websites you do not want to have your online activities tracked. We currently do not respond to Do Not Track signals, but you can manage cookies through your browser settings.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4" style={{ color: '#071828' }}>12. Contact Us</h2>
              <p>
                If you have questions or concerns about this Privacy Policy or wish to exercise your privacy rights, please contact us at:
              </p>
              <div className="mt-4 p-6 rounded-lg" style={{ background: '#F5F5F5' }}>
                <p className="font-semibold">FomoGeo</p>
                <p>Email: privacy@fomogeo.com</p>
                <p>Website: <a href="/" className="text-blue-600 hover:underline">fomogeo.com</a></p>
              </div>
              <p className="mt-4 text-sm text-gray-600">
                We will respond to your request within 30 days of receipt.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4" style={{ color: '#071828' }}>13. Changes to This Policy</h2>
              <p>
                We may update this Privacy Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. We will notify you of any material changes by posting the new Privacy Policy on this page and updating the "Last Updated" date.
              </p>
              <p className="mt-3">
                Your continued use of the website after any changes constitutes your acceptance of the new Privacy Policy.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
