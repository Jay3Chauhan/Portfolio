import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // Never disallow /_next/ — Googlebot renders the page, and blocking the
        // JS and CSS bundles makes it index an unstyled, half-built DOM.
        disallow: ["/api/"],
      },
    ],
    host: siteConfig.url,
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
