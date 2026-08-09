"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import { cn } from "@/lib/utils";

type SplitTextProps = {
  text: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  className?: string;
  delay?: number;
  stagger?: number;
  once?: boolean;
};

const container: Variants = {
  hidden: {},
  visible: (custom: { delay: number; stagger: number }) => ({
    transition: { delayChildren: custom.delay, staggerChildren: custom.stagger },
  }),
};

/**
 * Word-level masked reveal, triggered on scroll.
 *
 * Accessibility contract: the full string is exposed once in a visually hidden
 * span and every visual fragment is `aria-hidden`, so screen readers announce a
 * sentence rather than a run of disconnected words. A hidden span rather than
 * `aria-label` because `aria-label` is prohibited on generic elements like <p>.
 */
export function SplitText({
  text,
  as: Tag = "span",
  className,
  delay = 0,
  stagger = 0.045,
  once = true,
}: SplitTextProps) {
  const reduce = useReducedMotion();
  const words = text.split(" ").filter(Boolean);

  const item: Variants = {
    hidden: reduce ? { opacity: 0 } : { y: "108%" },
    visible: {
      y: "0%",
      opacity: 1,
      transition: { duration: reduce ? 0.25 : 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const MotionTag = motion[Tag];

  return (
    <MotionTag
      className={className}
      variants={container}
      custom={{ delay, stagger: reduce ? 0 : stagger }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.35 }}
    >
      <span className="sr-only">{text}</span>
      {words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          aria-hidden="true"
          className="inline-flex overflow-hidden align-bottom"
        >
          <motion.span variants={item} className="inline-block">
            {word}
            {i < words.length - 1 ? "\u00A0" : null}
          </motion.span>
        </span>
      ))}
    </MotionTag>
  );
}

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  once?: boolean;
};

/**
 * Generic scroll reveal. Uses `whileInView` rather than `useInView` + state so
 * it rides Motion's pooled IntersectionObserver and never re-renders React.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 22,
  once = true,
}: RevealProps) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className={cn("overflow-visible", className)}
      initial={{ opacity: 0, y: reduce ? 0 : y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount: 0.2, margin: "0px 0px -4% 0px" }}
      transition={{ duration: 0.85, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

/** A hairline that draws itself in from the left when scrolled into view. */
export function RuleLine({
  className,
  delay = 0,
}: {
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      className={cn("bg-line h-px w-full origin-left", className)}
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, amount: 1 }}
      transition={{ duration: 1.1, delay, ease: [0.16, 1, 0.3, 1] }}
    />
  );
}
