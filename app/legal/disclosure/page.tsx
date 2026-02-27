import Link from 'next/link'
import ColorfulDivider from '@/components/ColorfulDivider'

export default function DisclosurePage() {
  return (
    <main style={{ background: '#071828', minHeight: '100vh' }}>
      <ColorfulDivider />
      
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: '#00D4C8' }}>
            Affiliate Disclosure
          </h1>
          <p className="text-lg" style={{ color: '#7EB8D8' }}>
            Transparency in Our Affiliate Relationships
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
              <h2 className="text-2xl font-bold mb-4" style={{ color: '#FFB300' }}>What You Need to Know</h2>
              <p className="mb-4 leading-relaxed" style={{ color: '#B8D8E8' }}>
                FomoGeo participates in affiliate marketing programs, which means we may earn a commission
                when you click on links to products and make a purchase. This is at no additional cost to you.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4" style={{ color: '#FFB300' }}>Affiliate Partnerships</h2>
              <p className="mb-4 leading-relaxed" style={{ color: '#B8D8E8' }}>
                We are a participant in the Amazon Associates program and other affiliate networks including
                Awin, ShareASale, and CJ Affiliate. We earn from qualifying purchases made through our links.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4" style={{ color: '#FFB300' }}>Our Commitment</h2>
              <p className="mb-4 leading-relaxed" style={{ color: '#B8D8E8' }}>
                We only recommend products and deals that we believe offer genuine value. Our affiliate
                relationships do not influence our editorial content. Your trust is our priority.
              </p>
            </section>

            <section className="pt-6 border-t" style={{ borderColor: 'rgba(0,212,200,0.2)' }}>
              <h2 className="text-2xl font-bold mb-4" style={{ color: '#00D4C8' }}>Questions?</h2>
              <p className="mb-4 leading-relaxed" style={{ color: '#B8D8E8' }}>
                If you have any questions about our affiliate relationships, please contact us at:
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
