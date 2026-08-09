import { ScrollReadAlong } from "@/components/primitives/scroll-read-along";
import { SectionHeader } from "@/components/primitives/section-header";
import { StackCards } from "@/components/primitives/stack-cards";
import { VelocityMarquee } from "@/components/primitives/velocity-marquee";
import { manifesto, method, principles } from "@/content/approach";

export function Approach() {
  return (
    <section id="approach" className="pt-section scroll-mt-24">
      <SectionHeader index="04" kicker="Approach" title="How the work gets made." />

      <div className="gutter mt-10 overflow-visible sm:mt-14">
        <ScrollReadAlong
          text={manifesto}
          className="font-display max-w-[34ch] text-[clamp(1.35rem,3.2vw,2.5rem)] leading-[1.35] font-light tracking-tight sm:max-w-[28ch]"
        />
      </div>

      <div className="rule-t rule-b mt-12 py-5 sm:mt-14">
        <VelocityMarquee
          items={method}
          separator="—"
          baseVelocity={1.4}
          className="label text-mist"
        />
      </div>

      <div className="gutter mt-12 sm:mt-14">
        <StackCards cardClassName="p-6 sm:p-9 lg:p-11" restOffset="1rem">
          {principles.map((principle) => (
            <div key={principle.index}>
              <div className="flex items-baseline justify-between gap-4">
                <span className="label text-pine">Principle {principle.index}</span>
                <span className="label text-whisper hidden sm:block">
                  {String(principles.length).padStart(2, "0")} total
                </span>
              </div>

              <div className="mt-7 grid gap-8 lg:mt-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
                <div>
                  <h3 className="font-display max-w-[18ch] text-[clamp(1.5rem,2.9vw,2.5rem)] leading-[1.08] font-light tracking-tight">
                    {principle.title}
                  </h3>
                  <p className="text-mist mt-5 max-w-[54ch] text-sm leading-relaxed font-light sm:mt-6 sm:text-base">
                    {principle.body}
                  </p>
                </div>

                <div className="lg:pt-1">
                  <p
                    className="font-display overflow-visible pt-1 text-[clamp(2.5rem,5vw,4rem)] leading-[1] font-light tracking-tight"
                    data-numeric
                  >
                    {principle.metric}
                  </p>
                  <p className="label text-whisper mt-4">{principle.metricLabel}</p>

                  <p className="rule-t text-mist mt-6 pt-5 text-sm leading-relaxed font-light sm:mt-7">
                    {principle.evidence}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </StackCards>
      </div>
    </section>
  );
}
