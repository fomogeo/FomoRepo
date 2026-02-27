import Link from 'next/link'
import ColorfulDivider from '@/components/ColorfulDivider'

export default function TermsPage() {
  return (
    <main style={{ background: '#071828', minHeight: '100vh' }}>
      <ColorfulDivider />
      
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: '#00D4C8' }}>
            Terms of Service
          </h1>
          <p className="text-lg" style={{ color: '#7EB8D8' }}>
            Last Updated: {new Date().toLocaleDateString()}
          </p>
        </div>

        <div 
          className="rounded-2xl p-8 md:p-12 shadow-2xl"
          style={{ 
            background: 'linear-gradient(135deg, #0D2840 0%, #091E30 100%)',
            border: '1px solid rgba(0,212,200,0.2)'
          }}
        >
          <div className="space-y-8" style={{ color: '#E8F4FD' }}>
            
            <section>
              <h2 className="text-2xl font-bold mb-4" style={{ color: '#FFB300' }}>1. Acceptance of Terms</h2>
              <p className="mb-4 leading-relaxed" style={{ color: '#B8D8E8' }}>
                By accessing and using FomoGeo, you accept and agree to be bound by these Terms of Service.
                If you do not agree to these terms, please do not use our website.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4" style={{ color: '#FFB300' }}>2. Use of Service</h2>
              <p className="mb-4 leading-relaxed" style={{ color: '#B8D8E8' }}>
                FomoGeo provides deal aggregation and affiliate marketing services. You agree to use our
                service only for lawful purposes and in accordance with these terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4" style={{ color: '#FFB300' }}>3. Affiliate Links</h2>
              <p className="mb-4 leading-relaxed" style={{ color: '#B8D8E8' }}>
                Our website contains affiliate links to third-party merchants. We may earn a commission
                when you make a purchase through these links at no additional cost to you. See our
                <Link href="/legal/disclosure" className="mx-1 font-semibold" style={{ color: '#FFB300' }}>Affiliate Disclosure</Link>
                for more information.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4" style={{ color: '#FFB300' }}>4. Intellectual Property</h2>
              <p className="mb-4 leading-relaxed" style={{ color: '#B8D8E8' }}>
                All content on FomoGeo, including text, graphics, logos, and software, is the property
                of FomoGeo and is protected by copyright and trademark laws.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4" style={{ color: '#FFB300' }}>5. Disclaimer</h2>
              <p className="mb-4 leading-relaxed" style={{ color: '#B8D8E8' }}>
                FomoGeo provides information "as is" without warranty of any kind. We do not guarantee
                the accuracy, completeness, or timeliness of product information, prices, or availability.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4" style={{ color: '#FFB300' }}>6. Limitation of Liability</h2>
              <p className="mb-4 leading-relaxed" style={{ color: '#B8D8E8' }}>
                FomoGeo shall not be liable for any indirect, incidental, special, or consequential damages
                arising from your use of our service or any products purchased through our affiliate links.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4" style={{ color: '#FFB300' }}>7. Changes to Terms</h2>
              <p className="mb-4 leading-relaxed" style={{ color: '#B8D8E8' }}>
                We reserve the right to modify these terms at any time. Continued use of our service
                after changes constitutes acceptance of the modified terms.
              </p>
            </section>

            <section className="pt-6 border-t" style={{ borderColor: 'rgba(0,212,200,0.2)' }}>
              <h2 className="text-2xl font-bold mb-4" style={{ color: '#00D4C8' }}>Contact Us</h2>
              <p className="mb-4 leading-relaxed" style={{ color: '#B8D8E8' }}>
                Questions about our Terms of Service? Contact us at:
              </p>
              <p style={{ color: '#FFB300' }}>
                <a href="mailto:support@fomogeo.com" className="hover:underline font-semibold">
                  support@fomogeo.com
                </a>
              </p>
            </section>

          </div>
        </div>

        <div className="text-center mt-12">
          <Link href="/" className="btn-teal inline-block px-6 py-3 rounded-lg font-semibold">
            ← Back to Home
          </Link>
        </div>
      </div>
    </main>
  )
}
