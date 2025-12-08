/**
 * SEO metadata constants
 * Centralized SEO information for the website
 */

import { Language } from "../context/LanguageContext";

interface SEOMetadata {
  title: string;
  description: string;
  keywords: string;
}

export const SEO_METADATA: Record<Language, SEOMetadata> = {
  fr: {
    title: "Maison des Bozos | Salle de spectacle, Musée & Café-Bar à Montréal",
    description:
      "Découvrez Chez Bozo, lieu mythique au cœur de Montréal. Salle de concerts acoustiques intimes, mini-musée avec la fameuse murale des empreintes, et café-bar Le Lutèce. Première boîte à chansons d'Amérique depuis 1959.",
    keywords:
      "Maison des Bozos, Chez Bozo, concerts Montréal, musée québécois, boîte à chansons, spectacles acoustiques, café-bar Montréal, culture québécoise, patrimoine musical, Le Lutèce, rue Crescent",
  },
  en: {
    title: "House of Bozos | Concert Hall, Museum & Café-Bar in Montreal",
    description:
      "Discover Chez Bozo, a legendary venue in the heart of Montreal. Intimate acoustic concert hall, mini-museum featuring the famous handprint mural, and Le Lutèce café-bar. America's first song house since 1959.",
    keywords:
      "House of Bozos, Chez Bozo, Montreal concerts, Quebec museum, song house, acoustic shows, Montreal cafe bar, Quebec culture, musical heritage, Le Lutèce, Crescent Street",
  },
};

export const SITE_INFO = {
  url: "https://chezbozo.com", // Update with actual URL
  siteName: "Maison des Bozos",
  author: "Maison des Bozos",
  twitterHandle: "@maisondesbozos",
  facebookPage: "https://www.facebook.com/maisondesbozos/",
  instagramHandle: "@maisondesbozos",
  instagramUrl: "https://www.instagram.com/maisondesbozos/",
  ogImage: "/maison-des-bozos-landing.jpg",
  themeColor: "#bda075", // Secondary color
  backgroundColor: "#212122", // Primary color
};

export const BUSINESS_INFO = {
  name: "Maison des Bozos",
  legalName: "Maison des Bozos",
  address: {
    streetAddress: "1208 Rue Crescent",
    addressLocality: "Montréal",
    addressRegion: "QC",
    postalCode: "H3G 2A9",
    addressCountry: "CA",
  },
  geo: {
    latitude: 45.4973,
    longitude: -73.5775,
  },
  email: "info@chezbozo.com",
  telephone: "+1-XXX-XXX-XXXX", // Update with actual phone
  priceRange: "$$",
};
