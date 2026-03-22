"use client";

import ScrollReveal from "./ScrollReveal";

const TESTIMONIALS = [
  {
    initials: "TC",
    name: "Tech Colleague",
    role: "Senior Developer, Arhamshare",
    quote:
      "Jay is an exceptional developer who brings both technical excellence and creative problem-solving to every project. His Flutter skills are truly top-notch and he consistently delivers beyond expectations.",
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
    name: "Microsoft Intern",
    role: "Engage Program 2022",
    quote:
      "Working with Jay on the Microsoft Engage project was a great experience. His ability to quickly grasp complex concepts like face recognition and translate them into working solutions is impressive.",
  },
  {
    initials: "CL",
    name: "Client",
    role: "EventHub User",
    quote:
      "Jay's event management app solved a real problem in our local community. The UI is clean, the features are well-thought-out, and the payment integration works flawlessly. Highly recommended.",
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
