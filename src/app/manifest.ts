import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Jay Chauhan — Portfolio",
    short_name: "Jay Chauhan",
    description:
      "Full Stack Developer & Mobile App Engineer building impactful digital experiences.",
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
