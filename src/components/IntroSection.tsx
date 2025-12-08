import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "../context/LanguageContext";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { INTRO_IMAGES } from "../constants/images";
import { ANIMATION_CONFIG } from "../constants/animations";
import Typewriter from "./Typewriter";

gsap.registerPlugin(ScrollTrigger);

const IntroSection: React.FC = () => {
  const { t } = useLanguage();
  const prefersReducedMotion = useReducedMotion();
  const introImageRef = useRef<HTMLImageElement>(null);
  const introTextRef = useRef<HTMLDivElement>(null);
  const curtainRef = useRef<HTMLDivElement>(null);
  const [showDescriptions, setShowDescriptions] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [curtainAnimationComplete, setCurtainAnimationComplete] = useState(false);

  // GSAP animations for intro image
  useEffect(() => {
    if (!introImageRef.current) return;

    // Disable browser scroll restoration and scroll to top
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);

    // Skip animations if user prefers reduced motion
    if (prefersReducedMotion) {
      // Show content immediately without animations
      if (curtainRef.current) {
        curtainRef.current.style.display = "none";
      }
      setCurtainAnimationComplete(true);
      return;
    }

    // Create a GSAP context to scope all animations
    const ctx = gsap.context(() => {
      // Curtain rise animation - translate upward out of view
      if (curtainRef.current) {
        gsap.to(curtainRef.current, {
          y: "-120%",
          duration: ANIMATION_CONFIG.curtain.duration,
          ease: ANIMATION_CONFIG.curtain.ease,
          onComplete: () => {
            // Trigger gallery auto-switch after curtain animation completes
            setCurtainAnimationComplete(true);
          },
        });
      }

      // Gallery setup - no fade-in, just set initial state
      if (introImageRef.current) {
        // Ensure image starts at correct position
        gsap.set(introImageRef.current, { y: 0, scale: 1, opacity: 1 });

        // Parallax effect on scroll - image moves up
        gsap.to(introImageRef.current, {
          y: ANIMATION_CONFIG.parallax.imageMoveDistance,
          scale: ANIMATION_CONFIG.parallax.imageScale,
          ease: "sine.inOut",
          scrollTrigger: {
            trigger: introImageRef.current,
            start: "center top",
            end: "bottom top",
            scrub: true,
            invalidateOnRefresh: true,
          },
        });
      }

      // Parallax effect on scroll - text moves down
      if (introTextRef.current) {
        // Ensure text starts at correct position
        gsap.set(introTextRef.current, { y: 0, opacity: 1 });

        // Text moves down throughout the scroll
        gsap.to(introTextRef.current, {
          y: ANIMATION_CONFIG.parallax.textMoveDistance,
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
    });

    // Refresh ScrollTrigger after scroll position is set
    ScrollTrigger.refresh();

    // Clean up only the animations created in this context
    return () => ctx.revert();
  }, [prefersReducedMotion]);

  // Show descriptions 1.5 seconds after typewriter starts
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowDescriptions(true);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  // Gallery auto-switch - starts after curtain animation
  useEffect(() => {
    if (!curtainAnimationComplete) return;

    const interval = setInterval(() => {
      setCurrentImageIndex(
        (prevIndex) => (prevIndex + 1) % INTRO_IMAGES.length
      );
    }, ANIMATION_CONFIG.carousel.interval);

    return () => clearInterval(interval);
  }, [curtainAnimationComplete]);

  return (
    <section className="max-w-screen-2xl mx-auto" aria-label="Introduction">
      <div className="relative grid grid-cols-1 md:grid-cols-12 min-h-[calc(100vh-3.5rem)] mt-8 md:mt-0">
        <div className="relative col-span-1 md:col-span-5 order-2 md:order-1 md:px-0">
          <div ref={introImageRef} className="relative w-full h-full">
            {INTRO_IMAGES.map((image, index) => (
              <picture
                key={index}
                className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
                  index === currentImageIndex ? "opacity-100" : "opacity-0"
                }`}
              >
                <source
                  srcSet={image.replace(/\.(jpg|jpeg)$/i, ".webp")}
                  type="image/webp"
                />
                <img
                  src={image}
                  alt={`Galerie de photos de la Maison des Bozos - Image ${index + 1}: intérieur et ambiance de la salle de spectacle`}
                  loading={index === 0 ? "eager" : "lazy"}
                  fetchPriority={index === 0 ? "high" : undefined}
                  decoding="async"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </picture>
            ))}
            {/* Curtain overlay */}
            <div
              ref={curtainRef}
              className="absolute inset-0 bg-secondary"
            />
          </div>
        </div>

        <div
          ref={introTextRef}
          className="col-span-1 md:col-span-7 px-0 md:px-24 self-center order-1 md:order-2 mb-12 md:mb-0"
        >
          <div className="space-y-4 px-4">
            <Typewriter
              text={t("home.title") as string}
              as="h1"
              className="text-lg font-medium uppercase tracking-wide whitespace-nowrap"
              speed={80}
              delay={1050}
            />
            <p
              className={`text-sm font-medium leading-relaxed md:text-justify transition-all duration-1500 ease-out-quad ${
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
    </section>
  );
};

export default IntroSection;
