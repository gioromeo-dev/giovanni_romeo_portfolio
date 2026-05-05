import { Mail, Link, GitBranch, MapPin } from 'lucide-react'
import { useLang } from '../context/LangContext'
import { useReveal } from '../hooks/useReveal'
import './Contact.css'

export default function Contact() {
  const { t } = useLang()
  const leftRef = useReveal()
  const rightRef = useReveal()

  const CONTACT_ICONS = [<Mail size={22}/>, <Link size={22}/>, <GitBranch size={22}/>, <MapPin size={22}/>]
  const CONTACT_HREFS = [
    'mailto:giovanni.deluca@example.com',
    'https://linkedin.com',
    'https://github.com',
    null,
  ]

  return (
    <section id="contact" className="section contact">
      <div className="container">
        <div className="contact__layout">
          <div ref={leftRef} className="contact__left reveal-left">
            <span className="section-label">{t.contact.label}</span>
            <h2 className="section-title">{t.contact.title.split('\n').map((l,i) => <span key={i}>{l}<br/></span>)}</h2>
            <p className="contact__body">{t.contact.body1}</p>
            <p className="contact__body">{t.contact.body2}</p>

            <div className="contact__links">
              {t.contact.links.map(({ label, value }, i) => (
                <div key={label} className="contact__link-item">
                  <div className="contact__link-icon">{CONTACT_ICONS[i]}</div>
                  <div>
                    <span className="contact__link-label">{label}</span>
                    {CONTACT_HREFS[i] ? (
                      <a href={CONTACT_HREFS[i]} className="contact__link-value" target="_blank" rel="noopener noreferrer">{value}</a>
                    ) : (
                      <span className="contact__link-value">{value}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div ref={rightRef} className="contact__right reveal-right">
            <div className="contact__form-card">
              <h3 className="contact__form-title">{t.contact.form_title}</h3>
              <div className="contact__form">
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">{t.contact.name}</label>
                    <input className="form-input" type="text" placeholder={t.contact.name_placeholder} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">{t.contact.email}</label>
                    <input className="form-input" type="email" placeholder={t.contact.email_placeholder} />
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">{t.contact.subject}</label>
                  <input className="form-input" type="text" placeholder={t.contact.subject_placeholder} />
                </div>
                <div className="form-group">
                  <label className="form-label">{t.contact.message}</label>
                  <textarea className="form-input form-textarea" rows={5} placeholder={t.contact.message_placeholder} />
                </div>
                <button className="btn-primary contact__submit">{t.contact.send}</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="contact__footer">
        <div className="container">
          <div className="footer__inner">
            <p className="footer__copy">{t.contact.footer_copy}</p>
            <p className="footer__made">{t.contact.footer_made}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
