export const GA_MEASUREMENT_ID = "G-QJJ9J00NT2";

const GA_SCRIPT_ID = "ga-gtag-script";
const CONSENT_STORAGE_KEY = "cookieConsent";

export type CookieConsent = "accepted" | "declined";

export const getStoredConsent = (): CookieConsent | null => {
  const value = localStorage.getItem(CONSENT_STORAGE_KEY);
  return value === "accepted" || value === "declined" ? value : null;
};

export const storeConsent = (consent: CookieConsent): void => {
  localStorage.setItem(CONSENT_STORAGE_KEY, consent);
};

/**
 * Injects the Google Analytics (gtag.js) script. Must only be called after
 * the user has accepted analytics cookies (Quebec Law 25 / GDPR).
 * Idempotent — safe under React StrictMode double-invoked effects.
 */
export const loadGoogleAnalytics = (): void => {
  if (document.getElementById(GA_SCRIPT_ID)) return;

  const script = document.createElement("script");
  script.id = GA_SCRIPT_ID;
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  const dataLayer = window.dataLayer;
  window.gtag = function gtag() {
    // gtag.js requires the live `arguments` object, not a spread copy
    dataLayer.push(arguments);
  };
  window.gtag("js", new Date());
  window.gtag("config", GA_MEASUREMENT_ID);
};
