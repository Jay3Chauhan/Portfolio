"use client";

import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { useEffect, useRef, useState } from "react";
import { Magnetic } from "@/components/primitives/magnetic";
import { SectionHeader } from "@/components/primitives/section-header";
import { Tilt } from "@/components/primitives/tilt";
import { work, type WorkItem } from "@/content/work";
import { useHydrated } from "@/lib/use-hydrated";
import { cn } from "@/lib/utils";

export function Work() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const [distance, setDistance] = useState(0);
  const [current, setCurrent] = useState(0);
  const reduce = useReducedMotion();
  const hydrated = useHydrated();

  // Measure how far the track must travel. Runs on mount and resize only —
  // never during scroll.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const measure = () => {
      setDistance(Math.max(0, track.scrollWidth - window.innerWidth));
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(track);
    window.addEventListener("resize", measure);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  // Pinning is an enhancement: the first render (and any reduced-motion
  // session) gets a plain swipeable rail instead.
  const pinned = hydrated && !reduce && distance > 0;

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const x = useTransform(scrollYProgress, [0, 1], [0, pinned ? -distance : 0]);

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    if (!pinned) return;
    const index = Math.min(work.length - 1, Math.round(value * (work.length - 1)));
    setCurrent(index);
  });

  return (
    <section id="work" className="pt-section scroll-mt-24">
      <SectionHeader index="02" kicker="Selected work" title="Four systems, running." />

      <div
        ref={sectionRef}
        style={pinned ? { height: `calc(100svh + ${distance}px)` } : undefined}
        className="relative mt-14"
      >
        <div
          className={cn(
            "flex flex-col justify-center",
            pinned && "sticky top-0 h-[100svh] overflow-hidden pt-[var(--nav-h)] pb-4",
          )}
        >
          <motion.div
            ref={trackRef}
            style={pinned ? { x } : undefined}
            className={cn(
              "flex w-max gap-6 px-[var(--spacing-gutter)] will-change-transform",
              !pinned && "w-full snap-x snap-mandatory overflow-x-auto pb-6",
            )}
          >
            {work.map((item, i) => (
              <WorkPanel
                key={item.id}
                item={item}
                active={pinned ? current === i : true}
                dimmed={pinned && current !== i}
              />
            ))}
          </motion.div>

          <div className="gutter mt-8 flex items-center gap-6">
            <div className="bg-line relative h-px flex-1 overflow-hidden">
              <motion.div
                className="bg-ink absolute inset-0 origin-left"
                style={{ scaleX: pinned ? scrollYProgress : 0 }}
              />
            </div>
            <div className="label text-mist flex gap-2 tabular-nums" aria-hidden="true">
              {work.map((item, i) => (
                <span
                  key={item.id}
                  className={cn(
                    "transition-colors duration-500",
                    pinned && current === i && "text-ink",
                  )}
                >
                  {item.index}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function WorkPanel({
  item,
  active,
  dimmed,
}: {
  item: WorkItem;
  active: boolean;
  dimmed: boolean;
}) {
  return (
    <Tilt className="shrink-0 snap-center">
      <article
        className={cn(
          "border-line bg-paper-raised/60 relative flex w-[86vw] flex-col",
          "border p-5 transition-[transform,opacity,border-color] duration-700 ease-editorial sm:p-9 lg:w-[62vw] xl:w-[54vw]",
          active && "border-line-strong",
          dimmed && "scale-[0.94] opacity-45",
        )}
      >
        <span
          aria-hidden="true"
          className={cn(
            "wordmark text-ink/[0.035] pointer-events-none absolute -top-2 right-4 text-[9rem] leading-none select-none sm:text-[13rem]",
            "transition-transform duration-700 ease-editorial",
            active && "translate-x-2 -translate-y-1",
          )}
        >
          {item.index}
        </span>

        <div className="relative flex items-baseline justify-between gap-4">
          <span className="label text-ink">Work.{item.index}</span>
          <span className="label text-pine">{item.tag}</span>
        </div>

        <div className="relative mt-auto grid gap-6 pt-7 sm:pt-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
          <div>
            <h3 className="font-display text-[clamp(2rem,4.2vw,3.5rem)] leading-[0.92] font-light tracking-tight">
              {item.name}
            </h3>
            <p className="font-display text-mist mt-2 text-base font-light italic sm:mt-3 sm:text-lg">
              {item.subtitle}
            </p>
            <p className="text-mist mt-5 max-w-[46ch] text-sm leading-[1.6] font-light sm:mt-6 sm:text-base sm:leading-relaxed">
              {item.description}
            </p>
          </div>

          <div>
            <dl>
              {item.metrics.map((metric) => (
                <div
                  key={metric.label}
                  className="rule-b flex items-baseline justify-between gap-4 py-2.5 sm:py-3"
                >
                  <dt className="label text-whisper">{metric.label}</dt>
                  <dd className="flex items-baseline gap-2.5">
                    <span className="text-ink font-mono text-sm" data-numeric>
                      {metric.value}
                    </span>
                    {metric.lead ? (
                      <span className="label-sm text-pine border-pine/40 rounded-full border px-1.5 py-0.5">
                        Lead
                      </span>
                    ) : null}
                  </dd>
                </div>
              ))}
            </dl>

            <p className="label text-whisper mt-4 leading-[1.9] sm:mt-5">
              {item.stack.join("  ·  ")}
            </p>
          </div>
        </div>

        <div className="rule-t relative mt-6 flex items-center justify-between gap-4 pt-4 sm:mt-9">
          <p className="label text-mist">{item.footnote}</p>
          {item.href ? (
            <Magnetic strength={0.22}>
              <a
                href={item.href}
                target="_blank"
                rel="noreferrer"
                className="label link-wipe text-ink shrink-0"
              >
                View ↗
              </a>
            </Magnetic>
          ) : (
            <span className="label text-whisper shrink-0">Private repository</span>
          )}
        </div>
      </article>
    </Tilt>
  );
}
