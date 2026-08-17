import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../hooks/useLanguage";
import {
  getStoredConsent,
  storeConsent,
  loadGoogleAnalytics,
} from "../utils/analytics";

const CookieBanner: React.FC = () => {
  const { t } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = getStoredConsent();
    if (consent === "accepted") {
      loadGoogleAnalytics();
    } else if (consent === null) {
      setIsVisible(true);
    }
  }, []);

  if (!isVisible) return null;

  const handleAccept = () => {
    storeConsent("accepted");
    loadGoogleAnalytics();
    setIsVisible(false);
  };

  const handleDecline = () => {
    storeConsent("declined");
    setIsVisible(false);
  };

  return (
    <div
      role="dialog"
      aria-label="Cookies"
      className="fixed bottom-0 inset-x-0 z-40 bg-white/70 backdrop-blur-sm text-primary border-t border-primary/10 px-4 py-2 md:px-12"
    >
      <div className="max-w-screen-2xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <p className="text-sm text-primary/80">
          {t("cookies.message")}{" "}
          <Link
            to="/privacy"
            className="underline hover:text-primary transition-colors"
          >
            {t("cookies.learnMore")}
          </Link>
        </p>
        <div className="flex gap-2 shrink-0">
          <button
            type="button"
            onClick={handleDecline}
            className="px-3 py-1 text-xs border border-primary/30 hover:border-primary transition-colors"
          >
            {t("cookies.decline")}
          </button>
          <button
            type="button"
            onClick={handleAccept}
            className="px-3 py-1 text-xs bg-primary/90 text-white font-medium hover:bg-primary transition-colors"
          >
            {t("cookies.accept")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieBanner;
