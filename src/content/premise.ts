/**
 * Section 01 — the positioning statement, portrait and dossier.
 * Copy lives here so the section component stays layout-only.
 */

export const portrait = {
  src: "https://cdn.jsdelivr.net/gh/Jay3Chauhan/portfolio-assets@main/pic1.png",
  figure: "Fig. 00",
} as const;

export const headline = "Backends that stay up, and AI that cites its sources.";

export const paragraphs = [
  "I write the services underneath fintech products — trading, mutual funds, and the RBI Account Aggregator consent rails that let money data move with permission. Python and FastAPI, mostly, with PostgreSQL and MongoDB holding the state and NGINX in front of all of it.",
  "The other half of the work is retrieval. ComplianceIQ answers questions about RBI and SEBI regulation using a model that is not allowed to respond without a citation, because a confident wrong answer is worse than no answer in a regulated market.",
  "Before any of this I founded a Google Developer Student Club and grew it to 508 members, which is where I learned that most systems are mostly people.",
] as const;

/** The one-line stamp under the body copy. */
export const footnote = {
  lead: "8+ services in production",
  trail: "No theatre, just uptime",
} as const;

export const dossier = [
  { key: "Role", value: "Software Engineer" },
  { key: "Company", value: "Arhamshare Pvt Ltd." },
  { key: "Since", value: "January 2024" },
  { key: "Education", value: "B.E. — Gujarat Technological University" },
  { key: "Based", value: "Surat, Gujarat, India" },
] as const;
