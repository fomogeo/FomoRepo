export default function DisclosurePage() {
  return (
    <div className="min-h-screen">
      <div className="page-header">
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold text-center text-fg-heading">Affiliate Disclosure</h1>
          <p className="text-center text-fg-muted mt-4">Last Updated: {new Date().toLocaleDateString()}</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="card-light p-8">
          <div className="prose prose-lg max-w-none">
            <h2 className="text-2xl font-bold text-fg-heading mt-0 mb-4">Affiliate Relationships</h2>
            <p className="text-fg-body mb-6">
              FomoGeo participates in affiliate marketing programs including Amazon Associates, Awin, ShareASale, CJ Affiliate, and others.
            </p>

            <h2 className="text-2xl font-bold text-fg-heading mt-8 mb-4">How It Works</h2>
            <p className="text-fg-body mb-6">
              When you click on product links and make a purchase, we may earn a small commission at no additional cost to you.
              These commissions help us maintain and improve our service.
            </p>

            <h2 className="text-2xl font-bold text-fg-heading mt-8 mb-4">Our Commitment</h2>
            <ul className="list-disc pl-6 text-fg-body mb-6 space-y-2">
              <li>We only recommend products we believe offer value</li>
              <li>Our reviews and recommendations are honest and unbiased</li>
              <li>Affiliate relationships do not influence our editorial content</li>
              <li>We clearly disclose when content contains affiliate links</li>
            </ul>

            <h2 className="text-2xl font-bold text-fg-heading mt-8 mb-4">Transparency</h2>
            <p className="text-fg-body mb-6">
              All product prices and availability are provided by merchant partners and are subject to change.
              We make every effort to ensure accuracy but cannot guarantee all information is up-to-date.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
