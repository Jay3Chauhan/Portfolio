"use client";

import { useActionState, useEffect, useRef } from "react";
import { useFormStatus } from "react-dom";
import { sendContactMessage } from "@/app/actions/contact";
import { contactForm } from "@/content/forms";
import { initialContactState, limits, type ContactField } from "@/lib/contact";
import { cn } from "@/lib/utils";

const fieldClass =
  "bg-transparent border-line focus:border-ink placeholder:text-whisper w-full border-b py-3 text-base font-light outline-none transition-colors duration-300";

type FieldProps = {
  name: ContactField;
  autoComplete: string;
  error?: string;
  type?: "text" | "email";
  rows?: number;
};

function Field({ name, autoComplete, error, type, rows }: FieldProps) {
  const id = `contact-${name}`;
  const errorId = `${id}-error`;
  const copy = contactForm.fields[name];

  const shared = {
    id,
    name,
    required: true,
    maxLength: limits[name],
    autoComplete,
    placeholder: copy.placeholder,
    "aria-invalid": Boolean(error),
    "aria-describedby": error ? errorId : undefined,
  };

  return (
    <div>
      <label htmlFor={id} className="label text-whisper">
        {copy.label}
      </label>

      {rows ? (
        <textarea
          {...shared}
          rows={rows}
          className={cn(fieldClass, "mt-2 resize-none", error && "border-ember")}
        />
      ) : (
        <input
          {...shared}
          type={type}
          className={cn(fieldClass, "mt-2", error && "border-ember")}
        />
      )}

      {error ? (
        <p id={errorId} className="label text-ember mt-2">
          {error}
        </p>
      ) : null}
    </div>
  );
}

/** Split out because `useFormStatus` only reads the form above it. */
function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="label border-ink text-ink hover:bg-ink hover:text-paper cursor-pointer rounded-full border px-7 py-3.5 transition-colors duration-400 disabled:cursor-wait disabled:opacity-50"
    >
      {pending ? contactForm.submit.pending : contactForm.submit.idle}
    </button>
  );
}

export function ContactForm() {
  const [state, submit] = useActionState(sendContactMessage, initialContactState);
  const formRef = useRef<HTMLFormElement>(null);

  // Clear the fields only once the message is actually away. On failure the
  // visitor keeps everything they typed.
  useEffect(() => {
    if (state.status === "sent") formRef.current?.reset();
  }, [state.status, state.attempt]);

  return (
    <form
      ref={formRef}
      action={submit}
      noValidate
      className="flex flex-col gap-7"
    >
      <input
        type="text"
        name="botcheck"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />

      <Field name="name" type="text" autoComplete="name" error={state.fieldErrors.name} />
      <Field
        name="email"
        type="email"
        autoComplete="email"
        error={state.fieldErrors.email}
      />
      <Field
        name="message"
        rows={4}
        autoComplete="off"
        error={state.fieldErrors.message}
      />

      <div className="flex flex-wrap items-center gap-5">
        <SubmitButton />

        <p
          role="status"
          aria-live="polite"
          className={cn("label", state.status === "error" ? "text-ember" : "text-pine")}
        >
          {state.message}
        </p>
      </div>
    </form>
  );
}
