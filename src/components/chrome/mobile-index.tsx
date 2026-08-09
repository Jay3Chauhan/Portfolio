"use client";

import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "motion/react";
import { useEffect, useState } from "react";
import { sections } from "@/content/site";
import { cn } from "@/lib/utils";

/**
 * Compact section index for viewports that hide the right-edge rail.
 * Shows only the active tick + label so it never fights the measure.
 */
export function MobileIndex() {
  const [active, setActive] = useState<string>("");
  const [visible, setVisible] = useState(false);
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();

  useEffect(() => {
    const targets = sections
      .map((item) => document.querySelector(item.href))
      .filter((el): el is Element => Boolean(el));

    if (targets.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visibleEntry) setActive(`#${visibleEntry.target.id}`);
      },
      { rootMargin: "-42% 0px -42% 0px", threshold: [0, 0.25, 0.5, 1] },
    );

    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, []);

  // Threshold only — React re-renders when visibility flips, not every frame.
  // Hide near the page end so the pill never sits on the contact form.
  useMotionValueEvent(scrollY, "change", (latest) => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const next = latest > window.innerHeight * 0.55 && latest < max - 320;
    setVisible((prev) => (prev === next ? prev : next));
  });

  const current = sections.find((item) => item.href === active) ?? sections[0];

  return (
    <nav
      aria-label="Mobile section index"
      className={cn(
        "pointer-events-none fixed inset-x-0 bottom-4 z-50 flex justify-center px-4 xl:hidden",
        !visible && "invisible",
      )}
    >
      <AnimatePresence mode="wait">
        {visible ? (
          <motion.a
            key={current.href}
            href={current.href}
            initial={reduce ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: 6 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="pointer-events-auto border-line bg-paper/95 label text-ink inline-flex items-center gap-2.5 rounded-full border px-3.5 py-2 shadow-[0_8px_30px_-18px_rgba(0,0,0,0.45)] backdrop-blur-xl"
          >
            <span className="text-whisper tabular-nums">{current.index}</span>
            <span aria-hidden="true" className="bg-line-strong h-3 w-px" />
            <span>{current.label}</span>
          </motion.a>
        ) : null}
      </AnimatePresence>
    </nav>
  );
}
