import { useEffect, useRef, useState } from "react";
import "./Splash.css";

export default function Splash({ onDone, video, fallbackMs = 6000, fadeDurationMs = 700 }) {
  const videoRef = useRef(null);
  const [fading, setFading] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    const finish = () => {
      setFading(true);
      setTimeout(() => {
        setDone(true);
        onDone?.();
      }, fadeDurationMs);
    };

    v.addEventListener("ended", finish);
    const fallback = setTimeout(finish, fallbackMs);
    v.play().catch(() => {});

    return () => {
      v.removeEventListener("ended", finish);
      clearTimeout(fallback);
    };
  }, [onDone, fallbackMs, fadeDurationMs]);

  if (done) return null;

  return (
    <div
      className={`splash${fading ? " splash--out" : ""}`}
      style={fading ? { transition: `opacity ${fadeDurationMs}ms ease` } : undefined}
      aria-hidden="true"
    >
      <video
        ref={videoRef}
        className="splash-video"
        src={video}
        muted
        playsInline
        preload="auto"
      />
    </div>
  );
}
