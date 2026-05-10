import { useMemo, useState, useEffect } from "react";
import { useI18n, useTheme, useScrollSpy, useReveal } from "./hooks.js";

import Navbar from "./components/Navbar.jsx";
import Splash from "./components/Splash.jsx";
import Hero from "./components/Hero.jsx";
import About from "./components/About.jsx";
import Skills from "./components/Skills.jsx";
import Experience from "./components/Experience.jsx";
import Projects from "./components/Projects.jsx";
import Contact from "./components/Contact.jsx";
import Footer from "./components/Footer.jsx";

const SECTION_IDS = ["work", "about", "skills", "experience", "projects", "contact"];

export default function App() {
  const { lang, setLang, t } = useI18n();
  const { theme, setTheme } = useTheme();
  const ids = useMemo(() => SECTION_IDS, []);
  const active = useScrollSpy(ids);
  useReveal();

  const [splashed, setSplashed] = useState(() =>
    typeof sessionStorage !== "undefined" && sessionStorage.getItem("splashSeen") !== "1"
  );
  useEffect(() => {
    if (!splashed) sessionStorage.setItem("splashSeen", "1");
  }, [splashed]);

  return (
    <>
    <Splash onDone={() => setSplashed(false)} />
      {/* {splashed && <Splash onDone={() => setSplashed(false)} />} */}
      <Navbar t={t} lang={lang} setLang={setLang} theme={theme} setTheme={setTheme} active={active} />
      <Hero t={t} />
      <About t={t} />
      <Skills t={t} />
      <Experience t={t} />
      <Projects t={t} />
      <Contact t={t} />
      <Footer t={t} />
    </>
  );
}
