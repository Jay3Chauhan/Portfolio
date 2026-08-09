"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import { Children, useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type StackCardsProps = {
  children: ReactNode;
  className?: string;
  cardClassName?: string;
  /** Extra offset below the nav where the stack comes to rest. */
  restOffset?: string;
};

/**
 * Sticky principle deck.
 *
 * Desktop (`lg+`): each card owns a scroll runway (`lg:h-[…]`) and pins with
 * `lg:sticky`. Later cards cover earlier ones; a paper veil (not scale) dims
 * the card underneath so text never shows through.
 *
 * Mobile: normal document flow with gaps — no sticky, no multi-svh blank run.
 * Sticky/height are pure CSS breakpoints so SSR HTML matches the client.
 */
export function StackCards({
  children,
  className,
  cardClassName,
  restOffset = "1rem",
}: StackCardsProps) {
  const ref = useRef<HTMLDivElement>(null);
  const cards = Children.toArray(children);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  return (
    <div ref={ref} className={cn("relative", className)}>
      {cards.map((card, i) => (
        <StackItem
          key={i}
          index={i}
          total={cards.length}
          progress={scrollYProgress}
          restOffset={restOffset}
          className={cardClassName}
        >
          {card}
        </StackItem>
      ))}
    </div>
  );
}

function StackItem({
  children,
  index,
  total,
  progress,
  restOffset,
  className,
}: {
  children: ReactNode;
  index: number;
  total: number;
  progress: MotionValue<number>;
  restOffset: string;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const isLast = index === total - 1;

  // Veil across the slice where the next card climbs over this one.
  const span: [number, number] = [index / total, (index + 1) / total];
  const veil = useTransform(progress, span, [0, isLast ? 0 : 0.88]);

  return (
    <div
      className={cn(
        "relative",
        // Mobile: stacked with breathing room, no pin.
        "mb-5 last:mb-0 lg:mb-0",
        // Desktop: one viewport-ish of scroll per card so they pin in sequence.
        "lg:h-[min(62svh,36rem)]",
      )}
    >
      <div
        className="lg:sticky"
        style={{
          top: `calc(var(--nav-h) + ${restOffset} + ${index * 0.85}rem)`,
          zIndex: index + 1,
        }}
      >
        <article
          className={cn(
            // Solid raised paper is required so a pinned card fully masks the one
            // under it. Never use translucent backgrounds here.
            "bg-paper-raised border-line relative border",
            className,
          )}
        >
          {children}

          {/* Dim with a paper veil — never scale the card. Scale shrinks the
              opaque surface and lets the copy underneath bleed through. */}
          {reduce ? null : (
            <motion.span
              aria-hidden="true"
              className="bg-paper-raised pointer-events-none absolute inset-0"
              style={{ opacity: veil }}
            />
          )}
        </article>
      </div>
    </div>
  );
}
