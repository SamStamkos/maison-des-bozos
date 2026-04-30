import React, { useEffect, useRef, useState } from "react";
import { useLanguage } from "../hooks/useLanguage";
import Typewriter from "./Typewriter";

const KIT_FORM_ID = "9385411";
const KIT_ENDPOINT = `https://app.kit.com/forms/${KIT_FORM_ID}/subscriptions`;

type Status = "idle" | "submitting" | "success" | "error";

const NewsletterSection: React.FC = () => {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const [isInView, setIsInView] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [email, setEmail] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  useEffect(() => {
    const element = sectionRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0 }
    );

    requestAnimationFrame(() => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isInView) return;
    const timer = setTimeout(() => setShowContent(true), 1200);
    return () => clearTimeout(timer);
  }, [isInView]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === "submitting" || status === "success") return;
    if (honeypot) return; // bot trap

    setStatus("submitting");

    try {
      const body = new URLSearchParams({ email_address: email });
      const res = await fetch(KIT_ENDPOINT, {
        method: "POST",
        body,
      });
      if (!res.ok) throw new Error(`Kit responded ${res.status}`);
      setStatus("success");
      setEmail("");
    } catch {
      setStatus("error");
    }
  };

  return (
    <section
      id="newsletter"
      ref={sectionRef}
      className="max-w-screen-2xl px-4 md:px-12 mx-auto relative mt-20"
      aria-labelledby="newsletter-title"
    >
      <div className="w-full flex flex-col items-start gap-4">
        <Typewriter
          text={t("home.newsletter.title") as string}
          as="h2"
          className="text-lg font-medium uppercase tracking-wide lg:whitespace-nowrap"
          speed={50}
          delay={200}
          enabled={isInView}
        />
        <p
          className={`text-sm w-full md:w-4/5 leading-relaxed transition-all duration-1000 ease-out-quad ${
            showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          {t("home.newsletter.description")}
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className={`flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mt-8 max-w-xl transition-all duration-700 ease-out-quad ${
          showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
        style={{ transitionDelay: "300ms" }}
        noValidate={false}
      >
        {/* Honeypot — hidden from humans, bots will fill it */}
        <input
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
          className="absolute left-[-9999px] w-px h-px"
          aria-hidden="true"
        />

        <label htmlFor="newsletter-email" className="sr-only">
          {t("home.newsletter.placeholder")}
        </label>
        <input
          id="newsletter-email"
          type="email"
          name="email_address"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={t("home.newsletter.placeholder") as string}
          disabled={status === "submitting" || status === "success"}
          className="flex-1 px-4 py-2 rounded-xs border border-primary/70 bg-white text-primary placeholder-primary/50 focus:outline-none focus:border-primary transition-colors duration-200 disabled:opacity-60"
        />
        <button
          type="submit"
          disabled={status === "submitting" || status === "success"}
          className="py-2 px-4 rounded-xs text-primary cursor-pointer border border-primary/70 hover:bg-primary hover:text-white hover:border-primary transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-primary"
        >
          {status === "submitting"
            ? t("home.newsletter.submitting")
            : t("home.newsletter.button")}
        </button>
      </form>

      <p
        role="status"
        aria-live="polite"
        className={`text-sm mt-3 min-h-[1.25rem] ${
          status === "success" ? "text-primary" : "text-red-700"
        }`}
      >
        {status === "success" && t("home.newsletter.success")}
        {status === "error" && t("home.newsletter.error")}
      </p>
    </section>
  );
};

export default NewsletterSection;
