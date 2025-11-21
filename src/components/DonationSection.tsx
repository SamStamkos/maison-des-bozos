import React from "react";
import { useLanguage } from "../context/LanguageContext";

const DonationSection: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="relative mt-40 mx-12">
      <div className="w-3/4 flex flex-col items-start gap-4">
        <h2 className="text-2xl font-medium">{t("home.donation.title")}</h2>
        <p className="text-sm leading-relaxed">{t("home.donation.description")}</p>
      </div>
      <div className="mt-12 space-y-4">
        <img src="/fondation.jpg" alt="Maison des Bozos" className="w-40" />
        <button
          type="button"
          className="mt-4 py-2 px-4 rounded-xs text-primary border border-primary/70 hover:border-primary"
        >
          {t("home.donation.button")}
        </button>
      </div>
    </section>
  );
};

export default DonationSection;
