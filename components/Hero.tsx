export default function Hero() {
  return (
    <section className="hero-section relative py-0">
      <div className="relative z-10 w-full">
        <img
          src="/hero-light-full.png"
          alt="FomoGeo - Verified Deals from Around the World"
          className="w-full h-auto object-cover"
          style={{ maxHeight: '400px', objectFit: 'cover' }}
        />
      </div>
    </section>
  )
}
