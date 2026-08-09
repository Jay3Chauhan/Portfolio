export const siteConfig = {
  name: "Jay Chauhan — Portfolio",
  shortName: "Jay Chauhan",
  url: "https://www.jaychauhan.tech",
  locale: "en_US",
  language: "en-US",
  title: "Jay Chauhan | Backend Engineer & AI Developer | Python & FastAPI",
  description:
    "Jay Chauhan is a Software Engineer specializing in Python, FastAPI, and AI/GenAI — building production-grade fintech backends, RAG pipelines, and microservices. Former Google DSC Lead and Microsoft Student Ambassador.",
  ogImage: "https://cdn.jsdelivr.net/gh/Jay3Chauhan/portfolio-assets@main/pic1.png",
  twitterHandle: "@Jay3_Chauhan",
  email: "contact@jaychauhan.tech",
  phone: "+919408254415",
  location: "Surat, Gujarat, India",
  // TODO: Move resume to /public (e.g. "/jay-chauhan-resume.pdf") once a
  // current PDF is available, so it's served from this domain instead of
  // Google Drive (faster, no permission errors, better for SEO).
  resumeUrl: "https://drive.google.com/file/d/1EddxDs0TL6hxAp9qMkkvwT8korQZP9wa/view",
  author: {
    name: "Jay Chauhan",
    jobTitle: "Software Engineer",
    image: "https://cdn.jsdelivr.net/gh/Jay3Chauhan/portfolio-assets@main/pic1.png",
    sameAs: [
      "https://www.linkedin.com/in/jay-chauhan-5a65921ba/",
      "https://github.com/Jay3Chauhan",
      "https://twitter.com/Jay3_Chauhan",
      "https://instagram.com/Jay3_Chauhan",
    ],
    worksFor: "Arhamshare Pvt Ltd.",
    alumniOf: "Gujarat Technological University",
    knowsAbout: [
      "Python",
      "FastAPI",
      "LangChain",
      "RAG Pipelines",
      "Generative AI",
      "Microservices",
      "PostgreSQL",
      "Docker",
      "Azure",
      "Google Cloud",
    ],
  },
  keywords: [
    "Jay Chauhan",
    "Software Engineer",
    "Backend Developer",
    "Python Developer",
    "FastAPI",
    "LangChain",
    "RAG",
    "Generative AI",
    "Microservices",
    "Google DSC",
    "Microsoft Student Ambassador",
    "Arhamshare",
    "Fintech",
    "Portfolio",
  ],
} as const;

export function absoluteUrl(path = ""): string {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return path ? `${siteConfig.url}${normalizedPath}` : siteConfig.url;
}

export function getPersonJsonLd() {
  return {
    "@type": "Person",
    "@id": `${siteConfig.url}/#person`,
    name: siteConfig.author.name,
    url: siteConfig.url,
    image: siteConfig.author.image,
    jobTitle: siteConfig.author.jobTitle,
    description: siteConfig.description,
    email: `mailto:${siteConfig.email}`,
    sameAs: siteConfig.author.sameAs,
    worksFor: {
      "@type": "Organization",
      name: siteConfig.author.worksFor,
    },
    alumniOf: {
      "@type": "Organization",
      name: siteConfig.author.alumniOf,
    },
    knowsAbout: siteConfig.author.knowsAbout,
  };
}

export function getWebSiteJsonLd() {
  return {
    "@type": "WebSite",
    "@id": `${siteConfig.url}/#website`,
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    inLanguage: siteConfig.language,
    publisher: { "@id": `${siteConfig.url}/#person` },
  };
}

export function getWebPageJsonLd(path = "", name?: string, description?: string) {
  const pageUrl = absoluteUrl(path);

  return {
    "@type": "WebPage",
    "@id": `${pageUrl}#webpage`,
    url: pageUrl,
    name: name ?? siteConfig.title,
    description: description ?? siteConfig.description,
    isPartOf: { "@id": `${siteConfig.url}/#website` },
    about: { "@id": `${siteConfig.url}/#person` },
    inLanguage: siteConfig.language,
  };
}

export function getBlogPostingJsonLd(post: {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  coverImage?: string;
}) {
  const postUrl = absoluteUrl(`/blog/${post.slug}`);

  return {
    "@type": "BlogPosting",
    "@id": `${postUrl}#article`,
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    author: { "@id": `${siteConfig.url}/#person` },
    publisher: { "@id": `${siteConfig.url}/#person` },
    mainEntityOfPage: { "@id": `${postUrl}#webpage` },
    url: postUrl,
    image: post.coverImage ?? siteConfig.ogImage,
    keywords: post.tags.join(", "),
    inLanguage: siteConfig.language,
  };
}

export function getBreadcrumbJsonLd(items: Array<{ name: string; path: string }>) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function getBlogListJsonLd(
  posts: Array<{ slug: string; title: string; description: string }>,
) {
  return {
    "@type": "ItemList",
    name: "Jay Chauhan Blog",
    description:
      "Technical articles on Python, FastAPI, GenAI, RAG pipelines, and backend engineering.",
    numberOfItems: posts.length,
    itemListElement: posts.map((post, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: absoluteUrl(`/blog/${post.slug}`),
      name: post.title,
      description: post.description,
    })),
  };
}

export function getRootJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [getPersonJsonLd(), getWebSiteJsonLd(), getWebPageJsonLd()],
  };
}
