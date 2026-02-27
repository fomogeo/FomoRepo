import Link from 'next/link'
import ColorfulDivider from '@/components/ColorfulDivider'

export default function PrivacyPolicyPage() {
  return (
    <main style={{ background: '#071828', minHeight: '100vh' }}>
      <ColorfulDivider />
      
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: '#00D4C8' }}>
            Privacy Policy
          </h1>
          <p className="text-lg" style={{ color: '#7EB8D8' }}>
            Last Updated: {new Date().toLocaleDateString()}
          </p>
        </div>

        {/* Content Card */}
        <div 
          className="rounded-2xl p-8 md:p-12 shadow-2xl"
          style={{ 
            background: 'linear-gradient(135deg, #0D2840 0%, #091E30 100%)',
            border: '1px solid rgba(0,212,200,0.2)'
          }}
        >
          <div className="space-y-8" style={{ color: '#E8F4FD' }}>
            
            <section>
              <h2 className="text-2xl font-bold mb-4" style={{ color: '#FFB300' }}>1. Information We Collect</h2>
              <p className="mb-4 leading-relaxed" style={{ color: '#B8D8E8' }}>
                We collect information you provide directly to us when you subscribe to our newsletter, 
                including your email address. We may also collect information automatically through cookies 
                and similar technologies when you visit our website.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4" style={{ color: '#FFB300' }}>2. How We Use Your Information</h2>
              <p className="mb-4 leading-relaxed" style={{ color: '#B8D8E8' }}>We use the information we collect to send you our newsletter with deals and product recommendations, improve our website and services, analyze website traffic and user behavior, and comply with legal obligations.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4" style={{ color: '#FFB300' }}>3. Information Sharing</h2>
              <p className="mb-4 leading-relaxed" style={{ color: '#B8D8E8' }}>
                We do not sell, trade, or rent your personal information to third parties. We may share 
                your information with service providers who assist us in operating our website.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4" style={{ color: '#FFB300' }}>4. Your Rights</h2>
              <p className="mb-4 leading-relaxed" style={{ color: '#B8D8E8' }}>
                You have the right to access, correct, or delete your personal information, and to unsubscribe 
                from our newsletter at any time.
              </p>
            </section>

            <section className="pt-6 border-t" style={{ borderColor: 'rgba(0,212,200,0.2)' }}>
              <h2 className="text-2xl font-bold mb-4" style={{ color: '#00D4C8' }}>Contact Us</h2>
              <p className="mb-4 leading-relaxed" style={{ color: '#B8D8E8' }}>
                If you have any questions about this Privacy Policy, please contact us at:
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
