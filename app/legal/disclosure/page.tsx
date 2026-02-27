export default function AffiliateDisclosurePage() {
  return (
    <div className="min-h-screen py-16" style={{ background: '#071828' }}>
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white rounded-xl shadow-2xl p-8 md:p-12">
          <h1 className="text-4xl font-bold mb-2" style={{ color: '#071828' }}>Affiliate Disclosure</h1>
          <p className="text-sm text-gray-500 mb-8">Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>

          <div className="prose prose-lg max-w-none space-y-8" style={{ color: '#2C3E50' }}>
            
            {/* FTC Compliance Notice */}
            <section className="p-6 rounded-lg" style={{ background: '#FFF3E0', border: '2px solid #FFB300' }}>
              <h2 className="text-xl font-bold mb-3" style={{ color: '#FF6B00' }}>
                ⚠️ Important FTC Disclosure
              </h2>
              <p className="font-semibold">
                FomoGeo participates in affiliate marketing programs and earns commissions from qualifying purchases made through links on this website. This disclosure is made in accordance with the Federal Trade Commission's 16 CFR Part 255: "Guides Concerning the Use of Endorsements and Testimonials in Advertising."
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4" style={{ color: '#071828' }}>What Are Affiliate Links?</h2>
              <p>
                Affiliate links are special tracking links that allow us to earn a commission when you make a purchase after clicking on them. These links contain unique tracking codes that identify traffic coming from FomoGeo.
              </p>
              <p className="mt-3">
                <strong>Here's how it works:</strong>
              </p>
              <ol className="list-decimal pl-6 space-y-3 mt-3">
                <li>You click on a product link on our website</li>
                <li>You're redirected to the retailer's website (Amazon, etc.)</li>
                <li>A cookie is placed in your browser to track your visit</li>
                <li>If you make a purchase, we earn a small commission</li>
                <li><strong className="text-green-600">You pay the same price</strong> - there is no extra cost to you</li>
              </ol>
              <p className="mt-4 font-semibold" style={{ color: '#00C853' }}>
                ✓ Using our affiliate links does NOT increase the price you pay. The commission comes from the retailer's marketing budget, not your wallet.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4" style={{ color: '#071828' }}>Affiliate Programs We Participate In</h2>
              <p>
                We are a participant in multiple affiliate programs. Here's a comprehensive list:
              </p>

              <h3 className="text-xl font-semibold mb-3 mt-6" style={{ color: '#00D4C8' }}>Amazon Associates Program</h3>
              <div className="p-4 rounded-lg" style={{ background: '#E8F5E9', border: '1px solid #00C853' }}>
                <p className="font-semibold mb-2">Official Amazon Associates Disclosure:</p>
                <p className="text-sm italic">
                  "FomoGeo is a participant in the Amazon Services LLC Associates Program, an affiliate advertising program designed to provide a means for sites to earn advertising fees by advertising and linking to Amazon.com, Amazon.co.uk, Amazon.ca, Amazon.de, Amazon.fr, Amazon.it, Amazon.es, Amazon.co.jp, Amazon.com.au, Amazon.in, and other Amazon stores worldwide."
                </p>
              </div>

              <h3 className="text-xl font-semibold mb-3 mt-6" style={{ color: '#00D4C8' }}>Other Affiliate Networks</h3>
              <p>
                We also participate in the following affiliate networks and programs:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li><strong>Awin:</strong> Network representing brands like Etsy, AliExpress, and thousands of merchants</li>
                <li><strong>ShareASale:</strong> Network with over 4,000+ merchant programs</li>
                <li><strong>CJ Affiliate (Commission Junction):</strong> One of the largest affiliate networks</li>
                <li><strong>Impact:</strong> Partnership platform with premium brands</li>
                <li><strong>Rakuten Advertising:</strong> Global affiliate network</li>
                <li><strong>FlexOffers:</strong> Multi-vertical affiliate network</li>
                <li><strong>PartnerStack:</strong> SaaS affiliate programs</li>
                <li><strong>Direct merchant programs:</strong> Individual partnerships with brands</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4" style={{ color: '#071828' }}>How We Earn Commissions</h2>
              <p>
                We earn affiliate commissions in several ways:
              </p>

              <h3 className="text-xl font-semibold mb-3 mt-6" style={{ color: '#00D4C8' }}>1. Product Link Clicks</h3>
              <p>
                When you click on a product link and make a purchase, we earn a commission. Commission rates vary by:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Product category:</strong> 1% - 15% depending on the type of product</li>
                <li><strong>Merchant:</strong> Each retailer sets their own commission rates</li>
                <li><strong>Program tier:</strong> Higher volume can earn better rates</li>
                <li><strong>Promotional periods:</strong> Special events may offer bonus commissions</li>
              </ul>

              <h3 className="text-xl font-semibold mb-3 mt-6" style={{ color: '#00D4C8' }}>2. Cookie Duration</h3>
              <p>
                After clicking our affiliate link, a cookie is stored in your browser for a limited time:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Amazon:</strong> 24 hours (or until checkout if added to cart)</li>
                <li><strong>Other merchants:</strong> Typically 30-90 days depending on program</li>
              </ul>
              <p className="mt-3">
                This means if you make a purchase within the cookie duration, we may earn a commission even if you don't buy immediately.
              </p>

              <h3 className="text-xl font-semibold mb-3 mt-6" style={{ color: '#00D4C8' }}>3. Display Advertising</h3>
              <p>
                We may also earn revenue from:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Google AdSense:</strong> Display ads shown on the website</li>
                <li><strong>Ad networks:</strong> Contextual advertising programs</li>
                <li><strong>Sponsored content:</strong> Clearly labeled sponsored posts or reviews</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4" style={{ color: '#071828' }}>Our Editorial Policy</h2>
              <p className="font-semibold text-lg mb-4">
                Our affiliate relationships do NOT influence our editorial independence.
              </p>

              <h3 className="text-xl font-semibold mb-3" style={{ color: '#00D4C8' }}>What This Means:</h3>
              <ul className="list-disc pl-6 space-y-3">
                <li>
                  <strong>We only recommend products we believe in:</strong> Our recommendations are based on research, testing, user reviews, and our honest assessment of value.
                </li>
                <li>
                  <strong>We compare multiple options:</strong> We provide comparisons and alternatives, even if some options pay lower commissions.
                </li>
                <li>
                  <strong>We disclose limitations:</strong> If a product has drawbacks, we mention them.
                </li>
                <li>
                  <strong>We update content regularly:</strong> Product recommendations are reviewed and updated to ensure accuracy.
                </li>
                <li>
                  <strong>We don't guarantee results:</strong> Product performance may vary, and we can't guarantee you'll have the same experience as described.
                </li>
              </ul>

              <h3 className="text-xl font-semibold mb-3 mt-6" style={{ color: '#00D4C8' }}>What We DON'T Do:</h3>
              <ul className="list-disc pl-6 space-y-3">
                <li>❌ Recommend products solely because they pay high commissions</li>
                <li>❌ Hide negative reviews or known issues</li>
                <li>❌ Misrepresent product features or pricing</li>
                <li>❌ Make exaggerated or false claims</li>
                <li>❌ Write fake reviews or testimonials</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4" style={{ color: '#071828' }}>Price and Availability</h2>
              <div className="p-4 rounded-lg" style={{ background: '#FFEBEE', border: '1px solid #FF6B00' }}>
                <p className="font-semibold mb-2" style={{ color: '#C62828' }}>
                  ⚠️ Important Notice About Pricing:
                </p>
                <p>
                  Prices, availability, and deals on this website may not be current or accurate. Product prices and availability are subject to change without notice. Always verify the price, availability, and product details on the retailer's website before making a purchase.
                </p>
              </div>

              <p className="mt-4">
                We make reasonable efforts to keep product information current, but we cannot guarantee:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Prices are accurate or current</li>
                <li>Deals or promotions are still active</li>
                <li>Products are in stock</li>
                <li>Product specifications are complete</li>
                <li>Images accurately represent the product</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4" style={{ color: '#071828' }}>Your Purchases and Returns</h2>
              <p className="font-semibold mb-3">
                We are NOT the seller. All purchases are made directly with third-party retailers.
              </p>
              <p>
                This means:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>We don't handle transactions:</strong> Payment is processed by the retailer</li>
                <li><strong>We don't ship products:</strong> The retailer handles shipping</li>
                <li><strong>We don't process returns:</strong> Contact the retailer for returns/refunds</li>
                <li><strong>We don't provide customer service:</strong> The retailer handles support</li>
                <li><strong>We're not responsible for issues:</strong> Product defects, shipping problems, etc. are handled by the retailer</li>
              </ul>
              <p className="mt-4 font-semibold">
                For any issues with your purchase, contact the retailer directly.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4" style={{ color: '#071828' }}>Reviews and Recommendations</h2>
              <p>
                Our product reviews and recommendations are based on:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Personal testing:</strong> When possible, we test products ourselves</li>
                <li><strong>Research:</strong> We analyze specifications, features, and comparisons</li>
                <li><strong>User reviews:</strong> We consider feedback from verified purchasers</li>
                <li><strong>Expert opinions:</strong> We reference reviews from trusted sources</li>
                <li><strong>Price analysis:</strong> We compare pricing across multiple retailers</li>
              </ul>

              <p className="mt-4 font-semibold" style={{ color: '#FF6B00' }}>
                Disclaimer: Product experiences may vary. Results mentioned in reviews are not guaranteed and individual results may differ.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4" style={{ color: '#071828' }}>International Affiliate Links</h2>
              <p>
                We use geo-targeting to show you the most relevant affiliate links based on your location. This means:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Users in the US see Amazon.com links</li>
                <li>Users in the UK see Amazon.co.uk links</li>
                <li>Users in other countries see appropriate local links when available</li>
              </ul>
              <p className="mt-3">
                We participate in Amazon Associates programs in multiple countries including US, UK, Canada, Germany, France, Spain, Italy, Japan, Australia, and India.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4" style={{ color: '#071828' }}>Sponsored Content</h2>
              <p>
                Occasionally, we may publish sponsored content or paid partnerships. These will ALWAYS be clearly labeled with:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>"Sponsored" or "Paid Partnership" disclosure at the top</li>
                <li>Clear indication of the sponsoring brand</li>
                <li>Distinction from our regular editorial content</li>
              </ul>
              <p className="mt-3 font-semibold">
                Even with sponsored content, we maintain editorial control and only promote products we believe in.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4" style={{ color: '#071828' }}>Updates to This Disclosure</h2>
              <p>
                We may update this disclosure as we add new affiliate partnerships or change our monetization strategies. Check this page periodically for updates.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4" style={{ color: '#071828' }}>Questions About Our Affiliate Relationships?</h2>
              <p>
                If you have questions about our affiliate relationships, commissions, or editorial policy, please contact us:
              </p>
              <div className="mt-4 p-6 rounded-lg" style={{ background: '#F5F5F5' }}>
                <p className="font-semibold">FomoGeo</p>
                <p>Email: affiliate@fomogeo.com</p>
                <p>Website: <a href="/" className="text-blue-600 hover:underline">fomogeo.com</a></p>
              </div>
            </section>

            {/* Final Notice */}
            <section className="mt-12 p-6 rounded-lg" style={{ background: '#E3F2FD', border: '2px solid #00D4C8' }}>
              <h2 className="text-xl font-bold mb-3" style={{ color: '#071828' }}>
                Summary
              </h2>
              <p className="font-semibold mb-3">
                By using FomoGeo, you acknowledge that:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>We earn commissions from affiliate links</li>
                <li>Using our links doesn't cost you extra</li>
                <li>We only recommend products we believe provide value</li>
                <li>Prices and availability may change</li>
                <li>We are not responsible for your transactions with retailers</li>
              </ul>
              <p className="mt-4 font-semibold" style={{ color: '#00D4C8' }}>
                Thank you for supporting FomoGeo by using our affiliate links!
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
