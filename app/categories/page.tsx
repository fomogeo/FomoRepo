import Script from 'next/script'
import CategoryGrid from '@/components/CategoryGrid'
import AdSpace from '@/components/AdSpace'

export default function CategoriesPage() {
  return (
    <div className="min-h-screen section-dark">
      <Script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4317381401188026"
        crossOrigin="anonymous"
        strategy="afterInteractive"
      />
      
      <div className="w-full">
        <img src="/hero-light.png" alt="All Categories" className="w-full h-auto" />
      </div>
      
      <div className="py-12 text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-4 text-white">
          All <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Categories</span>
        </h1>
        <p className="text-lg text-gray-300">Explore all 30 product categories and find the perfect deals</p>
      </div>

      <div className="container mx-auto px-4 py-10">
        <AdSpace size="leaderboard" />
        <div className="mt-8">
          <CategoryGrid showAll={true} />
        </div>
        <AdSpace size="leaderboard" />
      </div>
    </div>
  )
}
