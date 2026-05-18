import { useState } from "react";
import { motion } from "motion/react";
import { fadeUp, stagger, viewport } from "@/lib/animations.js";
import { T } from "./T.jsx";
import { CONTACT_LINKS } from "@/data";
import { IconMail, IconGithub, IconLinkedin, IconReadcv } from "./Icons.jsx";
import "./Contact.css";

const SOCIAL_ICONS = { mail: IconMail, github: IconGithub, linkedin: IconLinkedin, readcv: IconReadcv };
const FORM_ENDPOINT = "https://formspree.io/f/YOUR_FORM_ID";

const bodyStagger = stagger(0.09, 0.1);
const fieldStagger = stagger(0.07, 0.15);

export default function Contact({ t, showForm }) {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle");

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) { setStatus("sent"); setForm({ name: "", email: "", message: "" }); }
      else setStatus("error");
    } catch { setStatus("error"); }
  }

  return (
    <section id="contact" className="section shell reveal">
      <div className="section-head">
        <div className="ix"><T delay={0}>{t("contact.ix")}</T></div>
        <h2><T block delay={0.05}>{t("contact.head")}</T></h2>
      </div>
      <motion.div
        className="contact-body"
        variants={bodyStagger}
        initial="hidden"
        whileInView="show"
        viewport={viewport}
      >
        <motion.div variants={fadeUp}>
          <div className="contact-claim">
            <T block>{t("contact.claim1")}</T>
            <T block>{t("contact.claim2")}</T>{" "}
            <a href={CONTACT_LINKS[0].href}>
              <span className="accent"><T>{t("contact.claim3")}</T></span>
            </a>
            <T>{t("contact.claim4")}</T>
          </div>
          {showForm && (
            <div className="contact-list">
              {CONTACT_LINKS.map((l) => {
                const Icon = SOCIAL_ICONS[l.icon];
                return (
                  <a key={l.key} href={l.href}
                    target={l.href.startsWith("mailto:") ? "_self" : "_blank"}
                    rel="noreferrer"
                  >
                    <span className="cl-icon">{Icon && <Icon />}</span>
                    <span className="lbl"><T>{t(`contact.${l.key}`)}</T></span>
                    <span className="val">{l.val}</span>
                    <span className="arr">↗</span>
                  </a>
                );
              })}
            </div>
          )}
        </motion.div>

        {!showForm && (
          <motion.div variants={fadeUp}>
            <div className="contact-list">
              {CONTACT_LINKS.map((l) => {
                const Icon = SOCIAL_ICONS[l.icon];
                return (
                  <a key={l.key} href={l.href}
                    target={l.href.startsWith("mailto:") ? "_self" : "_blank"}
                    rel="noreferrer"
                  >
                    <span className="cl-icon">{Icon && <Icon />}</span>
                    <span className="lbl"><T>{t(`contact.${l.key}`)}</T></span>
                    <span className="val">{l.val}</span>
                    <span className="arr">↗</span>
                  </a>
                );
              })}
            </div>
          </motion.div>
        )}

        {showForm && (
          <motion.div className="contact-form-box" variants={fadeUp}>
            <motion.form
              className="contact-form"
              onSubmit={handleSubmit}
              noValidate
              variants={fieldStagger}
              initial="hidden"
              whileInView="show"
              viewport={viewport}
            >
              <motion.div className="cf-field" variants={fadeUp}>
                <label htmlFor="cf-name"><T>{t("contact.form.name")}</T></label>
                <input id="cf-name" name="name" type="text" required autoComplete="name"
                  placeholder="Giovanni Romeo" value={form.name} onChange={handleChange} />
              </motion.div>
              <motion.div className="cf-field" variants={fadeUp}>
                <label htmlFor="cf-email"><T>{t("contact.form.email")}</T></label>
                <input id="cf-email" name="email" type="email" required autoComplete="email"
                  placeholder="ciao@example.com" value={form.email} onChange={handleChange} />
              </motion.div>
              <motion.div className="cf-field" variants={fadeUp}>
                <label htmlFor="cf-message"><T>{t("contact.form.message")}</T></label>
                <textarea id="cf-message" name="message" required
                  placeholder={t("contact.form.placeholder")}
                  value={form.message} onChange={handleChange} />
              </motion.div>
              <motion.div className="cf-footer" variants={fadeUp}>
                <button type="submit" className="btn primary" disabled={status === "sending"}>
                  {status === "sending"
                    ? <T>{t("contact.form.sending")}</T>
                    : <T>{t("contact.form.send")}</T>}
                  {status !== "sending" && <span className="arrow">→</span>}
                </button>
                {status === "sent"  && <span className="cf-status ok"><T>{t("contact.form.sent")}</T></span>}
                {status === "error" && <span className="cf-status err"><T>{t("contact.form.error")}</T></span>}
              </motion.div>
            </motion.form>
          </motion.div>
        )}
      </motion.div>
      <p className="contact-copy"><T>{t("foot.copy")}</T></p>
    </section>
  );
}
