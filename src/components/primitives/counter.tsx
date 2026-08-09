"use client";

import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "motion/react";
import { useEffect, useRef } from "react";

type CounterProps = {
  to: number;
  suffix?: string;
  duration?: number;
  className?: string;
};

/**
 * Counts up once when scrolled into view.
 *
 * The MotionValue is rendered directly as a child of `motion.span`, so each
 * frame updates the DOM text node without a React re-render.
 */
export function Counter({ to, suffix = "", duration = 1.6, className }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduce = useReducedMotion();

  const count = useMotionValue(0);
  const display = useTransform(count, (value) => Math.round(value).toLocaleString());

  useEffect(() => {
    if (!inView) return;

    if (reduce) {
      count.set(to);
      return;
    }

    const controls = animate(count, to, { duration, ease: [0.16, 1, 0.3, 1] });
    return () => controls.stop();
  }, [inView, to, duration, count, reduce]);

  return (
    <span ref={ref} className={className} data-numeric>
      <motion.span>{display}</motion.span>
      {suffix}
    </span>
  );
}
