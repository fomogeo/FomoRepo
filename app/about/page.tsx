import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'About Us | FomoGeo',
  description: 'Learn about FomoGeo — your trusted source for hand-curated, verified product deals from Amazon and trusted sellers worldwide.',
}

export default function AboutPage() {
  return (
    <div className="min-h-screen" style={{ background: '#071828' }}>

      {/* Hero */}
      <section className="py-20 text-center relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #0A1929 0%, #071828 50%, #0B1E30 100%)' }}>
        <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(0,212,200,0.06) 0%, transparent 70%)', transform: 'translate(-50%, -50%)' }} />
        <div className="relative max-w-4xl mx-auto px-4">
          <div className="inline-flex items-center gap-2 mb-6 px-5 py-2 rounded-full" style={{ background: 'rgba(0,212,200,0.1)', border: '1px solid rgba(0,212,200,0.3)' }}>
            <span className="text-2xl">🌍</span>
            <span className="font-semibold" style={{ color: '#00D4C8' }}>About FomoGeo</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6" style={{ color: '#E8F4FD' }}>
            Deals You Can <span style={{ color: '#FFB300' }}>Actually Trust</span>
          </h1>
          <p className="text-xl max-w-2xl mx-auto" style={{ color: '#B8D4E8' }}>
            We cut through the noise to bring you hand-verified deals that are genuinely worth your time and money.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16" style={{ background: '#071828' }}>
        <div className="max-w-4xl mx-auto px-4">
          <div className="rounded-xl p-8 md:p-12" style={{ background: '#0D2840', border: '1px solid rgba(0,212,200,0.2)' }}>
            <h2 className="text-3xl font-bold mb-6" style={{ color: '#00D4C8' }}>Our Story</h2>
            <div className="space-y-5 text-lg leading-relaxed" style={{ color: '#B8D4E8' }}>
              <p>
                FomoGeo was founded by <strong style={{ color: '#FFB300' }}>Michael</strong> from a simple frustration: <strong style={{ color: '#E8F4FD' }}>most "deal" sites are just noise</strong>. Endless product listings with fake discounts, zero context, and no genuine curation. There had to be a better way to help people find products that are actually worth buying.
              </p>
              <p>
                As someone who spent years researching products before every purchase — comparing prices, reading reviews, checking price history — Michael built FomoGeo to do that work for everyone. A place where every single product is <strong style={{ color: '#E8F4FD' }}>hand-reviewed, price-verified, and chosen because it genuinely offers value</strong>. Not because someone paid us to list it. Not because an algorithm decided it was "trending." Because a real person looked at it and thought: <em style={{ color: '#FFB300' }}>"This is a genuinely good deal."</em>
              </p>
              <p>
                Today, FomoGeo monitors thousands of products across 30 categories daily, covering everything from electronics and home essentials to fashion and outdoor gear. We serve deal-hunters from over 50 countries, with affiliate links properly routed to regional Amazon stores so you always get the best local pricing.
              </p>
              <p>
                We're proudly independent. Our recommendations are based on research, customer reviews, and price history analysis — never paid placement. When you buy through our links, we earn a small commission from Amazon at no extra cost to you. That's how we keep the lights on while keeping our recommendations honest.
              </p>
            </div>
          </div>

          {/* Meet the Founder */}
          <div className="mt-8 rounded-xl p-6 md:p-8 flex flex-col sm:flex-row gap-6 items-start" style={{ background: 'rgba(255,179,0,0.04)', border: '1px solid rgba(255,179,0,0.2)' }}>
            <div className="w-16 h-16 rounded-full flex items-center justify-center text-3xl font-bold shrink-0" style={{ background: 'linear-gradient(135deg, #FFB300, #FF8F00)', color: '#071828' }}>
              M
            </div>
            <div>
              <h3 className="text-xl font-bold mb-1" style={{ color: '#FFB300' }}>Michael</h3>
              <p className="text-sm font-semibold mb-3" style={{ color: '#00D4C8' }}>Founder & Deals Editor</p>
              <p className="leading-relaxed" style={{ color: '#B8D4E8' }}>
                Michael is the founder and lead deals editor at FomoGeo. With a passion for finding genuine value and a sharp eye for spotting inflated "discounts," he personally oversees the product curation process — researching prices, reading customer reviews, and verifying every deal before it goes live. His goal is simple: help people spend smarter by cutting through the noise of fake deals and low-quality recommendations.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="py-16" style={{ background: '#0B1E30' }}>
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4" style={{ color: '#E8F4FD' }}>
            How We <span style={{ color: '#FFB300' }}>Pick Deals</span>
          </h2>
          <p className="text-center text-lg mb-12 max-w-2xl mx-auto" style={{ color: '#7EB8D8' }}>
            Every product on FomoGeo goes through our verification process before it makes the cut.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { step: '01', icon: '🔍', title: 'Research', text: 'We scan thousands of products daily across Amazon and trusted retailers, looking for genuine value and quality.', color: '#00D4C8' },
              { step: '02', icon: '📊', title: 'Price Verify', text: 'We check price history to confirm the discount is real — not an inflated "original price" that never existed.', color: '#FFB300' },
              { step: '03', icon: '⭐', title: 'Review Check', text: 'We read customer reviews and check ratings. We won\'t feature products with concerning quality feedback.', color: '#00C853' },
              { step: '04', icon: '✅', title: 'Curate', text: 'Only products that pass all checks make it to FomoGeo. We\'d rather show fewer deals than bad ones.', color: '#FF6B00' },
            ].map(({ step, icon, title, text, color }) => (
              <div key={step} className="rounded-xl p-6 text-center" style={{ background: 'rgba(13,40,64,0.6)', border: `1px solid ${color}30` }}>
                <div className="text-xs font-bold mb-3 tracking-widest" style={{ color }}>{step}</div>
                <div className="text-4xl mb-4">{icon}</div>
                <h3 className="text-lg font-bold mb-3" style={{ color }}>{title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: '#B8D4E8' }}>{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16" style={{ background: '#071828' }}>
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12" style={{ color: '#E8F4FD' }}>
            What We <span style={{ color: '#00D4C8' }}>Stand For</span>
          </h2>

          <div className="space-y-6">
            {[
              { icon: '🎯', title: 'Honesty Over Everything', text: 'We will never feature a product just because it pays a higher commission. Our editorial recommendations are based purely on quality, value, and customer satisfaction. If a product isn\'t worth your money, it won\'t appear on our site — period.', color: '#FFB300' },
              { icon: '🔒', title: 'Transparency', text: 'We\'re upfront about how we make money. When you click a product link and make a purchase, we earn a small affiliate commission from Amazon. This never increases the price you pay. We clearly disclose this on every page because you deserve to know.', color: '#00D4C8' },
              { icon: '🌍', title: 'Global Accessibility', text: 'Great deals shouldn\'t be limited by borders. We serve shoppers in the US, UK, Germany, France, Spain, Italy, and beyond — with proper regional pricing and local Amazon store routing so you always get the best deal available in your country.', color: '#00C853' },
              { icon: '📈', title: 'Continuous Improvement', text: 'We\'re constantly refining our curation process, expanding our category coverage, and improving the shopping experience. We read every piece of feedback and use it to make FomoGeo better for everyone.', color: '#FF6B00' },
            ].map(({ icon, title, text, color }) => (
              <div key={title} className="rounded-xl p-6 flex gap-5" style={{ background: '#0D2840', border: '1px solid rgba(0,212,200,0.15)' }}>
                <div className="text-4xl flex-shrink-0 mt-1">{icon}</div>
                <div>
                  <h3 className="text-xl font-bold mb-2" style={{ color }}>{title}</h3>
                  <p className="leading-relaxed" style={{ color: '#B8D4E8' }}>{text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16" style={{ background: '#0B1E30', borderTop: '1px solid rgba(0,212,200,0.1)', borderBottom: '1px solid rgba(0,212,200,0.1)' }}>
        <div className="max-w-4xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { value: '30+', label: 'Categories', color: '#FFB300' },
              { value: '6', label: 'Countries Served', color: '#00D4C8' },
              { value: '100%', label: 'Hand-Verified', color: '#00C853' },
              { value: 'Daily', label: 'Updates', color: '#FF6B00' },
            ].map(({ value, label, color }) => (
              <div key={label}>
                <div className="text-4xl font-bold mb-2" style={{ color }}>{value}</div>
                <div className="text-sm" style={{ color: '#7EB8D8' }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16" style={{ background: '#071828' }}>
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4" style={{ color: '#E8F4FD' }}>
            Ready to Find Your Next Great Deal?
          </h2>
          <p className="text-lg mb-8" style={{ color: '#B8D4E8' }}>
            Browse our verified deals or subscribe to get the best offers delivered to your inbox.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/deals" className="px-8 py-4 rounded-lg font-bold text-lg transition-all hover:scale-105" style={{ background: 'linear-gradient(135deg, #FFB300, #FF8F00)', color: '#fff', boxShadow: '0 4px 15px rgba(255,179,0,0.3)' }}>
              Browse Deals
            </Link>
            <Link href="/#email-signup" className="px-8 py-4 rounded-lg font-bold text-lg transition-all hover:scale-105" style={{ background: 'rgba(0,212,200,0.1)', color: '#00D4C8', border: '1px solid rgba(0,212,200,0.3)' }}>
              Subscribe for Free
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
