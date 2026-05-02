import React from 'react'
import { Language } from '../context/LanguageContext'

/**
 * Formatted translations that require JSX (bold, italic, etc.)
 * These can't be stored in JSON files
 */
export const formattedTranslations: Record<
  string,
  Record<Language, React.ReactNode>
> = {
  'home.title': {
    fr: 'Bienvenue à la Maison des Bozos!',
    en: 'Welcome to the Maison des Bozos',
  },
  'home.titleMobileLine1': {
    fr: 'Bienvenue à',
    en: 'Welcome to the',
  },
  'home.titleMobileLine2': {
    fr: 'la Maison des Bozos!',
    en: 'the Maison des Bozos',
  },
  'home.musee.title': {
    fr: 'Le musée des Bozos de Montréal',
    en: 'The Montreal Museum of Bozos',
  },
  'home.musee.titleMobileLine1': {
    fr: 'Le musée des Bozos',
    en: 'The Montreal',
  },
  'home.musee.titleMobileLine2': {
    fr: 'de Montréal',
    en: 'Museum of Bozos',
  },
  'home.description1': {
    fr: (
      <>
        Bienvenue à la{' '}
        <span className="italic font-semibold">Maison des Bozos</span>! Cet
        endroit unique, au cœur du centre-ville de Montréal, possède plusieurs
        dimensions. D'abord, à même le lieu historique de la toute première
        boîte à chansons d'importance du Québec, vient de naître et renaître{' '}
        <span className="italic font-semibold">Chez&nbsp;Bozo</span>, une salle
        de spectacle intimiste où sont présentés des concerts acoustiques. Le
        café-bar <span className="italic font-semibold">Le&nbsp;Lutèce</span>,
        qui vous accueillera chaleureusement du matin au soir (à venir!), ainsi
        qu'un espace muséal au centre duquel trône le mur d'honneur des Bozos et
        ses célèbres empreintes. Sans contredit, la{' '}
        <span className="italic font-semibold">Maison des Bozos</span> sera un
        incontournable pour les amateurs de culture.
      </>
    ),
    en: (
      <>
        Welcome to the{' '}
        <span className="italic font-semibold">Maison des Bozos</span>! This
        unique place, in the heart of downtown Montreal, has several dimensions.
        First, within the walls of the very first major singer-songwriter venue
        in Quebec, <span className="italic font-semibold">Chez&nbsp;Bozo</span>{' '}
        has just been born — and reborn — as an intimate concert hall hosting
        acoustic performances. The café-bar{' '}
        <span className="italic font-semibold">Le&nbsp;Lutèce</span>, which will
        warmly welcome you from morning to night (coming soon!), as well as a
        museum space at the center of which stands the Bozos' wall of honor with
        its famous handprints. Without a doubt, the{' '}
        <span className="italic font-semibold">Maison des Bozos</span> will be a
        must for culture lovers.
      </>
    ),
  },
  'home.musee.description': {
    fr: (
      <>
        Plongez dans l'histoire de la première boîte à chanson d'Amérique. Un
        musée fascinant qui révèle pour la première fois depuis 1959, la
        fameuse murale où près de cent personnalités de l'époque, dont{' '}
        <span className="font-bold">Claude Léveillée</span>,{' '}
        <span className="font-bold">Jean-Pierre Ferland</span>,{' '}
        <span className="font-bold">Clémence Desrochers</span>,{' '}
        <span className="font-bold">Raymond Lévesque</span>,{' '}
        <span className="font-bold">Félix Leclerc</span>,{' '}
        <span className="font-bold">Alys Robi</span>, sans oublier la
        célébrissime <span className="font-bold">Édith Piaf</span>, ont laissé
        l'empreinte de leur main et leur signature. À voir absolument, émotions
        fortes garanties!
      </>
    ),
    en: (
      <>
        Dive into the history of America's first singer-songwriter venue. A
        fascinating museum that reveals for the first time since 1959, the
        famous mural where nearly one hundred personalities of the era,
        including <span className="font-bold">Claude Léveillée</span>,{' '}
        <span className="font-bold">Jean-Pierre Ferland</span>,{' '}
        <span className="font-bold">Clémence Desrochers</span>,{' '}
        <span className="font-bold">Raymond Lévesque</span>,{' '}
        <span className="font-bold">Félix Leclerc</span>,{' '}
        <span className="font-bold">Alys Robi</span>, not to mention the
        world-famous <span className="font-bold">Édith Piaf</span>, left their
        handprint and signature. A must-see, strong emotions guaranteed!
      </>
    ),
  },
  'home.donation.contact': {
    fr: (
      <>
        Pour toutes informations ou pour donner, écrivez à l'adresse suivante:{' '}
        <a
          href="mailto:fondation.harfang@gmail.com"
          className="underline hover:text-primary/70 transition-colors duration-200"
        >
          fondation.harfang@gmail.com
        </a>
      </>
    ),
    en: (
      <>
        For information or to donate, please write to:{' '}
        <a
          href="mailto:fondation.harfang@gmail.com"
          className="underline hover:text-primary/70 transition-colors duration-200"
        >
          fondation.harfang@gmail.com
        </a>
      </>
    ),
  },
  'home.donation.description': {
    fr: (
      <>
        <span className="font-bold">HARFANG</span> est un organisme à but non
        lucratif ayant pour mission la protection du patrimoine musical
        québécois. En effet, la transition numérique a créé un déséquilibre
        préoccupant dans l'accès à notre patrimoine, qui sombre
        lentement mais sûrement dans le silence. Des milliers d'enregistrements
        n'ont jamais été numérisés et restent inaccessibles sur les
        plates-formes modernes. Nous disposons d'une fenêtre critique de
        seulement quelques années avant que de nombreux enregistrements
        historiques ne deviennent irrécupérables. SVP, aidez-nous à protéger
        notre patrimoine musical!
      </>
    ),
    en: (
      <>
        <span className="font-bold">HARFANG</span> is a non-profit organization
        with the mission of protecting Quebec's musical heritage. Indeed, the
        digital transition has created a worrying imbalance in access to our
        musical heritage, which is slowly but surely fading into silence.
        Thousands of recordings have never been digitized and remain
        inaccessible on modern platforms. We have a critical window of only a
        few years before many historical recordings become unrecoverable. Please
        help us protect our musical heritage!
      </>
    ),
  },
}
