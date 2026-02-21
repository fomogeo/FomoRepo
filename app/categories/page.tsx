import CategoryGrid from '@/components/CategoryGrid'

export default function CategoriesPage() {
  return (
    <div className="min-h-screen">
      <div className="page-header">
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 text-fg-heading">
            All <span className="text-fg-blue">Categories</span>
          </h1>
          <p className="text-lg text-fg-body">Explore all 30 product categories and find the perfect deals</p>
        </div>
      </div>
      <CategoryGrid showAll={true} />
    </div>
  )
}
