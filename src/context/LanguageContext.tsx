import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Language = 'fr' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>('fr');

  // Load language from localStorage on mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage && (savedLanguage === 'fr' || savedLanguage === 'en')) {
      setLanguageState(savedLanguage);
    }
  }, []);

  // Save language to localStorage when it changes
  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
  };

  // Translation function
  const t = (key: string): string => {
    const translations: Record<string, Record<Language, string>> = {
      // Navigation
      'nav.concerts': { fr: 'Les Concerts', en: 'Concerts' },
      'nav.musee': { fr: 'Le Musée', en: 'The Museum' },
      'nav.don': { fr: 'Faire un don', en: 'Make a Donation' },
      'nav.boutique': { fr: 'Boutique', en: 'Shop' },
      
      // Page titles
      'page.concerts.title': { fr: 'Les Concerts', en: 'Concerts' },
      'page.musee.title': { fr: 'Le Musée', en: 'The Museum' },
      'page.don.title': { fr: 'Faire un don', en: 'Make a Donation' },
      'page.boutique.title': { fr: 'Boutique', en: 'Shop' },
      
      // Home page
      'home.title': { fr: 'Maison des Bozos', en: 'House of Bozos' },
      'home.description1': { 
        fr: 'Au cœur du centre-ville de Montréal, va bientôt naître et renaître, à même le lieu historique de la toute première boite à chanson d\'Amérique : la Maison des Bozos. Ce projet promet de bouleverser les codes de la scène culturelle en offrant un lieu où l\'inattendu devient la norme. Pensée comme un espace aux multiples dimensions — salle de spectacles acoustiques, canal YouTube, mini-musée regorgeant de pièces rares, studio d\'enregistrement discret, café-bar au coeur d\'un fleuriste et espace événementiel modulable — la Maison des Bozos invite à l\'exploration de nouveaux horizons artistiques.',
        en: 'In the heart of downtown Montreal, the House of Bozos will soon be born and reborn in the historic location of the very first song house in America. This project promises to revolutionize the cultural scene by offering a place where the unexpected becomes the norm. Conceived as a multi-dimensional space — acoustic concert hall, YouTube channel, mini-museum full of rare pieces, discreet recording studio, café-bar in the heart of a florist and modular event space — the House of Bozos invites exploration of new artistic horizons.'
      },
      'home.description2': {
        fr: 'Plus qu\'un simple lieu, la Maison des Bozos se veut un terrain de jeu pour les créateurs, un repaire pour les passionnés et un point de ralliement pour les curieux avides de découvertes. Chaque projet, chaque événement, chaque collaboration sera conçu pour éveiller l\'imagination, provoquer l\'étonnement et offrir des expériences hors du commun.',
        en: 'More than just a place, the House of Bozos aims to be a playground for creators, a haven for enthusiasts and a rallying point for curious people eager for discoveries. Each project, each event, each collaboration will be designed to awaken imagination, provoke wonder and offer extraordinary experiences.'
      },
      'home.description3': {
        fr: 'Voici les contours d\'un espace où la culture se vit autrement, où chaque visiteur pourra se laisser surprendre, interpellé par des ambiances inédites et des rencontres inattendues. La Maison des Bozos s\'annonce comme une adresse incontournable, prête à révéler tout son potentiel et à enrichir le paysage artistique montréalais d\'une touche unique et audacieuse.',
        en: 'Here are the outlines of a space where culture is lived differently, where each visitor can let themselves be surprised, challenged by unprecedented atmospheres and unexpected encounters. The House of Bozos announces itself as an essential address, ready to reveal all its potential and enrich the Montreal artistic landscape with a unique and bold touch.'
      },
      'home.reserve': { fr: 'Réserver votre visite', en: 'Book your visit' },
      'home.concerts.title': { fr: 'Série de concerts à la Maison des Bozos', en: 'Concert series at the House of Bozos' },
      'home.concerts.button': { fr: 'Concerts Chez Bozos', en: 'Concerts at Bozos' },
      'home.musee.title': { fr: 'Une découverte exceptionnelle de la maison historique des Bozos au 1208 Crescent.', en: 'An exceptional discovery of the historic Bozos house at 1208 Crescent.' },
      'home.musee.button': { fr: 'Découvrir le Musée', en: 'Discover the Museum' },
      'home.donation.title': { fr: 'Faire un don pour la protection du patrimoine musical Québécois', en: 'Make a donation for the protection of Quebec musical heritage' },
      'home.donation.description': {
        fr: 'Au cœur du centre-ville de Montréal, va bientôt naître et renaître, à même le lieu historique de la toute première boite à chanson d\'Amérique : la Maison des Bozos. Ce projet promet de bouleverser les codes de la scène culturelle en offrant un lieu où l\'inattendu devient la norme.',
        en: 'In the heart of downtown Montreal, the House of Bozos will soon be born and reborn in the historic location of the very first song house in America. This project promises to revolutionize the cultural scene by offering a place where the unexpected becomes the norm.'
      },
      
      // Footer
      'footer.email': { fr: 'direction@maisondesbozos.com', en: 'direction@maisondesbozos.com' },
      'footer.address': { fr: '1208 Crescent St,\nMontreal, Quebec\nH3G 2A9', en: '1208 Crescent St,\nMontreal, Quebec\nH3G 2A9' },
      'footer.copyright': { fr: '© 2025 Maison des Bozos.', en: '© 2025 House of Bozos.' },
      'footer.privacy': { fr: 'Politique de confidentialité', en: 'Privacy Policy' }
    };

    return translations[key]?.[language] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
