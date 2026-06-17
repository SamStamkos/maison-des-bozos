import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "./useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

/**
 * Initializes Lenis smooth scrolling, synced to GSAP's ticker so it stays in
 * lockstep with the ScrollTrigger parallax in IntroSection. A subtle setting
 * (`lerp: 0.12`) keeps the feel close to native scroll with just a touch of easing.
 *
 * Skips entirely when the user prefers reduced motion — native scroll takes over
 * and ScrollTrigger falls back cleanly.
 */
export const useSmoothScroll = (): void => {
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      lerp: 0.12,
      wheelMultiplier: 1,
      touchMultiplier: 1.2,
    });

    // Keep ScrollTrigger in sync with Lenis's virtual scroll position
    lenis.on("scroll", ScrollTrigger.update);

    // Drive Lenis from GSAP's ticker so both share one clock (no desync/jitter)
    const update = (time: number) => {
      // gsap.ticker reports time in seconds; Lenis expects milliseconds
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(update);
      lenis.destroy();
    };
  }, [prefersReducedMotion]);
};
