import { Archivo, JetBrains_Mono, Newsreader } from "next/font/google";

/**
 * Three variable families, self-hosted by next/font at build time.
 *
 * Archivo carries a width axis, so the same file serves both body copy and
 * the extended-grotesk wordmark — no fourth font needed.
 */
export const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  display: "swap",
  variable: "--font-archivo",
});

export const newsreader = Newsreader({
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-newsreader",
});

export const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jetbrains",
});

export const fontVariables = `${archivo.variable} ${newsreader.variable} ${jetbrainsMono.variable}`;
