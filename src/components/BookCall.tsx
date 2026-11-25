"use client";

import { useRef, useState } from "react";
import { profile, sections } from "@/data/content";
import { Arrow } from "./ui";

const copy = sections.booking;

/**
 * Opens Google Calendar's booking page over the site. Google's page loads only once
 * someone asks for it, so it costs the first view nothing and sees nobody else.
 *
 * Renders nothing until `profile.booking` is set. Only the full link from Calendar's
 * "Website embed" can be shown inside the site. Any other link opens in a new tab.
 */
export function BookCall({ className }: { className: string }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);

  const url = profile.booking;
  if (!url) return null;

  const label = (
    <>
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M4 6h16v14H4zM4 11h16M8 3v5M16 3v5"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      {copy.label} <Arrow />
    </>
  );

  if (!url.startsWith("https://calendar.google.com/calendar/")) {
    return (
      <a href={url} target="_blank" rel="noopener noreferrer" className={className}>
        {label}
      </a>
    );
  }

  const button =
    "inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-line-strong px-3 text-xs text-fg press hover:bg-fg hover:text-bg md:h-9";

  return (
    <>
      <button
        type="button"
        onClick={() => {
          setOpen(true);
          dialogRef.current?.showModal();
        }}
        className={className}
      >
        {label}
      </button>

      <dialog
        ref={dialogRef}
        onClose={() => setOpen(false)}
        // A click on the backdrop lands on the dialog itself.
        onClick={(e) => e.target === e.currentTarget && e.currentTarget.close()}
        aria-label={copy.title}
        className="booking m-auto h-dvh max-h-none w-screen max-w-none overflow-hidden bg-surface text-fg sm:h-[min(46rem,92dvh)] sm:w-[min(62rem,94vw)] sm:rounded-2xl sm:border sm:border-line-strong"
      >
        <div className="flex h-full flex-col">
          <div className="flex shrink-0 items-center justify-between gap-4 border-b border-line px-4 py-3 sm:px-6">
            <p className="min-w-0 truncate text-sm font-medium">{copy.title}</p>
            <div className="flex shrink-0 gap-2 font-mono">
              <a href={url} target="_blank" rel="noopener noreferrer" className={button}>
                {copy.newTab}
              </a>
              <button
                type="button"
                onClick={() => dialogRef.current?.close()}
                aria-label="Close"
                className={`${button} w-11 px-0 md:w-9`}
              >
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M3 3l10 10M13 3L3 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>
            </div>
          </div>
          {/* Google's page is always light, so it sits on white in both themes. */}
          {open && <iframe src={url} title={copy.title} className="min-h-0 w-full flex-1 bg-white" />}
        </div>
      </dialog>
    </>
  );
}
