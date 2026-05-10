import { useState } from "react";

const LINKS = [
  { key: "l1", val: "hello@yourdomain.com", href: "mailto:hello@yourdomain.com" },
  { key: "l2", val: "github.com/yourhandle", href: "#" },
  { key: "l3", val: "linkedin.com/in/yourhandle", href: "#" },
  { key: "l4", val: "read.cv/yourhandle", href: "#" },
];

// Replace with your Formspree endpoint: https://formspree.io/f/<your-id>
const FORM_ENDPOINT = "https://formspree.io/f/YOUR_FORM_ID";

export default function Contact({ t }) {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error

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
      <div className="contact-grid">
        <div className="mono upper" style={{ fontSize: 11, color: "var(--fg-mute)" }}>
          {t("contact.title")}
        </div>

        <div className="contact-left">
          <div className="contact-claim">
            {t("contact.claim1")}<br />
            {t("contact.claim2")}{" "}
            <a href="mailto:hello@yourdomain.com">
              <span className="accent">{t("contact.claim3")}</span>
            </a>
            {t("contact.claim4")}
          </div>
          <div className="contact-list">
            {LINKS.map((l) => (
              <a
                key={l.key}
                href={l.href}
                target={l.href.startsWith("#") || l.href.startsWith("mailto:") ? "_self" : "_blank"}
                rel="noreferrer"
              >
                <span className="lbl">{t(`contact.${l.key}`)}</span>
                <span className="val">{l.val}</span>
                <span className="arr">↗</span>
              </a>
            ))}
          </div>
        </div>

        <form className="contact-form" onSubmit={handleSubmit} noValidate>
          <div className="cf-field">
            <label htmlFor="cf-name">{t("contact.form.name")}</label>
            <input
              id="cf-name"
              name="name"
              type="text"
              required
              autoComplete="name"
              placeholder="Giovanni Romeo"
              value={form.name}
              onChange={handleChange}
            />
          </div>
          <div className="cf-field">
            <label htmlFor="cf-email">{t("contact.form.email")}</label>
            <input
              id="cf-email"
              name="email"
              type="email"
              required
              autoComplete="email"
              placeholder="ciao@example.com"
              value={form.email}
              onChange={handleChange}
            />
          </div>
          <div className="cf-field">
            <label htmlFor="cf-message">{t("contact.form.message")}</label>
            <textarea
              id="cf-message"
              name="message"
              required
              placeholder={t("contact.form.placeholder")}
              value={form.message}
              onChange={handleChange}
            />
          </div>
          <div className="cf-footer">
            <button
              type="submit"
              className="btn primary"
              disabled={status === "sending"}
            >
              {status === "sending" ? t("contact.form.sending") : t("contact.form.send")}
              {status !== "sending" && <span className="arrow">→</span>}
            </button>
            {status === "sent" && (
              <span className="cf-status ok">{t("contact.form.sent")}</span>
            )}
            {status === "error" && (
              <span className="cf-status err">{t("contact.form.error")}</span>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}
