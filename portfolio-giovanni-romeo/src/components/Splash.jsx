import { useEffect, useRef, useState } from "react";
import "./Splash.css";

export default function Splash({ onDone }) {
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
      }, 700);
    };

    v.addEventListener("ended", finish);
    const fallback = setTimeout(finish, 6000);
    v.play().catch(() => {});

    return () => {
      v.removeEventListener("ended", finish);
      clearTimeout(fallback);
    };
  }, [onDone]);

  if (done) return null;

  return (
    <div className={`splash${fading ? " splash--out" : ""}`} aria-hidden="true">
      <video
        ref={videoRef}
        className="splash-video"
        src="/videos/splash_4.mp4"
        muted
        playsInline
        preload="auto"
      />
    </div>
  );
}
