import { useEffect, useRef } from "react";
import "./Hero.css";

export default function Hero({ t, revealed }) {
  const sectionRef = useRef(null);
  const videoRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;
    if (!section || !video) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
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
        <div className="hero-content">
          <div className="hero-eyebrow">{t("hero.eyebrow")}</div>
          <h1>
            {t("hero.name1")}<br />
            <span className="accent">{t("hero.italic")}</span>{" "}
            {t("hero.name2")}
          </h1>
          <div className="hero-role">{t("hero.role")}</div>
          <p className="hero-sub">{t("hero.sub")}</p>
          <div className="hero-cta-row">
            <a href="#projects" className="btn primary">
              {t("hero.cta1")} <span className="arrow">→</span>
            </a>
            <a href="#contact" className="btn ghost">
              {t("hero.cta2")} <span className="arrow">↗</span>
            </a>
          </div>
          <div className="hero-meta">
            <div className="status-pill">
              <span className="status-dot" />
              {t("hero.status")}
            </div>
          </div>
        </div>
        <div className="hero-portrait">
          <video
            ref={videoRef}
            className="hero-memoji"
            src="/videos/memoji.mp4"
            muted
            playsInline
            preload="auto"
            autoPlay
          />
        </div>
      </div></div>
    </section>
  );
}
