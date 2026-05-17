import { useState } from "react";
import "./Navbar.css";
import { IconSun, IconMoon, LogoMark } from "./Icons.jsx";
import { T } from "./T.jsx";

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
          <button className="nav-burger" onClick={() => setOpen((o) => !o)} aria-label="Menu">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {open ? <><path d="M6 6l12 12" /><path d="M18 6L6 18" /></> : <><path d="M3 7h18" /><path d="M3 17h18" /></>}
            </svg>
          </button>
        </div>
      </div>
      {open && (
        <div className="shell"><div className="mobile-menu">
          {links.map((l) => (
            <a key={l.id} href={`#${l.id}`} className={active === l.id ? "active" : ""} onClick={close}>
              <T>{l.label}</T>
            </a>
          ))}
        </div></div>
      )}
    </nav>
  );
}
