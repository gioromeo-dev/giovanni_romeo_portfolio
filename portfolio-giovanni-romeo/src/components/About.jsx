import "./About.css";

export default function About({ t }) {
  return (
    <section id="about" className="section shell reveal">
      <div className="section-head">
        <div className="ix">{t("about.ix")}</div>
        <h2>{t("about.head")}</h2>
      </div>
      <div className="about-bento">
        <div className="ab-bio">
          <p>{t("about.p1")}</p>
          <p>{t("about.p2")}</p>
          <p>{t("about.p3")}</p>
        </div>
        <div className="ab-photo">
          <img src="/images/profile_portfolio.jpeg" alt="Giovanni Romeo" />
        </div>
        <div className="ab-stat">
          <span className="num">8+</span>
          <span className="label">{t("about.fact1")}</span>
        </div>
        <div className="ab-stat">
          <span className="num">40+</span>
          <span className="label">{t("about.fact2")}</span>
        </div>
        <div className="ab-stat">
          <span className="num">2.4k</span>
          <span className="label">{t("about.fact3")}</span>
        </div>
      </div>
    </section>
  );
}
