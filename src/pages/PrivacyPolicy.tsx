import { useEffect } from "react";
import { useLanguage } from "../hooks/useLanguage";

const PrivacyPolicy = () => {
  const { t, language } = useLanguage();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="min-h-screen bg-secondary pt-20">
      <div className="max-w-screen-2xl px-4 md:px-12">
        <h1 className="text-3xl md:text-4xl font-medium text-primary mb-8">
          {t("privacy.title")}
        </h1>

        <div className="space-y-8 text-primary/90 text-sm leading-relaxed">
          {/* Last updated */}
          <p className="text-primary/60 text-xs">
            {t("privacy.lastUpdated")}: {language === "fr" ? "16 décembre 2025" : "December 16, 2025"}
          </p>

          {/* Introduction */}
          <section>
            <h2 className="text-lg font-medium text-primary mb-3">
              {t("privacy.intro.title")}
            </h2>
            <p>{t("privacy.intro.text")}</p>
          </section>

          {/* Data Collection */}
          <section>
            <h2 className="text-lg font-medium text-primary mb-3">
              {t("privacy.collection.title")}
            </h2>
            <p>{t("privacy.collection.text")}</p>
          </section>

          {/* Analytics */}
          <section>
            <h2 className="text-lg font-medium text-primary mb-3">
              {t("privacy.analytics.title")}
            </h2>
            <p className="mb-3">{t("privacy.analytics.text")}</p>
            <ul className="list-disc list-inside space-y-1 text-primary/80">
              <li>{t("privacy.analytics.item1")}</li>
              <li>{t("privacy.analytics.item2")}</li>
              <li>{t("privacy.analytics.item3")}</li>
              <li>{t("privacy.analytics.item4")}</li>
            </ul>
          </section>

          {/* Third Party */}
          <section>
            <h2 className="text-lg font-medium text-primary mb-3">
              {t("privacy.thirdParty.title")}
            </h2>
            <p>{t("privacy.thirdParty.text")}</p>
          </section>

          {/* Your Rights */}
          <section>
            <h2 className="text-lg font-medium text-primary mb-3">
              {t("privacy.rights.title")}
            </h2>
            <p>{t("privacy.rights.text")}</p>
          </section>

          {/* Contact */}
          <section>
            <h2 className="text-lg font-medium text-primary mb-3">
              {t("privacy.contact.title")}
            </h2>
            <p>
              {t("privacy.contact.text")}{" "}
              <a
                href="mailto:info@maisondesbozos.com"
                className="underline hover:text-primary"
              >
                info@maisondesbozos.com
              </a>
            </p>
          </section>
        </div>
      </div>
    </main>
  );
};

export default PrivacyPolicy;

