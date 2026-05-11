import { useState } from "react";
import { CONTACT_LINKS } from "../data.js";
import { IconMail, IconGithub, IconLinkedin, IconReadcv } from "./Icons.jsx";
import "./Contact.css";

const SOCIAL_ICONS = { mail: IconMail, github: IconGithub, linkedin: IconLinkedin, readcv: IconReadcv };

const FORM_ENDPOINT = "https://formspree.io/f/YOUR_FORM_ID";

export default function Contact({ t }) {
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
      if (res.ok) {
        setStatus("sent");
        setForm({ name: "", email: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="section shell reveal">
      <div className="section-head">
        <div className="ix">{t("contact.ix")}</div>
        <h2>{t("contact.head")}</h2>
      </div>
      <div className="contact-body">
        <div>
          <div className="contact-claim">
            {t("contact.claim1")}<br />
            {t("contact.claim2")}{" "}
            <a href={CONTACT_LINKS[0].href}>
              <span className="accent">{t("contact.claim3")}</span>
            </a>
            {t("contact.claim4")}
          </div>
          <div className="contact-list">
            {CONTACT_LINKS.map((l) => {
              const Icon = SOCIAL_ICONS[l.icon];
              return (
                <a
                  key={l.key}
                  href={l.href}
                  target={l.href.startsWith("mailto:") ? "_self" : "_blank"}
                  rel="noreferrer"
                >
                  <span className="cl-icon">{Icon && <Icon />}</span>
                  <span className="lbl">{t(`contact.${l.key}`)}</span>
                  <span className="val">{l.val}</span>
                  <span className="arr">↗</span>
                </a>
              );
            })}
          </div>
        </div>

        <div className="contact-form-box">
        <form className="contact-form" onSubmit={handleSubmit} noValidate>
          <div className="cf-field">
            <label htmlFor="cf-name">{t("contact.form.name")}</label>
            <input
              id="cf-name" name="name" type="text" required autoComplete="name"
              placeholder="Giovanni Romeo" value={form.name} onChange={handleChange}
            />
          </div>
          <div className="cf-field">
            <label htmlFor="cf-email">{t("contact.form.email")}</label>
            <input
              id="cf-email" name="email" type="email" required autoComplete="email"
              placeholder="ciao@example.com" value={form.email} onChange={handleChange}
            />
          </div>
          <div className="cf-field">
            <label htmlFor="cf-message">{t("contact.form.message")}</label>
            <textarea
              id="cf-message" name="message" required
              placeholder={t("contact.form.placeholder")}
              value={form.message} onChange={handleChange}
            />
          </div>
          <div className="cf-footer">
            <button type="submit" className="btn primary" disabled={status === "sending"}>
              {status === "sending" ? t("contact.form.sending") : t("contact.form.send")}
              {status !== "sending" && <span className="arrow">→</span>}
            </button>
            {status === "sent"  && <span className="cf-status ok">{t("contact.form.sent")}</span>}
            {status === "error" && <span className="cf-status err">{t("contact.form.error")}</span>}
          </div>
        </form>
        </div>
      </div>
      <p className="contact-copy">{t("foot.copy")}</p>
    </section>
  );
}
