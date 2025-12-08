import { useEffect } from "react";
import { useLanguage } from "../context/LanguageContext";
import { SEO_METADATA, SITE_INFO } from "../constants/seo";

/**
 * SEO component that manages meta tags dynamically
 * Updates document head based on current language
 */
const SEO: React.FC = () => {
  const { language } = useLanguage();
  const seo = SEO_METADATA[language];

  useEffect(() => {
    // Update document title
    document.title = seo.title;

    // Update or create meta tags
    const updateMetaTag = (name: string, content: string, property = false) => {
      const attribute = property ? "property" : "name";
      let element = document.querySelector(
        `meta[${attribute}="${name}"]`
      ) as HTMLMetaElement;

      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(attribute, name);
        document.head.appendChild(element);
      }

      element.content = content;
    };

    // Basic SEO meta tags
    updateMetaTag("description", seo.description);
    updateMetaTag("keywords", seo.keywords);
    updateMetaTag("author", SITE_INFO.author);
    updateMetaTag("theme-color", SITE_INFO.themeColor);

    // Open Graph tags
    updateMetaTag("og:title", seo.title, true);
    updateMetaTag("og:description", seo.description, true);
    updateMetaTag("og:type", "website", true);
    updateMetaTag("og:url", SITE_INFO.url, true);
    updateMetaTag("og:site_name", SITE_INFO.siteName, true);
    updateMetaTag("og:image", `${SITE_INFO.url}${SITE_INFO.ogImage}`, true);
    updateMetaTag("og:image:alt", seo.title, true);
    updateMetaTag("og:locale", language === "fr" ? "fr_CA" : "en_CA", true);
    updateMetaTag(
      "og:locale:alternate",
      language === "fr" ? "en_CA" : "fr_CA",
      true
    );

    // Twitter Card tags
    updateMetaTag("twitter:card", "summary_large_image");
    updateMetaTag("twitter:site", SITE_INFO.twitterHandle);
    updateMetaTag("twitter:title", seo.title);
    updateMetaTag("twitter:description", seo.description);
    updateMetaTag("twitter:image", `${SITE_INFO.url}${SITE_INFO.ogImage}`);
    updateMetaTag("twitter:image:alt", seo.title);

    // Update html lang attribute
    document.documentElement.lang = language === "fr" ? "fr-CA" : "en-CA";

    // Canonical and alternate language tags
    let canonical = document.querySelector(
      'link[rel="canonical"]'
    ) as HTMLLinkElement;
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = SITE_INFO.url;

    // Add alternate language links
    const alternateLang = language === "fr" ? "en" : "fr";
    let alternate = document.querySelector(
      `link[rel="alternate"][hreflang="${alternateLang}"]`
    ) as HTMLLinkElement;
    if (!alternate) {
      alternate = document.createElement("link");
      alternate.rel = "alternate";
      alternate.hreflang = alternateLang;
      document.head.appendChild(alternate);
    }
    alternate.href = `${SITE_INFO.url}?lang=${alternateLang}`;
  }, [language, seo]);

  // This component doesn't render anything
  return null;
};

export default SEO;
