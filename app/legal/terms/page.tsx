export const dynamic = 'force-dynamic'

export default function TermsPage() {
  const siteName = process.env.NEXT_PUBLIC_SITE_NAME || 'FomoGeo'
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'your-domain.com'

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-4xl font-bold text-gray-900 mb-6">
        Terms of Service
      </h1>

      <div className="prose prose-lg">
        <p className="text-gray-600 mb-6">
          Last Updated: {new Date().toLocaleDateString()}
        </p>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Agreement to Terms
          </h2>
          <p className="text-gray-700 leading-relaxed">
            By accessing or using {siteName} ({siteUrl}), you agree to be bound by these Terms of Service. 
            If you disagree with any part of these terms, please do not use our website.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Use of Our Service
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            {siteName} is a deal aggregation and affiliate marketing website. We provide:
          </p>
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li>Information about products and deals</li>
            <li>Links to merchant websites</li>
            <li>Product recommendations and reviews</li>
            <li>Email newsletter subscriptions</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Affiliate Relationships
          </h2>
          <p className="text-gray-700 leading-relaxed">
            We participate in affiliate marketing programs. When you click on certain links and make 
            purchases, we may earn a commission. This does not affect the price you pay. For more 
            information, see our <a href="/legal/disclosure" className="text-primary-600 hover:underline">Affiliate Disclosure</a>.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Third-Party Merchants
          </h2>
          <p className="text-gray-700 leading-relaxed">
            We are not responsible for the content, products, or services of third-party merchants. 
            When you click on affiliate links, you are leaving our site and entering the merchant's 
            site. Your transactions are with the merchant, not with us.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Accuracy of Information
          </h2>
          <p className="text-gray-700 leading-relaxed">
            We strive to provide accurate product information and pricing, but we cannot guarantee 
            the accuracy of all information. Prices, availability, and product details may change 
            without notice. Always verify information on the merchant's website before making a purchase.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Intellectual Property
          </h2>
          <p className="text-gray-700 leading-relaxed">
            The content on {siteName}, including text, graphics, logos, and images, is our property 
            or the property of our content suppliers and is protected by copyright laws. You may not 
            reproduce, distribute, or create derivative works without our permission.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Prohibited Uses
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            You agree not to:
          </p>
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li>Use our site for any illegal purpose</li>
            <li>Attempt to gain unauthorized access to our systems</li>
            <li>Interfere with the proper functioning of our site</li>
            <li>Use automated systems to scrape content</li>
            <li>Impersonate any person or entity</li>
            <li>Transmit viruses or malicious code</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Limitation of Liability
          </h2>
          <p className="text-gray-700 leading-relaxed">
            {siteName} is provided "as is" without warranties of any kind. We are not liable for any 
            damages arising from your use of our site or purchases made through affiliate links. This 
            includes direct, indirect, incidental, consequential, or punitive damages.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Indemnification
          </h2>
          <p className="text-gray-700 leading-relaxed">
            You agree to indemnify and hold {siteName} harmless from any claims, damages, or expenses 
            arising from your use of our site or violation of these terms.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Changes to Terms
          </h2>
          <p className="text-gray-700 leading-relaxed">
            We reserve the right to modify these terms at any time. Changes will be effective immediately 
            upon posting. Your continued use of the site after changes constitutes acceptance of the new terms.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Governing Law
          </h2>
          <p className="text-gray-700 leading-relaxed">
            These terms are governed by the laws of [Your Jurisdiction], without regard to conflict 
            of law provisions.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Contact Us
          </h2>
          <p className="text-gray-700 leading-relaxed">
            If you have questions about these Terms of Service, please contact us at: [Your Contact Email]
          </p>
        </section>
      </div>
    </div>
  )
}
