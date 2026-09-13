import { Magnetic } from "@/components/primitives/magnetic";
import { DepthCard } from "@/components/primitives/scroll-effects";
import { SectionHeader } from "@/components/primitives/section-header";
import { feed } from "@/content/feed";
import { socials } from "@/content/site";
import { getRecentLinkedInPosts } from "@/lib/linkedin";
import { formatDateShort } from "@/lib/utils";

const profile = socials.find((social) => social.label === "LinkedIn");

/** Reserved while the bridge is in flight so a slow feed cannot hold TTFB. */
export function FeedPlaceholder() {
  return (
    <section id="feed" className="pt-section scroll-mt-24" aria-busy="true">
      <SectionHeader
        index={feed.index}
        kicker={feed.kicker}
        title={feed.title}
        lede={feed.lede}
      />
      <div className="gutter mt-14 h-[18rem]" aria-hidden="true" />
    </section>
  );
}

export async function Feed() {
  const posts = await getRecentLinkedInPosts(3);

  return (
    <section id="feed" className="pt-section scroll-mt-24">
      <SectionHeader
        index={feed.index}
        kicker={feed.kicker}
        title={feed.title}
        lede={feed.lede}
      />

      {posts.length > 0 ? (
        <ol className="gutter mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {/* Three cards in a two-up grid leave a hole; let the last fill it. */}
          {posts.map((post, index) => (
            <li key={post.id} className="sm:max-lg:last:col-span-2">
              <DepthCard delay={index * 0.08} className="h-full">
                <a
                  href={post.url}
                  target="_blank"
                  rel="noreferrer"
                  className="group border-line hover:bg-paper-raised flex h-full flex-col border p-6 transition-colors duration-500 sm:p-7"
                >
                  <p className="label text-whisper flex items-baseline justify-between gap-4">
                    <span className="tabular-nums" data-numeric>
                      {post.publishedAt ? formatDateShort(post.publishedAt) : feed.kicker}
                    </span>
                    <span
                      aria-hidden="true"
                      className="inline-block transition-transform duration-500 group-hover:translate-x-1"
                    >
                      ↗
                    </span>
                  </p>

                  {/* Bridged posts have no real title — the first lines *are*
                      the headline, so clamp the body rather than invent one. */}
                  <p className="text-ink mt-5 line-clamp-6 text-[0.95rem] leading-relaxed font-light whitespace-pre-line">
                    {post.text}
                  </p>

                  <span className="label text-whisper group-hover:text-ink mt-auto pt-8 transition-colors">
                    Read on LinkedIn
                    <span className="sr-only"> (opens in a new tab)</span>
                  </span>
                </a>
              </DepthCard>
            </li>
          ))}
        </ol>
      ) : (
        <p className="gutter text-mist mt-12 max-w-[48ch] text-sm leading-relaxed font-light">
          {feed.fallback}
        </p>
      )}

      {profile ? (
        <div className="gutter mt-12">
          <Magnetic strength={0.18} className="inline-block">
            <a
              href={profile.href}
              target="_blank"
              rel="noreferrer"
              className="label link-wipe text-ink inline-flex items-baseline gap-2"
            >
              {feed.cta}
              <span aria-hidden="true">→</span>
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </Magnetic>
        </div>
      ) : null}
    </section>
  );
}
