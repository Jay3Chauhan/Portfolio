# Setup

Operator notes for [jaychauhan.tech](https://www.jaychauhan.tech). The site builds
and deploys with no secrets. Anything listed here is optional and degrades to a
visible fallback instead of crashing.

Copy `.env.example` to `.env.local` for local work. The same names go in Vercel
→ Settings → Environment Variables (Production, and Preview if you want).

## Environment

| Variable                   | Needed for                        |
| -------------------------- | --------------------------------- |
| `RESEND_API_KEY`           | Contact form delivery             |
| `CONTACT_TO_EMAIL`         | Inbox override (defaults to site) |
| `CONTACT_FROM_EMAIL`       | Verified From override            |
| `LINKEDIN_FEED_URL`        | Section 09 — latest three posts   |
| `GOOGLE_SITE_VERIFICATION` | Search Console meta tag           |
| `BING_SITE_VERIFICATION`   | Bing Webmaster meta tag           |

## Contact form (Resend)

1. Create an account at [resend.com](https://resend.com).
2. Add the domain `jaychauhan.tech` and paste the SPF / DKIM / DMARC records into DNS.
3. Wait until the domain is **Verified**.
4. Create an API key with **Sending** access only.
5. Set `RESEND_API_KEY` locally and in Vercel, then redeploy.

Default sender is `Portfolio <portfolio@jaychauhan.tech>`. Default inbox is
`contact@jaychauhan.tech` — that address must actually receive mail (Workspace,
Cloudflare Email Routing, etc.). Until the key is set, the form tells visitors
to use the address on the left.

## LinkedIn feed

LinkedIn has no public read API for your own posts. Point `LINKEDIN_FEED_URL`
at a bridge that republishes the profile:

1. Open [rss.app](https://rss.app) (or any RSS-from-URL bridge).
2. New feed from `https://www.linkedin.com/in/jay-chauhan-5a65921ba/`.
3. Paste the RSS, Atom, or JSON Feed URL into the env var.

Unset, the section shows its fallback line and still links the profile. The home
page stays static until a URL is set; then the feed refreshes at most hourly.

## Search engines

Canonical host is **`https://www.jaychauhan.tech`**. `vercel.json` 301s the apex
there. Always register the www property, or Google reports a redirect error.

Already in the codebase: `/sitemap.xml`, `/robots.txt`, `/feed.xml`, Open Graph,
canonicals, and JSON-LD (`Person`, `WebSite`, `ProfilePage`, `SoftwareApplication`,
`BlogPosting`). `robots.txt` allows `/` and does **not** block `/_next/` — Googlebot
needs the CSS and JS to render the page.

### Google Search Console

1. [Add a URL-prefix property](https://search.google.com/search-console) for
   `https://www.jaychauhan.tech` (not the non-www host).
2. Verify via Google Analytics (`G-1QEB2QFT9X`) if you are an admin on that GA4
   property, or paste the HTML-tag `content` value into `GOOGLE_SITE_VERIFICATION`
   and redeploy.
3. Sitemaps → submit `sitemap.xml`.
4. URL Inspection → request indexing for `/`, `/blog`, and each post.

Optional: a Domain property (`jaychauhan.tech`) covers both hosts; that needs a
DNS TXT record.

### Bing

[Bing Webmaster Tools](https://www.bing.com/webmasters) → import from Google, or
paste the meta `content` into `BING_SITE_VERIFICATION`.

### After a redesign

In Search Console, request indexing for the homepage again, and use
[Removals](https://search.google.com/search-console/removals) for
`https://www.jaychauhan.tech/cv.pdf`. The app already returns **410 Gone** at that
path.

Technical SEO gets the site indexed. Rankings still need Search Console, unique
titles, internal links, and people linking in. Branded queries (“Jay Chauhan”)
move first; generic ones (“software engineer”) will not.

## Deploy (Vercel)

The project is a Next.js 16 App Router app. Vercel detects the framework.

1. Import the GitHub repo. Framework preset: Next.js. Build: `npm run build`.
2. Add the env vars above. They apply on the **next** deploy.
3. Domains: add `jaychauhan.tech` and `www.jaychauhan.tech`. DNS should follow
   Vercel’s records. Apex → www is already handled in `vercel.json`.

Every push to the production branch ships. Preview deployments are created per PR.

## Editing the site

| Kind                      | Where                         |
| ------------------------- | ----------------------------- |
| Copy, metrics, projects   | `src/content/*.ts`            |
| Blog posts                | `content/blog/*.md`           |
| Colour and type           | `src/app/globals.css`         |
| Agent / contributor rules | `AGENTS.md`, `.cursor/rules/` |

Never put a project name, metric, or paragraph in a component. See
`.cursor/rules/content-layer.mdc`.

```bash
npm run dev          # http://localhost:3000
npm run build        # required before a PR
npm run lint
npm run typecheck
npm run format
```
