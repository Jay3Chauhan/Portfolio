"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

type Status = "idle" | "sending" | "sent" | "error";

const ACCESS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;

const fieldClass =
  "bg-transparent border-line focus:border-ink placeholder:text-whisper w-full border-b py-3 text-base font-light outline-none transition-colors duration-300";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!ACCESS_KEY) {
      setStatus("error");
      setMessage("The form is not configured yet — please email me directly.");
      return;
    }

    setStatus("sending");
    const formData = new FormData(event.currentTarget);
    formData.append("access_key", ACCESS_KEY);
    formData.append("subject", "New message from jaychauhan.tech");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });
      const result = await response.json();

      if (result.success) {
        setStatus("sent");
        setMessage("Message received. I'll reply within a day or two.");
        event.currentTarget.reset();
      } else {
        throw new Error(result.message ?? "Submission failed");
      }
    } catch {
      setStatus("error");
      setMessage("That didn't send. Email me directly and it will reach me.");
    }
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-7">
      {/* Honeypot — bots fill this, humans never see it. */}
      <input
        type="checkbox"
        name="botcheck"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />

      <div>
        <label htmlFor="contact-name" className="label text-whisper">
          Name
        </label>
        <input
          id="contact-name"
          name="name"
          type="text"
          required
          autoComplete="name"
          placeholder="Your name"
          className={cn(fieldClass, "mt-2")}
        />
      </div>

      <div>
        <label htmlFor="contact-email" className="label text-whisper">
          Email
        </label>
        <input
          id="contact-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="you@company.com"
          className={cn(fieldClass, "mt-2")}
        />
      </div>

      <div>
        <label htmlFor="contact-message" className="label text-whisper">
          Message
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          rows={4}
          placeholder="What are you building?"
          className={cn(fieldClass, "mt-2 resize-none")}
        />
      </div>

      <div className="flex flex-wrap items-center gap-5">
        <button
          type="submit"
          disabled={status === "sending"}
          className="label border-ink text-ink hover:bg-ink hover:text-paper cursor-pointer rounded-full border px-7 py-3.5 transition-colors duration-400 disabled:cursor-wait disabled:opacity-50"
        >
          {status === "sending" ? "Sending" : "Send message"}
        </button>

        <p
          role="status"
          aria-live="polite"
          className={cn("label", status === "error" ? "text-ember" : "text-pine")}
        >
          {message}
        </p>
      </div>
    </form>
  );
}
