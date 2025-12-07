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
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Dynamically load all images from /public/intro directory
  const galleryImages = [
    "/intro/intro-1.jpg",
    "/intro/intro-2.jpg",
    "/intro/intro-3.jpg",
    "/intro/intro-4.jpg",
    "/intro/intro-5.jpg",
  ];

  // GSAP animations for intro image
  useEffect(() => {
    if (!introImageRef.current) return;

    // Disable browser scroll restoration and scroll to top
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);

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
        start: "center top",
        end: "bottom top",
        scrub: true,
        invalidateOnRefresh: true,
      },
    });

    // Parallax effect on scroll - text moves down
    if (introTextRef.current) {
      // Ensure text starts at correct position
      gsap.set(introTextRef.current, { y: 0, opacity: 1 });

      // Text moves down throughout the scroll
      gsap.to(introTextRef.current, {
        y: 700,
        ease: "none",
        scrollTrigger: {
          trigger: introImageRef.current,
          start: "15% top",
          end: "bottom top",
          scrub: true,
          invalidateOnRefresh: true,
        },
      });

      // Text fades out in the last 80% of the scroll
      gsap.to(introTextRef.current, {
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: introImageRef.current,
          start: "top top",
          end: "70% top",
          scrub: true,
          invalidateOnRefresh: true,
        },
      });
    }

    // Refresh ScrollTrigger after scroll position is set
    ScrollTrigger.refresh();

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

  // Gallery auto-switch every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex(
        (prevIndex) => (prevIndex + 1) % galleryImages.length
      );
    }, 4000);

    return () => clearInterval(interval);
  }, [galleryImages.length]);

  return (
    <div className="max-w-screen-2xl mx-auto">
      <div className="relative grid grid-cols-1 md:grid-cols-12 min-h-[calc(100vh-3.5rem)] mt-8 md:mt-0">
        <div className="relative col-span-1 md:col-span-5 order-2 md:order-1 md:px-0">
          <div
            ref={introImageRef}
            className="relative w-full h-full"
          >
            {galleryImages.map((image, index) => (
              <img
                key={index}
                src={image}
                alt="Bozo"
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
                  index === currentImageIndex ? "opacity-100" : "opacity-0"
                }`}
              />
            ))}
            {/* Curtain overlay */}
            <div
              ref={curtainRef}
              className="absolute inset-0 bg-secondary origin-top"
              style={{ transformOrigin: "top" }}
            />
          </div>
        </div>

        <div
          ref={introTextRef}
          className="col-span-1 md:col-span-7 px-0 md:px-12 self-center order-1 md:order-2 mb-12 md:mb-0"
        >
          <div className="space-y-4 px-4">
            <Typewriter
              text={t("home.title") as string}
              as="h1"
              className="text-lg font-medium uppercase tracking-wide whitespace-nowrap"
              speed={100}
              delay={200}
            />
            <p
              className={`text-sm leading-relaxed md:text-justify transition-all duration-1000 ease-out-quad ${
                showDescriptions
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              {t("home.description1")}
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 right-0 w-7/12 h-16 bg-gradient-to-t from-secondary to-transparent z-10 hidden md:block"></div>
      </div>
    </div>
  );
};

export default IntroSection;
