import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/seo";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.name,
    short_name: siteConfig.shortName,
    description: siteConfig.description,
    start_url: "/",
    display: "standalone",
    background_color: "#edeae2",
    theme_color: "#edeae2",
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
