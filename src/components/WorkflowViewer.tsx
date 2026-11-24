"use client";

import Image from "next/image";
import { useLayoutEffect, useRef, useState } from "react";

export type Shot = { src: string; title: string; alt: string };

/**
 * A workflow screenshot over the whole screen. It opens at its original size, where the
 * node names are readable, and scrolls when it is larger than the screen. One button
 * switches to the whole picture and back.
 *
 * It is a native modal <dialog>, so Escape closes it, focus stays inside, and focus goes
 * back to the card that opened it. The parent does the closing, because it animates it.
 */
export function WorkflowViewer({
  shot,
  onClose,
}: {
  shot: Shot;
  onClose: (dialog: HTMLDialogElement | null) => void;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [fit, setFit] = useState(false);

  // A layout effect, so it is open by the time a transition captures the page.
  useLayoutEffect(() => {
    const dialog = dialogRef.current;
    if (dialog && !dialog.open) dialog.showModal();
  }, []);

  const close = () => onClose(dialogRef.current);

  const button =
    "inline-flex h-9 items-center justify-center rounded-lg border border-line-strong px-3 text-xs text-fg press hover:bg-fg hover:text-bg";

  return (
    <dialog
      ref={dialogRef}
      onCancel={(e) => {
        e.preventDefault();
        close();
      }}
      // The browser can still close it by itself, on a second Escape.
      onClose={close}
      aria-label={shot.alt}
      className="fixed inset-0 m-0 h-dvh max-h-none w-screen max-w-none bg-bg text-fg"
    >
      <div className="flex h-full flex-col">
        <div className="flex shrink-0 items-center justify-between gap-4 border-b border-line px-4 py-3 sm:px-6">
          <p className="min-w-0 truncate text-sm font-medium">{shot.title}</p>
          <div className="flex shrink-0 gap-2 font-mono">
            <button type="button" onClick={() => setFit((f) => !f)} className={button}>
              {fit ? "Original size" : "Fit to screen"}
            </button>
            <button type="button" onClick={close} aria-label="Close" className={`${button} w-9 px-0`}>
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M3 3l10 10M13 3L3 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        </div>

        {/* A click beside the picture closes it. Focusable, so the arrow keys can scroll it. */}
        <div
          tabIndex={0}
          role="group"
          aria-label="Screenshot, scroll to see all of it"
          onClick={(e) => e.target === e.currentTarget && close()}
          className="viewer-stage flex min-h-0 flex-1 overflow-auto overscroll-contain"
        >
          <Image
            src={shot.src}
            alt={shot.alt}
            width={0}
            height={0}
            unoptimized
            loading="eager"
            onLoad={(e) => {
              // The nodes sit around the middle, and the first one on the left.
              const box = e.currentTarget.parentElement;
              if (box) box.scrollTop = (box.scrollHeight - box.clientHeight) / 2;
            }}
            className={
              fit ? "m-auto max-h-full max-w-full object-contain" : "m-auto h-auto w-auto max-w-none shrink-0"
            }
            style={fit ? { width: "auto", height: "auto" } : undefined}
          />
        </div>
      </div>
    </dialog>
  );
}
