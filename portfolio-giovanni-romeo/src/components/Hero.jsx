export default function Hero({ t }) {
  return (
    <section id="work" className="hero shell reveal">
      <div className="hero-grid">
        <div className="hero-portrait">
          <video
            className="hero-memoji"
            src="/public/videos/memoji.mp4"
            muted
            playsInline
            preload="auto"
            autoPlay
          />
        </div>
        <div className="hero-content">
          <div className="hero-eyebrow mono upper">{t("hero.eyebrow")}</div>
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
        </div>
      </div>
    </section>
  );
}
