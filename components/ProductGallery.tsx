'use client'

import Image from 'next/image'
import { useState } from 'react'

interface ProductGalleryProps {
  images: string[]
  mainImage: string
  productName: string
}

export default function ProductGallery({ images, mainImage, productName }: ProductGalleryProps) {
  // Build full image list: main image first, then any additional images
  const allImages = [mainImage, ...images.filter(img => img !== mainImage)].filter(Boolean)
  // Deduplicate by normalizing URLs (some may differ only in size suffix)
  const uniqueImages = Array.from(new Set(allImages.map(img => img.replace(/\._.*_\./, '._AC_SL800_.'))))
  
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [imgError, setImgError] = useState<Record<number, boolean>>({})

  const selectedImage = uniqueImages[selectedIndex] || mainImage

  return (
    <div className="flex flex-col gap-3">
      {/* Main Image */}
      <div className="relative aspect-square rounded-lg overflow-hidden" style={{ background: '#f8f9fa' }}>
        <Image
          src={imgError[selectedIndex] 
            ? 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600' 
            : selectedImage
          }
          alt={productName}
          fill
          className="object-contain p-4"
          priority
          onError={() => setImgError(prev => ({ ...prev, [selectedIndex]: true }))}
          unoptimized
        />

        {/* Image counter */}
        {uniqueImages.length > 1 && (
          <div className="absolute bottom-3 right-3 px-3 py-1 rounded-full text-xs font-bold"
            style={{ background: 'rgba(0,0,0,0.6)', color: '#fff' }}>
            {selectedIndex + 1} / {uniqueImages.length}
          </div>
        )}

        {/* Navigation arrows for mobile */}
        {uniqueImages.length > 1 && (
          <>
            <button
              onClick={() => setSelectedIndex(prev => prev === 0 ? uniqueImages.length - 1 : prev - 1)}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center text-lg font-bold transition-opacity hover:opacity-100"
              style={{ background: 'rgba(0,0,0,0.5)', color: '#fff', opacity: 0.7 }}
              aria-label="Previous image"
            >
              ‹
            </button>
            <button
              onClick={() => setSelectedIndex(prev => prev === uniqueImages.length - 1 ? 0 : prev + 1)}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center text-lg font-bold transition-opacity hover:opacity-100"
              style={{ background: 'rgba(0,0,0,0.5)', color: '#fff', opacity: 0.7 }}
              aria-label="Next image"
            >
              ›
            </button>
          </>
        )}
      </div>

      {/* Thumbnails */}
      {uniqueImages.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {uniqueImages.map((img, index) => (
            <button
              key={index}
              onClick={() => setSelectedIndex(index)}
              className="relative flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden transition-all"
              style={{ 
                background: '#f8f9fa',
                border: selectedIndex === index 
                  ? '2px solid #00D4C8' 
                  : '2px solid rgba(0,212,200,0.2)',
                opacity: selectedIndex === index ? 1 : 0.7,
              }}
            >
              <Image
                src={img}
                alt={`${productName} - image ${index + 1}`}
                fill
                className="object-contain p-1"
                unoptimized
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=100'
                }}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
