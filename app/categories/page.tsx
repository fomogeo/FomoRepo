import CategoryGrid from '@/components/CategoryGrid'

export default function CategoriesPage() {
  return (
    <div className="min-h-screen section-dark">
      <div className="w-full relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 to-transparent z-10"></div>
        <img src="/hero-light.png" alt="All Categories" className="w-full h-64 object-cover opacity-40" />
        <div className="absolute inset-0 z-20 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-4 text-white">
              All <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Categories</span>
            </h1>
            <p className="text-lg text-cyan-300">Explore all 30 product categories and find the perfect deals</p>
          </div>
        </div>
      </div>
      <CategoryGrid showAll={true} />
    </div>
  )
}
