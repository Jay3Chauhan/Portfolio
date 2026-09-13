/**
 * Shape and validation for the contact form. Lives outside the action file
 * because a `"use server"` module may only export async functions — and
 * because the client wants the same rules for its own `maxLength` hints.
 */

import { contactForm } from "@/content/forms";

export type ContactField = "name" | "email" | "message";

export type ContactState = {
  status: "idle" | "sent" | "error";
  /** Form-level result. Empty when the only problems are per-field. */
  message: string;
  fieldErrors: Partial<Record<ContactField, string>>;
  /** Incremented per completed attempt, so a repeat result still re-renders. */
  attempt: number;
};

export const initialContactState: ContactState = {
  status: "idle",
  message: "",
  fieldErrors: {},
  attempt: 0,
};

export const limits = {
  name: 80,
  email: 160,
  message: 4000,
} as const;

/** Deliberately loose. The only real proof an address works is a reply. */
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validateContact(input: Record<ContactField, string>) {
  const fieldErrors: Partial<Record<ContactField, string>> = {};

  if (input.name.length < 2 || input.name.length > limits.name) {
    fieldErrors.name = contactForm.errors.name;
  }

  if (!emailPattern.test(input.email) || input.email.length > limits.email) {
    fieldErrors.email = contactForm.errors.email;
  }

  if (input.message.length < 20 || input.message.length > limits.message) {
    fieldErrors.message = contactForm.errors.message;
  }

  return fieldErrors;
}
