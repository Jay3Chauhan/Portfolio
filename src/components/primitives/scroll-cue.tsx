"use client";

import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

/**
 * Animated scroll invitation — a hairline that breathes vertically.
 * Pure transform/opacity; disabled under reduced motion.
 */
export function ScrollCue({
  href = "#premise",
  label = "Scroll",
  className,
}: {
  href?: string;
  label?: string;
  className?: string;
}) {
  const reduce = useReducedMotion();

  return (
    <a
      href={href}
      className={cn(
        "label text-mist hover:text-ink group inline-flex items-center gap-3 transition-colors",
        className,
      )}
    >
      {label}
      <span
        aria-hidden="true"
        className="border-mist/50 relative inline-flex h-8 w-px overflow-hidden"
      >
        <motion.span
          className="bg-ink absolute inset-x-0 top-0 h-1/2 w-px"
          animate={reduce ? undefined : { y: ["-100%", "200%"] }}
          transition={
            reduce
              ? undefined
              : { duration: 1.6, repeat: Infinity, ease: [0.16, 1, 0.3, 1] }
          }
        />
      </span>
    </a>
  );
}
