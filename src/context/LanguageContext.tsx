import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

export type Language = "fr" | "en";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string | React.ReactNode;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({
  children,
}) => {
  const [language, setLanguageState] = useState<Language>("fr");

  // Load language from localStorage on mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") as Language;
    if (savedLanguage && (savedLanguage === "fr" || savedLanguage === "en")) {
      setLanguageState(savedLanguage);
    }
  }, []);

  // Save language to localStorage when it changes
  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("language", lang);
  };

  // Translation function
  const t = (key: string): string | React.ReactNode => {
    const translations: Record<
      string,
      Record<Language, string | React.ReactNode>
    > = {
      // Navigation
      "nav.title": { fr: "Maison des Bozos", en: "House of Bozos" },

      // Page titles

      // Home page
      "home.title": { fr: "Bienvenue chez Bozo", en: "Welcome to Bozo" },
      "home.description1": {
        fr: (
          <>
            Bienvenue… <span className="italic font-medium">Chez Bozo</span>! Au cœur du centre-ville de Montréal, à même le
            lieu historique de la toute première boîte à chansons d’Amérique,
            vient de naître et renaître{" "}
            <span className="italic font-medium">Chez Bozo</span>. Cet endroit
            unique possède plusieurs dimensions: une salle intime où vos
            artistes favoris offrent des spectacles acoustiques; un mini-musée
            abritant de précieux artéfacts culturels dont la fameuse murale des
            empreintes, ainsi que le café-bar{" "}
            <span className="italic font-medium">Le Lutèce</span>, qui vous
            accueillera chaleureusement du matin au soir. Sans contredit,{" "}
            <span className="italic font-medium">Chez Bozo</span> devient la
            nouvelle destination urbaine pour les vrais amateurs de culture.
          </>
        ),
        en: "In the heart of downtown Montreal, the House of Bozo will soon be born and reborn in the historic location of the very first song house in America. This project promises to revolutionize the cultural scene by offering a place where the unexpected becomes the norm. Conceived as a multi-dimensional space — acoustic concert hall, mini-museum full of rare pieces, café-bar in the heart of a florist and modular event space — the House of Bozo invites exploration of new artistic horizons.",
      },
      "home.reserve": { fr: "Réserver votre visite", en: "Book your visit" },
      "home.concerts.title": {
        fr: "Concerts Chez Bozo",
        en: "Concerts at Bozo",
      },
      "home.concerts.button": {
        fr: "Réservez vos billets",
        en: "Book your tickets",
      },
      "home.concerts.description": {
        fr: "Découvrez nos concerts intimes et acoustiques dans un lieu mythique chargé d'histoire. Vivez une expérience musicale unique au cœur du centre-ville de Montréal! Consultez notre calendrier et…",
        en: "",
      },
      "home.musee.title": {
        fr: "Le musée des Bozos",
        en: "The Bozo Museum",
      },
      "home.musee.button": {
        fr: "Découvrez le musée",
        en: "Discover the Museum",
      },
      "home.musee.description": {
        fr: (
          <>
            Plongez dans l'histoire de la première boîte à chanson d'Amérique.
            Un mini-musée fascinant qui révèle pour la première fois depuis
            1959, la fameuse murale où près de cent personnalités de
            l'époque, dont <span className="font-bold">Claude Léveillée</span>,{" "}
            <span className="font-bold">Jean-Pierre Ferland</span>,{" "}
            <span className="font-bold">Clémence Desrochers</span>,{" "}
            <span className="font-bold">Raymond Lévesque</span>,{" "}
            <span className="font-bold">Félix Leclerc</span>,{" "}
            <span className="font-bold">Alys Robi</span>, sans oublier la
            célébrissime <span className="font-bold">Édith Piaf</span>, ont
            laissé l'empreinte de leur main et leur signature. À voir
            absolument, émotions fortes garanties!
          </>
        ),
        en: "Dive into the history of America's first song house. A living museum celebrating Quebec's musical heritage.",
      },
      "home.donation.title": {
        fr: "Je fais un don pour la protection du patrimoine musical Québécois",
        en: "Make a donation for the protection of Quebec musical heritage",
      },
      "home.donation.description": {
        fr: "HARFANG est un organisme à but non lucratif ayant pour mission la protection du patrimoine musical québécois. En effet, la transition numérique a crée un déséquilibre préoccupant dans l’accès à notre patrimoine musical, qui sombre lentement mais sûrement dans le silence. Des milliers d’enregistrements n’ont jamais été numérisés et restent innaccessibles sur les plates-formes modernes. Nous disposons d’une fenêtre critique de seulement quelques années avant que de nombreux enregistrements historiques ne deviennent irrécupérables. SVP, aidez-nous à protéger notre patrimoine musical!",
        en: "In the heart of downtown Montreal, the House of Bozo will soon be born and reborn in the historic location of the very first song house in America. This project promises to revolutionize the cultural scene by offering a place where the unexpected becomes the norm.",
      },
      "home.donation.button": {
        fr: "Je fais un don",
        en: "Make a donation",
      },

      // Concerts page
      "page.concerts.description": {
        fr: "Découvrez nos prochains concerts et achetez vos billets en ligne",
        en: "Discover our upcoming concerts and buy your tickets online",
      },
      "page.concerts.viewTickets": {
        fr: "Réserver dès maintenant",
        en: "Book now",
      },

      // Footer
      "footer.email": {
        fr: "direction@maisondesbozo.com",
        en: "direction@maisondesbozo.com",
      },
      "footer.address": {
        fr: "1208 Crescent St,\nMontreal, Quebec\nH3G 2A9",
        en: "1208 Crescent St,\nMontreal, Quebec\nH3G 2A9",
      },
      "footer.copyright": {
        fr: "© 2025 Maison des Bozo.",
        en: "© 2025 House of Bozo.",
      },
      "footer.privacy": {
        fr: "Politique de confidentialité",
        en: "Privacy Policy",
      },
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
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
