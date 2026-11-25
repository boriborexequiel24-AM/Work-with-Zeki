"use client";

import { useEffect } from "react";

// How fast the page catches up with the wheel, per second. Higher is snappier.
const SPEED = 9;

/**
 * Turns the steps of a mouse wheel into one continuous glide. Everything else keeps the
 * browser's own scrolling: touch, trackpads (already smooth), the keyboard, the scrollbar,
 * links, and anything that scrolls inside the page. Off for visitors who ask for less motion.
 */
export function SmoothScroll() {
  useEffect(() => {
    const allowed = window.matchMedia(
      "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
    );

    let frame = 0;
    let target = 0;
    let position = 0;
    let lastFrame = 0;
    let lastWheel = 0;
    let trackpad = false;

    const stop = () => {
      cancelAnimationFrame(frame);
      frame = 0;
    };

    const step = (time: number) => {
      const seconds = Math.min((time - lastFrame) / 1000, 0.05);
      lastFrame = time;
      // Something else moved the page since our last frame. It wins.
      if (Math.abs(window.scrollY - position) > 3) return stop();

      position += (target - position) * (1 - Math.exp(-SPEED * seconds));
      const done = Math.abs(target - position) < 0.5;
      if (done) position = target;
      window.scrollTo({ top: position, behavior: "instant" });
      frame = done ? 0 : requestAnimationFrame(step);
    };

    const onWheel = (e: WheelEvent) => {
      // A gesture that starts with a small move comes from a trackpad. Leave all of it alone.
      if (e.timeStamp - lastWheel > 200) trackpad = e.deltaMode === 0 && Math.abs(e.deltaY) < 50;
      lastWheel = e.timeStamp;

      if (!allowed.matches || trackpad || e.defaultPrevented) return;
      if (e.ctrlKey || e.metaKey || e.shiftKey || Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;
      if (document.querySelector("dialog[open]") || scrollsInside(e.target, e.deltaY)) return stop();

      e.preventDefault();
      const unit = e.deltaMode === 1 ? 32 : e.deltaMode === 2 ? window.innerHeight : 1;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (!frame) position = target = window.scrollY;
      target = Math.max(0, Math.min(max, target + e.deltaY * unit));
      if (!frame) {
        lastFrame = performance.now();
        frame = requestAnimationFrame(step);
      }
    };

    // The wheel listener has to be able to stop the default, so it can't be passive.
    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("keydown", stop);
    window.addEventListener("pointerdown", stop);
    return () => {
      stop();
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("keydown", stop);
      window.removeEventListener("pointerdown", stop);
    };
  }, []);

  return null;
}

/** Whether something between the pointer and the page can still scroll that way itself. */
function scrollsInside(from: EventTarget | null, deltaY: number): boolean {
  for (let el = from instanceof Element ? from : null; el && el !== document.body; el = el.parentElement) {
    if (el.scrollHeight <= el.clientHeight + 1) continue;
    if (!/auto|scroll/.test(getComputedStyle(el).overflowY)) continue;
    if (deltaY < 0 ? el.scrollTop > 0 : el.scrollTop + el.clientHeight < el.scrollHeight - 1) return true;
  }
  return false;
}
