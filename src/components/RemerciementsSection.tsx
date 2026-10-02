import React, { useEffect, useRef, useState } from "react";
import { useLanguage } from "../hooks/useLanguage";
import { PARTNER_LOGOS, SUPPORTED_LOGOS } from "../constants/images";

type Logo = (typeof PARTNER_LOGOS)[number] | (typeof SUPPORTED_LOGOS)[number];

// Logos are sized by area rather than by a shared height, so a wide wordmark
// and a tall crest read with similar visual weight. --logo-scale (set per
// breakpoint on the list) is the side of the square each logo's area matches.
const LogoImage: React.FC<{ logo: Logo }> = ({ logo }) => {
  const sqrtAspect = Math.sqrt(logo.width / logo.height);

  return (
    <picture>
      <source
        srcSet={logo.src.replace(/\.png$/i, ".webp")}
        type="image/webp"
      />
      <img
        src={logo.src}
        alt={logo.name}
        width={logo.width}
        height={logo.height}
        className="h-auto max-w-full"
        style={{ width: `calc(var(--logo-scale) * ${sqrtAspect.toFixed(3)})` }}
        loading="lazy"
        decoding="async"
      />
    </picture>
  );
};

const RemerciementsSection: React.FC = () => {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const [isInView, setIsInView] = useState(false);

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
      aria-labelledby="remerciements-title"
      className={`mt-20 bg-[#b3986f] py-12 md:py-20 transition-all duration-1000 ease-out-quad ${
        isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
    >
      <div className="mx-auto max-w-6xl px-4 text-center">
        <h2
          id="remerciements-title"
          className="mx-auto max-w-2xl text-2xl md:text-4xl font-bold uppercase tracking-tight leading-tight"
        >
          {t("home.remerciements.title") as string}
        </h2>

        <ul className="mt-10 md:mt-14 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-12 md:gap-x-12 md:gap-y-16 lg:gap-x-16 lg:gap-y-20 [--logo-scale:4.75rem] md:[--logo-scale:6.5rem] lg:[--logo-scale:8rem]">
          {PARTNER_LOGOS.map((logo) => (
            <li key={logo.src} className="flex items-center justify-center">
              <LogoImage logo={logo} />
            </li>
          ))}
        </ul>

        <p className="mt-10 md:mt-14 text-base md:text-lg font-bold">
          {t("home.remerciements.donor") as string}
        </p>

        <h3 className="mt-12 md:mt-24 text-lg md:text-3xl font-medium uppercase tracking-wide">
          {t("home.remerciements.supports") as string}
        </h3>

        <ul className="mt-6 md:mt-8 flex flex-wrap items-center justify-center gap-x-16 gap-y-10 md:gap-x-24 [--logo-scale:4.75rem] md:[--logo-scale:6.5rem] lg:[--logo-scale:8rem]">
          {SUPPORTED_LOGOS.map((logo) => (
            <li key={logo.src}>
              <LogoImage logo={logo} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default RemerciementsSection;
