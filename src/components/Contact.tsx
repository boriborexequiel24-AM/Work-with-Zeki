"use client";

import { useState, type FormEvent } from "react";
import { profile } from "@/data/content";
import { Arrow, Section, SectionHeader } from "./ui";

type Status = { state: "idle" | "sending" | "sent" } | { state: "error"; message: string };

// Posts to /api/contact, which forwards to an n8n webhook (see src/app/api/contact/route.ts).
export function Contact() {
  const [status, setStatus] = useState<Status>({ state: "idle" });

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus({ state: "sending" });
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(new FormData(form))),
      });
      const data = (await res.json()) as { ok: boolean; error?: string };
      if (!res.ok || !data.ok) throw new Error(data.error ?? "Something went wrong.");
      form.reset();
      setStatus({ state: "sent" });
    } catch (err) {
      setStatus({ state: "error", message: err instanceof Error ? err.message : "Something went wrong." });
    }
  }

  const sending = status.state === "sending";

  const field =
    "w-full rounded-lg border border-line bg-bg px-4 py-3 text-sm placeholder:text-subtle focus:border-accent/60 focus:outline-none";

  return (
    <Section id="contact" className="border-t border-line">
      <div className="grid gap-14 lg:grid-cols-2">
        <div>
          <SectionHeader
            index="06"
            eyebrow="Contact"
            title={
              <>
                Have a process that eats your team&apos;s time? <span className="text-accent">Let&apos;s automate it.</span>
              </>
            }
            intro="I'm currently available for freelance work and consulting. Tell me what you're trying to fix and I'll reply within a day."
          />
          <dl className="space-y-5">
            <div>
              <dt className="font-mono text-xs text-subtle uppercase">Email</dt>
              <dd>
                <a href={`mailto:${profile.email}`} className="text-lg hover:text-accent">
                  {profile.email}
                </a>
              </dd>
            </div>
            <div>
              <dt className="font-mono text-xs text-subtle uppercase">LinkedIn</dt>
              <dd>
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-lg hover:text-accent"
                >
                  Connect with me <Arrow />
                </a>
              </dd>
            </div>
          </dl>
        </div>

        <form onSubmit={onSubmit} className="space-y-4 rounded-2xl border border-line bg-surface p-7 sm:p-9">
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="mb-1.5 block text-xs text-muted">Name</span>
              <input name="name" required autoComplete="name" className={field} placeholder="Jane Smith" />
            </label>
            <label className="block">
              <span className="mb-1.5 block text-xs text-muted">Email</span>
              <input name="email" type="email" required autoComplete="email" className={field} placeholder="jane@company.com" />
            </label>
          </div>
          <label className="block">
            <span className="mb-1.5 block text-xs text-muted">What do you want to automate?</span>
            <textarea name="message" required rows={6} className={`${field} resize-none`} placeholder="We spend hours every week copying leads from email into our CRM…" />
          </label>
          {/* Honeypot: hidden from people, filled by bots */}
          <input name="company" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
          <button
            type="submit"
            disabled={sending}
            className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-fg px-5 py-3 text-sm font-medium text-bg transition-colors hover:bg-accent hover:text-on-accent disabled:cursor-wait disabled:opacity-60"
          >
            {sending ? "Sending…" : <>Send message <Arrow /></>}
          </button>
          <p role="status" aria-live="polite" className="min-h-4 text-center text-xs">
            {status.state === "sent" && (
              <span className="text-accent">Thanks, your message is in. I&apos;ll get back to you within a day.</span>
            )}
            {status.state === "error" && (
              <span className="text-danger">
                {status.message} You can also email me at{" "}
                <a href={`mailto:${profile.email}`} className="underline">
                  {profile.email}
                </a>
                .
              </span>
            )}
          </p>
        </form>
      </div>
    </Section>
  );
}
