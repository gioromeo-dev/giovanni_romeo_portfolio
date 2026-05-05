import { useState, useEffect } from 'react'
import { useTheme } from '../context/ThemeContext'
import { useLang } from '../context/LangContext'
import { useScrollSpy } from '../hooks/useScrollSpy'
import { Sun, Moon, Menu, X } from 'lucide-react'
import './Navbar.css'

const NAV_IDS = ['home', 'about', 'skills', 'experience', 'projects', 'contact']

export default function Navbar() {
  const { theme, toggleTheme } = useTheme()
  const { lang, toggleLang, t } = useLang()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const activeId = useScrollSpy(NAV_IDS)

  const NAV_LINKS = NAV_IDS.map(id => ({ id, label: t.nav[id] }))

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  return (
    <>
      <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
        <div className="navbar__inner">
          <button className="navbar__logo" onClick={() => scrollTo('home')}>
            <img className="logo__img" src="GR.png" alt="" />
            {/* <span className="logo__bracket">&lt;</span>
            <span className="logo__name">GD</span>
            <span className="logo__bracket">/&gt;</span> */}
          </button>

          <ul className="navbar__links">
            {NAV_LINKS.map(({ id, label }) => (
              <li key={id}>
                <button
                  className={`navbar__link ${activeId === id ? 'navbar__link--active' : ''}`}
                  onClick={() => scrollTo(id)}
                >
                  {label}
                  {activeId === id && <span className="navbar__link-dot" />}
                </button>
              </li>
            ))}
          </ul>

          <div className="navbar__controls">
            <button className="navbar__lang-btn" onClick={toggleLang} aria-label="Toggle language">
              <span className={`lang-flag ${lang === 'en' ? 'active' : ''}`}>EN</span>
              <span className="lang-sep">·</span>
              <span className={`lang-flag ${lang === 'it' ? 'active' : ''}`}>IT</span>
            </button>
            <button className="navbar__theme-btn" onClick={toggleTheme} aria-label="Toggle theme">
              {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
            </button>
            <button className="navbar__menu-btn" onClick={() => setMenuOpen(o => !o)} aria-label="Toggle menu">
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </nav>

      <div className={`mobile-menu ${menuOpen ? 'mobile-menu--open' : ''}`}>
        <ul className="mobile-menu__links">
          {NAV_LINKS.map(({ id, label }, i) => (
            <li key={id} style={{ '--i': i }}>
              <button
                className={`mobile-menu__link ${activeId === id ? 'mobile-menu__link--active' : ''}`}
                onClick={() => scrollTo(id)}
              >
                {label}
              </button>
            </li>
          ))}
        </ul>
        <div className="mobile-menu__footer">
          <button className="mobile-ctrl-btn" onClick={toggleLang}>
            <span>{lang === 'en' ? '🇬🇧 English' : '🇮🇹 Italiano'}</span>
            <span className="mobile-ctrl-arrow">→</span>
          </button>
          <button className="mobile-ctrl-btn" onClick={toggleTheme}>
            <span>{theme === 'dark' ? '☀️ Light Mode' : '🌙 Dark Mode'}</span>
            <span className="mobile-ctrl-arrow">→</span>
          </button>
        </div>
      </div>
    </>
  )
}
