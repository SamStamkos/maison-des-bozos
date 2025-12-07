import React, { useEffect, useRef, useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import SectionCard from "./SectionCard";

const CONCERTS_IMAGES = [
  "/concerts/concert-1.jpg",
  "/concerts/concert-2.jpg",
  "/concerts/concert-3.jpg",
  "/concerts/concert-4.jpg",
  "/concerts/concert-5.jpg",
];

const ConcertsSection: React.FC = () => {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLDivElement>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Auto-cycle through images with crossfade
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % CONCERTS_IMAGES.length);
    }, 4000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div
      ref={sectionRef}
      className="max-w-screen-2xl mx-auto relative bg-secondary z-10 py-4 md:py-12 md:h-screen"
    >
      {/* Mobile: stacked layout, Desktop: absolute positioning */}
      <div className="px-4 md:px-0 md:absolute md:inset-y-0 md:right-12 flex items-center justify-start md:w-7/10">
        <div className="relative w-full aspect-[3/4] md:aspect-[5/3] overflow-hidden rounded-xs">
          {/* Crossfade images */}
          {CONCERTS_IMAGES.map((image, index) => (
            <img
              key={image}
              src={image}
              alt={`Concerts ${index + 1}`}
              className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-1000 ${
                index === currentImageIndex ? "opacity-100" : "opacity-0"
              }`}
            />
          ))}
        </div>
      </div>
      <div className="mt-8 md:mt-0 md:h-full">
        <SectionCard
          title={t("home.concerts.title") as string}
          descriptions={[t("home.concerts.description")]}
          buttonText={t("home.concerts.button") as string}
          position="left"
        />
      </div>
    </div>
  );
};

export default ConcertsSection;
