import React, { useEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "../context/LanguageContext";
import { useImageCarousel } from "../hooks/useImageCarousel";
import ImageCarousel from "./ImageCarousel";
import SectionCard from "./SectionCard";

const CONCERTS_IMAGES = ["/bozo.jpg", "/concerts-2.jpg", "/concerts-3.jpg"];

const ConcertsSection: React.FC = () => {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLDivElement>(null);

  const { currentIndex, prevIndex, setIsActive, newImageRef } = useImageCarousel({
    images: CONCERTS_IMAGES,
    interval: 4000,
    animationDuration: 1.8,
  });

  // ScrollTrigger to start carousel when section hits viewport (runs forever once triggered)
  useEffect(() => {
    if (!sectionRef.current) return;

    const trigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top center",
      onEnter: () => setIsActive(true),
      once: true, // Only trigger once, then carousel runs forever
    });

    return () => {
      trigger.kill();
    };
  }, [setIsActive]);

  return (
    <div ref={sectionRef} className="relative bg-white z-10 py-12 md:h-screen">
      {/* Mobile: stacked layout, Desktop: absolute positioning */}
      <div className="px-4 md:px-0 md:absolute md:inset-y-0 md:right-12 flex items-center justify-end md:w-7/10">
        <ImageCarousel
          images={CONCERTS_IMAGES}
          currentIndex={currentIndex}
          prevIndex={prevIndex}
          newImageRef={newImageRef}
          alt="Concerts"
          className="w-full aspect-square md:aspect-[5/3]"
        />
      </div>
      <div className="mt-8 md:mt-0 md:h-full">
        <SectionCard
          title={t("home.concerts.title")}
          descriptions={[t("home.concerts.description"), t("home.concerts.description")]}
          buttonText={t("home.concerts.button")}
          position="left"
        />
      </div>
    </div>
  );
};

export default ConcertsSection;
