import { AnimatePresence, motion } from "motion/react";
import { useLang } from "@/context/LangContext.js";

export function T({ children, block = false, delay = 0 }) {
  const lang = useLang();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.span
        key={lang}
        initial={{ opacity: 0, y: -5, filter: "blur(5px)" }}
        animate={{
          opacity: 1, y: 0, filter: "blur(0px)",
          transition: { type: "spring", stiffness: 260, damping: 26, mass: 0.7, delay },
        }}
        exit={{
          opacity: 0, y: 5, filter: "blur(5px)",
          transition: { duration: 0.13, ease: "easeIn", delay: 0 },
        }}
        style={{ display: block ? "block" : "inline-block" }}
      >
        {children}
      </motion.span>
    </AnimatePresence>
  );
}
