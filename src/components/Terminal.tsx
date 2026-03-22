"use client";

import { useEffect, useRef } from "react";

interface TerminalLine {
  prompt?: string;
  command?: string;
  output?: string;
  delay: number;
}

const TERMINAL_LINES: TerminalLine[] = [
  { prompt: "jay@dev ~$", command: " whoami", delay: 0 },
  { output: "Jay Chauhan — Software Engineer @ Arhamshare", delay: 400 },
  { prompt: "jay@dev ~$", command: " cat skills.json", delay: 800 },
  { output: '<span class="string">{ "primary": "Flutter, Dart, Firebase" }</span>', delay: 1200 },
  { output: '<span class="string">{ "languages": "Python, Java, C, JS" }</span>', delay: 1400 },
  { output: '<span class="string">{ "cloud": "Azure, GCP, MongoDB" }</span>', delay: 1600 },
  { prompt: "jay@dev ~$", command: " git log --oneline -3", delay: 2200 },
  { output: '<span class="keyword">a3f21b8</span> feat: add real-time stock streaming', delay: 2600 },
  { output: '<span class="keyword">e7c94d2</span> fix: resolve SSL handshake on iOS', delay: 2800 },
  { output: '<span class="keyword">1b5fa39</span> refactor: Provider state management', delay: 3000 },
  { prompt: "jay@dev ~$", command: " echo $STATUS", delay: 3600 },
  { output: '<span class="string">"Open to exciting opportunities!"</span> 🚀', delay: 4000 },
  { prompt: "jay@dev ~$", command: ' <span class="comment"># Let\'s build something amazing ▋</span>', delay: 4600 },
];

export default function Terminal() {
  const containerRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const terminalStarted = useRef(false);
  const revealDone = useRef(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Two observers:
    // 1. Reveal observer for the scale-in animation (threshold 0.1)
    const revealObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !revealDone.current) {
          revealDone.current = true;
          container.classList.add("visible");
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );

    // 2. Terminal typing observer (threshold 0.4)
    const termObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !terminalStarted.current) {
          terminalStarted.current = true;
          const body = bodyRef.current;
          if (!body) return;

          TERMINAL_LINES.forEach((line) => {
            setTimeout(() => {
              const div = document.createElement("div");
              div.className = "terminal-line";
              div.style.animationDelay = "0s";

              if (line.prompt) {
                div.innerHTML = `<span class="prompt">${line.prompt}</span><span class="command">${line.command}</span>`;
              } else {
                div.innerHTML = `<span class="output">${line.output}</span>`;
              }

              body.appendChild(div);
              body.scrollTop = body.scrollHeight;
            }, line.delay);
          });
        }
      },
      { threshold: 0.4 }
    );

    revealObserver.observe(container);
    termObserver.observe(container);

    return () => {
      revealObserver.disconnect();
      termObserver.disconnect();
    };
  }, []);

  return (
    <div className="terminal-section">
      <div className="terminal-container reveal-scale" ref={containerRef}>
        <div className="terminal">
          <div className="terminal-header">
            <span className="terminal-dot red" />
            <span className="terminal-dot yellow" />
            <span className="terminal-dot green" />
            <span className="terminal-title">jay@portfolio ~ zsh</span>
          </div>
          <div className="terminal-body" id="terminalBody" ref={bodyRef} />
        </div>
      </div>
    </div>
  );
}
