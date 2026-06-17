import React, { useEffect, useRef, useState } from "react";
import { useLanguage } from "../hooks/useLanguage";
import { REMERCIEMENTS_IMAGE } from "../constants/images";

const RemerciementsSection: React.FC = () => {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const [isInView, setIsInView] = useState(false);

  const webpSrc = REMERCIEMENTS_IMAGE.replace(/\.(jpg|jpeg)$/i, ".webp");

  // Intersection Observer to trigger the fade-translate when in viewport
  useEffect(() => {
    const element = sectionRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0 }
    );

    requestAnimationFrame(() => {
      observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`mt-20 bg-[#b3986f] py-12 md:py-20 shadow-[0_-3px_10px_rgba(0,0,0,0.12)] transition-all duration-1000 ease-out-quad ${
        isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
    >
      <div className="mx-auto max-w-5xl px-4">
        <picture>
          <source srcSet={webpSrc} type="image/webp" />
          <img
            src={REMERCIEMENTS_IMAGE}
            alt={t("home.remerciements.alt") as string}
            className="h-auto w-full"
            loading="lazy"
            decoding="async"
          />
        </picture>
      </div>
    </section>
  );
};

export default RemerciementsSection;
