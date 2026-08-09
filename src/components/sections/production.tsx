import { Magnetic } from "@/components/primitives/magnetic";
import { Reveal } from "@/components/primitives/split-text";
import { SectionHeader } from "@/components/primitives/section-header";
import { apps, pipeline } from "@/content/production";
import { archive } from "@/content/work";

export function Production() {
  return (
    <section id="production" className="pt-section scroll-mt-24">
      <SectionHeader
        index="07"
        kicker="In production"
        title="Where the code runs."
        lede="Three apps on the App Store and Google Play, carrying backends I built and still maintain."
      />

      <div className="gutter mt-10 grid gap-4 sm:mt-14 md:grid-cols-3 md:gap-px">
        {apps.map((app, i) => (
          <Reveal key={app.id} delay={i * 0.07} className="h-full">
            <article className="border-line bg-paper-raised group flex h-full flex-col border p-6 sm:p-7 transition-colors duration-500 hover:border-line-strong">
              <div className="flex items-baseline justify-between gap-3">
                <span className="label text-pine">{app.category}</span>
                <span className="label text-whisper">{app.rating}</span>
              </div>

              <h3 className="font-display mt-8 text-[clamp(1.5rem,2.4vw,2.125rem)] leading-[1.05] font-light transition-transform duration-700 ease-editorial group-hover:-translate-y-0.5 sm:mt-10">
                {app.name}
              </h3>
              <p className="text-mist mt-3 text-sm leading-relaxed font-light">
                {app.tagline}
              </p>

              <dl className="mt-7 sm:mt-8">
                <dt className="label text-whisper">My part</dt>
                <dd className="text-mist mt-2 text-sm font-light">{app.contribution}</dd>
                <dt className="label text-whisper mt-5 sm:mt-6">Stack</dt>
                <dd className="label text-mist mt-2 leading-[1.9]">
                  {app.stack.join("  ·  ")}
                </dd>
              </dl>

              <div className="rule-t mt-auto flex flex-wrap gap-x-6 gap-y-2 pt-5">
                {app.links.map((link) => (
                  <Magnetic key={link.store} strength={0.2}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noreferrer"
                      className="label link-wipe text-ink"
                    >
                      {link.store} ↗
                    </a>
                  </Magnetic>
                ))}
              </div>
            </article>
          </Reveal>
        ))}
      </div>

      <div className="gutter mt-10 sm:mt-14">
        <div className="rule-t rule-b flex flex-wrap items-center gap-x-6 gap-y-3 py-5">
          <span className="label text-whisper">In the pipeline</span>
          {pipeline.map((item) => (
            <span key={item} className="label text-mist">
              {item}
            </span>
          ))}
        </div>
      </div>

      <div className="gutter mt-14 sm:mt-20">
        <div className="flex flex-wrap items-baseline justify-between gap-4">
          <h3 className="font-display text-[clamp(1.75rem,3vw,2.75rem)] font-light">
            Open archive.
          </h3>
          <p className="label text-whisper max-w-[34ch] text-right">
            Earlier public work, kept honest about its age
          </p>
        </div>

        <ul className="mt-8 sm:mt-10">
          {archive.map((item, i) => (
            <li key={item.name} className="rule-b">
              <Reveal delay={i * 0.05} y={18}>
                <a
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group relative grid gap-2 overflow-hidden py-5 sm:py-6 md:grid-cols-[7rem_1fr_auto] md:items-baseline md:gap-8"
                >
                  <span
                    aria-hidden="true"
                    className="bg-paper-raised absolute inset-0 -z-10 origin-left scale-x-0 transition-transform duration-700 ease-editorial group-hover:scale-x-100"
                  />
                  <span className="label text-whisper tabular-nums">{item.year}</span>
                  <span>
                    <span className="text-ink block text-lg font-light transition-transform duration-700 ease-editorial group-hover:translate-x-1.5 sm:text-xl">
                      {item.name}
                    </span>
                    <span className="text-mist mt-2 block max-w-[58ch] text-sm font-light">
                      {item.description}
                    </span>
                    <span className="label text-whisper mt-3 block">
                      {item.stack.join("  ·  ")}
                    </span>
                  </span>
                  <span className="label text-mist group-hover:text-ink transition-colors">
                    GitHub ↗
                  </span>
                </a>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
