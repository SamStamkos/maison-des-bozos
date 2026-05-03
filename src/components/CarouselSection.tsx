import React, { useEffect, useState } from 'react'
import { ANIMATION_CONFIG } from '../constants/animations'
import { CONCERTS_IMAGES } from '../constants/images'

const CarouselSection: React.FC = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % CONCERTS_IMAGES.length)
    }, ANIMATION_CONFIG.carousel.interval)

    return () => clearInterval(intervalId)
  }, [])

  return (
    <section
      id="carousel"
      className="max-w-[2000px] mx-auto relative bg-secondary z-0 w-full md:h-[190vh]"
      aria-label="Galerie de photos des concerts"
    >
      <div className="mx-auto w-full max-w-[2000px] md:sticky md:top-0 md:h-screen md:flex md:items-center">
        <div className="relative w-full aspect-[5/3] overflow-hidden rounded-xs">
          {CONCERTS_IMAGES.map((image, index) => (
            <picture
              key={image}
              className={`absolute inset-0 w-full h-full transition-opacity duration-${ANIMATION_CONFIG.carousel.imageFadeDuration} ${
                index === currentImageIndex ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <source
                srcSet={image.replace(/\.(jpg|jpeg)$/i, '.webp')}
                type="image/webp"
              />
              <img
                src={image}
                alt={`Concerts à la Maison des Bozos - Photo ${index + 1} sur ${CONCERTS_IMAGES.length}`}
                loading={index === 0 ? 'eager' : 'lazy'}
                decoding="async"
                className="absolute inset-0 w-full h-full object-cover object-top"
              />
            </picture>
          ))}
        </div>
      </div>
    </section>
  )
}

export default React.memo(CarouselSection)
