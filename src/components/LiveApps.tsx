"use client";

import Image from "next/image";
import ScrollReveal from "./ScrollReveal";

const APPS = [
  {
    name: "Trado by Arham",
    tagline: "Cutting-edge trading & investment platform",
    category: "Trading",
    rating: "4.7",
    ratingCount: "12",
    icon: "https://is1-ssl.mzstatic.com/image/thumb/PurpleSource211/v4/e7/ff/a2/e7ffa202-e2aa-6a39-2a69-7306078c45cd/Placeholder.mill/1024x1024bb.webp",
    playStore: "https://play.google.com/store/apps/details?id=com.wave.arhamtwo",
    appStore: "https://apps.apple.com/in/app/trado-by-arham/id6502446144",
    tech: ["Flutter", "Firebase", "REST APIs"],
  },
  {
    name: "ArhamShare: MF",
    tagline: "Data-driven mutual fund investing",
    category: "Finance",
    rating: "5.0",
    ratingCount: "1",
    icon: "https://is1-ssl.mzstatic.com/image/thumb/PurpleSource221/v4/13/8e/43/138e4345-99ba-3eea-2089-33333b2f1a21/Placeholder.mill/1024x1024bb.webp",
    playStore: "https://play.google.com/store/apps/details?id=com.arhamshare.mf",
    appStore: "https://apps.apple.com/in/app/arhamshare-mf/id6759367829",
    tech: ["Flutter", "Firebase", "Finvu SDK"],
  },
  {
    name: "GrowMint",
    tagline: "One App. Total Wealth View.",
    category: "Finance",
    rating: "New",
    ratingCount: "",
    icon: "https://is1-ssl.mzstatic.com/image/thumb/PurpleSource221/v4/57/43/c3/5743c369-ad28-adc9-a7ed-96dd22f9d9c4/Placeholder.mill/1024x1024bb.webp",
    playStore: "",
    appStore: "https://apps.apple.com/in/app/growmint/id6759909170",
    tech: ["Flutter", "Firebase", "MongoDB"],
  },
];

function StarRating({ rating }: { rating: string }) {
  if (rating === "New") {
    return <span className="app-rating-new">★ New</span>;
  }
  const val = parseFloat(rating);
  return (
    <span className="app-rating-stars">
      {[1, 2, 3, 4, 5].map((i) => (
        <span
          key={i}
          style={{
            color: i <= Math.round(val) ? "var(--accent)" : "var(--border-light)",
            fontSize: "0.85rem",
          }}
        >
          ★
        </span>
      ))}
      <span className="app-rating-value">{rating}</span>
    </span>
  );
}

export default function LiveApps() {
  return (
    <section id="live-apps">
      <div className="section-container">
        <ScrollReveal>
          <div className="section-label">Live on Stores</div>
        </ScrollReveal>
        <ScrollReveal>
          <h2 className="section-title">
            Apps in Production
          </h2>
        </ScrollReveal>
        <ScrollReveal>
          <p className="section-desc">
            Applications I&apos;ve built that are currently live on the Google
            Play Store and Apple App Store, serving real users every day.
          </p>
        </ScrollReveal>

        <div className="live-apps-grid">
          {APPS.map((app, i) => (
            <ScrollReveal key={i} delay={i}>
              <div className="live-app-card">
                <div className="live-app-header">
                  <div className="live-app-icon-wrap">
                    <Image
                      src={app.icon}
                      alt={app.name}
                      width={80}
                      height={80}
                      className="live-app-icon"
                      style={{
                        borderRadius: "18px",
                        objectFit: "cover",
                      }}
                    />
                    <span className="live-app-badge">
                      <span className="live-dot" />
                      LIVE
                    </span>
                  </div>
                  <div className="live-app-info">
                    <h3>{app.name}</h3>
                    <span className="live-app-category">{app.category}</span>
                    <div className="live-app-rating">
                      <StarRating rating={app.rating} />
                      {app.ratingCount && (
                        <span className="live-app-rating-count">
                          ({app.ratingCount})
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <p className="live-app-tagline">{app.tagline}</p>

                <div className="live-app-tech">
                  {app.tech.map((t) => (
                    <span key={t} className="tech-tag">
                      {t}
                    </span>
                  ))}
                </div>

                <div className="live-app-links">
                  {app.playStore && (
                    <a
                      href={app.playStore}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="store-link play-store-link"
                    >
                      <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                        <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 0 1-.61-.92V2.734a1 1 0 0 1 .609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.198l2.807 1.626a1 1 0 0 1 0 1.73l-2.808 1.626L15.206 12l2.492-2.491zM5.864 2.658L16.8 8.99l-2.3 2.3-8.636-8.632z"/>
                      </svg>
                      Play Store
                    </a>
                  )}
                  {app.appStore && (
                    <a
                      href={app.appStore}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="store-link app-store-link"
                    >
                      <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                      </svg>
                      App Store
                    </a>
                  )}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
