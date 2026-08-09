"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { Marquee } from "@/components/primitives/marquee";
import { Reveal, SplitText } from "@/components/primitives/split-text";
import { SectionHeader } from "@/components/primitives/section-header";
import { claims, credentials, credlyProfile, issuers } from "@/content/signals";
import { useHydrated } from "@/lib/use-hydrated";
import { cn } from "@/lib/utils";

export function Signals() {
  return (
    <section id="signals" className="pt-section scroll-mt-24">
      <SectionHeader index="06" kicker="Signals" title="Quietly verifiable." />

      <div className="gutter mt-10 sm:mt-14">
        {claims.map((claim, i) => (
          <ClaimRow key={claim.figure} claim={claim} index={i} />
        ))}
      </div>

      <div className="rule-t rule-b mt-8 py-5">
        <Marquee
          items={issuers}
          duration={46}
          reverse
          className="label text-mist"
          separator="—"
        />
      </div>

      <div className="gutter mt-10 sm:mt-14">
        <div className="flex flex-wrap items-baseline justify-between gap-4">
          <SplitText
            as="h3"
            text="The ledger."
            className="font-display text-[clamp(1.75rem,3vw,2.75rem)] font-light"
          />
          <a
            href={credlyProfile}
            target="_blank"
            rel="noreferrer"
            className="label link-wipe text-mist hover:text-ink transition-colors"
          >
            Verify on Credly ↗
          </a>
        </div>

        <ul className="mt-8 sm:mt-10">
          {credentials.map((credential, i) => {
            const Row = (
              <>
                <span className="label text-whisper w-8 shrink-0 tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-ink min-w-0 flex-1 text-base font-light sm:text-lg">
                  {credential.name}
                </span>
                <span className="label text-mist hidden shrink-0 sm:block sm:w-52">
                  {credential.issuer}
                </span>
                <span className="label text-whisper w-20 shrink-0 text-right tabular-nums">
                  {credential.date}
                </span>
                <span className="label text-mist w-4 shrink-0 text-right">
                  {credential.href ? "↗" : ""}
                </span>
              </>
            );

            return (
              <li key={`${credential.issuer}-${credential.name}`} className="rule-b">
                <Reveal delay={Math.min(i * 0.04, 0.28)} y={16}>
                  {credential.href ? (
                    <a
                      href={credential.href}
                      target="_blank"
                      rel="noreferrer"
                      className="hover:bg-paper-raised group relative flex items-baseline gap-4 overflow-hidden py-5 transition-colors duration-300 sm:gap-6"
                    >
                      <span
                        aria-hidden="true"
                        className="bg-pine absolute inset-y-0 left-0 w-px origin-top scale-y-0 transition-transform duration-500 ease-editorial group-hover:scale-y-100"
                      />
                      {Row}
                    </a>
                  ) : (
                    <div className="flex items-baseline gap-4 py-5 sm:gap-6">{Row}</div>
                  )}
                </Reveal>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

function ClaimRow({
  claim,
  index,
}: {
  claim: (typeof claims)[number];
  index: number;
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
        index === claims.length - 1 && "rule-b",
      )}
    >
      <motion.div
        style={scrub ? { x: figureX, opacity: figureOpacity } : undefined}
        className="font-display overflow-visible pt-1 text-[clamp(3rem,7vw,6rem)] leading-[1] font-light tracking-tight will-change-transform"
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
