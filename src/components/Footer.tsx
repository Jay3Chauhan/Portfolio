export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-grid">
        <div className="footer-brand">
          <div className="nav-logo" style={{ fontSize: "1.2rem" }}>
            <span className="dot" /> Jay Chauhan
          </div>
          <p>
            Software Developer specializing in high-performance mobile
            applications with Flutter and Firebase. Always building, always
            learning.
          </p>
        </div>

        <div className="footer-col">
          <h4>Navigation</h4>
          <a href="/#about">About</a>
          <a href="/#experience">Experience</a>
          <a href="/#projects">Projects</a>
          <a href="/#skills">Skills</a>
          <a href="/blog">Blog</a>
          <a href="/#contact">Contact</a>
        </div>

        <div className="footer-col">
          <h4>Connect</h4>
          <a
            href="https://www.linkedin.com/in/jay-chauhan-5a65921ba/"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
          <a
            href="https://github.com/Jay3Chauhan"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
          <a
            href="https://twitter.com/Jay3_Chauhan"
            target="_blank"
            rel="noopener noreferrer"
          >
            Twitter
          </a>
          <a
            href="https://www.credly.com/users/jay3_chauhan"
            target="_blank"
            rel="noopener noreferrer"
          >
            Credly
          </a>
          <a href="mailto:contact@jaychauhan.tech">Email</a>
        </div>
      </div>

      <div className="footer-bottom">
        <p>
          © 2025 <span>Jay Chauhan</span>. Crafted with passion and precision
          from Surat, India.
        </p>
      </div>
    </footer>
  );
}
