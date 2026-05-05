import { useRef, useEffect, useState } from 'react'
import { useLang } from '../context/LangContext'
import { useReveal } from '../hooks/useReveal'
import './Projects.css'

function ProjectCard({ project, index, activeIndex }) {
  const distance = index - activeIndex
  const abs = Math.abs(distance)
  const isActive = abs === 0
  const isAdjacent = abs === 1
  const isHidden = abs > 2

  return (
    <div
      className={`pcard ${isActive ? 'pcard--active' : ''} ${isHidden ? 'pcard--hidden' : ''}`}
      style={{
        '--offset': distance,
        '--abs': abs,
        transform: `
          translateX(calc(${distance} * 72% + ${distance} * 24px))
          scale(${isActive ? 1 : isAdjacent ? 0.88 : 0.76})
          rotateY(${distance * -6}deg)
        `,
        opacity: isActive ? 1 : isAdjacent ? 0.55 : 0.18,
        zIndex: 10 - abs,
        transition: 'transform 0.7s cubic-bezier(0.4,0,0.2,1), opacity 0.7s cubic-bezier(0.4,0,0.2,1)',
        pointerEvents: isActive ? 'auto' : 'none',
      }}
    >
      <div className="pcard__visual" style={{ background: project.gradient }}>
        <span className="pcard__emoji">{project.emoji}</span>
      </div>
      <div className="pcard__body">
        <span className="pcard__category">{project.category}</span>
        <h3 className="pcard__title">{project.title}</h3>
        <p className="pcard__desc">{project.description}</p>
        <div className="pcard__tech">
          {project.tech.map(t => <span key={t} className="tag">{t}</span>)}
        </div>
      </div>
    </div>
  )
}

export default function Projects() {
  const { t } = useLang()
  const headRef = useReveal()
  const stickyRef = useRef(null)
  const sectionRef = useRef(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const projects = t.projects.items
  const total = projects.length

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const handleScroll = () => {
      const rect = section.getBoundingClientRect()
      const sectionHeight = section.offsetHeight
      const viewH = window.innerHeight
      // scroll progress: 0 when section top hits viewport top, 1 when section bottom hits viewport bottom
      const scrollableRange = sectionHeight - viewH
      const scrolled = -rect.top
      const progress = Math.min(Math.max(scrolled / scrollableRange, 0), 1)
      const idx = Math.round(progress * (total - 1))
      setActiveIndex(Math.min(Math.max(idx, 0), total - 1))
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [total])

  return (
    <section id="projects" ref={sectionRef} className="projects-section">
      {/* Header — scrolls away */}
      <div className="container projects-section__head">
        <div ref={headRef} className="reveal">
          <span className="section-label">{t.projects.label}</span>
          <h2 className="section-title">{t.projects.title}</h2>
          <p className="section-subtitle">{t.projects.subtitle}</p>
        </div>
      </div>

      {/* Sticky carousel stage */}
      <div className="projects-sticky" ref={stickyRef}>
        {/* Progress dots */}
        <div className="projects-dots">
          {projects.map((_, i) => (
            <div key={i} className={`projects-dot ${i === activeIndex ? 'projects-dot--active' : ''}`} />
          ))}
        </div>

        {/* Counter */}
        <div className="projects-counter">
          <span className="projects-counter__current">{String(activeIndex + 1).padStart(2,'0')}</span>
          <span className="projects-counter__sep">/</span>
          <span className="projects-counter__total">{String(total).padStart(2,'0')}</span>
        </div>

        {/* Perspective stage */}
        <div className="projects-stage">
          {projects.map((project, i) => (
            <ProjectCard key={i} project={project} index={i} activeIndex={activeIndex} />
          ))}
        </div>
      </div>
    </section>
  )
}
