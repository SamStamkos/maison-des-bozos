import React from "react";
import { useLanguage } from "../context/LanguageContext";

const Footer: React.FC = () => {
  const { t, language } = useLanguage();

  // Get route with current language
  const getRoute = (path: string) => {
    return language === 'en' ? `/en${path}` : path;
  };

  return (
    <footer className="border-b border-primary/20 mt-24">
      <div className="max-w-screen-2xl px-12 mx-auto">
        <div className="flex justify-between items-end py-4 border-b border-primary/20">
          <div className="">
            <p className="text-lg font-medium text-primary">
              {t('footer.email')}
            </p>
            <p className="text-base font-medium text-primary whitespace-pre-line">
              {t('footer.address')}
            </p>
          </div>
          <div className="flex space-x-4">
            <a href="https://www.instagram.com/maisondesbozos/">
              <img src="/instagram-logo.svg" alt="Instagram" />
            </a>
            <a href="https://www.tiktok.com/maisondesbozos/">
              <img src="/tiktok-logo.svg" alt="TikTok" />
            </a>
            <a href="https://www.facebook.com/maisondesbozos/">
              <img src="/facebook-logo.svg" alt="Facebook" />
            </a>
          </div>
        </div>
        <div className="flex justify-between items-center py-2">
          <p className="text-xs text-primary">{t('footer.copyright')}</p>
          <div className="flex space-x-4">
            <a href={getRoute('/')} className="text-xs text-primary">
              {t('footer.privacy')}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
