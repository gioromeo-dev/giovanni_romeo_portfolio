const CATS = [
  { key: "cat1", tags: ["React", "TypeScript", "Next.js", "CSS", "Framer Motion", "GSAP", "Tailwind"] },
  { key: "cat2", tags: ["Node.js", "PostgreSQL", "tRPC", "Redis", "Cloudflare Workers", "Postgres"] },
  { key: "cat3", tags: ["Figma", "Design Systems", "Type", "Brand", "Prototyping"] },
  { key: "cat4", tags: ["Git", "Linear", "Notion", "Vercel", "Raycast"] },
];

export default function Skills({ t }) {
  return (
    <section id="skills" className="section shell reveal">
      <div className="section-head">
        <div className="ix">{t("skills.ix")}</div>
        <h2>{t("skills.head")}</h2>
      </div>
      <div className="skills-grid">
        <div className="mono upper" style={{ fontSize: 11, color: "var(--fg-mute)" }}>
          {t("skills.title")}
        </div>
        <div className="skill-cats">
          {CATS.map((c) => (
            <div className="skill-cat" key={c.key}>
              <div>
                <h3>{t(`skills.${c.key}`)}</h3>
                <div className="cat-meta">{t(`skills.${c.key}.meta`)}</div>
              </div>
              <div className="skill-tags">
                {c.tags.map((tag) => <span className="skill-tag" key={tag}>{tag}</span>)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
