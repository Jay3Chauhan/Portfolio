/** Section 06 — where the code actually runs. */

export type AppListing = {
  id: string;
  name: string;
  tagline: string;
  category: string;
  rating: string;
  stack: string[];
  contribution: string;
  links: { store: "App Store" | "Google Play"; href: string }[];
};

export const apps: AppListing[] = [
  {
    id: "trado",
    name: "Trado by Arham",
    tagline: "Equity trading and investment, with live market data.",
    category: "Trading",
    rating: "4.7 · 12 ratings",
    stack: ["FastAPI", "WebSockets", "Redis", "Docker"],
    contribution: "Backend services, market data streams, P&L engine",
    links: [
      {
        store: "App Store",
        href: "https://apps.apple.com/in/app/trado-by-arham/id6502446144",
      },
      {
        store: "Google Play",
        href: "https://play.google.com/store/apps/details?id=com.wave.arhamtwo",
      },
    ],
  },
  {
    id: "arhamshare-mf",
    name: "ArhamShare: MF",
    tagline: "Data-driven mutual fund investing.",
    category: "Finance",
    rating: "5.0 · 1 rating",
    stack: ["FastAPI", "PostgreSQL", "Finvu SDK"],
    contribution: "NAV tracking, scheme discovery, portfolio aggregation",
    links: [
      {
        store: "App Store",
        href: "https://apps.apple.com/in/app/arhamshare-mf/id6759367829",
      },
      {
        store: "Google Play",
        href: "https://play.google.com/store/apps/details?id=com.arhamshare.mf",
      },
    ],
  },
  {
    id: "growmint",
    name: "GrowMint",
    tagline: "One app. Total wealth view.",
    category: "Finance",
    rating: "Newly released",
    stack: ["FastAPI", "MongoDB", "Account Aggregator"],
    contribution: "Aggregation backend and consent integration",
    links: [
      {
        store: "App Store",
        href: "https://apps.apple.com/in/app/growmint/id6759909170",
      },
    ],
  },
];

/** Rendered as the "coming soon" strip. */
export const pipeline = [
  "ComplianceIQ",
  "Regulatory retrieval API",
  "Evaluation harness",
  "Open-source RAG notes",
] as const;
