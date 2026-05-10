import { useCallback, useEffect, useState } from "react";
import { I18N } from "./i18n.js";

export function useI18n() {
  const [lang, setLang] = useState(() => localStorage.getItem("portfolio.lang") || "en");
  useEffect(() => {
    localStorage.setItem("portfolio.lang", lang);
    document.documentElement.lang = lang;
  }, [lang]);
  const t = useCallback((k) => (I18N[lang] && I18N[lang][k]) || k, [lang]);
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
    const onScroll = () => {
      const y = window.scrollY + 120;
      let cur = ids[0];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= y) cur = id;
      }
      setActive(cur);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [ids]);
  return active;
}

export function useReveal() {
  useEffect(() => {
    document.documentElement.classList.add("js-ready");
    const els = document.querySelectorAll(".reveal");
    const vh = window.innerHeight;
    els.forEach((el) => {
      const r = el.getBoundingClientRect();
      if (r.top < vh * 0.9) el.classList.add("in");
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
