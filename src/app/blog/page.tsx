import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Technical articles, tutorials, and case studies on Flutter, React, Cloud Architecture, and modern software development by Jay Chauhan.",
  openGraph: {
    title: "Blog | Jay Chauhan",
    description:
      "Technical articles, tutorials, and case studies on modern software development.",
    url: "https://jaychauhan.tech/blog",
  },
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <>
      <section style={{ paddingTop: "8rem" }}>
        <div className="section-container">
          <div className="section-label">Blog</div>
          <h1 className="section-title">
            Technical <span style={{ color: "var(--accent)" }}>Articles</span>
          </h1>
          <p className="section-desc">
            Insights, tutorials, and case studies from my experience building
            software products.
          </p>

          {posts.length === 0 ? (
            <div
              style={{
                textAlign: "center",
                padding: "4rem 0",
                color: "var(--text-secondary)",
              }}
            >
              <p style={{ fontSize: "1.2rem", marginBottom: "1rem" }}>
                Coming soon! 🚀
              </p>
              <p>
                I&apos;m working on publishing technical articles, tutorials, and
                case studies.
              </p>
              <Link
                href="/"
                className="btn-primary"
                style={{ marginTop: "2rem", display: "inline-flex" }}
              >
                ← Back Home
              </Link>
            </div>
          ) : (
            <div className="blog-grid">
              {posts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="blog-card"
                >
                  <div className="blog-card-image">
                    {post.coverImage ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={post.coverImage} alt={post.title} />
                    ) : (
                      <span
                        style={{
                          fontSize: "3rem",
                          opacity: 0.4,
                        }}
                      >
                        📝
                      </span>
                    )}
                  </div>
                  <div className="blog-card-body">
                    <div className="blog-card-meta">
                      <span className="blog-card-category">{post.category}</span>
                      <span>{post.readTime}</span>
                      <span>
                        {new Date(post.date).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                    <h3>{post.title}</h3>
                    <p>{post.description}</p>
                    {post.tags.length > 0 && (
                      <div className="blog-card-tags">
                        {post.tags.map((tag) => (
                          <span key={tag} className="tech-tag">
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                    <span className="blog-card-link">Read article →</span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
