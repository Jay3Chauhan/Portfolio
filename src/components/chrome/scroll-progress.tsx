"use client";

import { motion, useScroll } from "motion/react";
import { useHydrated } from "@/lib/use-hydrated";

/**
 * Reading progress hairline. `scrollYProgress` is piped straight into
 * `scaleX` so the browser can keep it on the compositor.
 *
 * The `scale-x-0` class carries the pre-hydration state instead of a
 * MotionValue baked into the SSR markup. Dropping the style outright would
 * paint a full-width rule across the top of the page on first byte.
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const hydrated = useHydrated();

  return (
    <motion.div
      aria-hidden="true"
      style={hydrated ? { scaleX: scrollYProgress } : undefined}
      className="bg-ink fixed inset-x-0 top-0 z-[70] h-px origin-left scale-x-0"
    />
  );
}
