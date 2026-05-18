# Giovanni Romeo — Portfolio

Personal portfolio built with **Vite + React**. Bilingual (EN/IT), dark/light theme, scroll animations, fully responsive.

---

## Tech Stack

| Layer | Tool |
|---|---|
| Framework | React 19 + Vite 6 |
| Animations | Motion 12 |
| Styling | Plain CSS (no UI framework) |
| i18n | Custom context + JSON |
| Path aliases | `@/` → `src/` |

---

## Project Structure

```
src/
├── main.jsx
├── App.jsx
├── styles.css
│
├── components/        # UI sections & layout
│   ├── Hero.jsx / .css
│   ├── About.jsx / .css
│   ├── Skills.jsx / .css
│   ├── Experience.jsx / .css
│   ├── Projects.jsx / .css
│   ├── Contact.jsx / .css
│   ├── Navbar.jsx / .css
│   ├── Marquee.jsx / .css
│   ├── Splash.jsx / .css
│   ├── Footer.jsx / .css
│   ├── Icons.jsx
│   └── T.jsx
│
├── lib/               # Utilities
│   ├── animations.js  # Motion variants & viewport config
│   └── i18n.js        # Locale map (EN/IT)
│
├── context/           # React contexts
│   └── LangContext.js
│
├── hooks/             # Custom hooks
│   └── index.js       # useI18n, useTheme, useScrollSpy, useReveal
│
├── data/              # Static data from content.json
│   └── index.js
│
└── assets/
    ├── config.json    # Feature flags & section toggles
    └── content.json   # All copy, data, translations
```

---

## Getting Started

```bash
npm install
npm run dev        # http://localhost:5173
npm run build
npm run preview
```

### Mobile testing (Cloudflare Tunnel)

```bash
# Terminal 1
npm run dev

# Terminal 2
cloudflared tunnel run portfolio-dev   # → https://dev.gioromeo.com
```

---

## Configuration

Everything lives in `src/assets/`:

- **`config.json`** — enable/disable sections, splash screen, contact form, availability badge, per-section accent colours
- **`content.json`** — all copy (EN/IT) plus data arrays: projects, skills, experience, marquee, contact links

---

## Features

- Bilingual UI (EN / IT), switchable at runtime
- Dark / Light theme with animated transition
- Scroll-triggered animations via Motion `whileInView`
- Scroll-spy active-section highlight in Navbar
- Configurable splash screen (video)
- Cloudflare Tunnel for HTTPS mobile testing at `dev.gioromeo.com`

---

*Giovanni Romeo — v2.6.0*
