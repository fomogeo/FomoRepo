import Image from 'next/image'

export default function Hero() {
  return (
    <section className="section-hero relative">
      <div className="container mx-auto px-4 py-8 md:py-12 relative z-10">
        <div className="flex flex-col items-center text-center">
          <Image
            src="/hero-light-full.png"
            alt="FomoGeo - Verified Deals from Around the World"
            width={1400}
            height={350}
            className="w-full max-w-6xl h-auto object-contain"
            priority
            style={{ width: '100%', height: 'auto' }}
          />
        </div>
      </div>
    </section>
  )
}
