import React, { useState, useEffect, useRef } from "react";

interface LoadingScreenProps {
  onComplete: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [fadeOut, setFadeOut] = useState(false);
  const [animScale, setAnimScale] = useState(false);
  const hasCompleted = useRef(false);

  useEffect(() => {
    setAnimScale(true)
    // Wait 3 seconds then start fade out
    const waitTimer = setTimeout(() => {
      setFadeOut(true);
    }, 3000);
    return () => clearTimeout(waitTimer);
  }, []);

  useEffect(() => {
    if (fadeOut && !hasCompleted.current) {
      // Wait for fade out animation to complete (1 second)
      const fadeOutTimer = setTimeout(() => {
        hasCompleted.current = true;
        onComplete();
      }, 1000);
      return () => clearTimeout(fadeOutTimer);
    }
  }, [fadeOut, onComplete]);

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center transition-colors duration-1000 ${
        fadeOut ? "bg-secondary" : "bg-primary"
      }`}
    >
      {/* Content wrapper that fades out */}
      <div className={`absolute inset-0 transition-opacity duration-1000 ${fadeOut ? "opacity-0" : "opacity-100"}`}>
        {/* SVG Filter for grain effect */}
        <svg className="absolute w-0 h-0">
          <defs>
            <filter id="grain">
              <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" />
              <feColorMatrix type="saturate" values="0" />
              <feBlend mode="multiply" in="SourceGraphic" />
            </filter>
          </defs>
        </svg>

        {/* Loading Image */}
        <div className="absolute inset-0">
          <img
            src="/maison-des-bozos-landing.jpg"
            alt="Maison des Bozos"
            className={`w-full h-full object-cover object-top scale-110 transition-transform duration-5000 ease-linear ${
              animScale ? "scale-110" : "scale-120"
            }`}
          />
        </div>

        <div className="absolute inset-0 bg-black opacity-20 z-10"></div>

        {/* Grain overlay */}
        <div
          className="absolute inset-0 z-10 opacity-30 pointer-events-none"
          style={{
            filter: "url(#grain)",
            mixBlendMode: "overlay",
          }}
        />

        {/* Title */}
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <h1 className="text-4xl md:text-8xl font-sans font-semibold uppercase tracking-wide text-white text-center">
            Maison des Bozos
          </h1>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
