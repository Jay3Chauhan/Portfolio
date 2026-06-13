import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllSlugs, getPostBySlug } from "@/lib/blog";
import {
  absoluteUrl,
  getBlogPostingJsonLd,
  getBreadcrumbJsonLd,
  getWebPageJsonLd,
  siteConfig,
} from "@/lib/seo";
import { remark } from "remark";
import remarkHtml from "remark-html";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getAllSlugs();
  return slugs.map((slug) => ({ slug }));
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
    alternates: {
      canonical: absoluteUrl(`/blog/${slug}`),
    },
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
      images: post.coverImage
        ? [{ url: post.coverImage, width: 1200, height: 630, alt: post.title }]
        : [{ url: siteConfig.ogImage, width: 1200, height: 630, alt: post.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [post.coverImage ?? siteConfig.ogImage],
      creator: siteConfig.twitterHandle,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const processedContent = await remark().use(remarkHtml).process(post.content);
  const contentHtml = processedContent.toString();

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      getWebPageJsonLd(`/blog/${slug}`, post.title, post.description),
      getBlogPostingJsonLd(post),
      getBreadcrumbJsonLd([
        { name: "Home", path: "/" },
        { name: "Blog", path: "/blog" },
        { name: post.title, path: `/blog/${slug}` },
      ]),
    ],
  };

  return (
    <section style={{ paddingTop: "8rem" }}>
      <div className="section-container">
        <article className="blog-post">
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          />

          <div className="blog-post-header">
            <Link href="/blog" className="blog-post-back">
              ← Back to Blog
            </Link>
            <span className="blog-post-category">{post.category}</span>
            <h1 className="blog-post-title">{post.title}</h1>
            <div className="blog-post-meta">
              <span>
                {new Date(post.date).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
              <span>{post.readTime}</span>
              <span>By Jay Chauhan</span>
            </div>
          </div>

          <div
            className="blog-post-content"
            dangerouslySetInnerHTML={{ __html: contentHtml }}
          />

          {post.tags.length > 0 && (
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "0.5rem",
                marginTop: "3rem",
                paddingTop: "2rem",
                borderTop: "1px solid var(--border)",
              }}
            >
              {post.tags.map((tag) => (
                <span key={tag} className="tech-tag">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </article>
      </div>
    </section>
  );
}
