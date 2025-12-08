import React from "react";
import { useLanguage } from "../context/LanguageContext";

const Footer: React.FC = () => {
  const { t } = useLanguage();

  return (
    <footer className="mt-24 md:mt-40 bg-secondary">
      <div className="max-w-screen-2xl px-4 md:px-12 mx-auto">
        <div className="flex justify-between items-end py-4 border-b border-primary/20">
          <div className="">
            <p className="text-sm font-medium text-primary">
              <a href={`mailto:${t("footer.email")}`}>{t("footer.email")}</a>
            </p>
            <p className="text-sm font-medium text-primary whitespace-pre-line">
              {t("footer.address")}
            </p>
          </div>
          <div className="flex space-x-4">
            <a
              href="https://www.instagram.com/maisondesbozos/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src="/instagram-logo.svg" alt="Instagram" />
            </a>
            <a
              href="https://www.facebook.com/maisondesbozos/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src="/facebook-logo.svg" alt="Facebook" />
            </a>
          </div>
        </div>
        <div className="flex justify-end items-center py-2">
          <p className="text-xs text-primary">{t("footer.copyright")}</p>
          {/* <div className="flex space-x-4">
            <a href={getRoute('/')} className="text-xs text-primary">
              {t('footer.privacy')}
            </a>
          </div> */}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
