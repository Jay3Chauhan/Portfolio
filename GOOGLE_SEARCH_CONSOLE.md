# Google Search Console Setup Guide

Complete guide to verify, configure, and optimize **jaychauhan.tech** in Google Search Console (GSC) so Google can discover, index, and rank your portfolio.

**Primary URL (canonical):** https://www.jaychauhan.tech  
**Sitemap:** https://www.jaychauhan.tech/sitemap.xml  
**RSS Feed:** https://www.jaychauhan.tech/feed.xml  
**Robots:** https://www.jaychauhan.tech/robots.txt

> **Important:** Vercel redirects `jaychauhan.tech` → `www.jaychauhan.tech`. Always use the **www** URL in Search Console, sitemaps, and canonical tags. Using non-www causes Google’s **“Redirect error”** when canonical and redirect disagree.

---

## What’s already built into the site

Your Next.js app already ships with SEO foundations:

| Feature                            | URL / location                                     |
| ---------------------------------- | -------------------------------------------------- |
| XML sitemap                        | `/sitemap.xml`                                     |
| Robots.txt                         | `/robots.txt`                                      |
| RSS feed (blog)                    | `/feed.xml`                                        |
| Open Graph + Twitter cards         | All pages                                          |
| Canonical URLs                     | Home, blog, and blog posts                         |
| JSON-LD structured data            | Person, WebSite, WebPage, BlogPosting, Breadcrumbs |
| Google Analytics                   | `G-1QEB2QFT9X`                                     |
| Google Search Console verification | Via `GOOGLE_SITE_VERIFICATION` env var             |

---

## Step 1 — Create a Search Console property

1. Go to [Google Search Console](https://search.google.com/search-console).
2. Click **Add property**.
3. Choose **URL prefix** and enter the **www** version:
   ```
   https://www.jaychauhan.tech
   ```
4. Click **Continue**.

> **Do not use** `https://jaychauhan.tech` (without www) as your primary property — it redirects to www and will show “Redirect error” until canonicals match.

**Optional:** Add a **Domain property** (`jaychauhan.tech`) later for coverage across www and non-www. That requires a DNS TXT record at your domain registrar.

**Optional:** Also add a **Domain property** (`jaychauhan.tech`) later if you want coverage across all subdomains and protocols. That requires a DNS TXT record at your domain registrar.

---

## Step 2 — Verify ownership

### Option A — Google Analytics (easiest, recommended)

Your site already has Google Analytics (`G-1QEB2QFT9X`). If you are an **Admin** on that GA4 property:

1. In Search Console verification screen, choose **Google Analytics**.
2. Select the GA4 property linked to `G-1QEB2QFT9X`.
3. Click **Verify** — no env var or meta tag needed.

### Option B — HTML meta tag

Google will show a meta tag like:

```html
<meta name="google-site-verification" content="ABC123xyz..." />
```

You only need the **content value** (`ABC123xyz...`), not the full tag.

> The meta tag **only appears after** you set `GOOGLE_SITE_VERIFICATION` in Vercel and redeploy. If you view page source and don’t see it, the env var is missing — use Option A or complete the steps below.

### Local development

1. Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```
2. Set your verification code:
   ```
   GOOGLE_SITE_VERIFICATION=ABC123xyz...
   ```
3. Restart the dev server (`npm run dev`).
4. View page source on https://www.jaychauhan.tech (or localhost) and confirm the meta tag appears in `<head>`.
5. In Search Console, click **Verify**.

### Production (Vercel)

1. Vercel Dashboard → your project → **Settings** → **Environment Variables**
2. Add:
   - **Name:** `GOOGLE_SITE_VERIFICATION`
   - **Value:** your verification code (content only)
   - **Environment:** Production (and Preview if you want)
3. **Redeploy** the project (env vars apply on the next build).
4. Return to Search Console and click **Verify**.

### Verify it worked

After deploying, open https://www.jaychauhan.tech and search the page source for `google-site-verification`. You should see:

```html
<meta name="google-site-verification" content="your_code_here" />
```

---

## Step 3 — Submit your sitemap

1. In Search Console, open your property.
2. Go to **Sitemaps** (left sidebar).
3. Under **Add a new sitemap**, enter:
   ```
   sitemap.xml
   ```
4. Click **Submit**.

Google will crawl:

- `https://www.jaychauhan.tech/` (home)
- `https://www.jaychauhan.tech/blog` (blog index)
- All blog post URLs from `content/blog/`

**Expected status:** “Success” within a few hours to a few days. “Couldn’t fetch” usually means the site wasn’t deployed yet or DNS wasn’t pointing to Vercel.

---

## Step 4 — Request indexing for key pages

Sitemaps help discovery; manual indexing requests speed up the first crawl.

1. Use the **URL Inspection** bar at the top of Search Console.
2. Inspect each URL and click **Request indexing**:

| Priority | URL                                |
| -------- | ---------------------------------- |
| 1        | `https://www.jaychauhan.tech/`     |
| 2        | `https://www.jaychauhan.tech/blog` |
| 3        | Each blog post URL                 |

**Limit:** Google allows a small number of manual requests per day. Use them on your most important pages first.

---

## Step 5 — Configure Search Console settings

### Settings → Ownership

- Confirm **Verified** status stays green after redeploys.

### Settings → Users and permissions

- Add a backup Google account so you don’t lose access.

### Settings → Crawl stats (after ~1 week)

- Check that Googlebot is visiting regularly.
- Spikes after sitemap submission are normal.

### Experience → Page experience

Monitor:

- **Core Web Vitals** — LCP, INP, CLS (aim for “Good” on mobile)
- **HTTPS** — should show as valid (Vercel provides SSL)
- **Mobile usability** — no horizontal scroll or tap-target issues

### Enhancements → Unparsable structured data

- Should stay empty. If errors appear, test URLs in [Rich Results Test](https://search.google.com/test/rich-results).

---

## Step 6 — Connect Analytics (recommended)

You already have Google Analytics (`G-1QEB2QFT9X`). Linking it to Search Console gives search-query data inside GA4.

1. In **GA4** → **Admin** → **Product links** → **Search Console links**
2. Link your `jaychauhan.tech` property
3. In GSC → **Settings** → **Associations**, confirm the link

---

## Step 7 — Monitor performance weekly

Check these reports every 7–14 days:

### Performance

- **Queries** — what people search before clicking your site
- **Pages** — which URLs get impressions and clicks
- **CTR** — if impressions are high but clicks low, improve titles/descriptions
- **Average position** — track movement over time (don’t obsess over daily swings)

### Indexing → Pages

- **Indexed** — pages Google shows in search
- **Not indexed** — review reasons:
  - _Crawled – currently not indexed_ → usually thin or duplicate content; add more unique value
  - _Discovered – currently not indexed_ → request indexing or improve internal links
  - _Excluded by noindex_ → expected for 404 pages

### Links

- **External links** — sites linking to you (build via LinkedIn, GitHub README, guest posts)
- **Internal links** — blog posts should link back to home and related articles

---

## Step 8 — Ranking strategy for a developer portfolio

Technical SEO gets you **indexed**. Ranking higher also needs **content and authority**.

### Quick wins (do these first)

1. **Publish blog posts regularly** — your strongest ranking lever (tutorials rank for long-tail keywords).
2. **Use descriptive titles** — e.g. “Building RAG Pipelines with LangChain and Qdrant” beats “My Project”.
3. **Add cover images** to blog frontmatter (`coverImage`) for richer social and search snippets.
4. **Share each post** on LinkedIn and Twitter with a link back to the canonical URL.
5. **Keep LinkedIn/GitHub bios** linking to `https://www.jaychauhan.tech`.

### Medium-term (1–3 months)

1. Target keywords you can realistically rank for:
   - “FastAPI fintech tutorial”
   - “LangChain Qdrant RAG pipeline”
   - “Jay Chauhan software engineer” (branded)
2. Add 2–4 internal links per blog post (to other posts or portfolio sections).
3. Get backlinks from:
   - GitHub project READMEs
   - Dev.to / Hashnode cross-posts (with canonical pointing to your site)
   - Conference or community profiles

### What “top” realistically means

For a personal portfolio, top rankings usually come from:

- **Branded searches** (“Jay Chauhan”) — achievable quickly
- **Niche technical queries** (specific tutorials) — achievable with consistent blogging
- **Generic terms** (“software engineer”, “Python developer”) — very competitive; don’t expect page 1 soon

---

## Pre-launch checklist

Use this before and after every major deploy:

- [ ] Site loads at `https://www.jaychauhan.tech` (HTTPS, no redirect loops)
- [ ] `https://www.jaychauhan.tech/robots.txt` shows `Allow: /` and sitemap URL
- [ ] `https://www.jaychauhan.tech/sitemap.xml` lists all public pages
- [ ] `https://www.jaychauhan.tech/feed.xml` returns valid RSS XML
- [ ] `GOOGLE_SITE_VERIFICATION` is set in Vercel production env
- [ ] Search Console property verified
- [ ] Sitemap submitted in GSC
- [ ] Home + blog URLs requested for indexing
- [ ] Rich Results Test passes on home and one blog post
- [ ] PageSpeed Insights mobile score reviewed

---

## Troubleshooting

### “Redirect error” / Page not indexed

**Cause:** Vercel serves `https://www.jaychauhan.tech` but canonical URLs pointed to non-www. Google sees: crawl non-www → redirect to www → canonical says non-www → **Redirect error**.

**Fix (already in code):**

1. Canonical, sitemap, and robots use `https://www.jaychauhan.tech`.
2. Deploy the latest build to Vercel.
3. In Search Console, add property `https://www.jaychauhan.tech` (not non-www).
4. URL Inspection → test `https://www.jaychauhan.tech/` → **Request indexing**.

### Verification fails

- Env var must be named exactly `GOOGLE_SITE_VERIFICATION`
- Redeploy after adding the env var
- Code is the `content` value only — no quotes or full meta tag
- Check you verified `https://www.jaychauhan.tech`, not non-www or a Vercel preview URL
- Try **Google Analytics** verification instead (Option A above)

### Sitemap “Couldn’t fetch”

- Confirm production deploy succeeded
- Open `https://www.jaychauhan.tech/sitemap.xml` in a browser
- Check Vercel domain DNS is correctly configured

### Pages not indexing

- Wait 1–2 weeks after first submission (normal for new sites)
- Ensure page has unique `title` and `description` metadata
- Add internal links from indexed pages (home → blog → posts)
- Request indexing manually for priority URLs

### Structured data errors

Test with [Rich Results Test](https://search.google.com/test/rich-results):

- Home: Person + WebSite + WebPage schemas
- Blog post: BlogPosting + BreadcrumbList

---

## Useful tools

| Tool                                                              | Purpose                                 |
| ----------------------------------------------------------------- | --------------------------------------- |
| [Google Search Console](https://search.google.com/search-console) | Indexing, queries, sitemaps             |
| [Rich Results Test](https://search.google.com/test/rich-results)  | Structured data validation              |
| [PageSpeed Insights](https://pagespeed.web.dev/)                  | Core Web Vitals                         |
| [Google Analytics](https://analytics.google.com/)                 | Traffic and behavior                    |
| [Bing Webmaster Tools](https://www.bing.com/webmasters)           | Extra search engine coverage (optional) |

---

## What I need from you

To finish setup, please provide or complete:

1. **Google Search Console verification code** — after you create the property, paste the `content` value from the HTML tag method so we can add it to Vercel (or add it yourself using the steps above).
2. **Use www in Search Console** — property must be `https://www.jaychauhan.tech`.
3. **Search Console access** — let me know once verified if you want help reading the first Performance / Indexing reports.

---

## File reference (codebase)

| File                        | Purpose                                |
| --------------------------- | -------------------------------------- |
| `src/lib/seo.ts`            | Central SEO config and JSON-LD helpers |
| `src/app/layout.tsx`        | Global metadata + GSC verification     |
| `src/app/sitemap.ts`        | XML sitemap generation                 |
| `src/app/robots.ts`         | Crawler rules                          |
| `src/app/feed.xml/route.ts` | Blog RSS feed                          |
| `.env.example`              | Verification env var template          |

---

_Last updated: June 2026_
