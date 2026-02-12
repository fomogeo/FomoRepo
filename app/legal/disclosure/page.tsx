export default function DisclosurePage() {
  const siteName = process.env.NEXT_PUBLIC_SITE_NAME || 'FOMO Finds'

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-4xl font-bold text-gray-900 mb-6">
        Affiliate Disclosure
      </h1>

      <div className="prose prose-lg">
        <p className="text-gray-600 mb-6">
          Last Updated: {new Date().toLocaleDateString()}
        </p>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            What You Should Know
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            {siteName} participates in various affiliate marketing programs. This means that when you 
            click on certain links on our site and make a purchase, we may receive a commission at 
            no additional cost to you.
          </p>
          <p className="text-gray-700 leading-relaxed">
            We are committed to transparency. This disclosure is made in accordance with the 
            Federal Trade Commission's 16 CFR, Part 255: "Guides Concerning the Use of Endorsements 
            and Testimonials in Advertising."
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Affiliate Networks We Work With
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            We may earn commissions through the following affiliate programs:
          </p>
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li>Amazon Associates and other Amazon international programs</li>
            <li>Awin (formerly Affiliate Window)</li>
            <li>CJ Affiliate (Commission Junction)</li>
            <li>Impact</li>
            <li>ShareASale</li>
            <li>Rakuten Advertising</li>
            <li>Other affiliate networks and direct partnerships</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Our Commitment to You
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            We only recommend products and services that we believe will add value to our readers. 
            Our editorial integrity is never compromised by affiliate relationships.
          </p>
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li>We provide honest, unbiased information about products</li>
            <li>Our recommendations are based on research and data</li>
            <li>Affiliate commissions do not influence our content</li>
            <li>We clearly disclose affiliate relationships</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            How It Works
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            When you click on an affiliate link and make a purchase, the merchant pays us a small 
            commission. This helps us:
          </p>
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li>Keep our site running and free for visitors</li>
            <li>Create and maintain high-quality content</li>
            <li>Research and review products</li>
            <li>Provide valuable deal information</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            No Extra Cost to You
          </h2>
          <p className="text-gray-700 leading-relaxed">
            Using our affiliate links does not increase the price you pay. In many cases, we negotiate 
            special discounts and deals that are exclusive to our visitors, so you may actually save money.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Questions?
          </h2>
          <p className="text-gray-700 leading-relaxed">
            If you have any questions about our affiliate relationships or how we recommend products, 
            please feel free to contact us. We're always happy to provide more information about our 
            practices and policies.
          </p>
        </section>
      </div>
    </div>
  )
}
