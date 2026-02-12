export default function PrivacyPage() {
  const siteName = process.env.NEXT_PUBLIC_SITE_NAME || 'FOMO Finds'
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'your-domain.com'

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-4xl font-bold text-gray-900 mb-6">
        Privacy Policy
      </h1>

      <div className="prose prose-lg">
        <p className="text-gray-600 mb-6">
          Last Updated: {new Date().toLocaleDateString()}
        </p>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Introduction
          </h2>
          <p className="text-gray-700 leading-relaxed">
            {siteName} ("we," "our," or "us") respects your privacy. This Privacy Policy explains 
            how we collect, use, disclose, and safeguard your information when you visit our website 
            {siteUrl}.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Information We Collect
          </h2>
          
          <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">
            Personal Information
          </h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            We may collect personal information that you voluntarily provide to us when you:
          </p>
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li>Subscribe to our email newsletter</li>
            <li>Contact us with questions or feedback</li>
            <li>Participate in surveys or promotions</li>
          </ul>
          <p className="text-gray-700 leading-relaxed mt-4">
            This information may include: email address, name (if provided), and any other information 
            you choose to share.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">
            Automatically Collected Information
          </h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            When you visit our site, we automatically collect certain information about your device:
          </p>
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li>IP address</li>
            <li>Browser type</li>
            <li>Operating system</li>
            <li>Pages visited and time spent on pages</li>
            <li>Referring website</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            How We Use Your Information
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            We use the information we collect to:
          </p>
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li>Send you our email newsletter (only if you subscribed)</li>
            <li>Respond to your inquiries and requests</li>
            <li>Improve our website and content</li>
            <li>Analyze site usage and trends</li>
            <li>Prevent fraud and enhance security</li>
            <li>Comply with legal obligations</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Cookies and Tracking Technologies
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            We use cookies and similar tracking technologies to enhance your experience on our site. 
            Cookies are small data files stored on your device. We use:
          </p>
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li><strong>Essential Cookies:</strong> Necessary for the site to function</li>
            <li><strong>Analytics Cookies:</strong> Help us understand how visitors use our site</li>
            <li><strong>Advertising Cookies:</strong> Used to display relevant ads (e.g., Google AdSense)</li>
          </ul>
          <p className="text-gray-700 leading-relaxed mt-4">
            You can control cookies through your browser settings.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Third-Party Services
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            We may use third-party services that collect, monitor, and analyze data:
          </p>
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li><strong>Google AdSense:</strong> For displaying advertisements</li>
            <li><strong>Analytics Services:</strong> To understand site usage</li>
            <li><strong>Affiliate Networks:</strong> When you click affiliate links</li>
          </ul>
          <p className="text-gray-700 leading-relaxed mt-4">
            These third parties have their own privacy policies, and we are not responsible for their practices.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Your Rights
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Depending on your location, you may have certain rights regarding your personal information:
          </p>
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li>Access your personal information</li>
            <li>Correct inaccurate information</li>
            <li>Request deletion of your information</li>
            <li>Opt-out of marketing communications</li>
            <li>Object to processing of your information</li>
          </ul>
          <p className="text-gray-700 leading-relaxed mt-4">
            To exercise these rights, please contact us or use the unsubscribe link in our emails.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Email Unsubscribe
          </h2>
          <p className="text-gray-700 leading-relaxed">
            You can unsubscribe from our email list at any time by clicking the "unsubscribe" link 
            in any email we send, or by visiting our <a href="/legal/unsubscribe" className="text-primary-600 hover:underline">unsubscribe page</a>.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Data Security
          </h2>
          <p className="text-gray-700 leading-relaxed">
            We implement reasonable security measures to protect your information. However, no method 
            of transmission over the Internet is 100% secure, and we cannot guarantee absolute security.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Children's Privacy
          </h2>
          <p className="text-gray-700 leading-relaxed">
            Our site is not intended for children under 13. We do not knowingly collect information 
            from children under 13. If we learn we have collected such information, we will delete it.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Changes to This Policy
          </h2>
          <p className="text-gray-700 leading-relaxed">
            We may update this Privacy Policy from time to time. We will notify you of any changes 
            by posting the new policy on this page and updating the "Last Updated" date.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Contact Us
          </h2>
          <p className="text-gray-700 leading-relaxed">
            If you have questions about this Privacy Policy, please contact us at: [Your Contact Email]
          </p>
        </section>
      </div>
    </div>
  )
}
