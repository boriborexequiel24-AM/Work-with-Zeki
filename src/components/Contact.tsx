"use client";

import { useState, type FormEvent } from "react";
import { profile, sections } from "@/data/content";
import { Arrow, Section, SectionHeader } from "./ui";

type Status = { state: "idle" | "sending" | "sent" } | { state: "error"; message: string };

// Show the address itself, the way the email row does, rather than a label.
const short = (url: string) => url.replace(/^https:\/\/(www\.)?/, "");

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
      // An error page from the host isn't JSON. Only our own API's text is shown to visitors.
      const data = (await res.json().catch(() => null)) as { ok?: boolean; error?: string } | null;
      if (!res.ok || !data?.ok) {
        setStatus({ state: "error", message: data?.error ?? "Couldn't send right now." });
        return;
      }
      form.reset();
      setStatus({ state: "sent" });
    } catch {
      setStatus({ state: "error", message: "Couldn't reach the server. Check your connection and try again." });
    }
  }

  const sending = status.state === "sending";

  // 16px text on phones: iOS zooms the page in on anything smaller.
  const field =
    "w-full rounded-lg border border-line bg-bg px-4 py-3 text-base sm:text-sm placeholder:text-subtle focus:border-accent/60";

  return (
    <Section id="contact" className="dots dots-up border-t border-line">
      <div className="grid gap-14 lg:grid-cols-2">
        <div>
          <SectionHeader
            index="06"
            eyebrow={sections.contact.eyebrow}
            title={
              <>
                {sections.contact.title} <span className="text-accent">{sections.contact.titleAccent}</span>
              </>
            }
            intro={sections.contact.intro}
          />
          <dl data-reveal="" className="space-y-3">
            <div>
              <dt className="font-mono text-xs text-subtle uppercase">Email</dt>
              <dd>
                <a href={`mailto:${profile.email}`} className="inline-block py-2 text-lg hover:text-accent">
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
                  className="inline-block max-w-full py-2 text-lg break-words hover:text-accent"
                >
                  {short(profile.linkedin)}
                </a>
              </dd>
            </div>
            <div>
              <dt className="font-mono text-xs text-subtle uppercase">GitHub</dt>
              <dd>
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block max-w-full py-2 text-lg break-words hover:text-accent"
                >
                  {short(profile.github)}
                </a>
              </dd>
            </div>
          </dl>
        </div>

        <form onSubmit={onSubmit} data-reveal="" className="space-y-4 rounded-2xl border border-line bg-surface p-7 sm:p-9">
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
            <span className="mb-1.5 block text-xs text-muted">{sections.contact.messageLabel}</span>
            <textarea name="message" required rows={6} className={`${field} resize-none`} placeholder={sections.contact.messagePlaceholder} />
          </label>
          {/* Honeypot: hidden from people, filled by bots. The name must mean nothing to
              autofill, or a real visitor's browser fills it in and their message is dropped. */}
          <input
            name="hp_check"
            tabIndex={-1}
            autoComplete="off"
            data-1p-ignore
            data-lpignore="true"
            aria-hidden="true"
            className="hidden"
          />
          <button
            type="submit"
            disabled={sending}
            className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-fg px-5 py-3 text-sm font-medium text-bg press hover:bg-accent hover:text-on-accent disabled:cursor-wait disabled:opacity-60"
          >
            {sending ? "Sending…" : <>Send message <Arrow /></>}
          </button>
          <p role="status" aria-live="polite" className="min-h-4 text-center text-xs">
            {status.state === "sent" && (
              <span className="text-accent">
                <svg
                  className="mr-1.5 inline-block align-[-2px]"
                  width="14"
                  height="14"
                  viewBox="0 0 16 16"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    className="draw-check"
                    pathLength={1}
                    d="M3 8.5l3.5 3.5L13 4.5"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                {sections.contact.sent}
              </span>
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
