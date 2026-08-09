"use client";

import { motion, useScroll } from "motion/react";

/**
 * Reading progress hairline. `scrollYProgress` is piped straight into
 * `scaleX` so the browser can keep it on the compositor.
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX: scrollYProgress }}
      className="bg-ink fixed inset-x-0 top-0 z-[70] h-px origin-left"
    />
  );
}
