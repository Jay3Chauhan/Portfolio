export type WorkMetric = {
  label: string;
  value: string;
  /** Marks the defining characteristic of the project. */
  lead?: boolean;
};

export type WorkItem = {
  id: string;
  /** Zero-padded catalogue number, e.g. "01". */
  index: string;
  tag: string;
  name: string;
  subtitle: string;
  description: string;
  metrics: WorkMetric[];
  stack: string[];
  footnote: string;
  href?: string;
  /** Private client work has no public repository. */
  visibility: "private" | "public";
};

export const work: WorkItem[] = [
  {
    id: "complianceiq",
    index: "01",
    tag: "flagship",
    name: "ComplianceIQ",
    subtitle: "RBI & SEBI regulatory RAG",
    description:
      "A retrieval system for Indian financial regulation. Circulars are chunked, embedded and filtered by category, then answered by an LLM that is not permitted to speak without a citation. Built because compliance teams should not have to trust a model's memory.",
    metrics: [
      { label: "Documents indexed", value: "20+", lead: true },
      { label: "Chunk window", value: "500 tok" },
      { label: "Inference", value: "LLaMA-3.3-70B" },
      { label: "Evaluation", value: "RAGAS" },
    ],
    stack: ["Python", "LangChain", "Qdrant Cloud", "Groq", "RAGAS"],
    footnote: "Citation-enforced grounding · active development",
    visibility: "private",
  },
  {
    id: "trado",
    index: "02",
    tag: "production",
    name: "Trado",
    subtitle: "Trading platform backend",
    description:
      "Modular FastAPI services behind equity trading, portfolio tracking, IPO listings, screeners and FII/DII flows. Market data arrives over WebSocket streams, gets cached in Redis, and turns into live P&L before the user finishes scrolling.",
    metrics: [
      { label: "Concurrent users", value: "1k–10k", lead: true },
      { label: "Transport", value: "WebSocket" },
      { label: "Cache layer", value: "Redis" },
      { label: "Edge", value: "NGINX + SSL" },
    ],
    stack: ["FastAPI", "WebSockets", "Redis", "Docker", "NGINX"],
    footnote: "Live on the App Store and Google Play",
    href: "https://apps.apple.com/in/app/trado-by-arham/id6502446144",
    visibility: "private",
  },
  {
    id: "mutual-fund",
    index: "03",
    tag: "production",
    name: "Mutual Fund Platform",
    subtitle: "NAV, discovery, aggregation",
    description:
      "The full backend for mutual fund investing — NAV tracking, scheme discovery and portfolio aggregation. Fund data self-heals through Selenium scrapers on CronJobs, so the catalogue is correct at open without anyone touching it.",
    metrics: [
      { label: "Sync", value: "Automated", lead: true },
      { label: "Scrapers", value: "Selenium" },
      { label: "Schedule", value: "CronJobs" },
      { label: "Stores", value: "PG + Mongo" },
    ],
    stack: ["FastAPI", "Selenium", "PostgreSQL", "MongoDB"],
    footnote: "Powers ArhamShare: MF",
    href: "https://apps.apple.com/in/app/arhamshare-mf/id6759367829",
    visibility: "private",
  },
  {
    id: "account-aggregator",
    index: "04",
    tag: "infrastructure",
    name: "Account Aggregator",
    subtitle: "RBI consent rails",
    description:
      "Finvu SDK wired into the RBI Account Aggregator framework — end-to-end FIP and FIU consent flows built to ReBIT specification. Consent is the product here, so every hop is authenticated and every service behind it is locked down.",
    metrics: [
      { label: "Services secured", value: "8+", lead: true },
      { label: "Spec", value: "ReBIT API" },
      { label: "Auth", value: "JWT / OAuth 2.0" },
      { label: "Provider", value: "Finvu SDK" },
    ],
    stack: ["FastAPI", "Finvu SDK", "OAuth 2.0", "PostgreSQL"],
    footnote: "Regulated data, consented movement",
    visibility: "private",
  },
];

/** Public repositories — shown as a plain directory rather than cards. */
export const archive = [
  {
    name: "FaceTrack",
    year: "2022",
    description:
      "Browser-based attendance from face recognition. Multi-face detection, 7% faster than the reference build. Microsoft Engage 2022.",
    stack: ["Django", "OpenCV"],
    href: "https://github.com/Jay3Chauhan/MicrosoftEngage2022-FaceAttendenceProject",
  },
  {
    name: "Instagram Media Scraper",
    year: "2022",
    description:
      "Reels, stories, highlights, captions and view counts pulled into a tidy dataframe.",
    stack: ["Selenium", "Pandas"],
    href: "https://github.com/Jay3Chauhan/Instagram-Downloader",
  },
  {
    name: "YouTube Downloader",
    year: "2022",
    description: "A CLI that does one thing. Minimal dependencies, no surprises.",
    stack: ["Python", "pytube"],
    href: "https://github.com/Jay3Chauhan/YoutubeDownloader",
  },
  {
    name: "E-Commerce + FAQ Bot",
    year: "2022",
    description:
      "Storefront prototype with an AI FAQ bot, catalogue and cart, deployed on Azure.",
    stack: ["JavaScript", "Azure"],
    href: "https://github.com/Jay3Chauhan/FRT-WEBSITE-AZURE",
  },
] as const;
