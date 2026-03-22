"use client";

import { useEffect, useRef, useState } from "react";

const TYPING_PHRASES = [
  "Building fintech apps at Arhamshare",
  "Former Google DSC Lead",
  "Microsoft Student Ambassador",
  "Flutter & Firebase Expert",
  "Open Source Contributor",
  "Cloud Native Developer",
];

function Particles() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    for (let i = 0; i < 25; i++) {
      const p = document.createElement("div");
      p.className = "particle";
      p.style.left = Math.random() * 100 + "%";
      p.style.animationDuration = (Math.random() * 6 + 4) + "s";
      p.style.animationDelay = (Math.random() * 6) + "s";
      const size = (Math.random() * 3 + 1) + "px";
      p.style.width = size;
      p.style.height = size;
      container.appendChild(p);
    }
    return () => {
      container.innerHTML = "";
    };
  }, []);

  return <div ref={containerRef} className="hero-particles" id="heroParticles" />;
}

function CountUp({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          let current = 0;
          const increment = target / 60;
          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              current = target;
              clearInterval(timer);
            }
            setCount(Math.floor(current));
          }, 25);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return (
    <div ref={ref} className="stat-number" data-count={target}>
      {count}{suffix}
    </div>
  );
}

export default function Hero() {
  const [typingText, setTypingText] = useState("");
  const phraseIdx = useRef(0);
  const charIdx = useRef(0);
  const isDeleting = useRef(false);
  const heroContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function typeEffect() {
      const phrase = TYPING_PHRASES[phraseIdx.current];
      if (isDeleting.current) {
        charIdx.current--;
        setTypingText(phrase.substring(0, charIdx.current));
      } else {
        charIdx.current++;
        setTypingText(phrase.substring(0, charIdx.current));
      }

      let speed = isDeleting.current ? 30 : 60;

      if (!isDeleting.current && charIdx.current === phrase.length + 1) {
        speed = 2000;
        isDeleting.current = true;
      }
      if (isDeleting.current && charIdx.current < 0) {
        isDeleting.current = false;
        phraseIdx.current = (phraseIdx.current + 1) % TYPING_PHRASES.length;
        speed = 400;
      }

      setTimeout(typeEffect, speed);
    }

    const timeout = setTimeout(typeEffect, 1500);
    return () => clearTimeout(timeout);
  }, []);

  // Parallax effect on hero content
  useEffect(() => {
    const handleScroll = () => {
      const s = window.scrollY;
      const heroContent = heroContentRef.current;
      if (heroContent && s < window.innerHeight) {
        heroContent.style.transform = `translateY(${s * 0.15}px)`;
        heroContent.style.opacity = String(Math.max(0, 1 - s / (window.innerHeight * 1.5)));
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="hero" id="hero">
      <div className="hero-bg" />
      <div className="hero-grid-lines" />
      <Particles />

      <div className="hero-content" ref={heroContentRef}>
        <div className="hero-badge">
          <span className="pulse" /> Available for opportunities
        </div>

        <h1 className="hero-title">
          <span className="line">Software</span>
          <span className="line">
            <span className="accent">Engineer</span> &amp;
          </span>
          <span className="line">
            <span className="outline">Flutter</span> Expert
          </span>
        </h1>

        <div className="hero-typing-wrap">
          <span className="hero-typing-label">$&nbsp;</span>
          <span className="hero-typing" id="heroTyping">
            {typingText}
          </span>
        </div>

        <p className="hero-desc">
          I craft high-performance mobile applications with Flutter and Firebase.
          Former Google DSC Lead and Microsoft Student Ambassador, currently
          building fintech solutions at Arhamshare.
        </p>

        <div className="hero-actions">
          <a
            href="#projects"
            className="btn-magnetic"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            <span className="btn-primary">
              View My Work{" "}
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" width="18" height="18">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </span>
          </a>
          <a
            href="https://drive.google.com/file/d/1EddxDs0TL6hxAp9qMkkvwT8korQZP9wa/view"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-magnetic"
          >
            <span className="btn-secondary">
              Download Resume{" "}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" />
              </svg>
            </span>
          </a>
        </div>

        <div className="hero-stats">
          <div className="stat-item">
            <CountUp target={3} />
            <div className="stat-label">Years Experience</div>
          </div>
          <div className="stat-item">
            <CountUp target={10} />
            <div className="stat-label">Projects Shipped</div>
          </div>
          <div className="stat-item">
            <CountUp target={508} />
            <div className="stat-label">Community Members</div>
          </div>
          <div className="stat-item">
            <CountUp target={6} />
            <div className="stat-label">Certifications</div>
          </div>
        </div>
      </div>

      <div className="hero-visual">
        <div className="hero-visual-ring">
          <div className="orbit-dot" />
        </div>
        <div className="hero-visual-ring" />
        <div className="hero-visual-ring" />
      </div>

      <div className="scroll-indicator">
        <span>Scroll</span>
        <div className="scroll-mouse" />
      </div>
    </section>
  );
}
