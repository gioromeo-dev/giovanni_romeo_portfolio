import { useLang } from '../context/LangContext'
import { useReveal } from '../hooks/useReveal'
import './Experience.css'

export default function Experience() {
  const { t } = useLang()
  const headRef = useReveal()

  return (
    <section id="experience" className="section experience">
      <div className="container">
        <div ref={headRef} className="experience__header reveal">
          <span className="section-label">{t.experience.label}</span>
          <h2 className="section-title">{t.experience.title}</h2>
          <p className="section-subtitle">{t.experience.subtitle}</p>
        </div>

        <div className="timeline">
          {t.experience.items.map((exp, i) => {
            const ref = useReveal({ threshold: 0.1 })
            return (
              <div key={i} ref={ref} className={`timeline__item reveal ${exp.current ? 'timeline__item--current' : ''}`} style={{ transitionDelay: `${i * 0.08}s` }}>
                <div className="timeline__line-col">
                  <div className="timeline__dot">
                    {exp.current && <div className="timeline__dot-pulse" />}
                  </div>
                  {i < t.experience.items.length - 1 && <div className="timeline__connector" />}
                </div>
                <div className="timeline__content">
                  <div className="timeline__meta">
                    <span className="timeline__period">{exp.period}</span>
                    {exp.current && <span className="timeline__badge">{t.experience.current_label}</span>}
                  </div>
                  <h3 className="timeline__role">{exp.role}</h3>
                  <p className="timeline__company">
                    {exp.company}<span className="timeline__location"> · {exp.location}</span>
                  </p>
                  <p className="timeline__desc">{exp.description}</p>
                  <div className="timeline__tags">
                    {exp.highlights.map(h => <span key={h} className="tag">{h}</span>)}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
