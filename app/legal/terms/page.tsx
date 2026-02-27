export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen py-16" style={{ background: '#071828' }}>
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="rounded-xl shadow-2xl p-8 md:p-12" style={{ background: '#0D2840', border: '1px solid rgba(0,212,200,0.2)' }}>
          <h1 className="text-4xl font-bold mb-2" style={{ color: '#E8F4FD' }}>Terms of Service</h1>
          <p className="text-sm mb-8" style={{ color: '#7EB8D8' }}>Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>

          <div className="prose prose-lg max-w-none space-y-8" style={{ color: '#B8D4E8' }}>
            <section>
              <h2 className="text-2xl font-bold mb-4" style={{ color: '#00D4C8' }}>1. Agreement to Terms</h2>
              <p>
                By accessing or using FomoGeo ("the Website," "we," "us," or "our"), you agree to be bound by these Terms of Service ("Terms"). If you disagree with any part of these Terms, you may not access the Website.
              </p>
              <p className="mt-3">
                These Terms apply to all visitors, users, and others who access or use the Website. We reserve the right to modify these Terms at any time. Your continued use of the Website following any changes indicates your acceptance of the new Terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4" style={{ color: '#00D4C8' }}>2. Description of Service</h2>
              <p>
                FomoGeo is a deals and product discovery platform that:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Provides information about trending products and deals from various retailers</li>
                <li>Features affiliate links to third-party merchants</li>
                <li>Offers product reviews, comparisons, and recommendations</li>
                <li>Publishes blog content related to products, shopping, and deals</li>
                <li>Sends email newsletters with deals and promotions (with user consent)</li>
              </ul>
              <p className="mt-4">
                We do not sell products directly. All purchases are made through third-party retailers via affiliate links.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4" style={{ color: '#00D4C8' }}>3. Affiliate Relationships</h2>
              <p className="font-semibold" style={{ color: '#FF6B00' }}>
                IMPORTANT DISCLOSURE: FomoGeo participates in affiliate marketing programs. This means we earn commissions from qualifying purchases made through our affiliate links.
              </p>
              <p className="mt-3">
                We are a participant in the following affiliate programs (but not limited to):
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Amazon Associates Program:</strong> We earn from qualifying purchases</li>
                <li><strong>Awin:</strong> Affiliate network with multiple merchants</li>
                <li><strong>ShareASale:</strong> Affiliate network with multiple merchants</li>
                <li><strong>CJ Affiliate:</strong> Affiliate network with multiple merchants</li>
                <li><strong>Impact:</strong> Affiliate network with multiple merchants</li>
                <li><strong>Rakuten Advertising:</strong> Affiliate network</li>
              </ul>
              <p className="mt-4">
                <strong>Our Promise:</strong> We only recommend products we believe will provide value to our users. Our affiliate relationships do not influence our editorial independence or the products we feature.
              </p>
              <p className="mt-3">
                For complete details, see our <a href="/legal/disclosure" className="hover:underline" style={{ color: '#00E5FF' }}>Affiliate Disclosure</a>.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4" style={{ color: '#00D4C8' }}>4. Use of the Website</h2>
              
              <h3 className="text-xl font-semibold mb-3" style={{ color: '#FFB300' }}>Acceptable Use</h3>
              <p>You may use the Website for lawful purposes only. You agree not to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Violate any applicable local, state, national, or international law</li>
                <li>Infringe upon or violate our intellectual property rights or the rights of others</li>
                <li>Harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate</li>
                <li>Submit false or misleading information</li>
                <li>Upload viruses or other malicious code</li>
                <li>Spam or send unsolicited or unauthorized advertising or promotional materials</li>
                <li>Attempt to gain unauthorized access to the Website or related systems</li>
                <li>Use automated systems (bots, scrapers, etc.) to access the Website without permission</li>
                <li>Interfere with, disrupt, or create an undue burden on the Website</li>
                <li>Attempt to impersonate another user or person</li>
              </ul>

              <h3 className="text-xl font-semibold mb-3 mt-6" style={{ color: '#FFB300' }}>Account Responsibilities</h3>
              <p>
                If you create an account or subscribe to our services, you are responsible for:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Maintaining the security of your account credentials</li>
                <li>All activities that occur under your account</li>
                <li>Notifying us immediately of any unauthorized use</li>
                <li>Providing accurate and current information</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4" style={{ color: '#00D4C8' }}>5. Product Information and Pricing</h2>
              
              <h3 className="text-xl font-semibold mb-3" style={{ color: '#FFB300' }}>Accuracy of Information</h3>
              <p>
                We strive to provide accurate product information, prices, and availability. However:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Product information is provided by third-party merchants and may be outdated</li>
                <li>Prices can change without notice</li>
                <li>Deals and promotions may expire or have limited availability</li>
                <li>Product availability may vary by region and retailer</li>
                <li>Images may not exactly reflect the actual product</li>
              </ul>

              <h3 className="text-xl font-semibold mb-3 mt-6" style={{ color: '#FFB300' }}>No Guarantees</h3>
              <p>
                We do not guarantee:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>That any product will be available at the advertised price</li>
                <li>That deals or promotions will still be active when you visit the retailer</li>
                <li>That products will meet your specific requirements</li>
                <li>That product descriptions or reviews are completely accurate</li>
              </ul>
              <p className="mt-4 font-semibold">
                Always verify prices, availability, and product details directly with the retailer before making a purchase.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4" style={{ color: '#00D4C8' }}>6. Third-Party Websites and Retailers</h2>
              <p>
                The Website contains links to third-party websites and retailers. We are not responsible for:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>The content, products, or services of third-party websites</li>
                <li>The privacy practices of third-party websites</li>
                <li>Any transactions you conduct with third-party retailers</li>
                <li>Disputes between you and third-party retailers</li>
                <li>The quality, safety, or legality of products sold by third parties</li>
                <li>Shipping, returns, refunds, or customer service from third parties</li>
              </ul>
              <p className="mt-4 font-semibold">
                Your interactions with third-party retailers are solely between you and them. Review their terms, privacy policies, and return policies before making purchases.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4" style={{ color: '#00D4C8' }}>7. Intellectual Property Rights</h2>
              
              <h3 className="text-xl font-semibold mb-3" style={{ color: '#FFB300' }}>Our Content</h3>
              <p>
                All content on the Website, including but not limited to text, graphics, logos, images, videos, and software, is the property of FomoGeo or its content suppliers and is protected by copyright, trademark, and other intellectual property laws.
              </p>
              <p className="mt-3">
                You may not:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Copy, reproduce, distribute, or create derivative works from our content</li>
                <li>Use our trademarks, logos, or branding without permission</li>
                <li>Remove or alter any copyright notices or attributions</li>
                <li>Scrape or systematically extract data from the Website</li>
                <li>Use our content for commercial purposes without a license</li>
              </ul>

              <h3 className="text-xl font-semibold mb-3 mt-6" style={{ color: '#FFB300' }}>User-Generated Content</h3>
              <p>
                If you submit any content (comments, reviews, emails, etc.), you grant us a non-exclusive, royalty-free, perpetual, worldwide license to use, reproduce, modify, and display that content in connection with the Website.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4" style={{ color: '#00D4C8' }}>8. Email Communications</h2>
              <p>
                By subscribing to our email newsletter, you consent to receive:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Deal alerts and promotional emails</li>
                <li>Product recommendations</li>
                <li>Blog post notifications</li>
                <li>Special offers and exclusive discounts</li>
              </ul>
              <p className="mt-4">
                You can unsubscribe at any time by:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Clicking the "Unsubscribe" link in any email</li>
                <li>Visiting our <a href="/legal/unsubscribe" className="hover:underline" style={{ color: '#00E5FF' }}>Unsubscribe page</a></li>
                <li>Contacting us directly</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4" style={{ color: '#00D4C8' }}>9. Disclaimers and Limitations of Liability</h2>
              
              <h3 className="text-xl font-semibold mb-3" style={{ color: '#FFB300' }}>Disclaimer of Warranties</h3>
              <p className="font-semibold">
                THE WEBSITE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT ANY WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED.
              </p>
              <p className="mt-3">
                We disclaim all warranties, including but not limited to:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Implied warranties of merchantability</li>
                <li>Fitness for a particular purpose</li>
                <li>Non-infringement</li>
                <li>Accuracy, reliability, or completeness of content</li>
                <li>Uninterrupted or error-free operation</li>
                <li>Security of the Website or your data</li>
              </ul>

              <h3 className="text-xl font-semibold mb-3 mt-6" style={{ color: '#FFB300' }}>Limitation of Liability</h3>
              <p className="font-semibold">
                TO THE FULLEST EXTENT PERMITTED BY LAW, FOMOGEO SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS OR REVENUES.
              </p>
              <p className="mt-3">
                This includes damages resulting from:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Use or inability to use the Website</li>
                <li>Unauthorized access to or alteration of your data</li>
                <li>Statements or conduct of any third party on the Website</li>
                <li>Products purchased through affiliate links</li>
                <li>Errors, mistakes, or inaccuracies in content</li>
                <li>Personal injury or property damage</li>
                <li>Any bugs, viruses, or harmful code</li>
              </ul>
              <p className="mt-4">
                OUR TOTAL LIABILITY SHALL NOT EXCEED $100 OR THE AMOUNT YOU PAID US IN THE LAST 12 MONTHS, WHICHEVER IS GREATER.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4" style={{ color: '#00D4C8' }}>10. Indemnification</h2>
              <p>
                You agree to indemnify, defend, and hold harmless FomoGeo and its officers, directors, employees, and agents from any claims, damages, losses, liabilities, and expenses (including attorneys' fees) arising from:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Your use of the Website</li>
                <li>Your violation of these Terms</li>
                <li>Your violation of any rights of another party</li>
                <li>Your transactions with third-party retailers</li>
                <li>Any content you submit or transmit</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4" style={{ color: '#00D4C8' }}>11. Governing Law and Dispute Resolution</h2>
              
              <h3 className="text-xl font-semibold mb-3" style={{ color: '#FFB300' }}>Governing Law</h3>
              <p>
                These Terms shall be governed by and construed in accordance with the laws of your jurisdiction, without regard to its conflict of law provisions.
              </p>

              <h3 className="text-xl font-semibold mb-3 mt-6" style={{ color: '#FFB300' }}>Dispute Resolution</h3>
              <p>
                Any disputes arising from these Terms or your use of the Website shall be resolved through:
              </p>
              <ol className="list-decimal pl-6 space-y-2">
                <li><strong>Informal Negotiation:</strong> Contact us first to resolve the issue</li>
                <li><strong>Binding Arbitration:</strong> If informal negotiation fails, disputes will be resolved through binding arbitration</li>
              </ol>
              <p className="mt-4">
                You waive your right to participate in class action lawsuits or class-wide arbitration.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4" style={{ color: '#00D4C8' }}>12. Termination</h2>
              <p>
                We may terminate or suspend your access to the Website immediately, without prior notice or liability, for any reason, including:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Breach of these Terms</li>
                <li>Fraudulent or illegal activity</li>
                <li>Violation of third-party rights</li>
                <li>Repeated complaints from other users</li>
              </ul>
              <p className="mt-4">
                Upon termination, your right to use the Website will immediately cease. All provisions of these Terms that by their nature should survive termination shall survive.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4" style={{ color: '#00D4C8' }}>13. Changes to Terms</h2>
              <p>
                We reserve the right to modify these Terms at any time. We will notify users of material changes by:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Updating the "Last Updated" date</li>
                <li>Posting a notice on the Website</li>
                <li>Sending an email to subscribers (for significant changes)</li>
              </ul>
              <p className="mt-4">
                Your continued use of the Website after changes indicates acceptance of the modified Terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4" style={{ color: '#00D4C8' }}>14. Severability</h2>
              <p>
                If any provision of these Terms is held to be invalid or unenforceable, the remaining provisions shall continue in full force and effect.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4" style={{ color: '#00D4C8' }}>15. Contact Information</h2>
              <p>
                For questions about these Terms, please contact us at:
              </p>
              <div className="mt-4 p-6 rounded-lg" style={{ background: 'rgba(0,212,200,0.1)', border: '1px solid rgba(0,212,200,0.3)' }}>
                <p className="font-semibold" style={{ color: '#E8F4FD' }}>FomoGeo</p>
                <p style={{ color: '#B8D4E8' }}>Email: support@fomogeo.com</p>
                <p style={{ color: '#B8D4E8' }}>Website: <a href="/" className="hover:underline" style={{ color: '#00E5FF' }}>fomogeo.com</a></p>
              </div>
            </section>

            <section className="mt-12 p-6 rounded-lg" style={{ background: 'rgba(255,107,0,0.1)', border: '2px solid rgba(255,107,0,0.3)' }}>
              <p className="font-bold text-lg mb-2" style={{ color: '#FF6B00' }}>
                ⚠️ Important Notice
              </p>
              <p className="text-sm">
                By using FomoGeo, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service. If you do not agree to these Terms, please do not use the Website.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
