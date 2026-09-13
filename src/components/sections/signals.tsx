import { Marquee } from "@/components/primitives/marquee";
import { ScrollLift } from "@/components/primitives/scroll-effects";
import { Reveal, SplitText } from "@/components/primitives/split-text";
import { SectionHeader } from "@/components/primitives/section-header";
import { ClaimRow } from "@/components/sections/claim-row";
import { claims, credentials, credlyProfile, issuers } from "@/content/signals";

export function Signals() {
  return (
    <section id="signals" className="pt-section scroll-mt-24">
      <SectionHeader index="06" kicker="Signals" title="Quietly verifiable." />

      <div className="gutter mt-10 sm:mt-14">
        {claims.map((claim, i) => (
          <ClaimRow key={claim.figure} claim={claim} index={i} total={claims.length} />
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
            Verify on Credly ↗<span className="sr-only"> (opens in a new tab)</span>
          </a>
        </div>

        {/* The ledger scrubs as a single slab rather than per row: one scroll
            subscription for the whole list instead of one per credential. */}
        <ScrollLift lift={18} className="mt-8 sm:mt-10">
          <ul>
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
                          className="bg-pine absolute inset-y-0 left-0 w-px origin-top scale-y-0 transition-transform duration-500 ease-editorial group-hover:scale-y-100 group-focus-visible:scale-y-100"
                        />
                        {Row}
                        <span className="sr-only">
                          Verify {credential.name} (opens in a new tab)
                        </span>
                      </a>
                    ) : (
                      <div className="flex items-baseline gap-4 py-5 sm:gap-6">{Row}</div>
                    )}
                  </Reveal>
                </li>
              );
            })}
          </ul>
        </ScrollLift>
      </div>
    </section>
  );
}
