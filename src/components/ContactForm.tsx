"use client";

import { useState } from "react";
import { Loader2, Send, CheckCircle2, AlertCircle } from "lucide-react";

type Status = "idle" | "sending" | "success" | "error";

const WEB3FORMS_ACCESS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!WEB3FORMS_ACCESS_KEY) {
      setStatus("error");
      setErrorMsg(
        "Contact form isn't configured yet — please email contact@jaychauhan.tech directly."
      );
      return;
    }

    const form = e.currentTarget;
    const formData = new FormData(form);
    formData.append("access_key", WEB3FORMS_ACCESS_KEY);

    setStatus("sending");
    setErrorMsg("");

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: formData,
      });
      const result = await res.json();

      if (result.success) {
        setStatus("success");
        form.reset();
      } else {
        throw new Error(result.message || "Something went wrong.");
      }
    } catch (err) {
      setStatus("error");
      setErrorMsg(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try emailing directly."
      );
    }
  }

  if (status === "success") {
    return (
      <div className="form-status form-status-success" role="status">
        <CheckCircle2 size={22} aria-hidden="true" />
        <div>
          <strong>Message sent!</strong>
          <p>Thanks for reaching out — I&apos;ll get back to you soon.</p>
        </div>
      </div>
    );
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <input type="hidden" name="subject" value="New message from jaychauhan.tech" />
      <input type="checkbox" name="botcheck" className="sr-only" tabIndex={-1} autoComplete="off" />

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="cf-name">Name</label>
          <input id="cf-name" name="name" type="text" required autoComplete="name" />
        </div>
        <div className="form-group">
          <label htmlFor="cf-email">Email</label>
          <input id="cf-email" name="email" type="email" required autoComplete="email" />
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="cf-message">Message</label>
        <textarea id="cf-message" name="message" rows={4} required />
      </div>

      {status === "error" && (
        <div className="form-status form-status-error" role="alert">
          <AlertCircle size={18} aria-hidden="true" />
          <span>{errorMsg}</span>
        </div>
      )}

      <button type="submit" className="btn-primary form-submit" disabled={status === "sending"}>
        {status === "sending" ? (
          <>
            Sending <Loader2 size={18} className="spin" aria-hidden="true" />
          </>
        ) : (
          <>
            Send Message <Send size={16} aria-hidden="true" />
          </>
        )}
      </button>
    </form>
  );
}
