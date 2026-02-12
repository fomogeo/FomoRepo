import { TrendingUp, Star, Zap } from 'lucide-react'

export default function Hero() {
  const siteName = process.env.NEXT_PUBLIC_SITE_NAME || 'FOMO Finds'
  const tagline = process.env.NEXT_PUBLIC_SITE_TAGLINE || "Don't Miss What Everyone Is Buying"

  return (
    <section className="bg-gradient-to-r from-primary-600 to-orange-500 text-white py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-4">
            {siteName}
          </h1>
          <p className="text-xl mb-8 opacity-90">
            {tagline}
          </p>
          
          <div className="flex flex-wrap justify-center gap-6 mb-8">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5" />
              <span>Trending Products</span>
            </div>
            <div className="flex items-center space-x-2">
              <Star className="h-5 w-5" />
              <span>Best Sellers</span>
            </div>
            <div className="flex items-center space-x-2">
              <Zap className="h-5 w-5" />
              <span>Flash Deals</span>
            </div>
          </div>

          <p className="text-sm opacity-80">
            Discover the hottest products and best deals from around the web.
            Updated daily with fresh finds.
          </p>
        </div>
      </div>
    </section>
  )
}
