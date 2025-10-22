import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";

const Navigation: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { language, setLanguage, t } = useLanguage();

  // Get current path without language prefix
  const getCurrentPath = () => {
    const path = location.pathname;
    return path.startsWith('/en') ? path.substring(3) || '/' : path;
  };

  // Get route with current language
  const getRoute = (path: string) => {
    return language === 'en' ? `/en${path}` : path;
  };

  // Handle language switch
  const handleLanguageSwitch = (newLanguage: 'fr' | 'en') => {
    setLanguage(newLanguage);
    const currentPath = getCurrentPath();
    const newPath = newLanguage === 'en' ? `/en${currentPath}` : currentPath;
    navigate(newPath);
  };

  const currentPath = getCurrentPath();

  return (
    <nav className="border-b border-primary/20">
      <div className="max-w-screen-2xl px-12 mx-auto">
        <div className="flex justify-between items-center py-4">
          <Link to={getRoute('/')} className="text-lg tracking-widest text-primary">
            {t('home.title')}
          </Link>

          <div className="flex space-x-12">
            <Link to={getRoute('/concerts')} className="relative">
              <span
                className={`transition-colors duration-200 ${
                  currentPath === "/concerts"
                    ? "text-primary hover:text-primary/70"
                    : "hover:text-primary/40"
                }`}
              >
                {t('nav.concerts')}
              </span>
              {currentPath === "/concerts" && (
                <div className="absolute -inset-5 flex items-center justify-center">
                  <img
                    src="/active.svg"
                    alt="Active indicator"
                    className="w-full max-w-none pointer-events-none opacity-0 lg:opacity-100"
                  />
                </div>
              )}
            </Link>
            <Link to={getRoute('/musee')} className="relative">
              <span
                className={`transition-colors duration-200 ${
                  currentPath === "/musee"
                    ? "text-primary hover:text-primary/70"
                    : "hover:text-primary/40"
                }`}
              >
                {t('nav.musee')}
              </span>
              {currentPath === "/musee" && (
                <div className="absolute -inset-5 flex items-center justify-center">
                  <img
                    src="/active.svg"
                    alt="Active indicator"
                    className="w-full max-w-none pointer-events-none opacity-0 lg:opacity-100"
                  />
                </div>
              )}
            </Link>
            <Link to={getRoute('/don')} className="relative">
              <span
                className={`transition-colors duration-200 ${
                  currentPath === "/don"
                    ? "text-primary hover:text-primary/70"
                    : "hover:text-primary/40"
                }`}
              >
                {t('nav.don')}
              </span>
              {currentPath === "/don" && (
                <div className="absolute -inset-5 flex items-center justify-center">
                  <img
                    src="/active.svg"
                    alt="Active indicator"
                    className="w-full max-w-none pointer-events-none opacity-0 lg:opacity-100"
                  />
                </div>
              )}
            </Link>
            <Link to={getRoute('/boutique')} className="relative">
              <span
                className={`transition-colors duration-200 ${
                  currentPath === "/boutique"
                    ? "text-primary hover:text-primary/70"
                    : "hover:text-primary/40"
                }`}
              >
                {t('nav.boutique')}
              </span>
              {currentPath === "/boutique" && (
                <div className="absolute -inset-5 flex items-center justify-center">
                  <img
                    src="/active.svg"
                    alt="Active indicator"
                    className="w-full max-w-none pointer-events-none opacity-0 lg:opacity-100"
                  />
                </div>
              )}
            </Link>

            <div className="">
              <button 
                onClick={() => handleLanguageSwitch('fr')}
                className={`relative px-2 ${language === 'fr' ? 'font-medium' : ''}`}
              >
                Fr
              </button>
              <span>/</span>
              <button 
                onClick={() => handleLanguageSwitch('en')}
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
