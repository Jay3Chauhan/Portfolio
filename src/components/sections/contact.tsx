"use client";

import { ContactForm } from "@/components/sections/contact-form";
import { Magnetic } from "@/components/primitives/magnetic";
import { Parallax } from "@/components/primitives/parallax";
import { Reveal, SplitText } from "@/components/primitives/split-text";
import { SectionHeader } from "@/components/primitives/section-header";
import { contact, identity, socials } from "@/content/site";

export function Contact() {
  return (
    <section
      id="contact"
      className="pt-section relative scroll-mt-24 overflow-hidden pb-[clamp(4rem,10vh,8rem)]"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-24 -z-10">
        <Parallax x={["8%", "-6%"]} opacity={[0.035, 0.07]}>
          <p className="wordmark text-ink whitespace-nowrap text-[clamp(4rem,18vw,14rem)] leading-none select-none">
            {identity.wordmark}
          </p>
        </Parallax>
      </div>

      <SectionHeader index="09" kicker="Contact" />

      <div className="gutter mt-12">
        <SplitText
          as="h2"
          text="Let's build something that stays up."
          className="font-display text-display max-w-[13ch] font-light"
        />

        <div className="mt-16 grid gap-x-16 gap-y-14 lg:grid-cols-[1fr_1fr]">
          <div>
            <Reveal>
              <p className="label text-whisper">Direct</p>
              <Magnetic className="inline-block" strength={0.28}>
                <a
                  href={`mailto:${contact.email}`}
                  className="link-wipe text-ink mt-4 inline-block text-[clamp(1.25rem,2.8vw,2.25rem)] leading-tight font-light break-all"
                >
                  {contact.email}
                </a>
              </Magnetic>
            </Reveal>

            <Reveal delay={0.08} className="mt-12">
              <dl>
                <div className="rule-b flex items-baseline justify-between gap-6 py-4">
                  <dt className="label text-whisper">Phone</dt>
                  <dd>
                    <a
                      href={`tel:${contact.phone}`}
                      className="link-wipe text-ink text-sm font-light"
                    >
                      {contact.phoneDisplay}
                    </a>
                  </dd>
                </div>
                <div className="rule-b flex items-baseline justify-between gap-6 py-4">
                  <dt className="label text-whisper">Based</dt>
                  <dd className="text-ink text-sm font-light">{identity.location}</dd>
                </div>
                <div className="rule-b flex items-baseline justify-between gap-6 py-4">
                  <dt className="label text-whisper">Status</dt>
                  <dd className="text-pine text-sm font-light">
                    {identity.availability}
                  </dd>
                </div>
                <div className="rule-b flex items-baseline justify-between gap-6 py-4">
                  <dt className="label text-whisper">Résumé</dt>
                  <dd>
                    <Magnetic strength={0.18} className="inline-block">
                      <a
                        href={contact.resumeUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="link-wipe text-ink text-sm font-light"
                      >
                        Download PDF ↗
                      </a>
                    </Magnetic>
                  </dd>
                </div>
              </dl>
            </Reveal>

            <Reveal delay={0.14} className="mt-12">
              <p className="label text-whisper">Elsewhere</p>
              <ul className="mt-5 flex flex-wrap gap-x-8 gap-y-3">
                {socials.map((social) => (
                  <li key={social.label}>
                    <Magnetic strength={0.18} className="inline-block">
                      <a
                        href={social.href}
                        target="_blank"
                        rel="noreferrer"
                        className="link-wipe text-ink text-sm font-light"
                      >
                        {social.label}
                        <span className="text-whisper ml-2 text-xs">{social.handle}</span>
                      </a>
                    </Magnetic>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <p className="label text-whisper mb-8">Or write here</p>
            <ContactForm />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
