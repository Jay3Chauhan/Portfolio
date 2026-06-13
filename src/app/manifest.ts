import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/seo";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.name,
    short_name: siteConfig.shortName,
    description: siteConfig.description,
    start_url: "/",
    display: "standalone",
    background_color: "#0a0a0b",
    theme_color: "#c9f31d",
    icons: [
      {
        src: "/favicon/Icon.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/favicon/Icon.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
