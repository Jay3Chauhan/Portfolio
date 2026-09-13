"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { Marquee } from "@/components/primitives/marquee";
import { RiseText } from "@/components/primitives/rise-text";
import { ScrollCue } from "@/components/primitives/scroll-cue";
import { identity, ticker } from "@/content/site";
import { useDesktop } from "@/lib/use-desktop";
import { useHydrated } from "@/lib/use-hydrated";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const hydrated = useHydrated();
  const desktop = useDesktop();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Raw transforms only — no useSpring, so these stay on the compositor.
  // Reduced-motion users keep the content pinned and fully opaque.
  const contentY = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["0%", "26%"]);
  const contentOpacity = useTransform(
    scrollYProgress,
    [0, 0.75],
    reduce ? [1, 1] : [1, 0],
  );
  const wordmarkX = useTransform(
    scrollYProgress,
    [0, 1],
    reduce ? ["0%", "0%"] : ["0%", "-14%"],
  );

  // The hero is above the fold, so nothing here may depend on hydration to be
  // visible. Gating only keeps the MotionValues out of the SSR markup; every
  // range starts at its identity value, so the ungated paint is the correct one.
  // Scrub is desktop-only. On a short phone hero, a few pixels of scroll
  // (or a bad first measurement) drives this opacity to 0 and leaves a
  // blank band where the headline should be.
  const scrub = hydrated && desktop && !reduce;

  return (
    <section
      ref={ref}
      id="top"
      className="relative flex flex-col overflow-hidden pt-[var(--nav-h)] lg:min-h-[100svh] lg:justify-between"
    >
      <h1 className="sr-only">
        {identity.fullName} — {identity.role}. {identity.tagline.join(" ")}
      </h1>

      <motion.div
        style={scrub ? { y: contentY, opacity: contentOpacity } : undefined}
        className="gutter flex flex-col pt-8 pb-8 lg:flex-1 lg:justify-center lg:pt-12 lg:pb-8"
      >
        <div
          className="text-mist flex flex-wrap items-baseline justify-between gap-x-8 gap-y-1"
          aria-hidden="true"
        >
          <span className="label animate-fade" style={{ animationDelay: "0.15s" }}>
            {identity.role}
          </span>
          <span
            className="label text-pine animate-fade flex items-center gap-2"
            style={{ animationDelay: "0.25s" }}
          >
            <span className="bg-pine relative inline-flex size-1.5">
              <span className="bg-pine absolute inset-0 animate-ping rounded-full opacity-40 [animation-duration:2.4s]" />
              <span className="bg-pine relative inline-block size-1.5 rounded-full" />
            </span>
            Available for work
          </span>
        </div>

        <div className="mt-8 sm:mt-[clamp(2.5rem,7vh,5rem)]" aria-hidden="true">
          {identity.tagline.map((line, i) => (
            <RiseText
              key={line}
              as="div"
              text={line}
              delay={0.2 + i * 0.12}
              className="font-display text-display block font-light"
            />
          ))}
        </div>

        <p
          className="text-mist animate-fade mt-6 max-w-[52ch] text-base leading-relaxed font-light sm:mt-[clamp(2rem,5vh,3.5rem)] sm:text-lg"
          style={{ animationDelay: "0.7s" }}
        >
          {identity.premise}
        </p>
      </motion.div>

      <div className="pb-6">
        <motion.div
          style={scrub ? { x: wordmarkX } : undefined}
          className={scrub ? "will-change-transform" : undefined}
        >
          <Marquee
            items={[identity.wordmark]}
            separator="·"
            duration={30}
            className="text-ink/10"
            itemClassName="wordmark text-[clamp(3.25rem,12.5vw,13rem)] leading-[0.82] whitespace-nowrap select-none"
          />
        </motion.div>

        <div className="gutter rule-t mt-6 flex items-center justify-between gap-6 pt-4">
          <ScrollCue href="#premise" />

          <Marquee
            items={ticker}
            duration={55}
            className="label text-whisper hidden max-w-[42vw] md:flex"
          />

          <span className="label text-mist text-right">{identity.location}</span>
        </div>
      </div>
    </section>
  );
}
