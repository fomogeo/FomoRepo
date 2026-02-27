import Link from 'next/link'
import ColorfulDivider from '@/components/ColorfulDivider'

export default function UnsubscribePage() {
  return (
    <main style={{ background: '#071828', minHeight: '100vh' }}>
      <ColorfulDivider />
      
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: '#00D4C8' }}>
            Unsubscribe from FomoGeo
          </h1>
          <p className="text-lg" style={{ color: '#7EB8D8' }}>
            We're sorry to see you go
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
              <h2 className="text-2xl font-bold mb-4" style={{ color: '#FFB300' }}>How to Unsubscribe</h2>
              <p className="mb-4 leading-relaxed" style={{ color: '#B8D8E8' }}>
                You can unsubscribe from our newsletter by clicking the unsubscribe link at the bottom of any
                email we send you, or by contacting us at{' '}
                <a href="mailto:support@fomogeo.com" className="font-semibold" style={{ color: '#FFB300' }}>
                  support@fomogeo.com
                </a>
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4" style={{ color: '#FFB300' }}>What Happens Next</h2>
              <p className="mb-4 leading-relaxed" style={{ color: '#B8D8E8' }}>
                You'll be removed from our mailing list within 48 hours and will no longer receive deal alerts
                or newsletters. You can resubscribe at any time from our homepage.
              </p>
            </section>

            <section className="pt-6 border-t" style={{ borderColor: 'rgba(0,212,200,0.2)' }}>
              <h2 className="text-2xl font-bold mb-4" style={{ color: '#00D4C8' }}>Need Help?</h2>
              <p className="mb-4 leading-relaxed" style={{ color: '#B8D8E8' }}>
                If you have any questions or need assistance, contact us at:
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
