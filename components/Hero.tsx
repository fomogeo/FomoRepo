import Image from 'next/image'

export default function Hero() {
  return (
    <section className="relative w-full overflow-hidden" style={{ background: '#071828' }}>
      {/* Hero banner image — full width, no overlaid text (it's already in the image) */}
      <div className="relative w-full">
        <Image
          src="/hero-banner.png"
          alt="FomoGeo – Verified Deals from Around the World"
          width={1920}
          height={960}
          className="w-full h-auto"
          priority
          quality={95}
        />
        {/* Soft bottom fade to blend into the next dark section */}
        <div
          className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
          style={{ background: 'linear-gradient(to bottom, transparent, #071828)' }}
        />
      </div>
    </section>
  )
}
