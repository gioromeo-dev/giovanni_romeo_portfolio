import { SKILL_CATS } from "../data.js";
import "./Skills.css";

export default function Skills({ t }) {
  return (
    <section id="skills" className="section shell reveal">
      <div className="section-head">
        <div className="ix">{t("skills.ix")}</div>
        <h2>{t("skills.head")}</h2>
      </div>
      <div className="skill-cats">
        {SKILL_CATS.map((c) => (
          <div className="skill-cat" key={c.key}>
            <div className="skill-cat-info">
              <h3>{t(`skills.${c.key}`)}</h3>
              <div className="cat-meta">{t(`skills.${c.key}.meta`)}</div>
            </div>
            <div className="skill-tags">
              {c.tags.map((tag) => <span className="skill-tag" key={tag}>{tag}</span>)}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
