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

  // ScrollTrigger to start carousel when section hits viewport center
  useEffect(() => {
    if (!sectionRef.current) return;

    const trigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top center",
      onEnter: () => setIsActive(true),
      onLeaveBack: () => setIsActive(false),
    });

    return () => {
      trigger.kill();
    };
  }, [setIsActive]);

  return (
    <div ref={sectionRef} className="relative bg-white z-10 h-screen py-12">
      <div className="absolute inset-y-0 right-12 flex items-center justify-end w-7/10">
        <ImageCarousel
          images={CONCERTS_IMAGES}
          currentIndex={currentIndex}
          prevIndex={prevIndex}
          newImageRef={newImageRef}
          alt="Concerts"
          className="w-full aspect-[5/3]"
        />
      </div>
      <SectionCard
        title={t("home.concerts.title")}
        descriptions={[t("home.concerts.description"), t("home.concerts.description")]}
        buttonText={t("home.concerts.button")}
        position="left"
      />
    </div>
  );
};

export default ConcertsSection;
