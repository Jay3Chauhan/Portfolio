# July 2026 Audit — Fixes Applied

Source: `jaychauhan-tech-full-audit-report.md` (full UI/UX, content, SEO & automation audit, reviewed July 25, 2026).

Branch: `audit-fixes/seo-ui-ux-2026-07`

This document tracks what was fixed directly in code vs. what still needs action from you (accounts, real content, or manual steps outside the codebase).

---

## ✅ Fixed in code (this branch)

| #   | Audit item                                                                                                                                          | What changed                                                                                                                                                                                                               | Files                                                          |
| --- | --------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------- |
| 1   | Skill bars used arbitrary percentages (Python 94%, FastAPI 93%...)                                                                                  | Replaced with 3 proficiency tiers (**Expert / Proficient / Familiar**) tied to real hands-on usage, with a legend and tier-colored bars — no more fake precision                                                           | `src/components/Skills.tsx`                                    |
| 2   | Emoji used as functional UI icons (🐍🤖☁️👥📍✉️📞🌐🎪)                                                                                              | Swapped for `lucide-react` icons (already a project dependency) throughout About, Services, Contact, and the featured project visual                                                                                       | `About.tsx`, `Services.tsx`, `Contact.tsx`, `Projects.tsx`     |
| 3   | "View on GitHub" links pointed to your profile root, not the actual repo, on proprietary employer projects (ComplianceIQ, Trado)                    | Removed the misleading links; these now show a **"Private"** badge (they're proprietary/employer codebases, not open source — a fabricated repo link would be worse than none)                                             | `src/components/Projects.tsx`                                  |
| 4   | Testimonials used vague initials ("TC", "GM"...) with no real names/photos — reads as fabricated                                                    | Rebuilt the component to require `verified: true` real data (name + role, ideally a LinkedIn link) before rendering anything. **The section is now empty and renders nothing** until you add real, attributed testimonials | `src/components/Testimonials.tsx`                              |
| 5   | No structured data (Person JSON-LD)                                                                                                                 | Already implemented in a prior session (`src/lib/seo.ts` → `getPersonJsonLd()`) — confirmed present in `<head>`                                                                                                            | `src/app/layout.tsx`                                           |
| 6   | www/non-www canonicalization                                                                                                                        | Already fixed in a prior session — canonical, sitemap, and redirects all point to `https://www.jaychauhan.tech`                                                                                                            | `src/lib/seo.ts`, `vercel.json`                                |
| 7   | Hero stat counters render "0" before JS animates — risk for crawlers/screen readers/slow connections                                                | Added a visually-hidden `sr-only` span with the real final value next to each counter; the animated number is now `aria-hidden`                                                                                            | `src/components/Hero.tsx`                                      |
| 8   | Marquee is decorative but not marked as such — screen readers would read a duplicated list                                                          | Added `aria-hidden="true"` on the scrolling track plus a single, real `sr-only` tech list for screen readers                                                                                                               | `src/components/Marquee.tsx`                                   |
| 9   | "Available for opportunities" badge was generic                                                                                                     | Changed to **"Open to Backend & AI/ML roles · Remote or Gujarat, India"**                                                                                                                                                  | `src/components/Hero.tsx`                                      |
| 10  | Older learning projects (FaceTrack, Instagram scraper, YouTube downloader, E-Commerce bot) sat at equal visual weight to production fintech systems | Moved into a collapsed **"Early Projects & Learning Archive"** section below the main grid — visible on request, de-emphasized by default                                                                                  | `src/components/Projects.tsx`                                  |
| 11  | Certifications mixed technical credentials with non-technical recognition (GDSC Lead Certificate)                                                   | Split into two labeled groups: **"Technical Certifications"** and **"Leadership & Recognition"**; most recent/relevant cert (AWS GenAI, March 2025) now leads                                                              | `src/components/Certifications.tsx`                            |
| 12  | Services cards had no concrete metrics                                                                                                              | Added a real, always-visible metric line per card (e.g. _"Powers 3 live apps, 1k–10k concurrent users"_) instead of a hover-only reveal (hover-only content is inaccessible on touch devices)                              | `src/components/Services.tsx`                                  |
| 13  | About's "Community Leader" card diluted the technical narrative by sitting at equal weight with 3 technical cards                                   | Split into 3 technical highlight cards + a visually distinct **Leadership Callout** below                                                                                                                                  | `src/components/About.tsx`                                     |
| 14  | Interactive drag-physics zone sat between Certifications/Testimonials and Contact — risk of being a recruiter's last impression before your CTA     | Moved to **after** Contact in page order                                                                                                                                                                                   | `src/app/page.tsx`                                             |
| 15  | No contact form — `mailto:` fails silently without a configured desktop mail client                                                                 | Added a real contact form using **Web3Forms** (free, no backend, 250 free submissions/month) with loading/success/error states and a honeypot field                                                                        | `src/components/ContactForm.tsx`, `src/components/Contact.tsx` |
| 16  | `cv.pdf` independently indexed by Google with stale Flutter-era content                                                                             | Added a route at `/cv.pdf` that returns **410 Gone** + `X-Robots-Tag: noindex` — the strongest signal to deindex a URL that's on a domain you control                                                                      | `src/app/cv.pdf/route.ts`                                      |
| 17  | Resume hosted on Google Drive (permission errors, off-brand, slower)                                                                                | Centralized the resume URL into `siteConfig.resumeUrl` — one place to update once you self-host the PDF                                                                                                                    | `src/lib/seo.ts`                                               |
| 18  | Hero "Certifications" stat (hardcoded `6`) had drifted out of sync with the actual certifications list (8 items)                                    | Certifications count is now computed from the same data used to render the section — can't drift again                                                                                                                     | `src/components/Certifications.tsx`, `src/components/Hero.tsx` |

Also included from the prior session (already on this branch): an interactive neural-network canvas in the hero, cursor-following card spotlight, button shine effects, and a global `prefers-reduced-motion` guard.

---

## ⚠️ Needs your action (can't be done from code alone)

### 1. Fix Google's stale search index (🔴 highest priority — do this first)

This is the audit's #1 finding and nothing in code can fix an already-indexed snapshot. In [Google Search Console](https://search.google.com/search-console):

1. Confirm `https://www.jaychauhan.tech` is verified.
2. **URL Inspection** → enter your homepage → **Request Indexing**. Repeat for `/blog` and key pages.
3. **Removals** → **New Request** → **Remove outdated content** → enter `https://www.jaychauhan.tech/cv.pdf` (and the non-www variant if indexed separately). This works _alongside_ the 410 response now shipped in code — the manual removal request is faster than waiting for Google to re-crawl and notice the 410 on its own.
4. Re-check `site:jaychauhan.tech` in ~1–2 weeks to confirm the new title/description are live.

### 2. Add real testimonials (or leave the section removed)

`src/components/Testimonials.tsx` now ships empty on purpose. To bring it back:

1. Get 2–4 real LinkedIn Recommendations, or ask colleagues directly for a short quote + permission to use their name.
2. Add entries to the `TESTIMONIALS` array with `verified: true`, their real name, real role, and ideally a `linkedinUrl`.
3. The section will automatically reappear once at least one verified entry exists — no other code changes needed.

### 3. Set up the contact form

1. Go to [web3forms.com](https://web3forms.com), enter your email, get a free access key instantly (no signup).
2. Add it to Vercel: **Settings → Environment Variables** → `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` → your key → redeploy.
3. For local dev, copy `.env.example` to `.env.local` and fill in the same key.
4. Until this is set, the form shows a friendly fallback message pointing to your email instead of failing silently.

### 4. Self-host your resume

1. Export your current resume (matching your live Backend/AI positioning) as a PDF.
2. Add it to `public/` in this repo (e.g. `public/jay-chauhan-resume.pdf`).
3. Update `resumeUrl` in `src/lib/seo.ts` to `/jay-chauhan-resume.pdf`.
4. This fixes the permission-error risk of Google Drive and keeps your resume on your own domain.

### 5. ComplianceIQ case study depth (Month 2 item, bigger lift)

Not attempted in this pass — it needs your input (real RAGAS numbers, a demo GIF/video, and ideally an architecture diagram). When you're ready, I can help build:

- A simple architecture diagram (ingestion → chunking → Qdrant → retrieval → Groq LLaMA → citation-grounded answer)
- A dedicated case-study section or page if you can provide a demo recording or real eval numbers

### 6. Automation pipeline (Credly/GitHub/blog → LinkedIn)

Per the audit's §4, this is a good weekend project matching your stack (Python, cron, REST APIs, OAuth) but requires your own LinkedIn Developer App + OAuth setup — outside what can be pre-built without your credentials. Let me know if you want a GitHub Actions workflow scaffolded once you have API access set up.

---

## How to preview this branch

```bash
git checkout audit-fixes/seo-ui-ux-2026-07
npm run dev
```

## How to ship it

Once you're happy with the changes (and have at minimum set the `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` env var so the contact form works), merge this branch into `master` and deploy as usual.
