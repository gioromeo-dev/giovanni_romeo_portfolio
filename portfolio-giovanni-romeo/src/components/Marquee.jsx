import "./Marquee.css";

const ITEMS = [
  "Frontend Developer",
  "React · TypeScript · Next.js",
  "UI & UX Design",
  "Pixel-Perfect Craft",
  "Based in Italy",
  "Performance-First",
  "Design Systems",
  "Open to Collaborate",
  "Digital Craftsman",
  "Est. 2018",
];

export default function Marquee() {
  const track = [...ITEMS, ...ITEMS];
  return (
    <div className="mq-band" aria-hidden="true">
      <div className="mq-track">
        {track.map((item, i) => (
          <span key={i} className="mq-item">
            {item}
            <span className="mq-sep">◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}
