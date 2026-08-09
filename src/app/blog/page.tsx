import type { Metadata } from "next";
import Link from "next/link";
import { RiseText } from "@/components/primitives/rise-text";
import { getAllPosts } from "@/lib/blog";
import { formatDate } from "@/lib/utils";
import {
  absoluteUrl,
  getBlogListJsonLd,
  getBreadcrumbJsonLd,
  getWebPageJsonLd,
} from "@/lib/seo";

export const metadata: Metadata = {
  title: "Writing",
  description:
    "Technical articles, tutorials, and case studies on Python, FastAPI, GenAI, RAG pipelines, and backend engineering by Jay Chauhan.",
  alternates: {
    canonical: absoluteUrl("/blog"),
    types: { "application/rss+xml": absoluteUrl("/feed.xml") },
  },
  openGraph: {
    title: "Writing | Jay Chauhan",
    description:
      "Technical articles and case studies on backend engineering and applied AI.",
    url: absoluteUrl("/blog"),
    type: "website",
  },
};

export default function BlogPage() {
  const posts = getAllPosts();

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      getWebPageJsonLd(
        "/blog",
        "Writing | Jay Chauhan",
        "Technical articles on Python, FastAPI, GenAI, and backend engineering.",
      ),
      getBreadcrumbJsonLd([
        { name: "Home", path: "/" },
        { name: "Writing", path: "/blog" },
      ]),
      ...(posts.length > 0 ? [getBlogListJsonLd(posts)] : []),
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="gutter pt-[calc(var(--nav-h)+clamp(4rem,10vh,7rem))]">
        <div className="rule-b flex items-baseline gap-3 pb-4">
          <span className="label text-ink">07</span>
          <span aria-hidden="true" className="text-whisper text-[0.7rem]">
            /
          </span>
          <span className="label text-mist">Writing</span>
        </div>

        <RiseText
          as="h1"
          text="Notes from the backend."
          className="font-display text-display mt-10 block max-w-[14ch] font-light"
        />

        <p className="text-mist mt-8 max-w-[46ch] text-base leading-relaxed font-light sm:text-lg">
          Longer thinking on architecture, retrieval and the parts of production that only
          show up under load.
        </p>

        {posts.length === 0 ? (
          <p className="text-mist mt-20 text-lg font-light">
            Nothing published yet. The RSS feed is{" "}
            <a href="/feed.xml" className="link-wipe text-ink">
              here
            </a>{" "}
            when there is.
          </p>
        ) : (
          <ul className="mt-20">
            {posts.map((post, i) => (
              <li key={post.slug} className="rule-t">
                <Link
                  href={`/blog/${post.slug}`}
                  className="group grid gap-3 py-9 md:grid-cols-[4rem_1fr_10rem] md:gap-10"
                >
                  <span className="label text-whisper tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  <span>
                    <span className="font-display group-hover:text-pine block text-[clamp(1.5rem,2.6vw,2.25rem)] leading-[1.1] font-light transition-colors duration-500">
                      {post.title}
                    </span>
                    <span className="text-mist mt-3 block max-w-[58ch] text-sm leading-relaxed font-light">
                      {post.description}
                    </span>
                    <span className="label text-whisper mt-4 block">
                      {post.tags.join("  ·  ")}
                    </span>
                  </span>

                  <span className="label text-mist md:text-right">
                    <time dateTime={post.date}>{formatDate(post.date)}</time>
                    <span className="text-whisper mt-2 block">{post.readTime}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
