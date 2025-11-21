import React, { useEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "../context/LanguageContext";
import { useImageCarousel } from "../hooks/useImageCarousel";
import ImageCarousel from "./ImageCarousel";
import SectionCard from "./SectionCard";

const MUSEUM_IMAGES = ["/musee.jpg", "/musee-2.jpg"];

const MuseumSection: React.FC = () => {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLDivElement>(null);

  const { currentIndex, prevIndex, setIsActive, newImageRef } =
    useImageCarousel({
      images: MUSEUM_IMAGES,
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
    <div
      ref={sectionRef}
      className="relative bg-white z-10 w-full py-12 md:h-screen"
    >
      {/* Mobile: stacked layout, Desktop: absolute positioning */}
      <div className="px-4 md:px-0 md:absolute md:inset-y-0 md:left-12 flex items-center justify-end md:w-7/10">
        <ImageCarousel
          images={MUSEUM_IMAGES}
          currentIndex={currentIndex}
          prevIndex={prevIndex}
          newImageRef={newImageRef}
          alt="Museum"
          className="w-full aspect-square md:aspect-[5/3]"
        />
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
