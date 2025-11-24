import React, { useEffect, useRef, useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import Typewriter from "./Typewriter";

const DonationSection: React.FC = () => {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const [isInView, setIsInView] = useState(false);
  const [showContent, setShowContent] = useState(false);

  // Intersection Observer to trigger animations when in viewport
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

  // Show content after typewriter starts
  useEffect(() => {
    if (!isInView) return;

    const timer = setTimeout(() => {
      setShowContent(true);
    }, 800);

    return () => clearTimeout(timer);
  }, [isInView]);

  return (
    <section ref={sectionRef} className="relative mt-20 md:mt-40 mx-4 md:mx-12">
      <div className="w-full md:w-3/4 flex flex-col items-start gap-4">
        <Typewriter
          text={t("home.donation.title")}
          as="h2"
          className="text-2xl font-medium"
          speed={80}
          delay={200}
          enabled={isInView}
        />
        <p
          className={`text-sm leading-relaxed transition-all duration-1000 ease-out-quad ${
            showContent
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-4"
          }`}
        >
          {t("home.donation.description")}
        </p>
      </div>
      <div className="mt-12 space-y-4">
        <img
          src="/fondation.jpg"
          alt="Maison des Bozos"
          className={`w-40 transition-all duration-1000 ease-out-quad ${
            showContent
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-4"
          }`}
          style={{ transitionDelay: "300ms" }}
        />
        <button
          type="button"
          className={`mt-4 py-2 px-4 rounded-xs text-primary border border-primary/70 hover:border-primary transition-all duration-1000 ease-out-quad ${
            showContent
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-4"
          }`}
          style={{ transitionDelay: "600ms" }}
        >
          {t("home.donation.button")}
        </button>
      </div>
    </section>
  );
};

export default DonationSection;
