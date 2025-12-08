import React from "react";
import { Language } from "../context/LanguageContext";

/**
 * Formatted translations that require JSX (bold, italic, etc.)
 * These can't be stored in JSON files
 */
export const formattedTranslations: Record<
  string,
  Record<Language, React.ReactNode>
> = {
  "home.description1": {
    fr: (
      <>
        Bienvenue… <span className="italic font-semibold">Chez Bozo</span>! Au
        cœur du centre-ville de Montréal, à même le lieu historique de la toute
        première boîte à chansons d'Amérique, vient de naître et renaître{" "}
        <span className="italic font-semibold">Chez Bozo</span>. Cet endroit
        unique possède plusieurs dimensions: une salle intime où vos artistes
        favoris offrent des spectacles acoustiques; un mini-musée abritant de
        précieux artéfacts culturels dont la fameuse murale des empreintes,
        ainsi que le café-bar{" "}
        <span className="italic font-semibold">Le Lutèce</span>, qui vous
        accueillera chaleureusement du matin au soir. Sans contredit,{" "}
        <span className="italic font-semibold">Chez Bozo</span> devient la
        nouvelle destination urbaine pour les vrais amateurs de culture.
      </>
    ),
    en: "In the heart of downtown Montreal, the House of Bozo will soon be born and reborn in the historic location of the very first song house in America. This project promises to revolutionize the cultural scene by offering a place where the unexpected becomes the norm. Conceived as a multi-dimensional space — acoustic concert hall, mini-museum full of rare pieces, café-bar in the heart of a florist and modular event space — the House of Bozo invites exploration of new artistic horizons.",
  },
  "home.musee.description": {
    fr: (
      <>
        Plongez dans l'histoire de la première boîte à chanson d'Amérique. Un
        mini-musée fascinant qui révèle pour la première fois depuis 1959, la
        fameuse murale où près de cent personnalités de l'époque, dont{" "}
        <span className="font-bold">Claude Léveillée</span>,{" "}
        <span className="font-bold">Jean-Pierre Ferland</span>,{" "}
        <span className="font-bold">Clémence Desrochers</span>,{" "}
        <span className="font-bold">Raymond Lévesque</span>,{" "}
        <span className="font-bold">Félix Leclerc</span>,{" "}
        <span className="font-bold">Alys Robi</span>, sans oublier la
        célébrissime <span className="font-bold">Édith Piaf</span>, ont laissé
        l'empreinte de leur main et leur signature. À voir absolument, émotions
        fortes garanties!
      </>
    ),
    en: "Dive into the history of America's first song house. A living museum celebrating Quebec's musical heritage.",
  },
};
