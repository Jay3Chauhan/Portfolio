"use client";

import { AnimatePresence, motion } from "motion/react";
import { useRef, useState } from "react";
import { SectionHeader } from "@/components/primitives/section-header";
import { VelocityMarquee } from "@/components/primitives/velocity-marquee";
import { disciplines, LOAD_TOTAL, stackStatement } from "@/content/stack";
import { cn } from "@/lib/utils";

export function Stack() {
  const [index, setIndex] = useState(0);
  const tabsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const active = disciplines[index];

  function onKeyDown(event: React.KeyboardEvent) {
    const delta = event.key === "ArrowRight" ? 1 : event.key === "ArrowLeft" ? -1 : 0;
    if (!delta) return;

    event.preventDefault();
    const next = (index + delta + disciplines.length) % disciplines.length;
    setIndex(next);
    tabsRef.current[next]?.focus();
  }

  return (
    <section id="stack" className="pt-section scroll-mt-24">
      <SectionHeader
        index="03"
        kicker="Under the hood"
        title="Inside."
        lede="Four disciplines carrying real weight, measured by where the build time actually goes."
      />

      <div className="gutter mt-16">
        <div
          role="tablist"
          aria-label="Engineering disciplines"
          onKeyDown={onKeyDown}
          className="rule-t rule-b flex flex-wrap"
        >
          {disciplines.map((discipline, i) => (
            <button
              key={discipline.id}
              ref={(node) => {
                tabsRef.current[i] = node;
              }}
              role="tab"
              type="button"
              id={`stack-tab-${discipline.id}`}
              aria-selected={index === i}
              aria-controls={`stack-panel-${discipline.id}`}
              tabIndex={index === i ? 0 : -1}
              onClick={() => setIndex(i)}
              className={cn(
                "label relative flex-1 cursor-pointer px-2 py-5 text-left transition-colors duration-400 sm:text-center",
                index === i ? "text-ink" : "text-whisper hover:text-mist",
              )}
            >
              <span className="mr-2 tabular-nums">0{i + 1}</span>
              {discipline.name}
              {index === i ? (
                <motion.span
                  layoutId="stack-tab-underline"
                  className="bg-ink absolute inset-x-0 -bottom-px h-px"
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                />
              ) : null}
            </button>
          ))}
        </div>

        <div
          role="tabpanel"
          id={`stack-panel-${active.id}`}
          aria-labelledby={`stack-tab-${active.id}`}
          className="min-h-0 py-10 sm:min-h-[22rem] sm:py-12 lg:min-h-[26rem]"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={{ opacity: 0, y: 18, scale: 0.985 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.99 }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className="grid origin-top gap-x-16 gap-y-10 lg:grid-cols-[1fr_1fr]"
            >
              <div>
                <p className="label text-whisper">
                  0{index + 1} / 0{disciplines.length}
                </p>
                <h3 className="font-display mt-6 text-[clamp(2.5rem,6vw,5rem)] leading-[0.9] font-light tracking-tight">
                  {active.name}
                </h3>
                <p className="font-display text-mist mt-3 text-lg font-light italic">
                  {active.classification}
                </p>
                <p className="text-mist mt-8 max-w-[46ch] text-base leading-relaxed font-light sm:text-lg">
                  {active.description}
                </p>
              </div>

              <div className="lg:pt-16">
                <dl>
                  <Row label="Source" value={active.source} />
                  <Row label="Role" value={active.role} />
                  {/* dt and dd must be direct children of this wrapper, so the
                      bar lives in a second dd rather than a nested div. */}
                  <div className="rule-b grid grid-cols-2 items-baseline gap-x-4 py-4">
                    <dt className="label text-whisper">Load</dt>
                    <dd className="text-ink text-right font-mono text-sm" data-numeric>
                      {active.load} of {LOAD_TOTAL}
                    </dd>
                    <dd className="col-span-2 mt-4">
                      <span className="bg-line block h-px w-full">
                        <motion.span
                          className="bg-pine block h-px origin-left"
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: active.load / LOAD_TOTAL }}
                          transition={{ duration: 1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                        />
                      </span>
                      <span className="label-sm text-whisper mt-3 block">
                        Relative share of build time
                      </span>
                    </dd>
                  </div>
                </dl>

                <ul className="mt-8 flex flex-wrap gap-2">
                  {active.tools.map((tool) => (
                    <li
                      key={tool}
                      className="label border-line text-mist rounded-full border px-3 py-2"
                    >
                      {tool}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <div className="rule-t rule-b bg-paper-sunk/40 mt-6 py-6">
        <VelocityMarquee
          items={[stackStatement]}
          separator="—"
          baseVelocity={1.1}
          className="wordmark text-ink/80 text-[clamp(1.5rem,3.5vw,3rem)] uppercase"
        />
      </div>
    </section>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="rule-b flex items-baseline justify-between gap-6 py-4">
      <dt className="label text-whisper shrink-0">{label}</dt>
      <dd className="text-ink text-right text-sm font-light">{value}</dd>
    </div>
  );
}
