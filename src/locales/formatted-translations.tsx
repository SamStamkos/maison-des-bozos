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
    en: (
      <>
        Welcome… to <span className="italic font-semibold">Chez Bozo</span>! In
        the heart of downtown Montreal, in the historic location of the very
        first song house in America,{" "}
        <span className="italic font-semibold">Chez Bozo</span> has just been
        born and reborn. This unique venue has several dimensions: an intimate
        room where your favorite artists perform acoustic shows; a mini-museum
        housing precious cultural artifacts including the famous handprint
        mural, as well as the{" "}
        <span className="italic font-semibold">Le Lutèce</span> café-bar, which
        will warmly welcome you from morning to night. Without a doubt,{" "}
        <span className="italic font-semibold">Chez Bozo</span> is becoming the
        new urban destination for true culture lovers.
      </>
    ),
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
    en: (
      <>
        Dive into the history of America's first song house. A fascinating
        mini-museum that reveals for the first time since 1959, the famous mural
        where nearly one hundred personalities of the era, including{" "}
        <span className="font-bold">Claude Léveillée</span>,{" "}
        <span className="font-bold">Jean-Pierre Ferland</span>,{" "}
        <span className="font-bold">Clémence Desrochers</span>,{" "}
        <span className="font-bold">Raymond Lévesque</span>,{" "}
        <span className="font-bold">Félix Leclerc</span>,{" "}
        <span className="font-bold">Alys Robi</span>, not to mention the
        world-famous <span className="font-bold">Édith Piaf</span>, left their
        handprint and signature. A must-see, strong emotions guaranteed!
      </>
    ),
  },
};
