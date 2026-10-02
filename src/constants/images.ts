/**
 * Image paths for all sections
 * Centralized to make it easier to manage and update
 */

export const INTRO_IMAGES = [
  '/intro/intro-1.jpg',
  '/intro/intro-2.jpg',
  '/intro/intro-3.jpg',
  '/intro/intro-4.jpg',
] as const

export const CONCERTS_IMAGES = [
  '/concerts/concert-1.jpg',
  '/concerts/concert-2.jpg',
  '/concerts/concert-3.jpg',
  '/concerts/concert-4.jpg',
  '/concerts/concert-5.jpg',
] as const

export const MUSEUM_IMAGES = [
  '/musee/musee-1.jpg',
  '/musee/musee-2.jpg',
  '/musee/musee-3.jpg',
  '/musee/musee-4.jpg',
] as const

// Width/height are the intrinsic pixel sizes of the trimmed PNGs (max 800×480) in
// public/remerciements/logos/ (each has a matching .webp).
export const PARTNER_LOGOS = [
  { name: 'Bolduc Pianos', src: '/remerciements/logos/bolduc-pianos.png', width: 395, height: 480 },
  { name: 'Daniel-Jean Primeau', src: '/remerciements/logos/daniel-jean-primeau.png', width: 800, height: 178 },
  { name: 'Degrandpré Chait', src: '/remerciements/logos/degrandpre-chait.png', width: 800, height: 203 },
  { name: 'Fillion Électronique', src: '/remerciements/logos/fillion-electronique.png', width: 800, height: 214 },
  { name: 'McCarthy Tétrault', src: '/remerciements/logos/mccarthy-tetrault.png', width: 800, height: 369 },
  { name: 'Montroy L’imprimeur', src: '/remerciements/logos/montroy-imprimeur.png', width: 736, height: 480 },
  { name: 'MRL', src: '/remerciements/logos/mrl.png', width: 353, height: 480 },
  { name: 'PCG Carmon', src: '/remerciements/logos/pcg-carmon.png', width: 662, height: 480 },
  { name: 'PMD Acoustics', src: '/remerciements/logos/pmd-acoustics.png', width: 800, height: 268 },
  { name: 'Store Ambiance', src: '/remerciements/logos/store-ambiance.png', width: 557, height: 480 },
  { name: 'Fondation Youkali', src: '/remerciements/logos/youkali-fondation.png', width: 563, height: 480 },
  { name: 'Zone Enseignes', src: '/remerciements/logos/zone-enseignes.png', width: 544, height: 480 },
] as const

export const SUPPORTED_LOGOS = [
  { name: 'Fondation de l’Hôpital Maisonneuve-Rosemont', src: '/remerciements/logos/fhmr.png', width: 800, height: 301 },
  { name: 'Harfang', src: '/remerciements/logos/harfang.png', width: 800, height: 99 },
] as const

export const CONCERTS_STAGE_IMAGE = '/concerts/concert-stage.jpg' as const
