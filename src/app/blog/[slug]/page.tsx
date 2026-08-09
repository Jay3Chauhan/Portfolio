import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { remark } from "remark";
import remarkHtml from "remark-html";
import { RiseText } from "@/components/primitives/rise-text";
import { getAllSlugs, getPostBySlug } from "@/lib/blog";
import { formatDate } from "@/lib/utils";
import {
  absoluteUrl,
  getBlogPostingJsonLd,
  getBreadcrumbJsonLd,
  getWebPageJsonLd,
  siteConfig,
} from "@/lib/seo";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.description,
    keywords: post.tags,
    authors: [{ name: siteConfig.author.name, url: siteConfig.url }],
    alternates: { canonical: absoluteUrl(`/blog/${slug}`) },
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      modifiedTime: post.date,
      authors: [siteConfig.author.name],
      section: post.category,
      tags: post.tags,
      url: absoluteUrl(`/blog/${slug}`),
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      creator: siteConfig.twitterHandle,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const processed = await remark().use(remarkHtml).process(post.content);
  const contentHtml = processed.toString();

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      getWebPageJsonLd(`/blog/${slug}`, post.title, post.description),
      getBlogPostingJsonLd(post),
      getBreadcrumbJsonLd([
        { name: "Home", path: "/" },
        { name: "Writing", path: "/blog" },
        { name: post.title, path: `/blog/${slug}` },
      ]),
    ],
  };

  return (
    <article className="gutter pt-[calc(var(--nav-h)+clamp(3rem,8vh,5rem))]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Link
        href="/blog"
        className="label link-wipe text-mist hover:text-ink transition-colors"
      >
        ← Writing
      </Link>

      <header className="mx-auto mt-12 max-w-[46rem]">
        <p className="label text-pine">{post.category}</p>

        <RiseText
          as="h1"
          text={post.title}
          className="font-display mt-6 block text-[clamp(2.25rem,5vw,4rem)] leading-[0.98] font-light tracking-tight"
        />

        <p className="text-mist mt-8 text-lg leading-relaxed font-light">
          {post.description}
        </p>

        <div className="rule-t rule-b mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 py-4">
          <span className="label text-whisper">
            <time dateTime={post.date}>{formatDate(post.date)}</time>
          </span>
          <span className="label text-whisper">{post.readTime}</span>
          <span className="label text-whisper">Jay Chauhan</span>
        </div>
      </header>

      <div
        className="prose-editorial mx-auto mt-14 max-w-[42rem]"
        dangerouslySetInnerHTML={{ __html: contentHtml }}
      />

      {post.tags.length > 0 ? (
        <div className="rule-t mx-auto mt-16 flex max-w-[42rem] flex-wrap gap-2 pt-8">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="label border-line text-mist rounded-full border px-3 py-2"
            >
              {tag}
            </span>
          ))}
        </div>
      ) : null}
    </article>
  );
}
