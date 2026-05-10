export default function About({ t }) {
  return (
    <section id="about" className="section shell reveal">
      <div className="section-head">
        <div>
          <div className="ix">{t("about.ix")}</div>
        </div>
        <h2>{t("about.head")}</h2>
      </div>
      <div className="about-grid">
        <div className="mono upper" style={{ fontSize: 11, color: "var(--fg-mute)" }}>
          {t("about.title")}
        </div>
        <div className="about-body">
          <p>{t("about.p1")}</p>
          <p>{t("about.p2")}</p>
          <p>{t("about.p3")}</p>
          <div className="facts">
            <div className="fact">
              <div className="num">8+</div>
              <div className="label">{t("about.fact1")}</div>
            </div>
            <div className="fact">
              <div className="num">40+</div>
              <div className="label">{t("about.fact2")}</div>
            </div>
            <div className="fact">
              <div className="num">2.4k</div>
              <div className="label">{t("about.fact3")}</div>
            </div>
          </div>
        </div>
        <div className="about-photo">
          {/* <span className="ph-corner"></span> */}
          <img className="image" src="/public/images/profile_portfolio.jpeg" alt="" />
          {/* <span className="ph-label">{t("about.photo")}</span> */}
        </div>
      </div>
    </section>
  );
}
