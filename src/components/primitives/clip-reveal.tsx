"use client";

import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

type ClipRevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  /** Direction the inner content rises from. */
  from?: "up" | "down" | "left" | "right";
  once?: boolean;
};

/**
 * Soft masked entrance. Uses a short translate (not 110%) so content stays
 * mostly in-frame if the viewport observer is slow — a full off-screen hide
 * was making media look “missing” until scroll caught up.
 *
 * Always renders a <div>. Never nest this inside <p>, <h*>, or <span>.
 */
export function ClipReveal({
  children,
  className,
  delay = 0,
  from = "up",
  once = true,
}: ClipRevealProps) {
  const reduce = useReducedMotion();

  const hidden =
    from === "up"
      ? { y: 28 }
      : from === "down"
        ? { y: -28 }
        : from === "left"
          ? { x: 28 }
          : { x: -28 };

  return (
    <div className={cn("overflow-hidden", className)}>
      <motion.div
        initial={reduce ? { opacity: 0 } : { ...hidden, opacity: 0 }}
        whileInView={{ x: 0, y: 0, opacity: 1 }}
        viewport={{ once, amount: 0.15, margin: "0px 0px -4% 0px" }}
        transition={{ duration: reduce ? 0.25 : 0.85, delay, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.div>
    </div>
  );
}
