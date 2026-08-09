import fs from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";
import { identity } from "@/content/site";

export const alt = `${identity.fullName} — ${identity.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const PAPER = "#edeae2";
const INK = "#16171a";
const MIST = "#6b6a66";
const LINE = "#d6d1c6";
const PINE = "#1e4a3f";

/**
 * Fonts are committed as TTFs rather than fetched from Google at build time —
 * Satori cannot parse woff2, and a network dependency here fails the whole build.
 */
const FONT_DIR = path.join(process.cwd(), "src", "lib", "og-fonts");

async function readFont(file: string) {
  return fs.readFile(path.join(FONT_DIR, file));
}

export default async function OpengraphImage() {
  const [serif, sans, sansBold] = await Promise.all([
    readFont("newsreader-light.ttf"),
    readFont("archivo-regular.ttf"),
    readFont("archivo-bold.ttf"),
  ]);

  const rail = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    fontSize: 19,
    letterSpacing: "0.22em",
    textTransform: "uppercase" as const,
    color: MIST,
  };

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        backgroundColor: PAPER,
        color: INK,
        padding: "60px 72px",
        fontFamily: "Archivo",
      }}
    >
      <div style={{ ...rail, borderBottom: `1px solid ${LINE}`, paddingBottom: 26 }}>
        <span style={{ color: INK, fontFamily: "ArchivoBold" }}>{identity.wordmark}</span>
        <span>{identity.role}</span>
      </div>

      <div style={{ display: "flex", flexDirection: "column" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontFamily: "Newsreader",
            fontSize: 112,
            lineHeight: 1.02,
            letterSpacing: "-0.035em",
          }}
        >
          {identity.tagline.map((line) => (
            <span key={line} style={{ display: "flex" }}>
              {line}
            </span>
          ))}
        </div>

        <div
          style={{
            display: "flex",
            marginTop: 36,
            fontSize: 26,
            lineHeight: 1.45,
            color: MIST,
            maxWidth: 880,
          }}
        >
          Python and FastAPI backends for fintech, plus retrieval pipelines built to cite
          their sources.
        </div>
      </div>

      <div style={{ ...rail, borderTop: `1px solid ${LINE}`, paddingTop: 26 }}>
        <span>jaychauhan.tech</span>
        <span style={{ display: "flex", alignItems: "center", gap: 14, color: PINE }}>
          <span
            style={{ width: 10, height: 10, borderRadius: 9999, backgroundColor: PINE }}
          />
          Available for work
        </span>
      </div>
    </div>,
    {
      ...size,
      fonts: [
        { name: "Newsreader", data: serif, style: "normal", weight: 300 },
        { name: "Archivo", data: sans, style: "normal", weight: 400 },
        { name: "ArchivoBold", data: sansBold, style: "normal", weight: 700 },
      ],
    },
  );
}
