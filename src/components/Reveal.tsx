"use client";

import { useEffect } from "react";

/**
 * Lets everything marked `data-reveal` rise into place the first time it is scrolled to.
 * Only what is still below the screen when the page opens is hidden, and only from here,
 * so nothing is ever missing without JavaScript and the first view loads at full speed.
 * The look is in globals.css.
 *
 * A check every second backs the observer up: it shows whatever is on screen or already
 * passed and still hidden, without animating it. Once, in testing, the observer missed some.
 */
export function Reveal() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const timers: ReturnType<typeof setTimeout>[] = [];
    const observer = new IntersectionObserver(
      (entries) => {
        let order = 0;
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          observer.unobserve(entry.target);
          const el = entry.target as HTMLElement;
          // Cards of one row arrive one after another.
          el.style.transitionDelay = `${Math.min(order++, 3) * 90}ms`;
          el.dataset.reveal = "in";
          timers.push(
            setTimeout(() => {
              el.style.transitionDelay = "";
              el.dataset.reveal = "";
            }, 1800),
          );
        }
      },
      { rootMargin: "0px 0px -6% 0px" },
    );

    const waiting: HTMLElement[] = [];
    for (const el of document.querySelectorAll<HTMLElement>("[data-reveal]")) {
      if (el.getBoundingClientRect().top < window.innerHeight) continue;
      el.dataset.reveal = "wait";
      waiting.push(el);
      observer.observe(el);
    }

    const net = setInterval(() => {
      let left = 0;
      for (const el of waiting) {
        if (el.dataset.reveal !== "wait") continue;
        // A little inside the screen, so the observer normally gets there first.
        if (el.getBoundingClientRect().top < window.innerHeight * 0.9) {
          observer.unobserve(el);
          el.dataset.reveal = "";
        } else {
          left++;
        }
      }
      if (left === 0) clearInterval(net);
    }, 1000);

    return () => {
      observer.disconnect();
      clearInterval(net);
      timers.forEach(clearTimeout);
      for (const el of waiting) {
        el.style.transitionDelay = "";
        el.dataset.reveal = "";
      }
    };
  }, []);

  return null;
}
