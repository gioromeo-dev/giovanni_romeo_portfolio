import { useEffect, useRef } from 'react'
import { useLang } from '../context/LangContext'
import './Hero.css'

export default function Hero() {
  const { t } = useLang()
  const titleRef = useRef(null)
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  useEffect(() => {
    const letters = titleRef.current?.querySelectorAll('.char')
    letters?.forEach((el, i) => { el.style.animationDelay = `${0.04 * i + 0.38}s` })
  }, [t])

  const splitChars = (text) =>
    [...text].map((ch, i) => (
      <span key={i} className="char" style={{ display: ch === ' ' ? 'inline' : 'inline-block' }}>
        {ch === ' ' ? '\u00A0' : ch}
      </span>
    ))

  return (
    <section id="home" className="hero">
      <div className="hero__bg-grid" aria-hidden="true" />
      <div className="hero__orb hero__orb--1" aria-hidden="true" />
      <div className="hero__orb hero__orb--2" aria-hidden="true" />
      <div className="hero__orb hero__orb--3" aria-hidden="true" />

      <div className="container hero__container">
        <div className="hero__content">
          <div className="hero__eyebrow">
            <span className="hero__badge-dot" />
            <span>{t.hero.badge}</span>
          </div>

          <div className="hero__avatar-ring-wrap">
            <div className="hero__avatar">
              <div className="hero__avatar-inner">
                <img className="hero__avatar-image" src="images/MemojiHi.png" alt="" />
                </div>
              {/* <div className="hero__avatar-inner">GR</div> */}
            </div>
          </div>

          <h1 className="hero__title" ref={titleRef}>
            <span className="hero__title-row hero__title-row--plain">{splitChars('Giovanni')}</span>
            <span className="hero__title-row hero__title-row--gradient">{splitChars('Romeo')}</span>
          </h1>

          <p className="hero__role">{t.hero.role}</p>
          <p className="hero__desc">{t.hero.description}</p>

          <div className="hero__actions">
            <button className="btn-primary" onClick={() => scrollTo('projects')}>{t.hero.cta_primary}</button>
            <button className="btn-secondary" onClick={() => scrollTo('contact')}>{t.hero.cta_secondary}</button>
          </div>

          <div className="hero__stats">
            {[
              { value: t.hero.stat1_value, label: t.hero.stat1_label },
              { value: t.hero.stat2_value, label: t.hero.stat2_label },
              { value: t.hero.stat3_value, label: t.hero.stat3_label },
            ].map(({ value, label }, i) => (
              <div key={i} className="hero__stat">
                <span className="hero__stat-value">{value}</span>
                <span className="hero__stat-label">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <button className="hero__scroll-cue" onClick={() => scrollTo('about')}>
        <div className="hero__scroll-pill"><div className="hero__scroll-dot" /></div>
        <span>{t.hero.scroll}</span>
      </button>
    </section>
  )
}
