import React, { useEffect, useRef } from "react";
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

  // Scroll-based image reveal animation
  useEffect(() => {
    if (!sectionRef.current || !secondImageRef.current) return;

    // Create GSAP context for proper cleanup
    const ctx = gsap.context(() => {
      // Set initial state - second image hidden
      gsap.set(secondImageRef.current, {
        clipPath: "inset(0% 0% 100% 100%)",
      });

      // Animate clip-path - triggered animation that plays forward/backward (reveals from top-right to bottom-left)
      gsap.to(secondImageRef.current, {
        clipPath: "inset(0% 0% 0% 0%)",
        duration: 1.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 10%",
          // toggleActions: "play reverse play reverse",
        },
      });
    }, sectionRef);

    // Refresh ScrollTrigger after setup
    ScrollTrigger.refresh();

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={sectionRef}
      className="relative bg-white z-10 w-full py-4 md:py-12 md:h-screen"
    >
      {/* Mobile: stacked layout, Desktop: absolute positioning */}
      <div className="px-4 md:px-0 md:absolute md:inset-y-0 md:left-12 flex items-center justify-end md:w-7/10">
        <div className="relative w-full aspect-[3/4] md:aspect-[5/3] overflow-hidden rounded-xs">
          {/* First image (base) */}
          <img
            src={MUSEUM_IMAGES[0]}
            alt="Museum"
            className="absolute inset-0 w-full h-full object-contain bg-black"
          />
          {/* Second image (reveals on scroll with diagonal curtain) */}
          <img
            ref={secondImageRef}
            src={MUSEUM_IMAGES[1]}
            alt="Museum"
            className="absolute inset-0 w-full h-full object-contain bg-black"
          />
        </div>
      </div>
      <div className="mt-8 md:mt-0 md:h-full">
        <SectionCard
          buttonDataGroup="14982"
          title={t("home.musee.title")}
          descriptions={[t("home.musee.description")]}
          buttonText={t("home.musee.button")}
          position="right"
        />
      </div>
    </div>
  );
};

export default MuseumSection;
