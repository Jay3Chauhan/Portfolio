"use client";

import { motion, useReducedMotion } from "motion/react";
import { useRef, useState } from "react";
import { Reveal } from "@/components/primitives/split-text";
import { playground, sorts, type Sort } from "@/content/playground";

/** Each kind is a different object off the same imaginary type case. */
function SortFace({ sort }: { sort: Sort }) {
  switch (sort.kind) {
    case "glyph":
      return (
        <span className="font-display text-ink block text-[clamp(3rem,7vw,5.5rem)] leading-none font-light">
          {sort.value}
        </span>
      );
    case "quad":
      return <span className="bg-ink block size-11 sm:size-14" />;
    case "ring":
      return <span className="border-ink block size-12 rounded-full border sm:size-16" />;
    case "rule":
      return <span className="bg-ink block h-px w-24 sm:w-32" />;
    case "chip":
      return (
        <span className="label border-line text-mist block rounded-full border px-4 py-2">
          {sort.value}
        </span>
      );
  }
}

export function Playground() {
  const trayRef = useRef<HTMLDivElement>(null);
  const [moved, setMoved] = useState(0);
  // Remounting the pieces is the cheapest honest reset — motion owns their
  // transforms, so a fresh key puts every sort back in its slot.
  const [generation, setGeneration] = useState(0);
  const reduce = useReducedMotion();

  return (
    <section className="pt-section gutter pb-[clamp(3rem,8vh,6rem)]">
      <Reveal>
        <div className="rule-t flex flex-wrap items-baseline justify-between gap-x-8 gap-y-3 pt-6">
          <p className="label text-whisper">{playground.kicker}</p>
          <p className="label text-whisper tabular-nums" data-numeric>
            {playground.counterLabel} — {String(moved).padStart(2, "0")}
          </p>
        </div>

        <div className="mt-10 grid gap-x-16 gap-y-6 lg:grid-cols-[1fr_1fr] lg:items-end">
          <h2 className="font-display text-[clamp(2.25rem,6vw,4.5rem)] leading-[1.02] font-light tracking-tight">
            {playground.title}
          </h2>
          <p className="text-mist max-w-[46ch] text-sm leading-relaxed font-light">
            {playground.lede}
          </p>
        </div>
      </Reveal>

      {/* data-lenis-prevent: without it a touch-drag inside the tray also
          scrolls the page underneath it. */}
      <div
        ref={trayRef}
        data-lenis-prevent
        className="border-line bg-paper-sunk relative mt-12 h-[clamp(19rem,46vw,26rem)] overflow-hidden border"
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-[0.5] [background-image:radial-gradient(var(--line-strong)_1px,transparent_1px)] [background-size:1.5rem_1.5rem]"
        />

        <p className="label text-whisper pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 text-center">
          {playground.hint}
        </p>

        <p className="sr-only">{playground.description}</p>

        <div key={generation} aria-hidden="true">
          {sorts.map((sort) => (
            <motion.div
              key={sort.id}
              drag
              dragConstraints={trayRef}
              dragElastic={0.06}
              dragMomentum={!reduce}
              dragTransition={{ power: 0.35, timeConstant: 460, bounceStiffness: 120, bounceDamping: 18 }}
              whileDrag={{ scale: reduce ? 1 : 1.06, zIndex: 20 }}
              onDragEnd={() => setMoved((count) => count + 1)}
              style={{ left: sort.left, top: sort.top }}
              className="absolute cursor-grab touch-none select-none active:cursor-grabbing"
            >
              <SortFace sort={sort} />
            </motion.div>
          ))}
        </div>
      </div>

      <div className="mt-6 flex justify-end">
        <button
          type="button"
          onClick={() => {
            setGeneration((value) => value + 1);
            setMoved(0);
          }}
          className="label text-whisper hover:text-ink flex min-h-11 cursor-pointer items-center transition-colors"
        >
          {playground.reset}
        </button>
      </div>
    </section>
  );
}
