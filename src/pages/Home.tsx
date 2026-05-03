import React, { useEffect } from "react";
import { useLanguage } from "../hooks/useLanguage";
import IntroSection from "../components/IntroSection";
import ConcertsSection from "../components/ConcertsSection";
import CarouselSection from "../components/CarouselSection";
import MuseumSection from "../components/MuseumSection";
import NewsletterSection from "../components/NewsletterSection";
import DonationSection from "../components/DonationSection";

const Home: React.FC = () => {
  const { language } = useLanguage();

  useEffect(() => {
    // Update the script language parameter when language changes
    const existingScript = document.querySelector(
      'script[src*="lepointdevente.com/plugins/embed.js"]'
    );

    if (existingScript) {
      existingScript.remove();
    }

    const newScript = document.createElement("script");
    newScript.src = `https://lepointdevente.com/plugins/embed.js?lang=${language}`;
    document.body.appendChild(newScript);

    // Cleanup on unmount or language change
    return () => {
      const scriptToRemove = document.querySelector(
        `script[src*="lepointdevente.com/plugins/embed.js?lang=${language}"]`
      );
      if (scriptToRemove) {
        scriptToRemove.remove();
      }
    };
  }, [language]);

  return (
    <main className="min-h-screen bg-secondary">
      <IntroSection />
      <ConcertsSection />
      <CarouselSection />
      <div className="md:relative md:z-10 md:-mt-[50vh]">
        <MuseumSection />
      </div>
      <DonationSection />
      <NewsletterSection />
    </main>
  );
};

export default Home;
