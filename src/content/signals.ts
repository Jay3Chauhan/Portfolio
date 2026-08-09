/**
 * Section 05 — verifiable proof. Three headline claims, then the full ledger.
 * Every claim here must be defensible; nothing goes in without a source.
 */

export const claims = [
  {
    figure: "191.8%",
    statement:
      "Membership growth in a year, from a Google Developer Student Club that did not exist before I founded it. It closed at 508 official members.",
    source: "Google DSC Lead, 2022–2023",
  },
  {
    figure: "30%",
    statement:
      "Fewer production defects across forty-plus components, after unit and regression testing went in alongside the sprint work rather than after it.",
    source: "Arhamshare, 2024–present",
  },
  {
    figure: "1k–10k",
    statement:
      "Concurrent users served through NGINX with SSL termination and load balancing, in front of FastAPI microservices carrying live market data.",
    source: "Trado trading platform",
  },
] as const;

export type Credential = {
  issuer: string;
  name: string;
  date: string;
  href?: string;
};

export const credentials: Credential[] = [
  {
    issuer: "Amazon Web Services",
    name: "Introduction to Generative AI",
    date: "Mar 2025",
    href: "https://www.credly.com/badges/cb55237a-aeb9-40a5-8cf8-04430341791b",
  },
  {
    issuer: "GitHub",
    name: "GitHub Foundations",
    date: "May 2025",
    href: "https://www.credly.com/badges/54431621-358e-4780-aa7f-d2666b765b50/public_url",
  },
  {
    issuer: "Google Cloud",
    name: "Cloud Security & Operations",
    date: "Nov 2023",
    href: "https://www.cloudskillsboost.google/public_profiles/ad06f077-e2b5-4403-b1fe-547a6e3e0f96/badges/6368276",
  },
  {
    issuer: "Google Cloud",
    name: "Infrastructure & App Modernization",
    date: "Nov 2023",
    href: "https://www.cloudskillsboost.google/public_profiles/ad06f077-e2b5-4403-b1fe-547a6e3e0f96/badges/6368127",
  },
  {
    issuer: "Microsoft",
    name: "Azure Fundamentals — AZ-900",
    date: "Mar 2022",
    href: "https://learn.microsoft.com/api/credentials/share/en-us/JAYCHAUHAN-8382/DBAD3B24E1341B0B?sharingId=studentamb_258492",
  },
  {
    issuer: "Infosys",
    name: "Python Database Connection — MariaDB",
    date: "2022",
  },
  {
    issuer: "Cisco",
    name: "Introduction to Cybersecurity",
    date: "2022",
  },
  {
    issuer: "Google",
    name: "Developer Student Club Lead",
    date: "2022–2023",
  },
];

export const credlyProfile = "https://www.credly.com/users/jay3_chauhan";

/** Issuer names for the marquee strip. */
export const issuers = [
  "Amazon Web Services",
  "GitHub",
  "Google Cloud",
  "Microsoft",
  "Cisco",
  "Infosys",
  "Google",
] as const;
