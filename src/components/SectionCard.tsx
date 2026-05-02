import React, { useEffect, useRef, useState, ReactNode } from "react";
import Typewriter from "./Typewriter";

interface SectionCardProps {
  title: string;
  titleMobileLines?: [string, string];
  descriptions: (string | ReactNode)[];
  buttonText: string;
  buttonDataGroup?: string;
  buttonHidden?: boolean;
  ticketTimestamp?: string;
  className?: string;
  position?: "left" | "right";
  comingSoon?: boolean;
  comingSoonText?: string;
}

const SectionCard: React.FC<SectionCardProps> = ({
  title,
  titleMobileLines,
  descriptions,
  buttonText,
  buttonDataGroup = "15097",
  buttonHidden = false,
  ticketTimestamp,
  className = "",
  position = "left",
  comingSoon = false,
  comingSoonText,
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
    }, 1200);

    return () => clearTimeout(timer);
  }, [isInView]);

  // Mobile: full width with padding, Desktop: sticky positioned
  const positionClasses =
    position === "left"
      ? "mx-4 md:mx-0 md:sticky md:top-8 md:bottom-8 md:left-12 md:w-[520px]"
      : "mx-4 md:mx-0 md:sticky md:top-8 md:right-12 md:float-right md:w-[520px]";

  return (
    <div
      ref={cardRef}
      className={`${positionClasses} px-4 md:px-6 py-6 bg-white flex flex-col items-start justify-start space-y-4 md:shadow-xl rounded-lg ${className}`}
      style={{
        backgroundImage: `
          repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,.02) 2px, rgba(0,0,0,.02) 4px),
          repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(0,0,0,.02) 2px, rgba(0,0,0,.02) 4px)
        `,
      }}
    >
      {titleMobileLines ? (
        <h2 className="text-lg md:text-xl font-medium uppercase tracking-wide">
          <Typewriter
            text={title}
            as="span"
            className="hidden md:inline whitespace-nowrap"
            speed={100}
            delay={200}
            enabled={isInView}
          />
          <Typewriter
            text={titleMobileLines[0]}
            as="span"
            className="block md:hidden"
            speed={100}
            delay={200}
            enabled={isInView}
          />
          <Typewriter
            text={titleMobileLines[1]}
            as="span"
            className="block md:hidden"
            speed={100}
            delay={200 + titleMobileLines[0].length * 100}
            enabled={isInView}
          />
        </h2>
      ) : (
        <Typewriter
          text={title}
          as="h2"
          className="text-lg md:text-xl font-medium uppercase tracking-wide whitespace-nowrap"
          speed={100}
          delay={200}
          enabled={isInView}
        />
      )}
      <div className="space-y-4">
        {descriptions.map((description, index) => (
          <p
            key={index}
            className={`text-lg font-medium leading-relaxed transition-all duration-1000 ease-out-quad ${
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
      <div
        className={`w-full md:w-auto mt-6 transition-all duration-700 ease-out-quad ${
          showDescriptions
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-4"
        }`}
        style={{ transitionDelay: `${descriptions.length * 300}ms` }}
      >
        {comingSoon ? (
          <span className="text-base text-primary/90 italic">
            {comingSoonText ?? "Ouverture prévue juillet 2026"}
          </span>
        ) : (
          <>
            {ticketTimestamp && (
              <div className="text-lg font-bold text-primary italic">
                {ticketTimestamp}
              </div>
            )}
            {!buttonHidden && (
              <button
                type="button"
                className="tpos-add-to-cart w-full md:w-auto py-2 px-4 rounded-xs text-primary text-lg font-medium cursor-pointer border border-primary/70 hover:bg-primary hover:text-white hover:border-primary transition-colors duration-200"
                data-tpos-group={buttonDataGroup}
              >
                {buttonText}
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default React.memo(SectionCard);
