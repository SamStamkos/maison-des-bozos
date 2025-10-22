import React from "react";
import { useLanguage } from "../context/LanguageContext";

const Home: React.FC = () => {
  const { t, language } = useLanguage();

  // Get route with current language
  const getRoute = (path: string) => {
    return language === 'en' ? `/en${path}` : path;
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-screen-2xl px-12 mx-auto">
        <div className="grid grid-cols-6 m-16 px-4">
          <div className="col-span-1"></div>
          <div className="col-span-5 col-start-2 space-y-4">
            <p className="text-sm leading-relaxed">
              {t('home.description1')}
            </p>
            <p className="text-sm leading-relaxed">
              {t('home.description2')}
            </p>

            <p className="text-sm leading-relaxed">
              {t('home.description3')}
            </p>
            <a
              href={getRoute('/billetterie')}
              className="inline-block mt-4 py-2 px-4 rounded-xs text-primary border border-primary/70 hover:border-primary"
            >
              <span>{t('home.reserve')}</span>
            </a>
          </div>
        </div>
        <div className="grid grid-cols-6 gap-6 mt-24">
          <div className="relative col-span-3">
            <div className="w-full h-64 rounded-xs overflow-hidden bg-gray-200">
              <img
                src="/bozo.jpg"
                alt="Maison des Bozos"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col items-start mt-4 w-4/5">
              <p>
                {t('home.concerts.title')}
              </p>
              <a
                href={getRoute('/concerts')}
                className="inline-block mt-4 py-2 px-4 rounded-xs text-primary border border-primary/70 hover:border-primary"
              >
                <span>{t('home.concerts.button')}</span>
              </a>
            </div>
          </div>
          <div className="relative col-span-3">
            <div className="w-full h-64 rounded-xs overflow-hidden bg-gray-200">
              <img
                src="/museee.jpg"
                alt="Maison des Bozos"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col items-start mt-4 w-4/5">
              <p>
                {t('home.musee.title')}
              </p>
              <a
                href={getRoute('/musee')}
                className="inline-block mt-4 py-2 px-4 rounded-xs text-primary border border-primary/70 hover:border-primary"
              >
                <span>{t('home.musee.button')}</span>
              </a>
            </div>
          </div>
        </div>
        <section className="relative mt-40">
          <div className="w-3/4 flex flex-col items-start gap-4">
            <h2 className="text-2xl font-medium">
              {t('home.donation.title')}
            </h2>
            <p className="text-sm leading-relaxed">
              {t('home.donation.description')}
            </p>
          </div>
          <div className="mt-12">
            <img 
              src="/musee.jpg" 
              alt="Maison des Bozos" 
              className="w-40" 
            />
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
