import React, { useState, useEffect, ElementType } from "react";

interface TypewriterProps {
  text: string;
  speed?: number;
  delay?: number;
  className?: string;
  as?: ElementType;
  onComplete?: () => void;
  onHalfway?: () => void;
  fadeInDuration?: number;
  enabled?: boolean;
}

const Typewriter: React.FC<TypewriterProps> = ({
  text,
  speed = 100,
  delay = 0,
  className = "",
  as: Component = "span",
  onComplete,
  onHalfway,
  fadeInDuration = 400,
  enabled = true,
}) => {
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isStarted, setIsStarted] = useState(false);
  const [halfwayTriggered, setHalfwayTriggered] = useState(false);

  useEffect(() => {
    // Don't start if not enabled
    if (!enabled) return;

    // Handle initial delay
    if (!isStarted && delay > 0) {
      const delayTimer = setTimeout(() => {
        setIsStarted(true);
      }, delay);
      return () => clearTimeout(delayTimer);
    } else if (!isStarted) {
      setIsStarted(true);
    }
  }, [delay, isStarted, enabled]);

  useEffect(() => {
    if (!isStarted) return;

    if (currentIndex < text.length) {
      const timer = setTimeout(() => {
        setDisplayedText((prev) => prev + text[currentIndex]);
        setCurrentIndex((prev) => prev + 1);

        // Trigger onHalfway when we reach middle of text
        const halfway = Math.floor(text.length / 2);
        if (currentIndex === halfway && !halfwayTriggered && onHalfway) {
          setHalfwayTriggered(true);
          onHalfway();
        }
      }, speed);

      return () => clearTimeout(timer);
    } else if (currentIndex === text.length && onComplete) {
      onComplete();
    }
  }, [currentIndex, text, speed, isStarted, onComplete, onHalfway, halfwayTriggered]);

  // Reset when text changes
  useEffect(() => {
    setDisplayedText("");
    setCurrentIndex(0);
    setIsStarted(false);
    setHalfwayTriggered(false);
  }, [text]);

  return (
    <Component
      className={className}
      style={{
        opacity: displayedText.length > 0 ? 1 : 0,
        transition: `opacity ${fadeInDuration}ms cubic-bezier(.4,0,.2,1)`,
      }}
    >
      {displayedText || "\u00A0"}
    </Component>
  );
};

export default React.memo(Typewriter, (prevProps, nextProps) => {
  return (
    prevProps.text === nextProps.text &&
    prevProps.enabled === nextProps.enabled &&
    prevProps.speed === nextProps.speed &&
    prevProps.delay === nextProps.delay
  );
});
