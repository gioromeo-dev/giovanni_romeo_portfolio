import { motion } from "motion/react";
import { fadeUp, stagger } from "../animations.js";
import { T } from "./T.jsx";
import { EXP_ITEMS } from "../data.js";
import "./Experience.css";

const listStagger = stagger(0.12, 0.05);

export default function Experience({ t }) {
  return (
    <section id="experience" className="section shell reveal">
      <div className="section-head">
        <div className="ix"><T delay={0}>{t("exp.ix")}</T></div>
        <h2><T block delay={0.05}>{t("exp.head")}</T></h2>
      </div>

      <motion.div
        className="tl-list"
        variants={listStagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.1 }}
      >
        {EXP_ITEMS.map((company) => (
          <motion.div className="tl-company" key={company.key} variants={fadeUp}>

            <div className="tl-main-spine">
              <div className={t(`tl-dot tl-dot-${company.key}`)}/>
            </div>
            <div className="tl-co-head">
              {company.logo ? (
                <img className="tl-logo" src={company.logo} alt={t(`exp.${company.key}.title`)} />
              ) : (
                <div className="tl-logo-fb" aria-hidden="true">
                  {t(`exp.${company.key}.title`).charAt(0)}
                </div>
              )}
              <h3><T>{t(`exp.${company.key}.title`)}</T></h3>
            </div>

            {company.positions.map((pos) => [
              <div key={`${pos.posKey}-s`} className="tl-pos-spine">
                <span className="tl-when"><T>{t(`exp.${pos.posKey}.when`)}</T></span>
              </div>,
              <div key={`${pos.posKey}-b`} className="tl-rbody">
                <div className="role"><T>{t(`exp.${pos.posKey}.role`)}</T></div>
                <span className="tl-loc"><T>{t(`exp.${pos.posKey}.loc`)}</T></span>
                <p><T block>{t(`exp.${pos.posKey}.desc`)}</T></p>
                <div className="tl-tags">
                  {pos.tags.map((tag) => <span key={tag}>{tag}</span>)}
                </div>
              </div>,
            ])}

          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
