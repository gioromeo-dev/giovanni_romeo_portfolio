import { motion } from "motion/react";
import { fadeUp, scaleIn, stagger, viewport } from "../animations.js";
import { T } from "./T.jsx";
import "./About.css";

const bentoStagger = stagger(0.07, 0.1);

export default function About({ t }) {
  return (
    <section id="about" className="section shell reveal">
      <div className="section-head">
        <div className="ix"><T delay={0}>{t("about.ix")}</T></div>
        <h2><T block delay={0.05}>{t("about.head")}</T></h2>
      </div>
      <motion.div
        className="about-bento"
        variants={bentoStagger}
        initial="hidden"
        whileInView="show"
        viewport={viewport}
      >
        <motion.div className="ab-bio" variants={fadeUp}>
          <p><T block>{t("about.p1")}</T></p>
          <p><T block>{t("about.p2")}</T></p>
          <p><T block>{t("about.p3")}</T></p>
        </motion.div>
        <motion.div className="ab-photo" variants={scaleIn}>
          <img src="/images/profile_portfolio.jpeg" alt="Giovanni Romeo" />
        </motion.div>
        <motion.div className="ab-stat n1" variants={fadeUp}>
          <span className="num"><T>{t("about.numfact1")}</T></span>
          <span className="label"><T>{t("about.fact1")}</T></span>
        </motion.div>
        <motion.div className="ab-stat n2" variants={fadeUp}>
          <span className="num"><T>{t("about.numfact2")}</T></span>
          <span className="label"><T>{t("about.fact2")}</T></span>
        </motion.div>
        <motion.div className="ab-stat n3" variants={fadeUp}>
          <span className="num"><T>{t("about.numfact3")}</T></span>
          <span className="label"><T>{t("about.fact3")}</T></span>
        </motion.div>
      </motion.div>
    </section>
  );
}
