"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

type Shot = { src: string; caption: string; fit?: "contain" };

/**
 * Horizontal screenshot track. Clicking a shot moves to the next one and wraps
 * at the end; the arrows and dots do the same, and a native swipe still works.
 *
 * The target index is kept in a ref, not just state, so clicking faster than the
 * smooth scroll animates still advances one shot per click. While a programmatic
 * scroll is running, onScroll is ignored, otherwise the half-way positions would
 * overwrite the target.
 */
export function Gallery({ shots, label }: { shots: Shot[]; label: string }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const targetRef = useRef(0);
  const animatingRef = useRef(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [index, setIndex] = useState(0);

  useEffect(() => () => {
    if (timerRef.current) clearTimeout(timerRef.current);
  }, []);

  const goTo = useCallback(
    (i: number) => {
      const track = trackRef.current;
      if (!track) return;
      const n = shots.length;
      const next = ((i % n) + n) % n;

      targetRef.current = next;
      setIndex(next);

      animatingRef.current = true;
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        animatingRef.current = false;
      }, 600);

      track.scrollTo({ left: next * track.clientWidth, behavior: "smooth" });
    },
    [shots.length],
  );

  const onScroll = useCallback(() => {
    if (animatingRef.current) return;
    const track = trackRef.current;
    if (!track || track.clientWidth === 0) return;
    const i = Math.round(track.scrollLeft / track.clientWidth);
    targetRef.current = i;
    setIndex(i);
  }, []);

  const many = shots.length > 1;

  return (
    <div className="flex flex-col gap-4">
      <div className="relative">
        <div
          ref={trackRef}
          onScroll={onScroll}
          className="flex snap-x snap-mandatory overflow-x-auto rounded-xl border border-line [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {shots.map((shot, i) => (
            <button
              key={shot.src}
              type="button"
              onClick={() => goTo(targetRef.current + 1)}
              aria-label={many ? `${label}: next screenshot` : `${label} screenshot`}
              tabIndex={i === index ? 0 : -1}
              className="relative aspect-[16/10] w-full shrink-0 snap-start cursor-pointer bg-bg sm:aspect-[21/9]"
            >
              <Image
                src={shot.src}
                alt={shot.caption}
                fill
                sizes="(min-width: 1536px) 1280px, 100vw"
                className={
                  shot.fit === "contain"
                    ? "object-contain object-center"
                    : "object-cover object-top"
                }
                priority={i === 0}
              />
            </button>
          ))}
        </div>

        {many && (
          <>
            <Chevron dir="prev" onClick={() => goTo(targetRef.current - 1)} />
            <Chevron dir="next" onClick={() => goTo(targetRef.current + 1)} />
          </>
        )}
      </div>

      <div className="flex min-h-9 items-start justify-between gap-4">
        <p
          className="font-mono text-[11px] text-pretty text-subtle"
          aria-live="polite"
        >
          {shots[index]?.caption}
        </p>

        {many && (
          <div className="flex shrink-0 items-center gap-1.5 pt-1">
            {shots.map((shot, i) => (
              <button
                key={shot.src}
                type="button"
                onClick={() => goTo(i)}
                aria-label={`Screenshot ${i + 1} of ${shots.length}`}
                aria-current={i === index}
                className={`h-1.5 rounded-full transition-all ${
                  i === index
                    ? "w-5 bg-accent"
                    : "w-1.5 bg-line-strong hover:bg-muted"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function Chevron({ dir, onClick }: { dir: "prev" | "next"; onClick: () => void }) {
  const prev = dir === "prev";
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={prev ? "Previous screenshot" : "Next screenshot"}
      className={`absolute top-1/2 -translate-y-1/2 rounded-full border border-line bg-surface/80 p-2 text-muted opacity-80 backdrop-blur transition hover:bg-surface hover:text-fg hover:opacity-100 ${
        prev ? "left-3" : "right-3"
      }`}
    >
      <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <path
          d={prev ? "M10 3L5 8l5 5" : "M6 3l5 5-5 5"}
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
