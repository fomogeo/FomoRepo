import Image from 'next/image'

export default function Hero() {
  return (
    <section className="relative w-full overflow-hidden" style={{ background: '#071828' }}>
      {/* Hero Banner - maintains aspect ratio, no cropping */}
      <div className="relative w-full">
        <Image
          src="/hero-banner.png"
          alt="FomoGeo - Discover Amazing Deals"
          width={1920}
          height={400}
          priority
          className="w-full h-auto"
          style={{
            display: 'block',
            maxWidth: '100%',
            height: 'auto'
          }}
        />
        
        {/* Fade effect at bottom */}
        <div 
          className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
          style={{
            background: 'linear-gradient(to top, #071828, transparent)'
          }}
        />
      </div>
    </section>
  )
}
