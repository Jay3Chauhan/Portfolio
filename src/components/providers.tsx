"use client";

import { MotionConfig } from "motion/react";
import { SmoothScroll } from "@/components/primitives/smooth-scroll";

/**
 * `reducedMotion="user"` makes every Motion transform/layout animation respect
 * the OS preference automatically; Lenis does the same for scroll on its own.
 */
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <MotionConfig
      reducedMotion="user"
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    >
      <SmoothScroll>{children}</SmoothScroll>
    </MotionConfig>
  );
}
