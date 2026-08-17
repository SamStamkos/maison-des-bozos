import React, { useEffect } from "react";
import { useLanguage } from "../hooks/useLanguage";
import IntroSection from "../components/IntroSection";
import ConcertsSection from "../components/ConcertsSection";
// import CarouselSection from "../components/CarouselSection";
import MuseumSection from "../components/MuseumSection";
import NewsletterSection from "../components/NewsletterSection";
import DonationSection from "../components/DonationSection";
import RemerciementsSection from "../components/RemerciementsSection";

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
      {/* Carousel paused — repeats the concerts imagery. To re-enable: restore the
          import above and add md:-mt-[50vh] back to the MuseumSection wrapper below
          (it pulls the museum up over the carousel's sticky parallax). */}
      {/* <CarouselSection /> */}
      <div className="md:relative md:z-10">
        <MuseumSection />
      </div>
      <DonationSection />
      <NewsletterSection />
      <RemerciementsSection />
    </main>
  );
};

export default Home;
