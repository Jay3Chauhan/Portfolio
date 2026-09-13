"use server";

import { headers } from "next/headers";
import { contactForm } from "@/content/forms";
import { contact } from "@/content/site";
import { initialContactState, validateContact, type ContactState } from "@/lib/contact";

const resendEndpoint = "https://api.resend.com/emails";
const windowMs = 10 * 60_000;
const maxPerWindow = 4;

/**
 * Per-instance sliding window. Not a distributed limiter — it exists so one
 * bored visitor or a naive bot cannot drain the Resend quota in a minute.
 */
const attempts = new Map<string, number[]>();

function isThrottled(key: string): boolean {
  const now = Date.now();

  if (attempts.size > 500) {
    for (const [entry, stamps] of attempts) {
      if (stamps.every((stamp) => now - stamp >= windowMs)) attempts.delete(entry);
    }
  }

  const recent = (attempts.get(key) ?? []).filter((stamp) => now - stamp < windowMs);
  if (recent.length >= maxPerWindow) {
    attempts.set(key, recent);
    return true;
  }

  attempts.set(key, [...recent, now]);
  return false;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function read(formData: FormData, name: string): string {
  const value = formData.get(name);
  return typeof value === "string" ? value.trim() : "";
}

export async function sendContactMessage(
  previous: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const attempt = previous.attempt + 1;
  const settle = (state: Omit<ContactState, "attempt">): ContactState => ({
    ...state,
    attempt,
  });

  // Hidden from humans, irresistible to form-fillers. Report success so the
  // bot gets no signal worth retrying against.
  if (read(formData, "botcheck")) {
    return settle({ status: "sent", message: contactForm.status.sent, fieldErrors: {} });
  }

  const input = {
    name: read(formData, "name"),
    email: read(formData, "email"),
    message: read(formData, "message"),
  };

  const fieldErrors = validateContact(input);
  if (Object.keys(fieldErrors).length > 0) {
    return settle({ ...initialContactState, status: "error", fieldErrors });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return settle({
      status: "error",
      message: contactForm.status.unconfigured,
      fieldErrors: {},
    });
  }

  const mailbox = contact.email;
  const domain = mailbox.slice(mailbox.indexOf("@") + 1);
  const to = process.env.CONTACT_TO_EMAIL ?? mailbox;
  const from = process.env.CONTACT_FROM_EMAIL ?? `Portfolio <portfolio@${domain}>`;

  const requestHeaders = await headers();
  const origin =
    requestHeaders.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";

  if (isThrottled(origin)) {
    return settle({
      status: "error",
      message: contactForm.status.throttled,
      fieldErrors: {},
    });
  }

  const body = [
    `From: ${input.name} <${input.email}>`,
    `Sent: ${new Date().toISOString()}`,
    "",
    input.message,
  ].join("\n");

  try {
    const response = await fetch(resendEndpoint, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: input.email,
        subject: `Portfolio — ${input.name}`,
        text: body,
        html: `<pre style="font:14px/1.6 ui-monospace,monospace;white-space:pre-wrap">${escapeHtml(body)}</pre>`,
      }),
      cache: "no-store",
    });

    if (!response.ok) {
      console.error("Resend rejected the message", response.status, await response.text());
      return settle({
        status: "error",
        message: contactForm.status.failed,
        fieldErrors: {},
      });
    }
  } catch (error) {
    console.error("The message never reached Resend", error);
    return settle({
      status: "error",
      message: contactForm.status.failed,
      fieldErrors: {},
    });
  }

  return settle({ status: "sent", message: contactForm.status.sent, fieldErrors: {} });
}
