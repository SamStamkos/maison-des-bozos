import React from "react";

interface ImageCarouselProps {
  images: string[];
  currentIndex: number;
  prevIndex: number;
  newImageRef: React.RefObject<HTMLImageElement | null>;
  alt: string;
  className?: string;
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({
  images,
  currentIndex,
  prevIndex,
  newImageRef,
  alt,
  className = "",
}) => {
  return (
    <div className={`relative overflow-hidden rounded-xs ${className}`}>
      {/* Previous image (underneath) */}
      <img
        src={images[prevIndex]}
        alt={alt}
        loading="lazy"
        decoding="async"
        className="absolute inset-0 w-full h-full object-contain bg-black rounded-2xl"
      />
      {/* New image (on top with clip-path animation) */}
      <img
        ref={newImageRef}
        src={images[currentIndex]}
        alt={alt}
        loading={currentIndex === 0 ? "eager" : "lazy"}
        decoding="async"
        className="absolute inset-0 w-full h-full object-contain bg-black rounded-2xl"
        style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
      />
    </div>
  );
};

export default React.memo(ImageCarousel, (prevProps, nextProps) => {
  return (
    prevProps.currentIndex === nextProps.currentIndex &&
    prevProps.prevIndex === nextProps.prevIndex &&
    prevProps.images === nextProps.images
  );
});
