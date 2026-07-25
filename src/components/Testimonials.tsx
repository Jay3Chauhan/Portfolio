"use client";

import ScrollReveal from "./ScrollReveal";

type Testimonial = {
  name: string;
  role: string;
  quote: string;
  /** Real LinkedIn recommendation URL or profile link, if available. */
  linkedinUrl?: string;
  avatar?: string;
  /** Must be true (real name + real role, ideally a LinkedIn link) to render.
   *  This gate exists because unverified/initials-only testimonials read as
   *  fabricated to skeptical readers and hurt credibility more than having
   *  none at all — see the July 2026 site audit. */
  verified: boolean;
};

// To re-enable this section: add real testimonials below with `verified: true`,
// ideally sourced from actual LinkedIn Recommendations (Settings & Privacy →
// Data privacy → Get a copy of your data, or ask connections to leave one).
// Until then this array stays empty and the section renders nothing.
const TESTIMONIALS: Testimonial[] = [];

export default function Testimonials() {
  const verified = TESTIMONIALS.filter((t) => t.verified);
  if (verified.length === 0) return null;

  return (
    <section id="testimonials">
      <div className="section-container">
        <ScrollReveal>
          <div className="section-label">Testimonials</div>
        </ScrollReveal>
        <ScrollReveal>
          <h2 className="section-title">What People Say</h2>
        </ScrollReveal>
        <ScrollReveal>
          <p className="section-desc">
            Feedback from colleagues and collaborators I&apos;ve had the pleasure
            of working with.
          </p>
        </ScrollReveal>

        <div className="testimonials-track" id="testimonialsTrack">
          {verified.map((t, i) => (
            <div key={i} className="testimonial-card">
              <div className="quote-mark">&ldquo;</div>
              <blockquote>{t.quote}</blockquote>
              <div className="testimonial-author">
                <div className="testimonial-avatar">
                  {t.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .slice(0, 2)
                    .toUpperCase()}
                </div>
                <div className="testimonial-author-info">
                  <div className="ta-name">
                    {t.linkedinUrl ? (
                      <a href={t.linkedinUrl} target="_blank" rel="noopener noreferrer">
                        {t.name}
                      </a>
                    ) : (
                      t.name
                    )}
                  </div>
                  <div className="ta-role">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
