"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import type { claims } from "@/content/signals";
import { useHydrated } from "@/lib/use-hydrated";
import { cn } from "@/lib/utils";

/**
 * A single verifiable claim. Client-only because the figure and its rule are
 * scrubbed by scroll position; the surrounding section stays a Server Component.
 */
export function ClaimRow({
  claim,
  index,
  total,
}: {
  claim: (typeof claims)[number];
  index: number;
  total: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const hydrated = useHydrated();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.9", "end 0.35"],
  });

  const figureX = useTransform(scrollYProgress, [0, 1], [-10, 0]);
  // Floor stays ≥0.72 so the figure never dips below WCAG AA while scrubbing.
  const figureOpacity = useTransform(scrollYProgress, [0, 0.45], [0.72, 1]);
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  // Gate MotionValues until after hydration so SSR HTML has no inline
  // transform/opacity that can disagree with the first client paint.
  const scrub = hydrated && !reduce;

  return (
    <div
      ref={ref}
      className={cn(
        "rule-t grid gap-5 overflow-visible py-9 sm:gap-6 sm:py-12 lg:grid-cols-[0.4fr_1fr] lg:gap-16",
        index === total - 1 && "rule-b",
      )}
    >
      <motion.div
        style={scrub ? { x: figureX, opacity: figureOpacity } : undefined}
        className={cn(
          "font-display overflow-visible pt-1 text-[clamp(3rem,7vw,6rem)] leading-[1] font-light tracking-tight",
          scrub && "will-change-transform",
        )}
        data-numeric
      >
        {claim.figure}
      </motion.div>

      <div>
        <blockquote className="font-display text-[clamp(1.25rem,2.3vw,1.875rem)] leading-[1.35] font-light">
          {claim.statement}
        </blockquote>
        <div className="mt-5 flex items-center gap-4">
          <motion.span
            aria-hidden="true"
            style={scrub ? { scaleX: lineScale } : { scaleX: 1 }}
            className="bg-line-strong h-px w-10 origin-left"
          />
          <p className="label text-whisper">{claim.source}</p>
        </div>
      </div>
    </div>
  );
}
