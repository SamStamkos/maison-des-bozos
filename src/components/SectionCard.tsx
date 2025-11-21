import React, { useEffect, useRef, useState } from "react";
import Typewriter from "./Typewriter";

interface SectionCardProps {
  title: string;
  descriptions: string[];
  buttonText: string;
  buttonDataGroup?: string;
  className?: string;
  position?: "left" | "right";
}

const SectionCard: React.FC<SectionCardProps> = ({
  title,
  descriptions,
  buttonText,
  buttonDataGroup = "15097",
  className = "",
  position = "left",
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);
  const [showDescriptions, setShowDescriptions] = useState(false);

  // Intersection Observer to trigger typewriter when in viewport
  useEffect(() => {
    const element = cardRef.current;
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

    // Small delay to ensure element is rendered
    requestAnimationFrame(() => {
      observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  // Show descriptions after typewriter starts
  useEffect(() => {
    if (!isInView) return;

    const timer = setTimeout(() => {
      setShowDescriptions(true);
    }, 800);

    return () => clearTimeout(timer);
  }, [isInView]);

  // Mobile: full width with padding, Desktop: sticky positioned
  const positionClasses =
    position === "left"
      ? "mx-4 md:mx-0 md:sticky md:top-8 md:bottom-8 md:left-12 md:w-1/4"
      : "mx-4 md:mx-0 md:sticky md:top-8 md:right-12 md:float-right md:w-1/4";

  return (
    <div
      ref={cardRef}
      className={`${positionClasses} px-4 md:px-8 py-6 bg-[#d8d0ca] flex flex-col items-start justify-start space-y-2 shadow-xl rounded-lg ${className}`}
    >
      <Typewriter
        text={title}
        as="h2"
        className="text-lg font-medium"
        speed={100}
        delay={200}
        enabled={isInView}
      />
      <div className="space-y-2">
        {descriptions.map((description, index) => (
          <p
            key={index}
            className={`text-sm leading-relaxed transition-all duration-1000 ease-out-quad ${
              showDescriptions
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            }`}
            style={{ transitionDelay: `${index * 300}ms` }}
          >
            {description}
          </p>
        ))}
      </div>
      <button
        type="button"
        className={`tpos-add-to-cart self-start py-2 px-4 mt-6 rounded-xs text-primary border border-primary/70 hover:border-primary transition-all duration-1000 ease-out-quad ${
          showDescriptions
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-4"
        }`}
        style={{ transitionDelay: `${descriptions.length * 300}ms` }}
        data-tpos-group={buttonDataGroup}
      >
        {buttonText}
      </button>
    </div>
  );
};

export default SectionCard;
