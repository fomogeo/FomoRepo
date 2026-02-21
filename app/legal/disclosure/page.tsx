import Script from 'next/script'

export default function DisclosurePage() {
  return (
    <div className="min-h-screen section-dark">
      <Script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4317381401188026"
        crossOrigin="anonymous"
        strategy="afterInteractive"
      />
      
      <div className="w-full relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 to-transparent z-10"></div>
        <img src="/hero-light.png" alt="Disclosure" className="w-full h-48 object-cover opacity-40" />
        <div className="absolute inset-0 z-20 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white">
              Affiliate Disclosure
            </h1>
            <p className="text-cyan-300 mt-4">Last Updated: {new Date().toLocaleDateString()}</p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="card-light p-8">
          <div className="prose prose-lg prose-invert max-w-none text-gray-200">
            {/* Content will be here */}
          </div>
        </div>
      </div>
    </div>
  )
}
