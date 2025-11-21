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
    <div
      ref={sectionRef}
      className="relative bg-white z-10 w-full h-screen py-12"
    >
      <div className="absolute inset-y-0 left-12 flex items-center justify-end w-7/10">
        <ImageCarousel
          images={MUSEUM_IMAGES}
          currentIndex={currentIndex}
          prevIndex={prevIndex}
          newImageRef={newImageRef}
          alt="Museum"
          className="w-full aspect-[5/3]"
        />
      </div>
      <SectionCard
        buttonDataGroup="14982"
        title={t("home.musee.title")}
        descriptions={[t("home.musee.description")]}
        buttonText={t("home.musee.button")}
        position="right"
      />
    </div>
  );
};

export default MuseumSection;
