import React from "react";
import { useLanguage } from "../context/LanguageContext";
import { CONCERTS_IMAGES } from "../constants/images";
import SectionWithCarousel from "./SectionWithCarousel";

const ConcertsSection: React.FC = () => {
  const { t } = useLanguage();

  return (
    <SectionWithCarousel
      sectionId="concerts"
      images={CONCERTS_IMAGES}
      imagePosition="right"
      cardTitle={t("home.concerts.title") as string}
      cardDescriptions={[t("home.concerts.description")]}
      cardButtonText={t("home.concerts.button") as string}
      cardButtonDataGroup="15097"
      altTextPrefix="Concerts"
    />
  );
};

export default ConcertsSection;
