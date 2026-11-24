"use client";

import { useEffect, useRef, useState } from "react";
import { nav } from "@/data/content";
import { useActiveSection } from "@/lib/useActiveSection";

// The section links for phones, where the row in Nav doesn't fit.
export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const active = useActiveSection();
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setOpen(false);
      buttonRef.current?.focus();
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div ref={rootRef} className="md:hidden">
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label={open ? "Close menu" : "Open menu"}
        className="grid size-9 place-items-center rounded-lg border border-line text-muted press hover:border-line-strong hover:text-fg"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path
            d={open ? "M3 3l10 10M13 3L3 13" : "M2 4h12M2 8h12M2 12h12"}
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </button>

      <nav
        id="mobile-menu"
        aria-label="Primary"
        hidden={!open}
        className="animate-menu-in absolute inset-x-0 top-full border-b border-line bg-bg px-5 py-2"
      >
        {nav.map((item) => (
          <a
            key={item.href}
            href={item.href}
            onClick={() => setOpen(false)}
            aria-current={active === item.href ? "location" : undefined}
            className="block border-b border-line py-3.5 text-base text-muted transition-colors last:border-b-0 hover:text-fg aria-[current]:text-accent"
          >
            {item.label}
          </a>
        ))}
      </nav>
    </div>
  );
}
