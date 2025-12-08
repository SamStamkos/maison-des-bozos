import React, { useEffect, useState } from "react";
import { ANIMATION_CONFIG } from "../constants/animations";
import SectionCard from "./SectionCard";
import TranslationKeys from "../types/translations";

interface SectionWithCarouselProps {
  images: readonly string[];
  imagePosition: "left" | "right";
  cardTitle: string | TranslationKeys;
  cardDescriptions: (string | React.ReactNode)[];
  cardButtonText: string;
  cardButtonDataGroup?: string;
  altTextPrefix: string;
  sectionId?: string;
}

const SectionWithCarousel: React.FC<SectionWithCarouselProps> = ({
  images,
  imagePosition,
  cardTitle,
  cardDescriptions,
  cardButtonText,
  cardButtonDataGroup = "15097",
  altTextPrefix,
  sectionId,
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Auto-cycle through images with crossfade
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageIndex(
        (prevIndex) => (prevIndex + 1) % images.length
      );
    }, ANIMATION_CONFIG.carousel.interval);

    return () => clearInterval(intervalId);
  }, [images.length]);

  const imagePositionClasses =
    imagePosition === "left"
      ? "px-4 md:px-0 md:absolute md:inset-y-0 md:left-12 flex items-center justify-end md:w-7/10"
      : "px-4 md:px-0 md:absolute md:inset-y-0 md:right-12 flex items-center justify-start md:w-7/10";

  const cardPosition = imagePosition === "left" ? "right" : "left";

  return (
    <section
      id={sectionId}
      className="max-w-screen-2xl px-0 md:px-12 mx-auto relative bg-secondary z-10 w-full py-4 md:py-12 md:h-screen"
      aria-labelledby={`section-${imagePosition}`}
    >
      {/* Mobile: stacked layout, Desktop: absolute positioning */}
      <div className={imagePositionClasses}>
        <div className="relative w-full aspect-[3/4] md:aspect-[5/3] overflow-hidden rounded-xs">
          {/* Crossfade images */}
          {images.map((image, index) => (
            <picture
              key={image}
              className={`absolute inset-0 w-full h-full transition-opacity duration-${ANIMATION_CONFIG.carousel.imageFadeDuration} ${
                index === currentImageIndex ? "opacity-100" : "opacity-0"
              }`}
            >
              <source
                srcSet={image.replace(/\.(jpg|jpeg)$/i, ".webp")}
                type="image/webp"
              />
              <img
                src={image}
                alt={`${altTextPrefix} à la Maison des Bozos - Photo ${index + 1} sur ${images.length}`}
                loading={index === 0 ? "eager" : "lazy"}
                decoding="async"
                className="absolute inset-0 w-full h-full object-contain"
              />
            </picture>
          ))}
        </div>
      </div>
      <div className="mt-8 md:mt-0 md:h-full">
        <SectionCard
          title={cardTitle as string}
          descriptions={cardDescriptions}
          buttonText={cardButtonText}
          buttonDataGroup={cardButtonDataGroup}
          position={cardPosition}
        />
      </div>
    </section>
  );
};

export default React.memo(SectionWithCarousel);
