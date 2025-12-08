/**
 * Type definitions for animation configurations
 */

export type AnimationConfig = {
  readonly typewriter: {
    readonly speed: number;
    readonly delay: number;
    readonly fadeInDuration: number;
  };
  readonly carousel: {
    readonly interval: number;
    readonly transitionDuration: number;
    readonly imageFadeDuration: number;
  };
  readonly loading: {
    readonly waitTime: number;
    readonly fadeOutDuration: number;
    readonly scaleTransitionDuration: number;
  };
  readonly descriptions: {
    readonly showDelay: number;
    readonly transitionDuration: number;
    readonly staggerDelay: number;
  };
  readonly curtain: {
    readonly duration: number;
    readonly ease: string;
  };
  readonly parallax: {
    readonly imageMoveDistance: number;
    readonly textMoveDistance: number;
    readonly imageScale: number;
  };
};
