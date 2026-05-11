import { EXP_ITEMS } from "../data.js";
import "./Experience.css";

export default function Experience({ t }) {
  return (
    <section id="experience" className="section shell reveal">
      <div className="section-head">
        <div className="ix">{t("exp.ix")}</div>
        <h2>{t("exp.head")}</h2>
      </div>
      <div className="tl-list">
        {EXP_ITEMS.map((it) => (
          <div className="tl-item" key={it.key}>
            <div className="tl-when">{t(`exp.${it.key}.when`)}</div>
            <div className="tl-body">
              <h3>{t(`exp.${it.key}.title`)}</h3>
              <div className="role">{t(`exp.${it.key}.role`)}</div>
              <p>{t(`exp.${it.key}.desc`)}</p>
              <div className="tl-tags">
                {it.tags.map((tag) => <span key={tag}>{tag}</span>)}
              </div>
            </div>
            <div className="tl-loc">{t(`exp.${it.key}.loc`)}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
