import { useRef } from "react";

const PROJS = [
  { key: "p1", cover: "" },
  { key: "p2", cover: "alt" },
  { key: "p3", cover: "alt2" },
  { key: "p4", cover: "alt3" },
];

export default function Projects({ t }) {
  const trackRef = useRef(null);
  const scrollBy = (dir) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector(".proj-card");
    const step = card ? card.getBoundingClientRect().width + 20 : 400;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };
  return (
    <section id="projects" className="section shell reveal">
      <div className="section-head">
        <div className="ix">{t("proj.ix")}</div>
        <h2>{t("proj.head")}</h2>
        <div className="head-meta">{t("proj.head.meta")}</div>
      </div>
      <div className="proj-carousel">
        <div className="proj-controls">
          <button className="proj-ctrl" onClick={() => scrollBy(-1)} aria-label="Previous">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 6l-6 6 6 6" /></svg>
          </button>
          <button className="proj-ctrl" onClick={() => scrollBy(1)} aria-label="Next">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 6l6 6-6 6" /></svg>
          </button>
        </div>
        <div className="proj-track" ref={trackRef}>
          {PROJS.map((p, i) => (
            <a className="proj-card" key={p.key} href="#" onClick={(e) => e.preventDefault()}>
              <div className={`proj-cover ${p.cover}`}>
                <span className="ph-num">{`0${i + 1}`}</span>
              </div>
              <div className="proj-body">
                <span className="pill">{t(`proj.${p.key}.tag`)}</span>
                <h3>{t(`proj.${p.key}.title`)}</h3>
                <p className="desc">{t(`proj.${p.key}.desc`)}</p>
                <span className="explore">{t("proj.viewcase")} →</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
