import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "../context/LanguageContext";
import Typewriter from "./Typewriter";

gsap.registerPlugin(ScrollTrigger);

const IntroSection: React.FC = () => {
  const { t } = useLanguage();
  const introImageRef = useRef<HTMLImageElement>(null);
  const introTextRef = useRef<HTMLDivElement>(null);
  const curtainRef = useRef<HTMLDivElement>(null);
  const [showDescriptions, setShowDescriptions] = useState(false);

  // GSAP animations for intro image
  useEffect(() => {
    if (!introImageRef.current) return;

    // Curtain drop animation
    if (curtainRef.current) {
      gsap.fromTo(
        curtainRef.current,
        { scaleY: 1 },
        {
          scaleY: 0,
          duration: 1.5,
          ease: "power2.out",
          delay: 0.4,
        }
      );
    }

    // Fade-in animation on load
    gsap.fromTo(
      introImageRef.current,
      { opacity: 0 },
      {
        opacity: 1,
        duration: 1,
        ease: "power2.out",
        delay: 0.2,
      }
    );

    // Ensure image starts at correct position
    gsap.set(introImageRef.current, { y: 0, scale: 1 });

    // Parallax effect on scroll - image moves up
    gsap.to(introImageRef.current, {
      y: -200,
      scale: 1.1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: introImageRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
        invalidateOnRefresh: true,
      },
    });

    // Parallax effect on scroll - text moves down
    if (introTextRef.current) {
      // Ensure text starts at correct position
      gsap.set(introTextRef.current, { y: 0 });

      gsap.to(introTextRef.current, {
        y: 700,
        ease: "none",
        scrollTrigger: {
          trigger: introImageRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
          invalidateOnRefresh: true,
        },
      });
    }

    // Scroll to top on initial load to ensure correct positioning
    window.scrollTo(0, 0);

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  // Show descriptions 1.5 seconds after typewriter starts
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowDescriptions(true);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="max-w-screen-2xl px-4 md:px-12 mx-auto">
      <div className="relative grid grid-cols-1 md:grid-cols-12 min-h-[calc(100vh-3.5rem)] mt-8 md:mt-0">
        <div className="relative col-span-1 md:col-span-5 grid grid-cols-1 md:grid-cols-7 order-2 md:order-1">
          <div className="relative col-span-1 md:col-span-6 md:col-start-1 w-full aspect-square md:aspect-[3/3.5] self-center overflow-hidden rounded-xs">
            <img
              ref={introImageRef}
              src="/header.jpeg"
              alt="Bozo"
              className="w-full h-full object-cover origin-center"
            />
            {/* Curtain overlay */}
            <div
              ref={curtainRef}
              className="absolute inset-0 bg-white origin-top"
              style={{ transformOrigin: "top" }}
            />
          </div>
        </div>

        <div
          ref={introTextRef}
          className="col-span-1 md:col-span-7 px-0 md:px-12 self-center order-1 md:order-2 mb-12 md:mb-0"
        >
          <div className="space-y-4">
            <Typewriter
              text={t("home.title")}
              as="h1"
              className="text-3xl md:text-2xl font-medium"
              speed={100}
              delay={200}
            />
            <p
              className={`text-sm leading-relaxed text-justify transition-all duration-1000 ease-out-quad ${
                showDescriptions
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              {t("home.description1")}
            </p>
            <p
              className={`text-sm leading-relaxed text-justify transition-all duration-1000 delay-300 ease-out-quad ${
                showDescriptions
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              {t("home.description2")}
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-white to-transparent z-10"></div>
      </div>
    </div>
  );
};

export default IntroSection;
