"use client";

import { nav } from "@/data/content";
import { useActiveSection } from "@/lib/useActiveSection";

// The section links in the top bar. The one you are reading is underlined.
export function NavLinks({ base }: { base: string }) {
  const active = useActiveSection();

  return nav.map((item) => (
    <a
      key={item.href}
      href={base + item.href}
      aria-current={active === item.href ? "location" : undefined}
      className="nav-link relative text-sm text-muted transition-colors hover:text-fg aria-[current]:text-fg"
    >
      {item.label}
    </a>
  ));
}
