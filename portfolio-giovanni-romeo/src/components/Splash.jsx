import { useEffect, useRef, useState } from "react";

export default function Splash({ onDone }) {
  const videoRef = useRef(null);
  const overlayRef = useRef(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    // Match splash video size to hero-memoji so scale ≈ 1 on every viewport
    const heroMemoji = document.querySelector(".hero-memoji");
    if (heroMemoji) {
      const { width, height } = heroMemoji.getBoundingClientRect();
      if (width > 0) {
        v.style.width = `${width}px`;
        v.style.height = `${height > 0 ? height : width}px`;
      }
    }

    const finish = () => {
      const overlay = overlayRef.current;
      const target = document.querySelector(".hero-memoji");

      if (v && target) {
        const from = v.getBoundingClientRect();
        const to = target.getBoundingClientRect();

        // Scale handles any residual mismatch (layout shifts, font load, etc.)
        const scale = to.width / from.width;
        const tx = to.left + to.width / 2 - (from.left + from.width / 2);
        const ty = to.top + to.height / 2 - (from.top + from.height / 2);

        v.style.transition = "transform 0.7s cubic-bezier(0.4, 0, 0.2, 1)";
        v.style.transform = `translate(${tx}px, ${ty}px) scale(${scale})`;
      }

      if (overlay) {
        overlay.style.transition = "background-color 0.65s ease 0.1s";
        overlay.style.backgroundColor = "rgba(0,0,0,0)";
        overlay.style.pointerEvents = "none";
      }

      setTimeout(() => {
        setDone(true);
        onDone?.();
      }, 900);
    };

    v.addEventListener("ended", finish);
    const fallback = setTimeout(finish, 4500);
    v.play().catch(() => {});

    return () => {
      v.removeEventListener("ended", finish);
      clearTimeout(fallback);
    };
  }, [onDone]);

  if (done) return null;

  return (
    <div ref={overlayRef} className="splash" aria-hidden="true">
      <video
        ref={videoRef}
        className="splash-video"
        src="/public/videos/memoji.mp4"
        muted
        playsInline
        preload="auto"
      />
    </div>
  );
}
