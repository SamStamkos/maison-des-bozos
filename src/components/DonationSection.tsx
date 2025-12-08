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
    }, 1200);

    return () => clearTimeout(timer);
  }, [isInView]);

  return (
    <section
      id="donation"
      ref={sectionRef}
      className="relative mt-20 mx-4 md:mx-12"
      aria-labelledby="donation-title"
    >
      <div className="w-full flex flex-col items-start gap-4">
        <Typewriter
          text={t("home.donation.title") as string}
          as="h2"
          className="text-lg font-medium uppercase tracking-wide lg:whitespace-nowrap"
          speed={50}
          delay={200}
          enabled={isInView}
        />
        <p
          className={`text-sm w-full md:w-4/5 leading-relaxed transition-all duration-1000 ease-out-quad ${
            showContent
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-4"
          }`}
        >
          {t("home.donation.description")}
        </p>
      </div>
      <div
        className={`flex justify-center md:justify-start items-center space-x-8 transition-all duration-700 ease-out-quad mt-8 md:mt-0 ${
          showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
        style={{ transitionDelay: "300ms" }}
      >
        <button
          type="button"
          className="py-2 px-4 mt-6 rounded-xs text-primary cursor-pointer border border-primary/70 hover:bg-[#228ed6] hover:text-white hover:border-[#228ed6] transition-colors duration-200"
        >
          {t("home.donation.button")}
        </button>

        <img
          src="/fondation.png"
          alt="Maison des Bozos"
          loading="lazy"
          decoding="async"
          className="w-28"
        />
      </div>
    </section>
  );
};

export default DonationSection;
