import Script from 'next/script'
import CategoryGrid from '@/components/CategoryGrid'

export default function CategoriesPage() {
  return (
    <div className="min-h-screen section-dark">
      <Script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4317381401188026"
        crossOrigin="anonymous"
        strategy="afterInteractive"
      />
      
      <div className="w-full relative">
        <img src="/hero-light.png" alt="All Categories" className="w-full h-auto" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/40 via-slate-900/30 to-transparent flex items-center justify-center">
          <div className="text-center px-4">
            <h1 className="text-5xl md:text-6xl font-bold mb-4 text-white drop-shadow-2xl">
              All <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent drop-shadow-2xl">Categories</span>
            </h1>
            <p className="text-lg text-cyan-300 drop-shadow-lg">Explore all 30 product categories and find the perfect deals</p>
          </div>
        </div>
      </div>
      
      <CategoryGrid showAll={true} />
    </div>
  )
}
