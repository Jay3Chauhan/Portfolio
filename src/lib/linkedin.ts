/**
 * Reads recent LinkedIn posts through a feed bridge (rss.app or similar).
 *
 * LinkedIn has no public read API for a member's own posts without Partner
 * Program approval, so a bridge is the only route that does not involve
 * scraping. The bridge is treated as untrusted and optional: no feed URL, a
 * dead bridge, or a shape we do not recognise all degrade to an empty list so
 * the section can fall back instead of failing the render.
 */

import { XMLParser } from "fast-xml-parser";

export type FeedPost = {
  id: string;
  url: string;
  /** The post body, flattened to plain text. Bridges hand back HTML. */
  text: string;
  publishedAt: string | null;
};

const requestTimeoutMs = 6_000;

const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: "@",
  trimValues: true,
});

type RawNode = Record<string, unknown>;

const namedEntities: Record<string, string> = {
  amp: "&",
  lt: "<",
  gt: ">",
  quot: '"',
  apos: "'",
  nbsp: " ",
  hellip: "…",
  mdash: "—",
  ndash: "–",
  rsquo: "\u2019",
  lsquo: "\u2018",
  rdquo: "\u201d",
  ldquo: "\u201c",
};

function decodeEntities(value: string): string {
  return value.replace(/&(#x?[0-9a-f]+|[a-z]+);/gi, (match, entity: string) => {
    if (!entity.startsWith("#")) {
      return namedEntities[entity.toLowerCase()] ?? match;
    }

    const codePoint =
      entity[1]?.toLowerCase() === "x"
        ? Number.parseInt(entity.slice(2), 16)
        : Number.parseInt(entity.slice(1), 10);

    return Number.isInteger(codePoint) && codePoint > 0 && codePoint <= 0x10ffff
      ? String.fromCodePoint(codePoint)
      : match;
  });
}

/** Post bodies arrive as HTML nested inside XML. Flatten to readable prose. */
function toPlainText(value: unknown): string {
  const source = pickText(value);
  if (!source) return "";

  return decodeEntities(
    source
      .replace(/<br\s*\/?>/gi, "\n")
      .replace(/<\/p\s*>/gi, "\n\n")
      .replace(/<[^>]*>/g, " "),
  )
    .replace(/\r/g, "")
    .replace(/[^\S\n]+/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

/** fast-xml-parser nests text under `#text` whenever a node has attributes. */
function pickText(value: unknown): string {
  if (typeof value === "string") return value;
  if (typeof value === "number") return String(value);

  if (value && typeof value === "object" && "#text" in value) {
    const text = (value as RawNode)["#text"];
    return typeof text === "string" || typeof text === "number" ? String(text) : "";
  }

  return "";
}

function toArray(value: unknown): RawNode[] {
  if (Array.isArray(value)) return value.filter(isRawNode);
  return isRawNode(value) ? [value] : [];
}

function isRawNode(value: unknown): value is RawNode {
  return typeof value === "object" && value !== null;
}

function toIsoDate(value: unknown): string | null {
  const raw = pickText(value);
  if (!raw) return null;

  const parsed = new Date(raw);
  return Number.isNaN(parsed.getTime()) ? null : parsed.toISOString();
}

function fromRss(document: RawNode): FeedPost[] {
  const channel = isRawNode(document.rss) ? document.rss.channel : undefined;
  const items = isRawNode(channel) ? channel.item : undefined;

  return toArray(items).map((item) => ({
    id: pickText(item.guid) || pickText(item.link),
    url: pickText(item.link),
    text: toPlainText(item["content:encoded"] ?? item.description ?? item.title),
    publishedAt: toIsoDate(item.pubDate),
  }));
}

function fromAtom(document: RawNode): FeedPost[] {
  const feed = isRawNode(document.feed) ? document.feed : undefined;

  return toArray(feed?.entry).map((entry) => {
    const link = toArray(entry.link).find(
      (candidate) => !candidate["@rel"] || candidate["@rel"] === "alternate",
    );
    const href = pickText(link?.["@href"]);

    return {
      id: pickText(entry.id) || href,
      url: href,
      text: toPlainText(entry.content ?? entry.summary ?? entry.title),
      publishedAt: toIsoDate(entry.published ?? entry.updated),
    };
  });
}

function fromJsonFeed(payload: unknown): FeedPost[] {
  const items = isRawNode(payload) ? payload.items : undefined;
  if (!Array.isArray(items)) return [];

  return items.filter(isRawNode).map((item) => ({
    id: pickText(item.id) || pickText(item.url),
    url: pickText(item.url) || pickText(item.external_url),
    text: toPlainText(
      item.content_text ?? item.content_html ?? item.summary ?? item.title,
    ),
    publishedAt: toIsoDate(item.date_published ?? item.date_modified),
  }));
}

function byNewestFirst(a: FeedPost, b: FeedPost): number {
  return (b.publishedAt ?? "").localeCompare(a.publishedAt ?? "");
}

export async function getRecentLinkedInPosts(limit = 3): Promise<FeedPost[]> {
  const feedUrl = process.env.LINKEDIN_FEED_URL;
  if (!feedUrl) return [];

  try {
    const response = await fetch(feedUrl, {
      headers: {
        accept: "application/json, application/rss+xml, application/xml, text/xml",
      },
      // The bridge refreshes on its own schedule, so hourly is plenty — and it
      // keeps the home page a cached render rather than a per-request fetch.
      next: { revalidate: 3600 },
      signal: AbortSignal.timeout(requestTimeoutMs),
    });

    if (!response.ok) {
      console.error("LinkedIn feed bridge responded", response.status);
      return [];
    }

    const payload = await response.text();
    const posts = payload.trimStart().startsWith("{")
      ? fromJsonFeed(JSON.parse(payload))
      : parseXml(payload);

    return posts
      .filter((post) => post.url && post.text)
      .sort(byNewestFirst)
      .slice(0, limit);
  } catch (error) {
    // A dead bridge must never take the page down with it.
    console.error("Could not read the LinkedIn feed bridge", error);
    return [];
  }
}

function parseXml(payload: string): FeedPost[] {
  const document = parser.parse(payload) as RawNode;
  return document.rss ? fromRss(document) : fromAtom(document);
}
