import React, { useEffect } from "react";
import { useLanguage } from "../context/LanguageContext";
import IntroSection from "../components/IntroSection";
import ConcertsSection from "../components/ConcertsSection";
import MuseumSection from "../components/MuseumSection";
import DonationSection from "../components/DonationSection";

const Home: React.FC = () => {
  const { language } = useLanguage();

  useEffect(() => {
    // Update the script language parameter when language changes
    const script = document.querySelector(
      'script[src*="lepointdevente.com/plugins/embed.js"]'
    );
    if (script) {
      script.remove();
      const newScript = document.createElement("script");
      newScript.src = `https://lepointdevente.com/plugins/embed.js?lang=${language}`;
      document.body.appendChild(newScript);
    }
  }, [language]);

  return (
    <div className="min-h-screen bg-white">
      <IntroSection />
      <ConcertsSection />
      <MuseumSection />
      <DonationSection />
    </div>
  );
};

export default Home;
