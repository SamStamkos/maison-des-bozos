import React from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../hooks/useLanguage";

const Footer: React.FC = () => {
  const { t } = useLanguage();

  return (
    <footer className="mt-24 md:mt-40 bg-secondary">
      <div className="max-w-screen-2xl px-4 md:px-12 mx-auto">
        <div className="flex justify-between items-end py-4 border-b border-primary/20">
          <div className="">
            <p className="text-base font-medium text-primary">
              <a href={`mailto:${t("footer.email")}`}>{t("footer.email")}</a>
            </p>
            <p className="text-base font-medium text-primary whitespace-pre-line">
              {t("footer.address")}
            </p>
          </div>
          <div className="flex space-x-4">
            <a
              href="https://www.instagram.com/maisondesbozos/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Suivez-nous sur Instagram"
              onClick={() => window.fathom?.trackEvent("social click: instagram")}
            >
              <img
                src="/instagram-logo.svg"
                alt="Logo Instagram - Page de la Maison des Bozos"
                width="24"
                height="24"
              />
            </a>
            <a
              href="https://www.facebook.com/p/Maison-des-Bozos-61583520084135/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Suivez-nous sur Facebook"
              onClick={() => window.fathom?.trackEvent("social click: facebook")}
            >
              <img
                src="/facebook-logo.svg"
                alt="Logo Facebook - Page de la Maison des Bozos"
                width="24"
                height="24"
              />
            </a>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row justify-between items-center py-2 gap-2">
          <Link
            to="/privacy"
            className="text-base text-primary/60 hover:text-primary transition-colors"
          >
            {t("footer.privacy")}
          </Link>
          <p className="text-base text-primary">{t("footer.copyright")}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
