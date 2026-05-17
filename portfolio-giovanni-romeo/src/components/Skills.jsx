import { motion } from "motion/react";
import { fadeUp, tagPop, stagger } from "../animations.js";
import { T } from "./T.jsx";
import { SKILL_CATS } from "../data.js";
import "./Skills.css";

const catsStagger = stagger(0.1, 0.05);
const tagsStagger = stagger(0.04, 0);

export default function Skills({ t }) {
  return (
    <section id="skills" className="section shell reveal">
      <div className="section-head">
        <div className="ix"><T delay={0}>{t("skills.ix")}</T></div>
        <h2><T block delay={0.05}>{t("skills.head")}</T></h2>
      </div>
      <motion.div
        className="skill-cats"
        variants={catsStagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.15 }}
      >
        {SKILL_CATS.map((c) => (
          <motion.div className="skill-cat" key={c.key} variants={fadeUp}>
            <div className="skill-cat-info">
              <h3><T>{t(`skills.${c.key}`)}</T></h3>
              <div className="cat-meta"><T>{t(`skills.${c.key}.meta`)}</T></div>
            </div>
            <motion.div
              className="skill-tags"
              variants={tagsStagger}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
            >
              {c.tags.map((tag) => (
                <motion.span className="skill-tag" key={tag} variants={tagPop}>{tag}</motion.span>
              ))}
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
