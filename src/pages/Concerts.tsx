import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const Concerts: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-screen-2xl px-12 mx-auto py-16">
        <h1 className="text-3xl font-medium text-primary">
          {t('page.concerts.title')}
        </h1>
      </div>
    </div>
  );
};

export default Concerts;
