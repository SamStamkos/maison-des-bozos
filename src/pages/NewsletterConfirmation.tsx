import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../hooks/useLanguage";

const NewsletterConfirmation = () => {
  const { t } = useLanguage();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="min-h-screen bg-secondary pt-20 flex items-start md:items-center">
      <div className="max-w-screen-2xl mx-auto px-4 md:px-12 py-12 md:py-20">
        <div className="max-w-2xl">
          <h1 className="text-3xl md:text-5xl font-medium text-primary mb-6">
            {t("newsletterConfirmation.title")}
          </h1>

          <p className="text-lg md:text-xl text-primary/90 leading-relaxed mb-4">
            {t("newsletterConfirmation.description")}
          </p>

          <p className="text-base text-primary/80 leading-relaxed mb-10">
            {t("newsletterConfirmation.followUp")}
          </p>

          <Link
            to="/"
            className="inline-block py-3 px-6 rounded-xs text-primary border border-primary/70 hover:bg-primary hover:text-white hover:border-primary transition-colors duration-200"
          >
            {t("newsletterConfirmation.backHome")}
          </Link>
        </div>
      </div>
    </main>
  );
};

export default NewsletterConfirmation;
