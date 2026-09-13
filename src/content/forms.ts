/**
 * Every string the contact form can put on screen, including the failure
 * states. Nothing user-facing lives in the action or the component.
 */

export const contactForm = {
  intro: "Or write here",
  fields: {
    name: { label: "Name", placeholder: "Your name" },
    email: { label: "Email", placeholder: "you@company.com" },
    message: { label: "Message", placeholder: "What are you building?" },
  },
  submit: { idle: "Send message", pending: "Sending" },
  status: {
    sent: "Message received. I'll reply within a day or two.",
    unconfigured:
      "The form isn't wired to a mailbox yet — use the address on the left and it lands the same place.",
    failed: "That didn't send. Email me directly and it will reach me.",
    throttled:
      "That's a few messages in a row. Give it ten minutes, or just email me.",
  },
  errors: {
    name: "Tell me what to call you.",
    email: "That address doesn't look reachable.",
    message: "A couple more sentences would help — what are you building?",
  },
} as const;
