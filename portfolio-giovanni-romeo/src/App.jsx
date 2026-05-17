import { useMemo, useState, useEffect } from "react";
import { useI18n, useTheme, useScrollSpy, useReveal } from "./hooks.js";
import { LangContext } from "./LangContext.js";
import sections from "./assets/sections.json";

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

export default function App() {
  const { lang, setLang, t } = useI18n();
  const { theme, setTheme } = useTheme();
  const ids = useMemo(
    () => ALL_SECTION_IDS.filter((id) => sections[SECTION_KEY_MAP[id]]),
    []
  );
  const active = useScrollSpy(ids);
  useReveal();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [splashed, setSplashed] = useState(
    () =>
      typeof sessionStorage !== "undefined" &&
      sessionStorage.getItem("splashSeen") !== "1",
  );
  const [revealed, setRevealed] = useState(false);
  useEffect(() => {
    if (!splashed) sessionStorage.setItem("splashSeen", "1");
  }, [splashed]);

  return (
    <LangContext.Provider value={lang}>
      <div className="grain" aria-hidden="true" />
      <Splash
        onDone={() => {
          setSplashed(false);
          setRevealed(true);
        }}
      />
      <Navbar
        t={t}
        lang={lang}
        setLang={setLang}
        theme={theme}
        setTheme={setTheme}
        active={active}
        revealed={revealed}
      />
      <main id="page-content">
        {sections.hero        && <Hero t={t} revealed={revealed} />}
        {sections.marquee_after_hero && <Marquee />}
        {sections.about       && <About t={t} />}
        {sections.skills      && <Skills t={t} />}
        {sections.experience  && <Experience t={t} />}
        {sections.projects    && <Projects t={t} />}
        {sections.marquee_after_projects && <Marquee />}
        {sections.contact     && <Contact t={t} />}
      </main>
    </LangContext.Provider>
  );
}
