import Image from "next/image";
import { Counter } from "@/components/primitives/counter";
import { DepthCard } from "@/components/primitives/scroll-effects";
import { Reveal, RuleLine, SplitText } from "@/components/primitives/split-text";
import { SectionHeader } from "@/components/primitives/section-header";
import { dossier, footnote, headline, paragraphs, portrait } from "@/content/premise";
import { figures, identity } from "@/content/site";
import { cn } from "@/lib/utils";

export function Premise() {
  return (
    <section id="premise" className="pt-section scroll-mt-24">
      <SectionHeader index="01" kicker="The premise" />

      <div className="gutter mt-10 grid gap-x-16 gap-y-12 sm:mt-12 lg:grid-cols-[1.15fr_0.85fr]">
        <div>
          <SplitText
            as="h2"
            text={headline}
            className="font-display text-title max-w-[15ch] font-light"
          />

          <div className="text-mist mt-8 max-w-[54ch] space-y-5 text-base leading-relaxed font-light sm:mt-10 sm:space-y-6 sm:text-lg">
            {paragraphs.map((paragraph, i) => (
              <Reveal key={i} delay={0.05 + i * 0.07}>
                <p>{paragraph}</p>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.24} className="mt-10 sm:mt-12">
            <p className="label text-ink">
              {footnote.lead}
              <span className="text-whisper px-3">·</span>
              <span className="text-mist">{footnote.trail}</span>
            </p>
          </Reveal>
        </div>

        <div className="lg:pt-2">
          {/* Portrait stays a plain sized box — no masked/parallax wrapper around
              next/image fill. Those wrappers collapsed the image to height 0. */}
          <Reveal>
            <figure>
              <div className="bg-paper-sunk border-line relative aspect-[4/5] w-full overflow-hidden border">
                <Image
                  src={portrait.src}
                  alt={`${identity.fullName}, ${identity.role}`}
                  fill
                  priority
                  sizes="(max-width: 1024px) 90vw, 34vw"
                  className="object-cover object-top grayscale transition-[filter,transform] duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-[1.03] hover:grayscale-0"
                />
              </div>
              <figcaption className="label text-mist mt-4">
                {portrait.figure} — {identity.fullName}, {identity.location}
              </figcaption>
            </figure>
          </Reveal>

          <Reveal delay={0.1}>
            <dl className="mt-8 sm:mt-10">
              {dossier.map((row) => (
                <div
                  key={row.key}
                  className="rule-b flex items-baseline justify-between gap-6 py-3.5"
                >
                  <dt className="label text-whisper">{row.key}</dt>
                  <dd className="text-ink text-right text-sm font-light">{row.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>

      <div className="gutter mt-10 overflow-visible sm:mt-20 lg:mt-24">
        <RuleLine />
        <dl className="grid grid-cols-2 overflow-visible md:grid-cols-4">
          {figures.map((figure, i) => (
            <DepthCard
              key={figure.label}
              delay={i * 0.08}
              className={cn(
                // dt precedes dd in the DOM so the <dl> stays valid; the visual
                // order (figure first) comes back via flex-col-reverse.
                "border-line flex flex-col-reverse justify-end overflow-visible pt-8 pb-7 pr-5 sm:pt-10 sm:pb-8 sm:pr-6 md:pl-8",
                i >= 2 && "border-t md:border-t-0",
                i === 0 ? "md:pl-0" : "md:border-l",
              )}
            >
              <dt className="text-ink text-sm font-normal">
                {figure.label}
                <span className="label text-whisper mt-2 block">{figure.note}</span>
              </dt>
              <dd className="font-display mb-3 overflow-visible pt-1 text-[clamp(2.5rem,5.5vw,4.5rem)] leading-[1] font-light sm:mb-4">
                <Counter
                  to={figure.value}
                  suffix={figure.suffix}
                  duration={1.4 + i * 0.15}
                />
              </dd>
            </DepthCard>
          ))}
        </dl>
      </div>
    </section>
  );
}
