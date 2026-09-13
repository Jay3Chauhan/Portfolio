"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef, type ReactNode } from "react";
import { useHydrated } from "@/lib/use-hydrated";
import { cn } from "@/lib/utils";

const EASE = [0.16, 1, 0.3, 1] as const;

type BaseProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

/**
 * One-shot 3D entrance: the card tips up from a slight rotateX as it enters.
 *
 * Distinct from `Reveal` (flat opacity + y) — the perspective makes a grid of
 * cards read as physical plates rather than a fading list. Transform/opacity
 * only, and it lands on exactly `rotateX(0) scale(1)` so the text ends up on an
 * unrotated layer and stays crisp.
 */
export function DepthCard({ children, className, delay = 0 }: BaseProps) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className={className}
      style={{ transformPerspective: 1400 }}
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 46, rotateX: 10, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.35, margin: "0px 0px -10% 0px" }}
      transition={{ duration: reduce ? 0.3 : 0.95, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

/**
 * One-shot horizontal entrance. Alternate `from` down a list and the rows
 * assemble from opposite edges instead of marching in a single direction.
 */
export function SlideReveal({
  children,
  className,
  delay = 0,
  from = "left",
  distance = 46,
}: BaseProps & { from?: "left" | "right"; distance?: number }) {
  const reduce = useReducedMotion();
  const offset = from === "left" ? -distance : distance;

  return (
    <motion.div
      className={className}
      initial={reduce ? { opacity: 0 } : { opacity: 0, x: offset }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.35, margin: "0px 0px -10% 0px" }}
      transition={{ duration: reduce ? 0.3 : 0.9, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Continuous scrub: the element eases up and settles as it crosses the
 * viewport, then recedes on the way out. Re-runs in both scroll directions,
 * unlike the one-shot reveals above.
 *
 * Deliberately transform-only. Dimming body copy with opacity would drop it
 * below the WCAG AA contrast floor the palette is tuned to.
 */
export function ScrollLift({
  children,
  className,
  lift = 26,
  scaleFrom = 0.985,
}: {
  children: ReactNode;
  className?: string;
  lift?: number;
  scaleFrom?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const hydrated = useHydrated();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 0.35, 0.65, 1], [lift, 0, 0, -lift]);
  const scale = useTransform(
    scrollYProgress,
    [0, 0.35, 0.65, 1],
    [scaleFrom, 1, 1, scaleFrom],
  );

  // MotionValues stay off the SSR markup so the server HTML and the first
  // client paint agree.
  const on = hydrated && !reduce;

  return (
    <motion.div
      ref={ref}
      className={cn(on && "will-change-transform", className)}
      style={on ? { y, scale } : undefined}
    >
      {children}
    </motion.div>
  );
}
