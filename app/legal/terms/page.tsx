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
      
      <div className="w-full relative">
        <img src="/hero-light.png" alt="Terms of Service" className="w-full h-auto" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 via-slate-900/60 to-transparent flex items-center justify-center">
          <div className="text-center px-4">
            <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg">Terms of Service</h1>
            <p className="text-cyan-300 mt-4 drop-shadow">Last Updated: {new Date().toLocaleDateString()}</p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="card-light p-8">
          <div className="prose prose-lg prose-invert max-w-none">
            
            <p className="text-gray-200 text-lg mb-6">
              Welcome to FomoGeo. By accessing and using our website, you accept and agree to be bound by the terms and provisions of this agreement.
            </p>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">1. Acceptance of Terms</h2>
            <p className="text-gray-200 mb-6">
              By accessing and using FomoGeo, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service and our Privacy Policy. If you do not agree to these terms, please do not use our website.
            </p>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">2. Use of Service</h2>
            <p className="text-gray-200 mb-4">You agree to use our website only for lawful purposes. You agree not to:</p>
            <ul className="list-disc pl-6 text-gray-200 mb-6 space-y-2">
              <li>Use the service in any way that violates any applicable federal, state, local, or international law</li>
              <li>Attempt to gain unauthorized access to our systems or networks</li>
              <li>Engage in any activity that disrupts or interferes with our service</li>
              <li>Use automated systems (bots, scrapers) to access the website without permission</li>
              <li>Impersonate any person or entity or misrepresent your affiliation</li>
              <li>Transmit any viruses, malware, or harmful code</li>
              <li>Collect or harvest personal information about other users</li>
            </ul>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">3. Affiliate Disclosure and Commissions</h2>
            <p className="text-gray-200 mb-4">
              FomoGeo participates in affiliate marketing programs. This means:
            </p>
            <ul className="list-disc pl-6 text-gray-200 mb-6 space-y-2">
              <li>We may earn commissions when you click on links and make purchases</li>
              <li>These commissions come at no additional cost to you</li>
              <li>We are participants in the Amazon Services LLC Associates Program and other affiliate networks</li>
              <li>Our affiliate relationships do not influence our editorial content</li>
              <li>All product recommendations are based on merit and value</li>
            </ul>
            <p className="text-gray-200 mb-6">
              For more details, please see our <Link href="/legal/disclosure" className="text-cyan-400 hover:text-cyan-300 underline">Affiliate Disclosure</Link>.
            </p>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">4. Product Information and Pricing</h2>
            <p className="text-gray-200 mb-6">
              We strive to provide accurate product information and pricing. However, prices and availability are subject to change without notice. We are not responsible for pricing errors on merchant websites. All purchases are made directly with the merchant, not with FomoGeo.
            </p>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">5. Intellectual Property Rights</h2>
            <p className="text-gray-200 mb-4">
              The content on FomoGeo, including but not limited to text, graphics, logos, images, and software, is the property of FomoGeo or its content suppliers and is protected by copyright laws. You may not:
            </p>
            <ul className="list-disc pl-6 text-gray-200 mb-6 space-y-2">
              <li>Reproduce, distribute, or display any content without written permission</li>
              <li>Use our content for commercial purposes without authorization</li>
              <li>Modify or create derivative works based on our content</li>
              <li>Remove any copyright or proprietary notices</li>
            </ul>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">6. User-Generated Content</h2>
            <p className="text-gray-200 mb-6">
              If you submit comments, reviews, or other content to our website, you grant FomoGeo a non-exclusive, royalty-free, perpetual license to use, reproduce, modify, and display such content. You represent that you own or have permission to share the content you submit.
            </p>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">7. Third-Party Links</h2>
            <p className="text-gray-200 mb-6">
              Our website contains links to third-party websites and merchant sites. We are not responsible for the content, privacy policies, or practices of these sites. Your interactions with third-party websites are governed by their terms and policies.
            </p>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">8. Disclaimer of Warranties</h2>
            <p className="text-gray-200 mb-6">
              FomoGeo is provided "as is" and "as available" without warranties of any kind, either express or implied. We do not guarantee that our service will be uninterrupted, secure, or error-free. We make no warranties about the accuracy, reliability, or completeness of product information.
            </p>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">9. Limitation of Liability</h2>
            <p className="text-gray-200 mb-6">
              To the fullest extent permitted by law, FomoGeo shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses resulting from:
            </p>
            <ul className="list-disc pl-6 text-gray-200 mb-6 space-y-2">
              <li>Your use or inability to use our service</li>
              <li>Any unauthorized access to or use of our servers</li>
              <li>Any interruption or cessation of our service</li>
              <li>Purchases made through affiliate links</li>
              <li>Product quality, pricing, or availability issues</li>
            </ul>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">10. Indemnification</h2>
            <p className="text-gray-200 mb-6">
              You agree to indemnify and hold harmless FomoGeo and its affiliates, officers, agents, and employees from any claim or demand, including reasonable attorneys' fees, made by any third party due to or arising out of your breach of these Terms, your violation of any law, or your violation of any rights of another.
            </p>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">11. Changes to Service</h2>
            <p className="text-gray-200 mb-6">
              We reserve the right to modify or discontinue our service (or any part thereof) at any time, with or without notice. We shall not be liable to you or any third party for any modification, suspension, or discontinuance of the service.
            </p>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">12. Changes to Terms</h2>
            <p className="text-gray-200 mb-6">
              We may update these Terms of Service from time to time. We will notify you of any changes by posting the new Terms on this page and updating the "Last Updated" date. Your continued use of the service after changes constitutes acceptance of the new terms.
            </p>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">13. Governing Law</h2>
            <p className="text-gray-200 mb-6">
              These Terms shall be governed by and construed in accordance with the laws of the United States and the state in which FomoGeo operates, without regard to its conflict of law provisions.
            </p>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">14. Dispute Resolution</h2>
            <p className="text-gray-200 mb-6">
              Any disputes arising from these Terms or your use of FomoGeo shall be resolved through binding arbitration in accordance with the rules of the American Arbitration Association. You waive your right to participate in a class action lawsuit.
            </p>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">15. Severability</h2>
            <p className="text-gray-200 mb-6">
              If any provision of these Terms is found to be unenforceable or invalid, that provision shall be limited or eliminated to the minimum extent necessary so that the Terms shall otherwise remain in full force and effect.
            </p>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">16. Contact Information</h2>
            <p className="text-gray-200 mb-4">
              If you have any questions about these Terms of Service, please contact us:
            </p>
            <ul className="list-none text-gray-200 mb-6 space-y-2">
              <li><strong className="text-white">Email:</strong> <a href="mailto:support@fomogeo.com" className="text-cyan-400 hover:text-cyan-300">support@fomogeo.com</a></li>
              <li><strong className="text-white">Privacy Policy:</strong> <Link href="/legal/privacy" className="text-cyan-400 hover:text-cyan-300">Privacy Policy</Link></li>
              <li><strong className="text-white">Affiliate Disclosure:</strong> <Link href="/legal/disclosure" className="text-cyan-400 hover:text-cyan-300">Affiliate Disclosure</Link></li>
            </ul>

          </div>
        </div>
      </div>
    </div>
  )
}
