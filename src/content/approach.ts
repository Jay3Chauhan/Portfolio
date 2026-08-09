/**
 * Section 04 — how the work gets made.
 *
 * Every principle below is anchored to work that already appears elsewhere in
 * the content layer (`work.ts`, `story.ts`, `signals.ts`). Nothing here is an
 * aspiration; each `evidence` line names the system that earned it.
 */

export type Principle = {
  index: string;
  title: string;
  body: string;
  evidence: string;
  metric: string;
  metricLabel: string;
};

/** Scrubbed word by word as it enters the viewport. Keep it under ~45 words. */
export const manifesto =
  "I work on systems where being wrong is expensive. Trading screens, mutual fund NAVs, consent rails for financial data. That work rewards a particular kind of restraint: fewer moving parts, boundaries drawn early, and a number attached to every claim before it ships.";

export const principles: Principle[] = [
  {
    index: "01",
    title: "Draw the consent boundary first.",
    body: "In regulated fintech the authorisation model is the architecture, not a layer you bolt on at the end. Deciding who may read what — and proving it — shapes every service that comes after.",
    evidence:
      "FIP and FIU consent flows built to ReBIT spec against the RBI Account Aggregator framework via the Finvu SDK.",
    metric: "8+",
    metricLabel: "Services behind JWT / OAuth 2.0",
  },
  {
    index: "02",
    title: "Cache before you scale.",
    body: "Most throughput problems are read problems wearing a costume. A cache in the right place buys more headroom than another instance, and it keeps the failure modes small enough to reason about.",
    evidence:
      "Live market data over WebSockets with Redis underneath and NGINX terminating SSL and balancing load for Trado.",
    metric: "1k–10k",
    metricLabel: "Concurrent users served",
  },
  {
    index: "03",
    title: "Make the model cite its sources.",
    body: "A retrieval system that cannot point at the paragraph it used is a guess with good grammar. Constrain generation to what was actually retrieved, then score whether it stayed there.",
    evidence:
      "ComplianceIQ answers RBI and SEBI questions from a filtered Qdrant index, graded continuously by RAGAS faithfulness.",
    metric: "20+",
    metricLabel: "Regulatory documents indexed",
  },
  {
    index: "04",
    title: "Attach a number to the claim.",
    body: "\u201CFaster\u201D and \u201Cmore stable\u201D are opinions until they are measured. I would rather ship a smaller improvement I can defend than a large one I cannot.",
    evidence:
      "Benchmarked multi-face recognition against the reference build during Microsoft Engage; tracked crash rate and engagement through the Toshal Flutter work.",
    metric: "7%",
    metricLabel: "Faster than the reference build",
  },
];

/** Fragments for the velocity-reactive ticker under the manifesto. */
export const method = [
  "Draw the boundary",
  "Cache the read",
  "Ground the answer",
  "Measure the claim",
  "Keep it small",
] as const;
