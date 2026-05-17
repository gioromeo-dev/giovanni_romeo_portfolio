import { useRef, useState, useEffect, useCallback } from "react";
import { motion } from "motion/react";
import { fadeUp, stagger, viewport } from "../animations.js";
import { T } from "./T.jsx";
import { PROJECTS } from "../data.js";
import "./Projects.css";

const headStagger = stagger(0.08, 0.05);

export default function Projects({ t }) {
  const sectionRef = useRef(null);
  const stripRef = useRef(null);
  const trackRef = useRef(null);
  const activeIdxRef = useRef(0);
  const paddingLeftRef = useRef(56);
  const [activeIdx, setActiveIdx] = useState(0);
  const [playing, setPlaying] = useState(false);

  const updateLayout = useCallback(() => {
    const section = sectionRef.current;
    const strip = stripRef.current;
    const track = trackRef.current;
    if (!section || !strip || !track) return;

    const sectionRect = section.getBoundingClientRect();
    const sectionPaddingLeft = parseFloat(getComputedStyle(section).paddingLeft);
    // anchor = distance from viewport left to section content left edge
    const anchor = sectionRect.left + sectionPaddingLeft;

    const firstCard = track.querySelector(".proj-card");
    const cardWidth = firstCard ? firstCard.offsetWidth : 360;
    // paddingRight: last card stops when its left edge reaches anchor
    const paddingRight = Math.max(16, window.innerWidth - anchor - cardWidth);

    paddingLeftRef.current = anchor;

    strip.style.marginLeft = `${-(sectionPaddingLeft + sectionRect.left)}px`;
    strip.style.width = "100vw";
    track.style.paddingLeft = `${anchor}px`;
    track.style.paddingRight = `${paddingRight}px`;
    track.style.scrollPaddingLeft = `${anchor}px`;
  }, []);

  useEffect(() => {
    updateLayout();
    window.addEventListener("resize", updateLayout);
    return () => window.removeEventListener("resize", updateLayout);
  }, [updateLayout]);

  const scrollToIdx = useCallback((idx) => {
    const el = trackRef.current;
    if (!el) return;
    const cards = el.querySelectorAll(".proj-card");
    if (!cards[idx]) return;
    el.scrollTo({ left: cards[idx].offsetLeft - paddingLeftRef.current, behavior: "smooth" });
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
        const dist = Math.abs(card.offsetLeft - paddingLeftRef.current - el.scrollLeft);
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
      <section id="projects" ref={sectionRef} className="section shell reveal">
        <motion.div
          className="section-head"
          variants={headStagger}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
        >
          <motion.div className="ix" variants={fadeUp}><T delay={0}>{t("proj.ix")}</T></motion.div>
          <motion.h2 variants={fadeUp}><T block delay={0.05}>{t("proj.head")}</T></motion.h2>
          <motion.div className="head-meta" variants={fadeUp}><T block delay={0.1}>{t("proj.head.meta")}</T></motion.div>
        </motion.div>
        <div className="proj-strip" ref={stripRef}>
          <div className="proj-track" ref={trackRef}>
            {PROJECTS.map((p, i) => (
              <a className="proj-card" key={p.key} href="#" onClick={(e) => e.preventDefault()}>
                <div className={`proj-cover ${p.cover}`}>
                  <span className="ph-num">{`0${i + 1}`}</span>
                </div>
                <div className="proj-body">
                  <span className="pill"><T>{t(`proj.${p.key}.tag`)}</T></span>
                  <h3><T>{t(`proj.${p.key}.title`)}</T></h3>
                  <p className="desc"><T block>{t(`proj.${p.key}.desc`)}</T></p>
                  <span className="explore"><T>{t("proj.viewcase")}</T> →</span>
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
