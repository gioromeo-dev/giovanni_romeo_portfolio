import { useLang } from '../context/LangContext'
import { useReveal } from '../hooks/useReveal'
import './About.css'

export default function About() {
  const { t } = useLang()
  const headRef = useReveal()
  const textRef = useReveal()
  const cardsRef = useReveal()

  return (
    <section id="about" className="section about">
      <div className="container">
        <div ref={headRef} className="about__label-wrap reveal">
          <span className="section-label">{t.about.label}</span>
          <h2 className="section-title">{t.about.title.split('\n').map((l,i) => <span key={i}>{l}<br/></span>)}</h2>
        </div>

        <div className="about__layout">
          <div ref={textRef} className="about__text reveal-left">
            <p className="about__body" dangerouslySetInnerHTML={{ __html: t.about.body1.replace('Senior Consultant Developer', '<strong>Senior Consultant Developer</strong>') }} />
            <p className="about__body" dangerouslySetInnerHTML={{ __html: t.about.body2.replace('Pirelli RMS Power Platform', '<strong>Pirelli RMS Power Platform</strong>') }} />
            <p className="about__body">{t.about.body3}</p>
            <div className="about__tags">
              {t.about.tags.map(tag => <span key={tag} className="tag">{tag}</span>)}
            </div>
          </div>

          <div ref={cardsRef} className="about__highlights reveal-children">
            {t.about.highlights.map(({ icon, title, desc }) => (
              <div key={title} className="about__card">
                <div className="about__card-icon">{icon}</div>
                <div>
                  <h4 className="about__card-title">{title}</h4>
                  <p className="about__card-desc">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
