"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef, type ReactNode } from "react";
import { useHydrated } from "@/lib/use-hydrated";
import { cn } from "@/lib/utils";

type ParallaxProps = {
  children: ReactNode;
  className?: string;
  /** Vertical travel across the element's viewport pass. Transform only. */
  y?: [string | number, string | number];
  /** Horizontal travel — optional, for ghost wordmarks / side bands. */
  x?: [string | number, string | number];
  opacity?: [number, number];
  scale?: [number, number];
  offset?: ["start end" | "start start" | "end start" | "end end", "start end" | "start start" | "end start" | "end end"];
};

/**
 * Leaf parallax driven by MotionValues. Reduced-motion users get a static
 * element — the MotionConfig flag does not cancel style-bound transforms.
 *
 * Before hydration the element renders the *start* of each range as a plain
 * inline style. Leaving the MotionValues bound during SSR was serialising a
 * transform into the markup, and dropping the style entirely would flash a
 * ghost wordmark at full opacity before the first frame.
 */
export function Parallax({
  children,
  className,
  y,
  x,
  opacity,
  scale,
  offset = ["start end", "end start"],
}: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const hydrated = useHydrated();

  const { scrollYProgress } = useScroll({ target: ref, offset });

  const yMv = useTransform(scrollYProgress, [0, 1], reduce || !y ? [0, 0] : y);
  const xMv = useTransform(scrollYProgress, [0, 1], reduce || !x ? [0, 0] : x);
  const opacityMv = useTransform(
    scrollYProgress,
    [0, 1],
    reduce || !opacity ? [1, 1] : opacity,
  );
  const scaleMv = useTransform(
    scrollYProgress,
    [0, 1],
    reduce || !scale ? [1, 1] : scale,
  );

  const scrub = hydrated && !reduce;

  const resting = {
    y: y?.[0],
    x: x?.[0],
    opacity: opacity?.[0],
    scale: scale?.[0],
  };

  return (
    <motion.div
      ref={ref}
      className={cn(scrub && "will-change-transform", className)}
      style={
        scrub
          ? {
              y: y ? yMv : undefined,
              x: x ? xMv : undefined,
              opacity: opacity ? opacityMv : undefined,
              scale: scale ? scaleMv : undefined,
            }
          : resting
      }
    >
      {children}
    </motion.div>
  );
}
