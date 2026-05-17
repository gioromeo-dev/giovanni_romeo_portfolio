import { AnimatePresence, motion } from "motion/react";
import { useLang } from "../LangContext.js";

/**
 * Animated text wrapper for language transitions.
 * Wraps any translated string with a blur+fade+slide animation
 * triggered whenever the active language changes.
 *
 * Props:
 *   block  – renders as display:block (default: inline-block)
 *   delay  – transition delay in seconds (for staggered heads)
 */
export function T({ children, block = false, delay = 0 }) {
  const lang = useLang();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.span
        key={lang}
        initial={{ opacity: 0, y: -7, filter: "blur(6px)" }}
        animate={{ opacity: 1, y: 0,  filter: "blur(0px)" }}
        exit={   { opacity: 0, y:  7, filter: "blur(6px)" }}
        transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1], delay }}
        style={{ display: block ? "block" : "inline-block" }}
      >
        {children}
      </motion.span>
    </AnimatePresence>
  );
}
