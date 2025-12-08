import React from "react";
import { useLanguage } from "../context/LanguageContext";
import { MUSEUM_IMAGES } from "../constants/images";
import SectionWithCarousel from "./SectionWithCarousel";

const MuseumSection: React.FC = () => {
  const { t } = useLanguage();

  return (
    <SectionWithCarousel
      sectionId="musee"
      images={MUSEUM_IMAGES}
      imagePosition="left"
      cardTitle={t("home.musee.title") as string}
      cardDescriptions={[t("home.musee.description")]}
      cardButtonText={t("home.musee.button") as string}
      cardButtonDataGroup="14982"
      altTextPrefix="Museum"
    />
  );
};

export default MuseumSection;
