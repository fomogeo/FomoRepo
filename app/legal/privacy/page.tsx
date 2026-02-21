export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="bg-sky-gradient py-16 border-b border-gray-200">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-center text-fg-heading">Privacy Policy</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="prose prose-lg max-w-none">
          <p className="text-fg-muted mb-8">Last Updated: {new Date().toLocaleDateString()}</p>
          
          <h2 className="text-2xl font-bold text-fg-heading mt-8 mb-4">Information We Collect</h2>
          <p className="text-fg-body mb-4">We collect information that you provide directly to us, including:</p>
          <ul className="list-disc pl-6 text-fg-body mb-6">
            <li>Email addresses (for newsletter subscriptions)</li>
            <li>IP addresses and location data (for weather widget via ipapi.co and Open-Meteo API)</li>
            <li>Usage data and analytics</li>
          </ul>

          <h2 className="text-2xl font-bold text-fg-heading mt-8 mb-4">How We Use Your Information</h2>
          <p className="text-fg-body mb-4">We use the information we collect to:</p>
          <ul className="list-disc pl-6 text-fg-body mb-6">
            <li>Send you newsletters and deal alerts</li>
            <li>Provide personalized weather information</li>
            <li>Improve our services and user experience</li>
            <li>Comply with legal obligations</li>
          </ul>

          <h2 className="text-2xl font-bold text-fg-heading mt-8 mb-4">Data Sharing</h2>
          <p className="text-fg-body mb-6">
            We do not sell your personal information. We may share data with service providers (Supabase, Vercel, ipapi.co, Open-Meteo) 
            who help us operate our website.
          </p>

          <h2 className="text-2xl font-bold text-fg-heading mt-8 mb-4">Your Rights</h2>
          <p className="text-fg-body mb-4">You have the right to:</p>
          <ul className="list-disc pl-6 text-fg-body mb-6">
            <li>Access your personal data</li>
            <li>Request deletion of your data</li>
            <li>Unsubscribe from emails at any time</li>
            <li>Opt out of data collection</li>
          </ul>

          <h2 className="text-2xl font-bold text-fg-heading mt-8 mb-4">Contact Us</h2>
          <p className="text-fg-body">For privacy concerns, email: privacy@fomogeo.com</p>
        </div>
      </div>
    </div>
  )
}
