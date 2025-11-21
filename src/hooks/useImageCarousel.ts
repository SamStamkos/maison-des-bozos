import { useState, useEffect, useRef, useCallback } from "react";
import { gsap } from "gsap";

interface UseImageCarouselOptions {
  images: string[];
  interval?: number;
  animationDuration?: number;
}

interface UseImageCarouselReturn {
  currentIndex: number;
  prevIndex: number;
  isActive: boolean;
  setIsActive: (active: boolean) => void;
  newImageRef: React.RefObject<HTMLImageElement | null>;
}

export const useImageCarousel = ({
  images,
  interval = 5000,
  animationDuration = 2,
}: UseImageCarouselOptions): UseImageCarouselReturn => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const newImageRef = useRef<HTMLImageElement | null>(null);

  // Auto-rotating carousel
  useEffect(() => {
    if (!isActive) return;

    const timer = setInterval(() => {
      setPrevIndex(currentIndex);
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, interval);

    return () => clearInterval(timer);
  }, [isActive, images.length, currentIndex, interval]);

  // Corner-to-corner diagonal reveal animation
  useEffect(() => {
    if (!newImageRef.current || currentIndex === prevIndex) return;

    gsap.fromTo(
      newImageRef.current,
      { clipPath: "polygon(0 0, 0 0, 0 0, 0 0)" },
      {
        clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
        duration: animationDuration,
        ease: "power2.out",
      }
    );
  }, [currentIndex, prevIndex, animationDuration]);

  const setIsActiveCallback = useCallback((active: boolean) => {
    setIsActive(active);
  }, []);

  return {
    currentIndex,
    prevIndex,
    isActive,
    setIsActive: setIsActiveCallback,
    newImageRef,
  };
};
