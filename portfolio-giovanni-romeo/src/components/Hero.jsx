import { useEffect, useRef } from "react";
import { motion } from "motion/react";
import { fadeUp, scaleIn, stagger } from "../animations.js";
import { T } from "./T.jsx";
import "./Hero.css";

const heroStagger = stagger(0.09, 0.15);
const portrait = {
  hidden: { opacity: 0, scale: 0.9 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1], delay: 0.2 } },
};

export default function Hero({ t, revealed }) {
  const sectionRef = useRef(null);
  const videoRef = useRef(null);
  const animatedRef = useRef(false); // true after portrait entrance completes

  useEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;
    if (!section || !video) return;
    // On scroll-back: restart only after the entrance animation has already run
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && animatedRef.current) {
          video.currentTime = 0;
          video.play();
        }
      },
      { threshold: 0.1 }
    );
    io.observe(section);
    return () => io.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="work" className={`hero${revealed ? " hero--in" : ""}`}>
      <div className="shell"><div className="hero-grid">
        <motion.div
          className="hero-content"
          variants={heroStagger}
          initial="hidden"
          animate={revealed ? "show" : "hidden"}
        >
          <motion.div className="hero-eyebrow" variants={fadeUp}>
            <T>{t("hero.eyebrow")}</T>
          </motion.div>
          <motion.h1 variants={fadeUp}>
            <T block>{t("hero.name1")}</T>
            <span className="accent"><T>{t("hero.italic")}</T></span>{" "}
            <T>{t("hero.name2")}</T>
          </motion.h1>
          <motion.div className="hero-role" variants={fadeUp}>
            <T>{t("hero.role")}</T>
          </motion.div>
          <motion.p className="hero-sub" variants={fadeUp}>
            <T block>{t("hero.sub")}</T>
          </motion.p>
          <motion.div className="hero-cta-row" variants={fadeUp}>
            <a href="#about" className="btn primary">
              <T>{t("hero.cta1")}</T> <span className="arrow">→</span>
            </a>
            <a href="#contact" className="btn ghost">
              <T>{t("hero.cta2")}</T> <span className="arrow">↗</span>
            </a>
          </motion.div>
          <motion.div className="hero-meta" variants={fadeUp}>
            <div className="status-pill">
              <span className="status-dot" />
              <T>{t("hero.status")}</T>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          className="hero-portrait"
          variants={portrait}
          initial="hidden"
          animate={revealed ? "show" : "hidden"}
          onAnimationComplete={(def) => {
            if (def === "show") {
              animatedRef.current = true;
              videoRef.current?.play();
            }
          }}
        >
          <video
            ref={videoRef}
            className="hero-memoji"
            src="/videos/memoji.mp4"
            muted
            playsInline
            preload="auto"
          />
        </motion.div>
      </div></div>
    </section>
  );
}
