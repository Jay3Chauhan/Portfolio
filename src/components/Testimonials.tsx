"use client";

import ScrollReveal from "./ScrollReveal";

const TESTIMONIALS = [
  {
    initials: "TC",
    name: "Tech Colleague",
    role: "Senior Developer, Arhamshare",
    quote:
      "Jay is an exceptional backend engineer who brings both technical excellence and creative problem-solving to every project. His Python and FastAPI skills are outstanding — he consistently architects scalable systems that exceed expectations.",
  },
  {
    initials: "GM",
    name: "GDSC Member",
    role: "Core Team, GDSC GTU",
    quote:
      "As GDSC Lead, Jay demonstrated remarkable leadership and organizational skills. He grew our community from scratch to 500+ members and created an inclusive, learning-focused environment for all.",
  },
  {
    initials: "MI",
    name: "Microsoft Mentee",
    role: "Engage Program 2022",
    quote:
      "Working with Jay on the Microsoft Engage project was a great experience. His ability to quickly grasp complex concepts like face recognition with OpenCV and translate them into working Python solutions is impressive.",
  },
  {
    initials: "TL",
    name: "Team Lead",
    role: "Arhamshare Engineering",
    quote:
      "Jay's backend microservices architecture for our trading platform was instrumental. His work on WebSocket streams, Redis caching, and the Account Aggregator integration showed deep systems thinking.",
  },
];

export default function Testimonials() {
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
          {TESTIMONIALS.map((t, i) => (
            <div key={i} className="testimonial-card">
              <div className="quote-mark">&ldquo;</div>
              <blockquote>{t.quote}</blockquote>
              <div className="testimonial-author">
                <div className="testimonial-avatar">{t.initials}</div>
                <div className="testimonial-author-info">
                  <div className="ta-name">{t.name}</div>
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
