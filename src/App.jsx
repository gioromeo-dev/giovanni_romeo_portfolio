import { useMemo, useState, useEffect } from "react";
import { useI18n, useTheme, useScrollSpy, useReveal } from "./hooks.js";
import { LangContext } from "./LangContext.js";
import config from "./assets/config.json";

const { sections, languages, features, splash: splashCfg, sectionAccents } = config;

import Navbar from "./components/Navbar.jsx";
import Splash from "./components/Splash.jsx";
import Hero from "./components/Hero.jsx";
import About from "./components/About.jsx";
import Skills from "./components/Skills.jsx";
import Experience from "./components/Experience.jsx";
import Projects from "./components/Projects.jsx";
import Contact from "./components/Contact.jsx";
import Footer from "./components/Footer.jsx";
import Marquee from "./components/Marquee.jsx";

const ALL_SECTION_IDS = ["work", "about", "skills", "experience", "projects", "contact"];
const SECTION_KEY_MAP = { work: "hero", about: "about", skills: "skills", experience: "experience", projects: "projects", contact: "contact" };

function shouldShowSplash() {
  if (!splashCfg.enabled) return false;
  if (splashCfg.showOn === "always") return true;
  if (splashCfg.showOn === "once")    return localStorage.getItem("splashSeen") !== "1";
  // "session" (default)
  return sessionStorage.getItem("splashSeen") !== "1";
}

function markSplashSeen() {
  if (splashCfg.showOn === "once")    localStorage.setItem("splashSeen", "1");
  if (splashCfg.showOn === "session") sessionStorage.setItem("splashSeen", "1");
  // "always" — never mark as seen
}

export default function App() {
  const { lang, setLang, t } = useI18n();
  const { theme, setTheme } = useTheme();
  const ids = useMemo(
    () => ALL_SECTION_IDS.filter((id) => sections[SECTION_KEY_MAP[id]]),
    []
  );
  const active = useScrollSpy(ids);
  useReveal();

  const [showSplash] = useState(shouldShowSplash);
  const [revealed, setRevealed] = useState(!showSplash);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const cfg = sectionAccents?.[active];
    if (!cfg) return;
    const root = document.documentElement;
    root.style.setProperty("--accent",       cfg.accent);
    root.style.setProperty("--accent-hover", cfg.accentHover);
    root.style.setProperty("--accent-ink",   cfg.accentInk);
  }, [active]);

  return (
    <LangContext.Provider value={lang}>
      <div className="grain" aria-hidden="true" />
      {showSplash && (
        <Splash
          video={splashCfg.video}
          fallbackMs={splashCfg.fallbackMs}
          fadeDurationMs={splashCfg.fadeDurationMs}
          onDone={() => {
            markSplashSeen();
            setRevealed(true);
          }}
        />
      )}
      <Navbar
        t={t}
        lang={lang}
        setLang={setLang}
        theme={theme}
        setTheme={setTheme}
        active={active}
        revealed={revealed}
        languages={languages}
      />
      <main id="page-content">
        {sections.hero        && <Hero t={t} revealed={revealed} showAvailability={features.availabilityBadge} />}
        {sections.marquee_after_hero && <Marquee />}
        {sections.about       && <About t={t} />}
        {sections.skills      && <Skills t={t} />}
        {sections.experience  && <Experience t={t} />}
        {sections.projects    && <Projects t={t} />}
        {sections.marquee_after_projects && <Marquee />}
        {sections.contact     && <Contact t={t} showForm={features.contactForm} />}
      </main>
    </LangContext.Provider>
  );
}
