import Script from 'next/script'
import Link from 'next/link'

export default function DisclosurePage() {
  return (
    <div className="min-h-screen section-dark">
      <Script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4317381401188026"
        crossOrigin="anonymous"
        strategy="afterInteractive"
      />
      
      <div className="w-full relative">
        <img src="/hero-light.png" alt="Affiliate Disclosure" className="w-full h-auto" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 via-slate-900/60 to-transparent flex items-center justify-center">
          <div className="text-center px-4">
            <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg">Affiliate Disclosure</h1>
            <p className="text-cyan-300 mt-4 drop-shadow">Last Updated: {new Date().toLocaleDateString()}</p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="card-light p-8">
          <div className="prose prose-lg prose-invert max-w-none">
            
            <p className="text-gray-200 text-lg mb-6">
              FomoGeo participates in affiliate marketing programs to help fund our operations and provide free content to our users. This page explains our affiliate relationships and how they work.
            </p>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">What Are Affiliate Links?</h2>
            <p className="text-gray-200 mb-6">
              Affiliate links are special tracking links that allow us to earn a commission when you click on them and make a purchase. When you click an affiliate link on FomoGeo and complete a purchase, we may receive a small percentage of the sale at no additional cost to you.
            </p>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">Our Affiliate Partnerships</h2>
            <p className="text-gray-200 mb-4">
              FomoGeo is a participant in several affiliate marketing programs, including:
            </p>
            <ul className="list-disc pl-6 text-gray-200 mb-6 space-y-2">
              <li><strong className="text-white">Amazon Associates Program:</strong> An affiliate advertising program designed to provide a means for sites to earn advertising fees by advertising and linking to Amazon.com and affiliated sites</li>
              <li><strong className="text-white">Awin Network:</strong> A global affiliate network connecting advertisers and publishers</li>
              <li><strong className="text-white">ShareASale:</strong> An affiliate marketing network featuring diverse merchants</li>
              <li><strong className="text-white">CJ Affiliate (Commission Junction):</strong> One of the largest affiliate networks</li>
              <li><strong className="text-white">Impact:</strong> An affiliate marketing platform</li>
              <li><strong className="text-white">Rakuten Advertising:</strong> Global affiliate marketing network</li>
              <li><strong className="text-white">FlexOffers:</strong> Performance marketing network</li>
            </ul>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">How Affiliate Commissions Work</h2>
            <p className="text-gray-200 mb-4">When you make a purchase through our affiliate links:</p>
            <ul className="list-disc pl-6 text-gray-200 mb-6 space-y-2">
              <li>You pay the same price as if you went directly to the merchant's website</li>
              <li>The merchant pays us a small commission (typically 1-10% of the sale)</li>
              <li>This commission does NOT increase your cost</li>
              <li>The commission helps us maintain and improve FomoGeo</li>
              <li>We only get paid if you complete a purchase, not just for clicks</li>
            </ul>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">Our Commitment to You</h2>
            <p className="text-gray-200 mb-4">We are committed to transparency and honesty. Here's what you can expect:</p>
            <ul className="list-disc pl-6 text-gray-200 mb-6 space-y-2">
              <li><strong className="text-white">Honest Recommendations:</strong> We only recommend products we believe offer genuine value</li>
              <li><strong className="text-white">Editorial Independence:</strong> Our affiliate relationships do not influence our reviews or recommendations</li>
              <li><strong className="text-white">Clear Disclosure:</strong> We clearly mark content that contains affiliate links</li>
              <li><strong className="text-white">Balanced Reviews:</strong> We provide both pros and cons for all products</li>
              <li><strong className="text-white">No Hidden Fees:</strong> You never pay more when using our affiliate links</li>
              <li><strong className="text-white">Quality First:</strong> We prioritize your experience over commission potential</li>
            </ul>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">Price and Availability</h2>
            <p className="text-gray-200 mb-6">
              All product prices, availability, and specifications are provided by our merchant partners and are subject to change without notice. We make every effort to ensure accuracy, but we cannot guarantee that all information is current or error-free. Final prices are determined at checkout by the merchant.
            </p>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">Product Reviews and Recommendations</h2>
            <p className="text-gray-200 mb-6">
              Our product reviews and recommendations are based on extensive research, user reviews, expert opinions, and when possible, hands-on testing. Whether or not a product has an affiliate program does not affect our editorial decisions about featuring or recommending it.
            </p>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">Advertising and Sponsored Content</h2>
            <p className="text-gray-200 mb-4">
              In addition to affiliate links, FomoGeo may display:
            </p>
            <ul className="list-disc pl-6 text-gray-200 mb-6 space-y-2">
              <li><strong className="text-white">Google AdSense Ads:</strong> Contextual advertisements served by Google</li>
              <li><strong className="text-white">Banner Ads:</strong> Display advertising from various networks</li>
              <li><strong className="text-white">Sponsored Posts:</strong> Clearly marked content created in partnership with brands (if applicable)</li>
            </ul>
            <p className="text-gray-200 mb-6">
              All sponsored content is clearly labeled and does not compromise our editorial integrity.
            </p>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">FTC Compliance</h2>
            <p className="text-gray-200 mb-6">
              This affiliate disclosure is in compliance with the Federal Trade Commission (FTC) guidelines on endorsements and testimonials. The FTC requires websites to disclose material connections (like affiliate relationships) between advertisers and endorsers.
            </p>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">Amazon Associates Specific Disclosure</h2>
            <p className="text-gray-200 mb-6">
              FomoGeo is a participant in the Amazon Services LLC Associates Program, an affiliate advertising program designed to provide a means for sites to earn advertising fees by advertising and linking to Amazon.com. As an Amazon Associate, we earn from qualifying purchases.
            </p>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">Cookie Disclosure</h2>
            <p className="text-gray-200 mb-6">
              Affiliate programs use cookies to track clicks and purchases. These cookies help determine which website referred you to the merchant. Cookies typically expire after 24 hours to 90 days, depending on the merchant's policy. For more information, see our <Link href="/legal/privacy" className="text-cyan-400 hover:text-cyan-300 underline">Privacy Policy</Link>.
            </p>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">Your Support Helps Us</h2>
            <p className="text-gray-200 mb-6">
              When you use our affiliate links, you help support FomoGeo at no extra cost to you. These commissions allow us to:
            </p>
            <ul className="list-disc pl-6 text-gray-200 mb-6 space-y-2">
              <li>Maintain and improve our website</li>
              <li>Research and review more products</li>
              <li>Create helpful buying guides and content</li>
              <li>Keep our service free for all users</li>
              <li>Expand to cover more categories and deals</li>
            </ul>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">International Affiliate Programs</h2>
            <p className="text-gray-200 mb-6">
              We participate in affiliate programs from multiple countries and regions to serve our global audience. Depending on your location, we may direct you to region-specific affiliate programs to ensure the best shopping experience.
            </p>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">Updates to This Disclosure</h2>
            <p className="text-gray-200 mb-6">
              We may update this Affiliate Disclosure from time to time to reflect changes in our affiliate relationships or legal requirements. We will post any changes on this page with an updated "Last Updated" date.
            </p>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">Questions and Feedback</h2>
            <p className="text-gray-200 mb-4">
              If you have questions about our affiliate relationships or this disclosure, please contact us:
            </p>
            <ul className="list-none text-gray-200 mb-6 space-y-2">
              <li><strong className="text-white">Email:</strong> <a href="mailto:support@fomogeo.com" className="text-cyan-400 hover:text-cyan-300">support@fomogeo.com</a></li>
              <li><strong className="text-white">Privacy Policy:</strong> <Link href="/legal/privacy" className="text-cyan-400 hover:text-cyan-300">Privacy Policy</Link></li>
              <li><strong className="text-white">Terms of Service:</strong> <Link href="/legal/terms" className="text-cyan-400 hover:text-cyan-300">Terms of Service</Link></li>
            </ul>

            <div className="mt-8 p-6 bg-cyan-900/20 border-l-4 border-cyan-400 rounded">
              <p className="text-gray-200 text-sm italic">
                <strong className="text-white">Bottom Line:</strong> We earn commissions from affiliate links, but you always pay the same price. We only recommend products we genuinely believe are valuable, and our honest opinions are never for sale. Your trust is more important to us than any commission.
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}
