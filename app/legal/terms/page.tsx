export default function TermsPage() {
  return (
    <div className="min-h-screen">
      <div className="page-header">
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold text-center text-fg-heading">Terms of Service</h1>
          <p className="text-center text-fg-muted mt-4">Last Updated: {new Date().toLocaleDateString()}</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="card-light p-8">
          <div className="prose prose-lg max-w-none">
            <h2 className="text-2xl font-bold text-fg-heading mt-0 mb-4">Acceptance of Terms</h2>
            <p className="text-fg-body mb-6">By accessing and using FomoGeo, you accept and agree to be bound by these Terms of Service.</p>

            <h2 className="text-2xl font-bold text-fg-heading mt-8 mb-4">Use of Service</h2>
            <p className="text-fg-body mb-4">You agree to:</p>
            <ul className="list-disc pl-6 text-fg-body mb-6 space-y-2">
              <li>Use the service for lawful purposes only</li>
              <li>Not attempt to harm or disrupt the service</li>
              <li>Not scrape or copy content without permission</li>
            </ul>

            <h2 className="text-2xl font-bold text-fg-heading mt-8 mb-4">Affiliate Disclosure</h2>
            <p className="text-fg-body mb-6">
              FomoGeo participates in affiliate marketing programs. We may earn commissions from purchases made through our links.
              See our <a href="/legal/disclosure" className="link-primary">Affiliate Disclosure</a> for details.
            </p>

            <h2 className="text-2xl font-bold text-fg-heading mt-8 mb-4">Disclaimer</h2>
            <p className="text-fg-body mb-6">Product prices and availability are subject to change. We strive for accuracy but cannot guarantee all information is current.</p>

            <h2 className="text-2xl font-bold text-fg-heading mt-8 mb-4">Limitation of Liability</h2>
            <p className="text-fg-body mb-6">FomoGeo is not liable for any damages arising from use of this service or purchases made through affiliate links.</p>

            <h2 className="text-2xl font-bold text-fg-heading mt-8 mb-4">Changes to Terms</h2>
            <p className="text-fg-body">We may update these terms at any time. Continued use constitutes acceptance of new terms.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
