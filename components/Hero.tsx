import Image from 'next/image'

export default function Hero() {
  return (
    <section className="relative w-full overflow-hidden" style={{ background: '#071828' }}>
      {/* Hero Banner - Full Width */}
      <div className="relative w-full">
        <Image
          src="/hero-banner.png"
          alt="FomoGeo - Verified Deals from Around the World"
          width={1920}
          height={400}
          priority
          className="w-full h-auto object-cover"
          style={{
            maxHeight: '400px',
            objectFit: 'cover'
          }}
        />
        
        {/* Fade effect at bottom */}
        <div 
          className="absolute bottom-0 left-0 right-0 h-20 pointer-events-none"
          style={{
            background: 'linear-gradient(to bottom, transparent, #071828)'
          }}
        />
      </div>
    </section>
  )
}
