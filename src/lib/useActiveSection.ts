"use client";

import { useEffect, useState } from "react";
import { nav } from "@/data/content";

const hrefs = nav.map((item) => item.href);

/** The menu link of the section under the middle of the screen, or null between them. */
export function useActiveSection(): string | null {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const inView = new Set<string>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const href = `#${entry.target.id}`;
          if (entry.isIntersecting) inView.add(href);
          else inView.delete(href);
        }
        setActive(hrefs.find((href) => inView.has(href)) ?? null);
      },
      // A line a little above the middle of the screen.
      { rootMargin: "-45% 0px -55% 0px" },
    );
    for (const href of hrefs) {
      const section = document.querySelector(href);
      if (section) observer.observe(section);
    }
    return () => observer.disconnect();
  }, []);

  return active;
}
