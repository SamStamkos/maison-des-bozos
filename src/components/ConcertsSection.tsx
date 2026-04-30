import React from "react";
import { useLanguage } from "../hooks/useLanguage";
import SectionCard from "./SectionCard";

const POSTER_JPG = "/chez-bozo-affiche.jpg";
const POSTER_WEBP = "/chez-bozo-affiche.webp";

const ConcertsSection: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section
      id="concerts"
      className="max-w-screen-2xl px-0 md:px-12 mx-auto relative bg-secondary z-10 w-full py-4 md:py-12"
      aria-labelledby="section-right"
    >
      {/* Desktop: grid with both children in the same cell so the card overlays
          the poster (matches the museum/intro layout). Mobile: natural block flow. */}
      <div className="md:grid md:grid-cols-1">
        {/* Poster — placed in the grid cell, anchored right, takes ~70% width.
            Its aspect-driven height drives the grid row height, giving the
            sticky card a real scroll range to pin within. */}
        <div className="px-4 md:px-0 md:col-start-1 md:row-start-1 md:justify-self-end md:w-7/10 md:py-20">
          <div className="relative w-full aspect-[5/8] overflow-hidden rounded-xs">
            <picture>
              <source srcSet={POSTER_WEBP} type="image/webp" />
              <img
                src={POSTER_JPG}
                alt="Affiche Chez Bozo - Concerts à la Maison des Bozos"
                loading="eager"
                fetchPriority="high"
                decoding="async"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </picture>
          </div>
        </div>
        {/* Card — same grid cell, anchored left. Source-ordered after the
            poster so it paints on top. SectionCard's own md:sticky pins it. */}
        <div className="mt-8 md:mt-0 md:col-start-1 md:row-start-1 md:justify-self-start md:z-10">
          <SectionCard
            title={t("home.concerts.title") as string}
            descriptions={[t("home.concerts.description")]}
            buttonText={t("home.concerts.button") as string}
            buttonDataGroup="15928"
            position="left"
          />
        </div>
      </div>
    </section>
  );
};

export default React.memo(ConcertsSection);
