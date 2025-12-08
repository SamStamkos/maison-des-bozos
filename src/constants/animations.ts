import { AnimationConfig } from "../types/animations";

/**
 * Animation timing and configuration constants
 * Centralized to make it easier to adjust timing across the app
 */

export const ANIMATION_CONFIG: AnimationConfig = {
  typewriter: {
    speed: 100,
    delay: 200,
    fadeInDuration: 400,
  },
  carousel: {
    interval: 3000,
    transitionDuration: 2,
    imageFadeDuration: 1000,
  },
  loading: {
    waitTime: 3000,
    fadeOutDuration: 1000,
    scaleTransitionDuration: 5000,
  },
  descriptions: {
    showDelay: 1200,
    transitionDuration: 1000,
    staggerDelay: 300,
  },
  curtain: {
    duration: 2,
    ease: "power2.inOut",
  },
  parallax: {
    imageMoveDistance: -200,
    textMoveDistance: 700,
    imageScale: 1.1,
  },
} as const;
