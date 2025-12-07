import React, { useEffect, useRef, useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import SectionCard from "./SectionCard";

const MUSEUM_IMAGES = [
  "/musee/musee-1.jpg",
  "/musee/musee-2.jpg",
  "/musee/musee-3.jpg",
  "/musee/musee-4.jpg",
];

const MuseumSection: React.FC = () => {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLDivElement>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Auto-cycle through images with crossfade
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % MUSEUM_IMAGES.length);
    }, 4000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div
      ref={sectionRef}
      className="max-w-screen-2xl px-0 md:px-12 mx-auto relative bg-secondary z-10 w-full py-4 md:py-12 md:h-screen"
    >
      {/* Mobile: stacked layout, Desktop: absolute positioning */}
      <div className="px-4 md:px-0 md:absolute md:inset-y-0 md:left-12 flex items-center justify-end md:w-7/10">
        <div className="relative w-full aspect-[3/4] md:aspect-[5/3] overflow-hidden rounded-xs">
          {/* Crossfade images */}
          {MUSEUM_IMAGES.map((image, index) => (
            <img
              key={image}
              src={image}
              alt={`Museum ${index + 1}`}
              className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-1000 ${
                index === currentImageIndex ? "opacity-100" : "opacity-0"
              }`}
            />
          ))}
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
