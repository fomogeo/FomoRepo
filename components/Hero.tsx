import Image from 'next/image'

export default function Hero() {
  return (
    <section className="relative w-full bg-gradient-to-b from-sky-50 to-white overflow-hidden">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="flex flex-col items-center text-center">
          <Image
            src="/hero-light-full.png"
            alt="FomoGeo - Verified Deals from Around the World"
            width={1400}
            height={400}
            className="w-full max-w-5xl h-auto"
            priority
          />
        </div>
      </div>
    </section>
  )
}
