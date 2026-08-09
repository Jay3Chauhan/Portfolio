"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import { useRef } from "react";
import { cn } from "@/lib/utils";

type ScrollReadAlongProps = {
  text: string;
  className?: string;
};

/**
 * A paragraph that inks itself in word by word as it crosses the viewport —
 * the reader's eye and the scroll position stay in step.
 *
 * Distinct from `SplitText`: that one is a one-shot masked reveal fired by an
 * IntersectionObserver, this is continuously scrubbed by scroll position and
 * runs backwards when you scroll up.
 *
 * The dimmed state is opacity 0.62 rather than something fainter because ink at
 * 62% over paper still clears WCAG AA (4.9:1) in both themes. Real text has to
 * stay readable even before the scroll has "arrived" at it.
 */
export function ScrollReadAlong({ text, className }: ScrollReadAlongProps) {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.82", "end 0.55"],
  });

  const words = text.split(/\s+/).filter(Boolean);

  return (
    <p ref={ref} className={cn("text-ink", className)}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {words.map((word, i) => (
          <Word
            key={`${word}-${i}`}
            progress={scrollYProgress}
            // Each word owns a slice of the scroll range, and the slices
            // overlap slightly so the leading edge reads as a sweep rather
            // than a row of independently blinking words.
            range={[i / words.length, (i + 1.6) / words.length]}
            reduce={Boolean(reduce)}
            trailingSpace={i < words.length - 1}
          >
            {word}
          </Word>
        ))}
      </span>
    </p>
  );
}

function Word({
  children,
  progress,
  range,
  reduce,
  trailingSpace,
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
  reduce: boolean;
  trailingSpace: boolean;
}) {
  const opacity = useTransform(progress, range, [0.62, 1]);

  // Real space characters — not margin — so words never run together if a
  // transform/hydration glitch drops the spacing utility.
  const content = (
    <>
      {children}
      {trailingSpace ? "\u00A0" : null}
    </>
  );

  if (reduce) {
    return <span className="inline">{content}</span>;
  }

  return (
    <motion.span style={{ opacity }} className="inline">
      {content}
    </motion.span>
  );
}
