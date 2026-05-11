import { useState } from "react";
import "./Navbar.css";
import { IconSun, IconMoon, LogoMark } from "./Icons.jsx";

export default function Navbar({ t, lang, setLang, theme, setTheme, active, revealed }) {
  const [open, setOpen] = useState(false);
  const links = [
    { id: "work", label: t("nav.work") },
    { id: "about", label: t("nav.about") },
    { id: "skills", label: t("nav.skills") },
    { id: "experience", label: t("nav.experience") },
    { id: "projects", label: t("nav.projects") },
    { id: "contact", label: t("nav.contact") },
  ];
  const close = () => setOpen(false);
  return (
    <nav className={`nav${revealed ? " nav--in" : ""}`}>
      <div className="shell nav-inner">
        <a href="#work" className="nav-logo" onClick={close} aria-label="Home">
          <img className="nav-logo-image" src="/images/GR.png" alt="" />
        </a>
        <div className="nav-links">
          {links.map((l) => (
            <a key={l.id} href={`#${l.id}`} className={active === l.id ? "active" : ""}>{l.label}</a>
          ))}
        </div>
        <div className="nav-tools">
          <button
            className="tool-btn"
            onClick={() => setLang(lang === "en" ? "it" : "en")}
            aria-label="Switch language"
            title="Switch language"
          >
            <img className={"seg " + (lang === "en" ? "on" : "")} src="/images/uk_flag.svg" alt="" />
            <img className={"seg " + (lang === "it" ? "on" : "")} src="/images/italy_flag.svg" alt="" />
            {/* <span className={"seg " + (lang === "en" ? "on" : "")}>EN</span>
            <span className={"seg " + (lang === "it" ? "on" : "")}>IT</span> */}
          </button>
          {/* <button
            className="tool-btn accent"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            aria-label="Toggle theme"
            title="Toggle theme"
          >
            {theme === "dark" ? <IconSun /> : <IconMoon />}
          </button> */}
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
            <a key={l.id} href={`#${l.id}`} className={active === l.id ? "active" : ""} onClick={close}>{l.label}</a>
          ))}
        </div></div>
      )}
    </nav>
  );
}
