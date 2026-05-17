import { MARQUEE_ITEMS } from "../data.js";
import "./Marquee.css";

export default function Marquee() {
  const track = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];
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
