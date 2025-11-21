import React from "react";
import { useLanguage } from "../context/LanguageContext";

const Navigation: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();

  return (
    <nav className="border-b border-primary/20 h-14">
      <div className="max-w-screen-2xl px-4 md:px-12 mx-auto">
        <div className="flex justify-between items-center py-4">
          <div className="text-sm tracking-widest text-primary">
            {t('nav.title')}
          </div>

          <div className="flex space-x-12 text-sm">
            <div className="">
              <button
                onClick={() => setLanguage('fr')}
                className={`relative px-2 ${language === 'fr' ? 'font-medium' : ''}`}
              >
                Fr
              </button>
              <span>/</span>
              <button
                onClick={() => setLanguage('en')}
                className={`relative px-2 ${language === 'en' ? 'font-medium' : ''}`}
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
