import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Nav } from "@/components/chrome/nav";
import { Footer } from "@/components/chrome/footer";
import { MobileIndex } from "@/components/chrome/mobile-index";
import { ScrollProgress } from "@/components/chrome/scroll-progress";
import { themeInitScript } from "@/components/chrome/theme-toggle";
import { Providers } from "@/components/providers";
import { fontVariables } from "@/lib/fonts";
import { getRootJsonLd, siteConfig } from "@/lib/seo";
import "./globals.css";

const GA_ID = "G-1QEB2QFT9X";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#edeae2" },
    { media: "(prefers-color-scheme: dark)", color: "#121316" },
  ],
};

const googleSiteVerification = process.env.GOOGLE_SITE_VERIFICATION;

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: "%s | Jay Chauhan",
  },
  description: siteConfig.description,
  keywords: [...siteConfig.keywords],
  applicationName: siteConfig.shortName,
  authors: [{ name: siteConfig.author.name, url: siteConfig.url }],
  creator: siteConfig.author.name,
  publisher: siteConfig.author.name,
  category: "technology",
  formatDetection: { email: false, address: false, telephone: false },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: siteConfig.title,
    description: siteConfig.description,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    creator: siteConfig.twitterHandle,
    site: siteConfig.twitterHandle,
  },
  alternates: {
    canonical: siteConfig.url,
    types: { "application/rss+xml": `${siteConfig.url}/feed.xml` },
  },
  ...(googleSiteVerification ? { verification: { google: googleSiteVerification } } : {}),
  icons: {
    icon: [
      { url: "/favicon/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
};

const jsonLd = getRootJsonLd();

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={fontVariables} suppressHydrationWarning>
      <head>
        {/* Must run before paint so the theme never flashes. */}
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <a
          href="#premise"
          className="label bg-paper text-ink border-ink sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:rounded-full focus:border focus:px-5 focus:py-3"
        >
          Skip to content
        </a>

        <div className="grain" aria-hidden="true" />

        <Providers>
          <ScrollProgress />
          <Nav />
          <MobileIndex />
          {/* Solid paper plane so the sticky footer can reveal underneath. */}
          <main className="bg-paper relative z-10 pb-20 xl:pb-0">{children}</main>
          <div className="relative z-0">
            <Footer />
          </div>
        </Providers>

        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="ga" strategy="afterInteractive">
          {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}');`}
        </Script>
      </body>
    </html>
  );
}
