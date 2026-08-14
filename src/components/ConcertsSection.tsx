import React from 'react'
import { useLanguage } from '../hooks/useLanguage'
import SectionCard from './SectionCard'
import { CONCERTS_STAGE_IMAGE } from '../constants/images'

const ConcertsSection: React.FC = () => {
  const { t } = useLanguage()

  return (
    <section
      id="concerts"
      className="relative bg-secondary z-10 w-full pt-4 md:pt-24 pb-12 md:pb-44"
      aria-labelledby="section-left"
    >
      <div className="md:relative">
        {/* Stage photo — full-bleed backdrop, edge to edge */}
        <div>
          <div className="relative w-full aspect-[3/2] md:aspect-auto md:h-screen overflow-hidden">
            <picture>
              <source
                srcSet={CONCERTS_STAGE_IMAGE.replace(/\.(jpg|jpeg)$/i, '.webp')}
                type="image/webp"
              />
              <img
                src={CONCERTS_STAGE_IMAGE}
                alt="Scène des concerts intimes Chez Bozo à la Maison des Bozos - Photo : Béatrice Flynn"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover"
              />
            </picture>
          </div>
        </div>
        {/* Card — overlays the photo on desktop, stacked below it on mobile */}
        <div className="mt-8 md:mt-0 md:absolute md:inset-y-0 md:left-12 md:flex md:items-center md:z-10">
          <SectionCard
            title={t('home.concerts.title') as string}
            titleMobileLines={[
              t('home.concerts.titleLine1') as string,
              t('home.concerts.titleLine2') as string,
            ]}
            descriptions={[t('home.concerts.description')]}
            buttonText={t('home.concerts.button') as string}
            buttonDataGroup="15928"
            analyticsLabel="opening week"
            position="left"
            variant="feature"
          />
        </div>
      </div>
    </section>
  )
}

export default React.memo(ConcertsSection)
