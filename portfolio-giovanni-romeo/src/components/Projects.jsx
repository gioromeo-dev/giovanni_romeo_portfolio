import { useRef, useState, useEffect, useCallback } from "react";
import { PROJECTS } from "../data.js";
import "./Projects.css";

export default function Projects({ t }) {
  const trackRef = useRef(null);
  const activeIdxRef = useRef(0);
  const [activeIdx, setActiveIdx] = useState(0);
  const [playing, setPlaying] = useState(false);

  const scrollToIdx = useCallback((idx) => {
    const el = trackRef.current;
    if (!el) return;
    const cards = el.querySelectorAll(".proj-card");
    if (!cards[idx]) return;
    el.scrollTo({ left: cards[idx].offsetLeft, behavior: "smooth" });
    activeIdxRef.current = idx;
    setActiveIdx(idx);
  }, []);

  const advance = useCallback(() => {
    const next = (activeIdxRef.current + 1) % PROJECTS.length;
    scrollToIdx(next);
  }, [scrollToIdx]);

  useEffect(() => {
    if (!playing) return;
    const id = setInterval(advance, 3200);
    return () => clearInterval(id);
  }, [playing, advance]);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const onScroll = () => {
      const cards = el.querySelectorAll(".proj-card");
      let best = 0, bestDist = Infinity;
      cards.forEach((card, i) => {
        const dist = Math.abs(card.offsetLeft - el.scrollLeft);
        if (dist < bestDist) { bestDist = dist; best = i; }
      });
      setActiveIdx(best);
      activeIdxRef.current = best;
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <section id="projects" className="section shell reveal">
        <div className="section-head">
          <div className="ix">{t("proj.ix")}</div>
          <h2>{t("proj.head")}</h2>
          <div className="head-meta">{t("proj.head.meta")}</div>
        </div>
        <div className="proj-strip">
          <div className="proj-track" ref={trackRef}>
            {PROJECTS.map((p, i) => (
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
      <div className="proj-selector-bar">
        <div className="proj-dots-pill">
          {PROJECTS.map((_, i) => (
            <button
              key={i}
              className={`proj-dot${activeIdx === i ? " active" : ""}`}
              onClick={() => scrollToIdx(i)}
              aria-label={`Project ${i + 1}`}
            />
          ))}
        </div>
        <button
          className="proj-play-btn"
          onClick={() => setPlaying((p) => !p)}
          aria-label={playing ? "Pause" : "Play"}
        >
          {playing ? (
            <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
              <rect x="5" y="3" width="5" height="18" rx="1.5" />
              <rect x="14" y="3" width="5" height="18" rx="1.5" />
            </svg>
          ) : (
            <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
              <path d="M6 3.5l14 8.5-14 8.5V3.5z" />
            </svg>
          )}
        </button>
      </div>
    </>
  );
}
