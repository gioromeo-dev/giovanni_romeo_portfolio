import { useEffect, useState } from "react";
import { I18N } from "./i18n.js";

export function useI18n() {
  const [lang, setLangState] = useState(() => localStorage.getItem("portfolio.lang") || "en");
  useEffect(() => {
    localStorage.setItem("portfolio.lang", lang);
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = (next) => setLangState(next);

  const t = (k) => (I18N[lang]?.[k]) ?? k;
  return { lang, setLang, t };
}

export function useTheme() {
  const [theme, setTheme] = useState(() => localStorage.getItem("portfolio.theme") || "dark");
  useEffect(() => {
    localStorage.setItem("portfolio.theme", theme);
    document.documentElement.dataset.theme = theme;
  }, [theme]);
  return { theme, setTheme };
}

export function useScrollSpy(ids) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: 0 }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, [ids]);
  return active;
}

export function useReveal() {
  useEffect(() => {
    document.documentElement.classList.add("js-ready");
    const els = document.querySelectorAll(".reveal");
    const vh = window.innerHeight;
    els.forEach((el) => {
      if (el.getBoundingClientRect().top < vh * 0.9) el.classList.add("in");
    });
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { rootMargin: "-10% 0px" }
    );
    els.forEach((e) => {
      if (!e.classList.contains("in")) io.observe(e);
    });
    return () => io.disconnect();
  }, []);
}
