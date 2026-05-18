import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import "./Navbar.css";
import { IconSun, IconMoon, LogoMark } from "./Icons.jsx";
import { T } from "./T.jsx";

const MENU_SPRING = { type: "spring", stiffness: 420, damping: 34, mass: 0.75 };
const ITEM_SPRING = { type: "spring", stiffness: 360, damping: 30 };
const PATH_EASE   = { duration: 0.28, ease: [0.16, 1, 0.3, 1] };

const TOTAL_ITEMS = 6; // links count — used for reverse-stagger exit delay

// Enter delay: item enters left-to-right with increasing delay
const enterDelay = (i) => i * 0.045 + 0.05;
// Exit delay: item exits right-to-left (last item exits first → i=last → delay 0)
const exitDelay  = (i, n) => (n - 1 - i) * 0.03;

export default function Navbar({ t, lang, setLang, theme, setTheme, active, revealed, languages }) {
  const enabledLangs = Object.entries(languages ?? { en: true }).filter(([, on]) => on).map(([c]) => c);
  const multiLang = enabledLangs.length > 1;
  const [open, setOpen] = useState(false);

  const links = [
    { id: "work",       label: t("nav.work") },
    { id: "about",      label: t("nav.about") },
    { id: "skills",     label: t("nav.skills") },
    { id: "experience", label: t("nav.experience") },
    { id: "projects",   label: t("nav.projects") },
    { id: "contact",    label: t("nav.contact") },
  ];
  const n = links.length + (multiLang ? 1 : 0);
  const close = () => setOpen(false);

  return (
    <nav className={`nav${revealed ? " nav--in" : ""}`}>
      <div className="shell nav-inner">
        <a href="#work" className="nav-logo" onClick={close} aria-label="Home">
          <img className="nav-logo-image" src="/images/site/GR.png" alt="" />
        </a>

        <div className="nav-links">
          {links.map((l) => (
            <a key={l.id} href={`#${l.id}`} className={active === l.id ? "active" : ""}>
              <T>{l.label}</T>
            </a>
          ))}
        </div>

        <div className="nav-tools">
          {multiLang && (
            <button
              className="tool-btn"
              onClick={() => {
                const next = enabledLangs[(enabledLangs.indexOf(lang) + 1) % enabledLangs.length];
                setLang(next);
              }}
              aria-label="Switch language"
              title="Switch language"
            >
              <img className={"seg " + (lang === "en" ? "on" : "")} src="/images/site/uk_flag.svg" alt="" />
              <img className={"seg " + (lang === "it" ? "on" : "")} src="/images/site/italy_flag.svg" alt="" />
            </button>
          )}

          {/* Burger → X with path morphing */}
          <button className="nav-burger" onClick={() => setOpen((o) => !o)} aria-label="Menu">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
              <motion.path
                animate={{ d: open ? "M6 6 L18 18" : "M3 7 L21 7" }}
                transition={PATH_EASE}
              />
              <motion.path
                animate={{ d: open ? "M18 6 L6 18" : "M3 17 L21 17" }}
                transition={PATH_EASE}
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Menu with enter + exit animations that replay on every open/close */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="shell"
            style={{ transformOrigin: "top center" }}
            initial={{ opacity: 0, y: -14, scale: 0.95 }}
            animate={{ opacity: 1, y: 0,   scale: 1    }}
            exit={{    opacity: 0, y: -10,  scale: 0.96,
              transition: { ...MENU_SPRING, delay: n * 0.03 } }}
            transition={MENU_SPRING}
          >
            <div className="mobile-menu">
              {links.map((l, i) => (
                <motion.a
                  key={l.id}
                  href={`#${l.id}`}
                  className={active === l.id ? "active" : ""}
                  onClick={close}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{
                    opacity: 1, x: 0,
                    transition: { ...ITEM_SPRING, delay: enterDelay(i) },
                  }}
                  exit={{
                    opacity: 0, x: -16,
                    transition: { duration: 0.18, ease: "easeIn", delay: exitDelay(i, n) },
                  }}
                >
                  <span className="mn-idx">{String(i + 1).padStart(2, "0")}</span>
                  <span className="mn-lbl"><T>{l.label}</T></span>
                  <span className="mn-arr">→</span>
                </motion.a>
              ))}

              {multiLang && (
                <motion.button
                  className="mobile-menu-lang"
                  onClick={() => {
                    const next = enabledLangs[(enabledLangs.indexOf(lang) + 1) % enabledLangs.length];
                    setLang(next);
                    close();
                  }}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{
                    opacity: 1, x: 0,
                    transition: { ...ITEM_SPRING, delay: enterDelay(links.length) },
                  }}
                  exit={{
                    opacity: 0, x: -16,
                    transition: { duration: 0.18, ease: "easeIn", delay: exitDelay(0, n) },
                  }}
                >
                  <span className="mn-flag">
                    <img src={`/images/site/${lang === "en" ? "uk_flag" : "italy_flag"}.svg`} alt="" />
                  </span>
                  <T>{lang === "en" ? "English" : "Italiano"}</T>
                </motion.button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
