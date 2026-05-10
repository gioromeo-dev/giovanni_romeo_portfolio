# Portfolio

Personal portfolio built with **Vite + React (JS)**.

- 🌗 Dark / light theme toggle (default: dark, persisted)
- 🌐 EN / IT language toggle (default: EN, persisted)
- 📱 Responsive
- 🔧 No TypeScript, no UI lib

## Stack

- Vite 5
- React 18
- Plain JS (no TS)
- Vanilla CSS with custom properties

## Run

```bash
npm install
npm run dev      # dev server at http://localhost:5173
npm run build    # production build → dist/
npm run preview  # preview the built bundle
```

## Project structure

```
portfolio/
├── index.html            # Vite entry, sets initial theme/lang before paint
├── package.json
├── vite.config.js
└── src/
    ├── main.jsx          # ReactDOM bootstrap
    ├── App.jsx           # composes the page
    ├── i18n.js           # EN/IT dictionary
    ├── hooks.js          # useI18n, useTheme, useScrollSpy, useReveal
    ├── styles.css        # design tokens + all styles
    └── components/
        ├── Navbar.jsx
        ├── Hero.jsx
        ├── About.jsx
        ├── Skills.jsx
        ├── Experience.jsx
        ├── Projects.jsx
        ├── Contact.jsx
        └── Footer.jsx
```

## Customize

- **Name & copy**: edit `src/i18n.js` (both `en` and `it` blocks).
- **Logo / brand**: `Navbar.jsx` → `FIRSTNAME / LASTNAME`.
- **Photo**: `About.jsx` → swap the `.about-photo` placeholder with an `<img>`.
- **Projects**: `Projects.jsx` → `projs` array (cover styling), strings live in `i18n.js` under `proj.*`.
- **Contact links**: `Contact.jsx` → `links` array.
- **Colors / fonts**: top of `styles.css` (`:root` and `[data-theme="light"]`).

## Notes

- Theme & language survive reload via `localStorage` (`portfolio.theme`, `portfolio.lang`).
- An inline `<script>` in `index.html` applies the saved theme before first paint to avoid flashing the wrong colors.
- `useReveal` only adds the fade-in once JS is ready — content is visible by default if JS is disabled or paused.
