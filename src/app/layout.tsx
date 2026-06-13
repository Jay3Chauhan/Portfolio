import type { Metadata, Viewport } from "next";
import { Syne, DM_Sans, JetBrains_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0a0a0a",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://jaychauhan.tech"),
  title: {
    default: "Jay Chauhan | Backend Engineer & AI Developer | Python & FastAPI",
    template: "%s | Jay Chauhan",
  },
  description:
    "Jay Chauhan is a Software Engineer specializing in Python, FastAPI, and AI/GenAI — building production-grade fintech backends, RAG pipelines, and microservices. Former Google DSC Lead and Microsoft Student Ambassador.",
  keywords: [
    "Jay Chauhan",
    "Software Engineer",
    "Backend Developer",
    "Python Developer",
    "FastAPI",
    "LangChain",
    "RAG",
    "Generative AI",
    "Microservices",
    "Google DSC",
    "Microsoft Student Ambassador",
    "Arhamshare",
    "Fintech",
    "Portfolio",
  ],
  authors: [{ name: "Jay Chauhan", url: "https://jaychauhan.tech" }],
  creator: "Jay Chauhan",
  publisher: "Jay Chauhan",
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
    locale: "en_US",
    url: "https://jaychauhan.tech",
    siteName: "Jay Chauhan — Portfolio",
    title: "Jay Chauhan | Backend Engineer & AI Developer",
    description:
      "Software Engineer specializing in Python, FastAPI, and AI — building fintech backends, RAG pipelines, and microservices at scale.",
    images: [
      {
        url: "https://cdn.jsdelivr.net/gh/Jay3Chauhan/Portfolio@master/images/pic1.png",
        width: 1200,
        height: 630,
        alt: "Jay Chauhan — Backend Engineer & AI Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Jay Chauhan | Backend Engineer & AI Developer",
    description:
      "Software Engineer specializing in Python, FastAPI, and AI — building fintech backends, RAG pipelines, and microservices at scale.",
    images: ["https://cdn.jsdelivr.net/gh/Jay3Chauhan/Portfolio@master/images/pic1.png"],
    creator: "@Jay3_Chauhan",
  },
  alternates: {
    canonical: "https://jaychauhan.tech",
  },
  icons: {
    icon: [
      { url: "/favicon/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Jay Chauhan",
  url: "https://jaychauhan.tech/",
  image: "https://cdn.jsdelivr.net/gh/Jay3Chauhan/Portfolio@master/images/pic1.png",
  jobTitle: "Software Engineer",
  description:
    "Software Engineer specializing in Python, FastAPI, and AI — building fintech backends, RAG pipelines, and microservices at scale.",
  sameAs: [
    "https://www.linkedin.com/in/jay-chauhan-5a65921ba/",
    "https://github.com/Jay3Chauhan",
    "https://twitter.com/Jay3_Chauhan",
    "https://instagram.com/Jay3_Chauhan",
  ],
  worksFor: {
    "@type": "Organization",
    name: "Arhamshare Pvt Ltd.",
  },
  alumniOf: {
    "@type": "Organization",
    name: "Gujarat Technological University",
  },
  knowsAbout: [
    "Python",
    "FastAPI",
    "LangChain",
    "RAG Pipelines",
    "Generative AI",
    "Microservices",
    "PostgreSQL",
    "Docker",
    "Azure",
    "Google Cloud",
  ],
};

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import CursorGlow from "@/components/CursorGlow";
import ScrollProgress from "@/components/ScrollProgress";
import BackToTop from "@/components/BackToTop";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${syne.variable} ${dmSans.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-1QEB2QFT9X"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-1QEB2QFT9X');
          `}
        </Script>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <CursorGlow />
        <ScrollProgress />
        <Navigation />
        {children}
        <Footer />
        <BackToTop />
      </body>
    </html>
  );
}
