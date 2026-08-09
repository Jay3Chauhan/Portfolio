import Link from "next/link";
import { contact, identity, sections, socials } from "@/content/site";

const year = new Date().getFullYear();

export function Footer() {
  return (
    <footer className="bg-paper-sunk sticky bottom-0">
      <div className="gutter border-line border-t pt-14">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <p className="text-mist max-w-[34ch] text-sm leading-relaxed font-light">
              {identity.role} building Python and FastAPI systems for fintech, plus
              retrieval pipelines that are made to cite their sources.
            </p>
            <a
              href={`mailto:${contact.email}`}
              className="link-wipe text-ink mt-6 inline-block text-sm font-light"
            >
              {contact.email}
            </a>
          </div>

          <nav aria-label="Footer index">
            <p className="label text-mist">Index</p>
            <ul className="mt-5 space-y-3">
              {sections.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="link-wipe text-mist hover:text-ink text-sm font-light transition-colors"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
              <li>
                <Link
                  href="/blog"
                  className="link-wipe text-mist hover:text-ink text-sm font-light transition-colors"
                >
                  All writing
                </Link>
              </li>
            </ul>
          </nav>

          <nav aria-label="Social profiles" className="lg:pt-0">
            <p className="label text-mist">Elsewhere</p>
            <ul className="mt-5 space-y-3">
              {socials.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    className="link-wipe text-mist hover:text-ink text-sm font-light transition-colors"
                  >
                    {social.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="label text-mist">Colophon</p>
            <ul className="text-mist mt-5 space-y-3 text-sm font-light">
              <li>Next.js, React and Tailwind</li>
              <li>Set in Archivo & Newsreader</li>
              <li>
                <a
                  href="/feed.xml"
                  className="link-wipe hover:text-ink transition-colors"
                >
                  RSS feed
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="gutter mt-16" aria-hidden="true">
        <p className="wordmark text-ink/[0.07] text-[clamp(3rem,15.5vw,17rem)] leading-[0.78] whitespace-nowrap select-none">
          {identity.wordmark}
        </p>
      </div>

      <div className="gutter rule-t flex flex-wrap items-center justify-between gap-4 py-6">
        <p className="label text-mist">
          © {year} {identity.fullName}
        </p>
        <p className="label text-mist">Made in {identity.location}</p>
        <a
          href="#top"
          className="label link-wipe text-mist hover:text-ink transition-colors"
        >
          Back to top ↑
        </a>
      </div>
    </footer>
  );
}
