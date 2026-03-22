"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";

const NAV_SECTIONS = [
  { label: "About", section: "about" },
  { label: "Experience", section: "experience" },
  { label: "Projects", section: "projects" },
  { label: "Skills", section: "skills" },
  { label: "Certs", section: "certifications" },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const pathname = usePathname();
  const router = useRouter();
  const isHome = pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      if (!isHome) return;
      const sections = ["about", "experience", "projects", "skills", "certifications", "contact"];
      for (const id of sections) {
        const sec = document.getElementById(id);
        if (!sec) continue;
        const rect = sec.getBoundingClientRect();
        if (rect.top <= 200 && rect.bottom >= 200) {
          setActiveSection(id);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHome]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const handleSectionClick = (e: React.MouseEvent<HTMLAnchorElement>, section: string) => {
    e.preventDefault();
    setMobileOpen(false);

    if (isHome) {
      // On home page, smooth scroll to section
      const el = document.getElementById(section);
      el?.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      // On other pages, navigate to home with hash
      router.push(`/#${section}`);
    }
  };

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setMobileOpen(false);
    if (isHome) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      router.push("/");
    }
  };

  return (
    <>
      {mobileOpen && (
        <div
          className="nav-backdrop"
          onClick={() => setMobileOpen(false)}
        />
      )}
      <nav className={`nav ${scrolled ? "scrolled" : ""}`} id="nav">
        <a
          href="/"
          className="nav-logo"
          onClick={handleLogoClick}
        >
          <span className="dot" /> Jay Chauhan
        </a>

        <div className={`nav-links ${mobileOpen ? "open" : ""}`} id="navLinks">
          {NAV_SECTIONS.map((item) => (
            <a
              key={item.section}
              href={isHome ? `#${item.section}` : `/#${item.section}`}
              data-section={item.section}
              className={isHome && activeSection === item.section ? "active" : ""}
              onClick={(e) => handleSectionClick(e, item.section)}
            >
              {item.label}
            </a>
          ))}
          <Link
            href="/blog"
            className={`nav-link-blog${pathname.startsWith("/blog") ? " active" : ""}`}
            onClick={() => setMobileOpen(false)}
          >
            Blog
          </Link>
          <a
            href={isHome ? "#contact" : "/#contact"}
            className="nav-cta"
            onClick={(e) => handleSectionClick(e, "contact")}
          >
            Let&apos;s Talk
          </a>
        </div>

        <div
          className={`mobile-toggle ${mobileOpen ? "active" : ""}`}
          id="mobileToggle"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          <span />
          <span />
          <span />
        </div>
      </nav>
    </>
  );
}
