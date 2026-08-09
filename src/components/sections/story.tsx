"use client";

import { useLenis } from "lenis/react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { useRef, useState } from "react";
import { FigurePlate } from "@/components/primitives/figure-plate";
import { SectionHeader } from "@/components/primitives/section-header";
import { chapters } from "@/content/story";
import { useHydrated } from "@/lib/use-hydrated";
import { cn } from "@/lib/utils";

const fade = {
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
  transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] as const },
};

export function Story() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const lenis = useLenis();
  const reduce = useReducedMotion();
  const hydrated = useHydrated();

  // Sticky pin is an enhancement. Reduced-motion and the first paint get a
  // linear chapter list that scrolls like any other section.
  const pinned = hydrated && !reduce;

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const ghostY = useTransform(scrollYProgress, [0, 1], pinned ? ["6%", "-10%"] : ["0%", "0%"]);
  const ghostOpacity = useTransform(
    scrollYProgress,
    [0, 0.15, 0.85, 1],
    pinned ? [0.02, 0.05, 0.05, 0.02] : [0.04, 0.04, 0.04, 0.04],
  );

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    if (!pinned) return;
    const next = Math.min(
      chapters.length - 1,
      Math.max(0, Math.floor(value * chapters.length)),
    );
    setIndex((prev) => (prev === next ? prev : next));
  });

  function goToChapter(target: number) {
    const section = sectionRef.current;
    if (!section || !pinned) {
      document.getElementById(`chapter-${chapters[target].year}`)?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      return;
    }

    const scrollable = section.offsetHeight - window.innerHeight;
    const top = section.offsetTop + (target / chapters.length) * scrollable + 8;

    if (lenis) lenis.scrollTo(top, { duration: 1.1 });
    else window.scrollTo({ top, behavior: "smooth" });
  }

  if (!pinned) {
    return (
      <section id="story" className="pt-section scroll-mt-24">
        <SectionHeader index="05" kicker="Story" title="Five years, quietly compounding." />
        <ol className="gutter mt-14 space-y-16">
          {chapters.map((chapter) => (
            <li
              key={chapter.year}
              id={`chapter-${chapter.year}`}
              className="rule-t grid gap-8 pt-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16"
            >
              <figure>
                <div className="text-ink relative aspect-[4/3] w-full">
                  <FigurePlate
                    kind={chapter.plate}
                    label={chapter.caption}
                    className="h-full w-full"
                  />
                </div>
                <figcaption className="label text-whisper mt-4">
                  Fig. {chapter.index} — {chapter.caption}
                </figcaption>
              </figure>
              <div>
                <p className="label text-pine">
                  Chapter {chapter.index}
                  <span className="text-whisper px-2">·</span>
                  <span className="text-mist">{chapter.marker}</span>
                </p>
                <h3 className="font-display mt-6 max-w-[16ch] text-[clamp(1.75rem,3.6vw,3.25rem)] leading-[0.98] font-light tracking-tight">
                  {chapter.title}
                </h3>
                <p className="text-mist mt-6 max-w-[52ch] text-sm leading-relaxed font-light sm:text-base">
                  {chapter.body}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </section>
    );
  }

  const chapter = chapters[index];

  return (
    <section id="story" className="pt-section scroll-mt-24">
      <SectionHeader index="05" kicker="Story" title="Five years, quietly compounding." />

      <div
        ref={sectionRef}
        className="relative mt-12"
        style={{ height: `${chapters.length * 75}svh` }}
      >
        <div className="sticky top-0 flex h-[100svh] flex-col justify-center overflow-hidden pt-[var(--nav-h)]">
          <div className="gutter">
            <nav
              aria-label="Timeline"
              className="rule-b flex items-center justify-between gap-4 pb-4"
            >
              <ul className="flex gap-4 sm:gap-7">
                {chapters.map((item, i) => (
                  <li key={item.year}>
                    <button
                      type="button"
                      onClick={() => goToChapter(i)}
                      aria-current={index === i ? "true" : undefined}
                      className={cn(
                        "label cursor-pointer tabular-nums transition-colors duration-400",
                        index === i ? "text-ink" : "text-whisper hover:text-mist",
                      )}
                    >
                      <span className="sm:hidden">{item.year.slice(2)}</span>
                      <span className="hidden sm:inline">{item.year}</span>
                    </button>
                  </li>
                ))}
              </ul>
              <p className="label text-whisper tabular-nums">
                {chapter.index} / 0{chapters.length}
              </p>
            </nav>

            <div className="grid items-center gap-8 pt-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16 lg:pt-12">
              <figure className="relative">
                <div className="text-ink relative aspect-[4/3] max-h-[26svh] w-full overflow-hidden lg:max-h-none">
                  <AnimatePresence mode="popLayout">
                    <motion.div key={chapter.year} {...fade} className="absolute inset-0">
                      <FigurePlate
                        kind={chapter.plate}
                        label={chapter.caption}
                        className="h-full w-full"
                      />
                    </motion.div>
                  </AnimatePresence>
                </div>
                <figcaption className="label text-whisper mt-4 hidden sm:block">
                  Fig. {chapter.index} — {chapter.caption}
                </figcaption>
              </figure>

              <div className="relative">
                <AnimatePresence mode="popLayout">
                  <motion.div key={chapter.year} {...fade}>
                    <p className="label text-pine">
                      Chapter {chapter.index}
                      <span className="text-whisper px-2">·</span>
                      <span className="text-mist">{chapter.marker}</span>
                    </p>

                    <h3 className="font-display mt-6 max-w-[16ch] text-[clamp(1.75rem,3.6vw,3.25rem)] leading-[0.98] font-light tracking-tight">
                      {chapter.title}
                    </h3>

                    <p className="text-mist mt-6 max-w-[52ch] text-sm leading-relaxed font-light sm:text-base">
                      {chapter.body}
                    </p>
                  </motion.div>
                </AnimatePresence>

                <motion.span
                  aria-hidden="true"
                  style={{ y: ghostY, opacity: ghostOpacity }}
                  className="wordmark pointer-events-none absolute -top-16 right-0 -z-10 hidden text-[10rem] leading-none tabular-nums select-none lg:block lg:text-[14rem]"
                >
                  {chapter.year}
                </motion.span>
              </div>
            </div>

            <div className="bg-line relative mt-10 h-px w-full overflow-hidden" aria-hidden="true">
              <motion.div
                className="bg-ink absolute inset-0 origin-left"
                style={{ scaleX: scrollYProgress }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
