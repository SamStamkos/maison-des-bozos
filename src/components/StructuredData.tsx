import { useLanguage } from "../context/LanguageContext";
import { SITE_INFO, BUSINESS_INFO } from "../constants/seo";

/**
 * Structured Data component that injects JSON-LD schemas
 * Improves SEO with rich snippets for search engines
 */
const StructuredData: React.FC = () => {
  const { language } = useLanguage();

  // LocalBusiness Schema
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "PerformingArtsTheater",
    "@id": `${SITE_INFO.url}#business`,
    name: BUSINESS_INFO.name,
    legalName: BUSINESS_INFO.legalName,
    url: SITE_INFO.url,
    logo: `${SITE_INFO.url}/maison-des-bozos-landing.jpg`,
    image: [
      `${SITE_INFO.url}/maison-des-bozos-landing.jpg`,
      `${SITE_INFO.url}/concerts/concert-1.jpg`,
      `${SITE_INFO.url}/musee/musee-1.jpg`,
    ],
    description:
      language === "fr"
        ? "Salle de spectacle intime, mini-musée et café-bar au cœur de Montréal. Première boîte à chansons d'Amérique depuis 1959."
        : "Intimate concert hall, mini-museum and café-bar in the heart of Montreal. America's first song house since 1959.",
    address: {
      "@type": "PostalAddress",
      streetAddress: BUSINESS_INFO.address.streetAddress,
      addressLocality: BUSINESS_INFO.address.addressLocality,
      addressRegion: BUSINESS_INFO.address.addressRegion,
      postalCode: BUSINESS_INFO.address.postalCode,
      addressCountry: BUSINESS_INFO.address.addressCountry,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: BUSINESS_INFO.geo.latitude,
      longitude: BUSINESS_INFO.geo.longitude,
    },
    email: BUSINESS_INFO.email,
    telephone: BUSINESS_INFO.telephone,
    priceRange: BUSINESS_INFO.priceRange,
    sameAs: [
      SITE_INFO.facebookPage,
      SITE_INFO.instagramUrl,
    ],
  };

  // Organization Schema
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_INFO.url}#organization`,
    name: SITE_INFO.siteName,
    url: SITE_INFO.url,
    logo: `${SITE_INFO.url}/maison-des-bozos-landing.jpg`,
    contactPoint: {
      "@type": "ContactPoint",
      email: BUSINESS_INFO.email,
      contactType: "Customer Service",
      availableLanguage: ["French", "English"],
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: BUSINESS_INFO.address.streetAddress,
      addressLocality: BUSINESS_INFO.address.addressLocality,
      addressRegion: BUSINESS_INFO.address.addressRegion,
      postalCode: BUSINESS_INFO.address.postalCode,
      addressCountry: BUSINESS_INFO.address.addressCountry,
    },
    sameAs: [
      SITE_INFO.facebookPage,
      SITE_INFO.instagramUrl,
    ],
  };

  // WebSite Schema
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_INFO.url}#website`,
    url: SITE_INFO.url,
    name: SITE_INFO.siteName,
    description:
      language === "fr"
        ? "Site officiel de la Maison des Bozos - Concerts, musée et événements culturels à Montréal"
        : "Official website of House of Bozos - Concerts, museum and cultural events in Montreal",
    inLanguage: language === "fr" ? "fr-CA" : "en-CA",
    publisher: {
      "@id": `${SITE_INFO.url}#organization`,
    },
  };

  // BreadcrumbList Schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: language === "fr" ? "Accueil" : "Home",
        item: SITE_INFO.url,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: language === "fr" ? "Concerts" : "Concerts",
        item: `${SITE_INFO.url}#concerts`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: language === "fr" ? "Musée" : "Museum",
        item: `${SITE_INFO.url}#musee`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusinessSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />
    </>
  );
};

export default StructuredData;
