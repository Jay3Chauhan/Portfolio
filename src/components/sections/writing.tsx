import Link from "next/link";
import { Magnetic } from "@/components/primitives/magnetic";
import { Reveal } from "@/components/primitives/split-text";
import { SectionHeader } from "@/components/primitives/section-header";
import { getAllPosts } from "@/lib/blog";
import { formatDateShort } from "@/lib/utils";

export function Writing() {
  const posts = getAllPosts().slice(0, 3);

  if (posts.length === 0) return null;

  return (
    <section id="writing" className="pt-section scroll-mt-24">
      <SectionHeader
        index="08"
        kicker="Writing"
        title="Notes from the build."
        lede="Longer form on the things that were hard enough to be worth writing down."
      />

      <ul className="gutter mt-16">
        {posts.map((post, i) => (
          <li key={post.slug} className="rule-t last:rule-b">
            <Reveal delay={i * 0.06}>
              <Link
                href={`/blog/${post.slug}`}
                className="group relative isolate block overflow-hidden"
              >
                {/* Hover wipe. A transform on a pseudo-layer rather than a
                    background-color transition, so it stays composited. */}
                <span
                  aria-hidden="true"
                  className="bg-paper-raised absolute inset-0 -z-10 origin-left scale-x-0 transition-transform duration-700 ease-editorial group-hover:scale-x-100 group-focus-visible:scale-x-100"
                />

                <div className="grid gap-3 px-2 py-8 md:grid-cols-[6.5rem_1fr_9rem_auto] md:items-baseline md:gap-8 md:px-4">
                  <span className="label text-whisper tabular-nums">
                    {formatDateShort(post.date)}
                  </span>

                  <span className="min-w-0">
                    <span className="font-display text-ink block text-[clamp(1.25rem,2.2vw,1.75rem)] leading-[1.15] font-light transition-transform duration-700 ease-editorial group-hover:translate-x-1.5">
                      {post.title}
                    </span>
                    <span className="text-mist mt-2 block max-w-[62ch] text-sm leading-relaxed font-light">
                      {post.description}
                    </span>
                  </span>

                  <span className="label text-mist md:text-right">{post.category}</span>

                  <span className="label text-whisper group-hover:text-ink flex items-baseline gap-2 transition-colors md:justify-end">
                    <span className="tabular-nums">{post.readTime}</span>
                    <span
                      aria-hidden="true"
                      className="inline-block transition-transform duration-500 group-hover:translate-x-1"
                    >
                      ↗
                    </span>
                  </span>
                </div>
              </Link>
            </Reveal>
          </li>
        ))}
      </ul>

      <div className="gutter mt-12">
        <Magnetic strength={0.18} className="inline-block">
          <Link
            href="/blog"
            className="label link-wipe text-ink inline-flex items-baseline gap-2"
          >
            All writing
            <span aria-hidden="true">→</span>
          </Link>
        </Magnetic>
      </div>
    </section>
  );
}
