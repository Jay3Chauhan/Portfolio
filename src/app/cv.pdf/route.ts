import { siteConfig } from "@/lib/seo";

// Google has an old, stale cv.pdf indexed at this exact path from a previous
// version of this site (with outdated Flutter/mobile-dev content). That file
// no longer exists here. Returning 410 Gone (rather than a generic 404) with
// an explicit noindex directive is the strongest, fastest signal to search
// engines to drop the stale URL from their index.
//
// Action still required in Google Search Console: use "Remove outdated
// content" (https://search.google.com/search-console/removals) for this URL
// to speed up deindexing beyond what this response alone achieves.
export async function GET() {
  const html = `<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8"><title>Gone</title></head>
<body>
  <p>This resume file has been removed. Please visit
  <a href="${siteConfig.url}">${siteConfig.url}</a> for current information,
  or download the latest resume from the homepage.</p>
</body>
</html>`;

  return new Response(html, {
    status: 410,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "X-Robots-Tag": "noindex, nofollow",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
