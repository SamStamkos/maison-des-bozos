import React, { useEffect, useState } from "react";
import { useLanguage } from "../context/LanguageContext";

const Navigation: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    // Trigger animation on mount
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 400);

    return () => clearTimeout(timer);
  }, []);

  return (
    <nav
      className={`relative z-50 border-b border-primary/20 h-14 bg-white transition-transform duration-1000 ease-in-out ${
        isLoaded ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="max-w-screen-2xl px-4 md:px-12 mx-auto">
        <div className="flex justify-between items-center py-4">
          <div className="text-sm tracking-widest text-primary">
            {t("nav.title")}
          </div>

          <div className="flex space-x-12 text-sm">
            <div className="">
              <button
                onClick={() => setLanguage("fr")}
                className={`relative px-2 ${
                  language === "fr" ? "font-medium" : ""
                }`}
              >
                Fr
              </button>
              <span>/</span>
              <button
                onClick={() => setLanguage("en")}
                className={`relative px-2 ${
                  language === "en" ? "font-medium" : ""
                }`}
              >
                En
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
