"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { Marquee } from "@/components/primitives/marquee";
import { RiseText } from "@/components/primitives/rise-text";
import { ScrollCue } from "@/components/primitives/scroll-cue";
import { identity, ticker } from "@/content/site";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
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

  return (
    <section
      ref={ref}
      id="top"
      className="relative flex min-h-[100svh] flex-col justify-between overflow-hidden pt-[var(--nav-h)]"
    >
      <h1 className="sr-only">
        {identity.fullName} — {identity.role}. {identity.tagline.join(" ")}
      </h1>

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="gutter flex flex-1 flex-col justify-center pt-6 pb-8 sm:pt-12"
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

        <div className="mt-[clamp(2.5rem,7vh,5rem)]" aria-hidden="true">
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
          className="text-mist animate-fade mt-[clamp(2rem,5vh,3.5rem)] max-w-[52ch] text-base leading-relaxed font-light sm:text-lg"
          style={{ animationDelay: "0.7s" }}
        >
          {identity.premise}
        </p>
      </motion.div>

      <div className="pb-6">
        <motion.div style={{ x: wordmarkX }} className="will-change-transform">
          <Marquee
            items={[identity.wordmark]}
            separator="·"
            duration={30}
            className="text-ink/[0.09] dark:text-ink/[0.12]"
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
