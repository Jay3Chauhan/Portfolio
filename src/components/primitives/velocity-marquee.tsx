"use client";

import {
  motion,
  useAnimationFrame,
  useInView,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "motion/react";
import { useRef } from "react";
import { cn, wrap } from "@/lib/utils";

type VelocityMarqueeProps = {
  items: readonly string[];
  className?: string;
  itemClassName?: string;
  separator?: string;
  /** Percent of the track travelled per second while the page is still. */
  baseVelocity?: number;
};

/**
 * A ticker that reads the scroll rather than ignoring it: scrolling down pushes
 * it along, scrolling up drags it backwards, and it keeps a slow drift when the
 * page is still.
 *
 * The CSS `Marquee` runs at a constant rate and costs nothing; this one costs a
 * rAF, so it is worth using once as an accent rather than on every rule.
 */
export function VelocityMarquee({
  items,
  className,
  itemClassName,
  separator = "·",
  baseVelocity = 1.6,
}: VelocityMarqueeProps) {
  const ref = useRef<HTMLDivElement>(null);
  const direction = useRef(1);
  const reduce = useReducedMotion();
  const inView = useInView(ref, { margin: "200px 0px 200px 0px" });

  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 48,
    stiffness: 380,
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1200], [0, 4], {
    clamp: false,
  });

  const x = useTransform(baseX, (value) => `${wrap(-50, 0, value)}%`);

  useAnimationFrame((_, delta) => {
    if (reduce || !inView) return;

    // A backgrounded tab hands back a huge delta on return; without the clamp
    // the track teleports.
    const step = Math.min(delta, 50) / 1000;
    const factor = velocityFactor.get();

    if (factor < 0) direction.current = -1;
    else if (factor > 0) direction.current = 1;

    let moveBy = direction.current * baseVelocity * step;
    moveBy += direction.current * moveBy * Math.abs(factor);

    baseX.set(baseX.get() + moveBy);
  });

  const track = [...items, ...items];

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={cn("fade-edges-x relative flex overflow-hidden", className)}
    >
      <motion.div
        className="flex w-max shrink-0 items-center will-change-transform"
        style={reduce ? undefined : { x }}
      >
        {track.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className={cn("flex items-center whitespace-nowrap", itemClassName)}
          >
            {item}
            <span className="px-[0.7em] select-none">{separator}</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}
