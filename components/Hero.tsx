import { TrendingUp, Star, Zap } from 'lucide-react'

export default function Hero() {
  const siteName = process.env.NEXT_PUBLIC_SITE_NAME || 'FomoGeo'
  const tagline = process.env.NEXT_PUBLIC_SITE_TAGLINE || 'Verified Deals from Around the World'

  return (
    <section className="bg-gradient-to-br from-blue-600 via-blue-500 to-cyan-400 text-white py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 drop-shadow-lg">
            {siteName}
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-50 font-medium">
            {tagline}
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 md:gap-6 mb-8">
            <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-5 py-3 rounded-full border border-white/30 shadow-lg">
              <TrendingUp className="h-5 w-5" />
              <span className="font-semibold">Trending Products</span>
            </div>
            <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-5 py-3 rounded-full border border-white/30 shadow-lg">
              <Star className="h-5 w-5" />
              <span className="font-semibold">Best Sellers</span>
            </div>
            <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-5 py-3 rounded-full border border-white/30 shadow-lg">
              <Zap className="h-5 w-5 text-yellow-300" />
              <span className="font-semibold">Flash Deals</span>
            </div>
          </div>

          <p className="text-base md:text-lg text-blue-50 max-w-2xl mx-auto">
            Discover the hottest products and best deals from around the web.
            Updated daily with fresh finds verified by our team.
          </p>
        </div>
      </div>
    </section>
  )
}
