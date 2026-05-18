const spring       = { type: "spring", stiffness: 180, damping: 24, mass: 0.8 };
const springFast   = { type: "spring", stiffness: 300, damping: 28 };
const springSnappy = { type: "spring", stiffness: 380, damping: 30 };

export const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show:   { opacity: 1, y: 0, transition: spring },
};

export const fadeIn = {
  hidden: { opacity: 0 },
  show:   { opacity: 1, transition: { type: "spring", stiffness: 160, damping: 22 } },
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.94 },
  show:   { opacity: 1, scale: 1, transition: springFast },
};

export const slideLeft = {
  hidden: { opacity: 0, x: -20 },
  show:   { opacity: 1, x: 0, transition: spring },
};

export const tagPop = {
  hidden: { opacity: 0, scale: 0.75 },
  show:   { opacity: 1, scale: 1, transition: springSnappy },
};

export const stagger = (delay = 0.08, children = 0.06) => ({
  hidden: {},
  show:   { transition: { staggerChildren: delay, delayChildren: children } },
});

export const viewport = { once: true, amount: 0.25, margin: "0px 0px -60px 0px" };
