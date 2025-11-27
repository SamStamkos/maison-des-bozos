import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "../context/LanguageContext";
import SectionCard from "./SectionCard";

gsap.registerPlugin(ScrollTrigger);

const MUSEUM_IMAGES = ["/musee.jpg", "/musee-2.jpg"];

const MuseumSection: React.FC = () => {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLDivElement>(null);
  const secondImageRef = useRef<HTMLImageElement>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Scroll-based image reveal animation with gallery cycling
  useEffect(() => {
    if (!sectionRef.current || !secondImageRef.current) return;

    let intervalId: NodeJS.Timeout;

    // Create GSAP context for proper cleanup
    const ctx = gsap.context(() => {
      // Set initial state - second image hidden
      gsap.set(secondImageRef.current, {
        clipPath: "inset(0% 0% 100% 100%)",
      });

      // Initial reveal animation triggered by scroll
      gsap.to(secondImageRef.current, {
        clipPath: "inset(0% 0% 0% 0%)",
        duration: 1.2,
        ease: "power2.out",
        delay: 3,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 10%",
        },
        onComplete: () => {
          // Start cycling through images after initial reveal
          intervalId = setInterval(() => {
            setCurrentImageIndex((prevIndex) => {
              const nextIndex = (prevIndex + 1) % MUSEUM_IMAGES.length;

              // Animate curtain effect for each transition
              if (secondImageRef.current) {
                gsap.fromTo(
                  secondImageRef.current,
                  { clipPath: "inset(0% 0% 100% 100%)" },
                  {
                    clipPath: "inset(0% 0% 0% 0%)",
                    duration: 1.2,
                    ease: "power2.out",
                  }
                );
              }

              return nextIndex;
            });
          }, 4000);
        },
      });
    }, sectionRef);

    // Refresh ScrollTrigger after setup
    ScrollTrigger.refresh();

    return () => {
      ctx.revert();
      if (intervalId) clearInterval(intervalId);
    };
  }, []);

  return (
    <div
      ref={sectionRef}
      className="max-w-screen-2xl px-0 md:px-12 mx-auto relative bg-white z-10 w-full py-4 md:py-12 md:h-screen"
    >
      {/* Mobile: stacked layout, Desktop: absolute positioning */}
      <div className="px-4 md:px-0 md:absolute md:inset-y-0 md:left-12 flex items-center justify-end md:w-7/10">
        <div className="relative w-full aspect-[3/4] md:aspect-[5/3] overflow-hidden rounded-xs">
          {/* Base image - current image */}
          <img
            src={MUSEUM_IMAGES[currentImageIndex]}
            alt="Museum"
            className="absolute inset-0 w-full h-full object-contain bg-black"
          />
          {/* Revealing image - next image with curtain effect */}
          <img
            ref={secondImageRef}
            src={MUSEUM_IMAGES[(currentImageIndex + 1) % MUSEUM_IMAGES.length]}
            alt="Museum"
            className="absolute inset-0 w-full h-full object-contain bg-black"
          />
        </div>
      </div>
      <div className="mt-8 md:mt-0 md:h-full">
        <SectionCard
          buttonDataGroup="14982"
          title={t("home.musee.title") as string}
          descriptions={[t("home.musee.description")]}
          buttonText={t("home.musee.button") as string}
          position="right"
        />
      </div>
    </div>
  );
};

export default MuseumSection;
