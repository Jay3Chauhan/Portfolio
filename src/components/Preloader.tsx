"use client";

import { useEffect, useRef } from "react";

export default function Preloader() {
  const preloaderRef = useRef<HTMLDivElement>(null);
  const percentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let pct = 0;
    const interval = setInterval(() => {
      pct += Math.floor(Math.random() * 8) + 2;
      if (pct >= 100) {
        pct = 100;
        clearInterval(interval);
        setTimeout(() => {
          preloaderRef.current?.classList.add("done");
        }, 300);
      }
      if (percentRef.current) {
        percentRef.current.textContent = pct + "%";
      }
    }, 60);

    return () => clearInterval(interval);
  }, []);

  return (
    <div ref={preloaderRef} className="preloader" id="preloader">
      <div className="preloader-logo">
        Jay<span style={{ color: "var(--accent)" }}>.</span>
      </div>
      <div className="preloader-bar">
        <div className="preloader-bar-fill" />
      </div>
      <div ref={percentRef} className="preloader-percent">
        0%
      </div>
    </div>
  );
}
