import { useLang } from '../context/LangContext'
import { useReveal } from '../hooks/useReveal'
import './Skills.css'

function SkillBar({ name, level }) {
  const ref = useReveal({ threshold: 0.2 })
  return (
    <div className="skill-bar" ref={ref}>
      <div className="skill-bar__header">
        <span className="skill-bar__name">{name}</span>
        <span className="skill-bar__level">{level}%</span>
      </div>
      <div className="skill-bar__track">
        <div className="skill-bar__fill" style={{ '--target-width': `${level}%` }} />
      </div>
    </div>
  )
}

export default function Skills() {
  const { t } = useLang()
  const headRef = useReveal()
  const gridRef = useReveal({ threshold: 0.05 })

  return (
    <section id="skills" className="section skills">
      <div className="container">
        <div ref={headRef} className="skills__header reveal">
          <span className="section-label">{t.skills.label}</span>
          <h2 className="section-title">{t.skills.title}</h2>
          <p className="section-subtitle">{t.skills.subtitle}</p>
        </div>

        <div ref={gridRef} className="skills__grid reveal-children">
          {t.skills.groups.map(({ category, emoji, skills }) => (
            <div key={category} className="skills__group">
              <div className="skills__group-header">
                <span className="skills__group-emoji">{emoji}</span>
                <h3 className="skills__group-title">{category}</h3>
              </div>
              <div className="skills__bars">
                {skills.map(s => <SkillBar key={s.name} {...s} />)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
