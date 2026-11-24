"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState, type CSSProperties, type PointerEvent } from "react";
import type { CodeProject } from "@/data/content";
import { Arrow, Tag } from "./ui";

/**
 * One project per slide, with a tab for each project above the card.
 *
 * The track is a native horizontal scroll with snap points, so a finger swipe and a
 * trackpad work without any code. Mouse drag, the arrow keys, the tabs and the arrow
 * buttons are added here. Inside a slide the screenshots change by thumbnail, not by
 * swipe, so the two never compete for the same gesture.
 *
 * While a programmatic scroll is animating, onScroll is ignored, otherwise the
 * half-way positions would flick the active tab back.
 */
export function ProjectCarousel({ projects }: { projects: CodeProject[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);
  const animatingRef = useRef(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const dragRef = useRef({ active: false, moved: false, startX: 0, startLeft: 0, startIndex: 0 });
  const [index, setIndex] = useState(0);

  // Scrolling is over: take the active project from where the track really is. A swipe may
  // have interrupted the animation and landed somewhere else.
  const settle = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    animatingRef.current = false;
    const track = trackRef.current;
    if (!track || dragRef.current.moved || track.clientWidth === 0) return;
    setIndex(Math.round(track.scrollLeft / track.clientWidth));
  }, []);

  const goTo = useCallback(
    (i: number) => {
      const track = trackRef.current;
      if (!track) return;
      const next = Math.max(0, Math.min(projects.length - 1, i));
      setIndex(next);

      animatingRef.current = true;
      if (timerRef.current) clearTimeout(timerRef.current);
      // scrollend normally settles it. This is for browsers without that event, and for
      // when there is nothing to scroll.
      timerRef.current = setTimeout(settle, 1200);

      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      track.scrollTo({ left: next * track.clientWidth, behavior: reduce ? "auto" : "smooth" });
    },
    [projects.length, settle],
  );

  // On a phone the tabs don't all fit, so the row scrolls to keep the active one in view.
  // Only the row moves: scrollIntoView could scroll the page too.
  useEffect(() => {
    const row = tabsRef.current;
    const tab = row?.children[index];
    if (!row || !tab) return;
    const r = row.getBoundingClientRect();
    const t = tab.getBoundingClientRect();
    if (t.left < r.left) row.scrollLeft -= r.left - t.left;
    else if (t.right > r.right) row.scrollLeft += t.right - r.right;
  }, [index]);

  const onScroll = useCallback(() => {
    const track = trackRef.current;
    if (!track || animatingRef.current || dragRef.current.moved || track.clientWidth === 0) return;
    setIndex(Math.round(track.scrollLeft / track.clientWidth));
  }, []);

  // Mouse drag. Touch already scrolls natively, so only a mouse is handled here. The
  // pointer is captured only once it has really moved, so a plain click on a link or a
  // thumbnail still reaches it.
  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    const track = trackRef.current;
    if (!track || e.pointerType !== "mouse" || e.button !== 0) return;
    dragRef.current = { active: true, moved: false, startX: e.clientX, startLeft: track.scrollLeft, startIndex: index };
  };

  // `data-dragging` is written straight onto the node, so every way a drag can end has
  // to come through here. Miss one and the track keeps snap-none and the grab cursor.
  const endDrag = (track: HTMLDivElement, pointerId: number) => {
    dragRef.current.active = false;
    delete track.dataset.dragging;
    if (track.hasPointerCapture(pointerId)) track.releasePointerCapture(pointerId);
  };

  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    const track = trackRef.current;
    const drag = dragRef.current;
    if (!track || !drag.active) return;

    // No button is down any more. The pointer left the track before it was captured and
    // was released out there, so the pointerup never reached us. Without this the drag
    // stays open and the next hover over the carousel scrolls it.
    if (e.buttons === 0) {
      endDrag(track, e.pointerId);
      drag.moved = false;
      return;
    }

    const dx = e.clientX - drag.startX;
    if (!drag.moved && Math.abs(dx) > 6) {
      drag.moved = true;
      track.dataset.dragging = "";
      track.setPointerCapture(e.pointerId);
    }
    if (drag.moved) track.scrollLeft = drag.startLeft - dx;
  };

  const onPointerUp = (e: PointerEvent<HTMLDivElement>) => {
    const track = trackRef.current;
    const drag = dragRef.current;
    if (!track || !drag.active) return;
    endDrag(track, e.pointerId);
    if (!drag.moved) return;
    const dx = e.clientX - drag.startX;
    goTo(dx < -60 ? drag.startIndex + 1 : dx > 60 ? drag.startIndex - 1 : drag.startIndex);
    // `moved` stays set until the click that ends this drag has been swallowed.
    setTimeout(() => {
      drag.moved = false;
    }, 0);
  };

  const many = projects.length > 1;

  return (
    <div data-reveal="">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-x-6 gap-y-3">
        <div
          ref={tabsRef}
          role="tablist"
          aria-label="Projects"
          className="flex min-w-0 gap-1.5 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {projects.map((p, i) => {
            const on = i === index;
            return (
              <button
                key={p.title}
                type="button"
                role="tab"
                id={`project-tab-${i}`}
                aria-selected={on}
                aria-controls={`project-${i}`}
                onClick={() => goTo(i)}
                className={`inline-flex shrink-0 items-baseline gap-2.5 rounded-full border px-4 py-2 text-sm transition-colors ${
                  on
                    ? "border-accent/60 bg-accent-soft text-accent"
                    : "border-line bg-surface text-muted hover:border-line-strong hover:text-fg"
                }`}
              >
                <span className={`font-mono text-[11px] ${on ? "text-accent" : "text-subtle"}`}>
                  {pad(i)}
                </span>
                {p.title}
              </button>
            );
          })}
        </div>

        {many && (
          <div className="flex items-center gap-3.5">
            <span className="font-mono text-xs text-subtle tabular-nums" aria-live="polite">
              <span className="text-fg">{pad(index)}</span> / {pad(projects.length - 1)}
            </span>
            <div className="flex gap-2">
              <StepButton dir="prev" disabled={index === 0} onClick={() => goTo(index - 1)} />
              <StepButton
                dir="next"
                disabled={index === projects.length - 1}
                onClick={() => goTo(index + 1)}
              />
            </div>
          </div>
        )}
      </div>

      <div
        ref={trackRef}
        tabIndex={0}
        aria-roledescription="carousel"
        aria-label="Projects built with Claude Code"
        onScroll={onScroll}
        onScrollEnd={settle}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onClickCapture={(e) => {
          if (dragRef.current.moved) {
            e.preventDefault();
            e.stopPropagation();
          }
        }}
        onKeyDown={(e) => {
          if (e.target !== e.currentTarget) return;
          if (e.key === "ArrowRight") {
            e.preventDefault();
            goTo(index + 1);
          } else if (e.key === "ArrowLeft") {
            e.preventDefault();
            goTo(index - 1);
          }
        }}
        className={`flex snap-x snap-mandatory overflow-x-auto overscroll-x-contain rounded-2xl border border-line bg-surface [scrollbar-width:none] data-dragging:cursor-grabbing data-dragging:snap-none data-dragging:select-none [&::-webkit-scrollbar]:hidden ${
          many ? "cursor-grab" : ""
        }`}
      >
        {projects.map((p, i) => (
          <article
            key={p.title}
            id={`project-${i}`}
            role="tabpanel"
            aria-labelledby={`project-tab-${i}`}
            // Tabbing into the other slide's links brings that slide into view.
            onFocus={() => i !== index && goTo(i)}
            className="grid w-full shrink-0 snap-start lg:grid-cols-12"
          >
            <Screens shots={p.shots} label={p.title} />

            <div
              className={`flex flex-col p-6 sm:p-8 ${
                p.shots.length ? "lg:col-span-5" : "lg:col-span-12"
              }`}
            >
              <p className="font-mono text-[11px] text-accent">{p.tagline}</p>
              <h3 className="mt-4 text-2xl font-medium tracking-tight text-balance">{p.title}</h3>
              <p className="mt-3 text-sm text-pretty text-muted">{p.summary}</p>

              <ul className="mt-6 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-line bg-line">
                {p.facts.map((f) => (
                  <li key={f.label} className="bg-surface p-4 sm:p-5">
                    <p className="text-lg font-semibold tracking-tight text-accent tabular-nums sm:text-xl">
                      {f.value}
                    </p>
                    <p className="mt-1 font-mono text-[11px] text-pretty text-muted">{f.label}</p>
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex flex-wrap gap-1.5">
                {p.stack.map((t) => (
                  <Tag key={t}>{t}</Tag>
                ))}
              </div>

              <div className="mt-auto flex flex-wrap items-center gap-x-6 gap-y-2 pt-6 font-mono text-xs">
                {p.liveUrl && (
                  <a
                    href={p.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-accent underline-offset-4 hover:underline"
                  >
                    Try the live demo <Arrow />
                  </a>
                )}
                {p.repoUrl && (
                  <a
                    href={p.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-muted underline-offset-4 transition-colors hover:text-fg hover:underline"
                  >
                    Read the code <Arrow />
                  </a>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

/** The left half of a slide: one large screenshot and a row of thumbnails to switch it. */
function Screens({ shots, label }: { shots: CodeProject["shots"]; label: string }) {
  const [active, setActive] = useState(0);
  // The picture on show and the one before it, which stays underneath while it fades in.
  const [layers, setLayers] = useState([{ id: 0, index: 0 }]);
  // `shots[active]` is typed as defined, so nothing else catches a project added with
  // no screenshots yet. Drop the panel instead of throwing and taking the page down.
  const shot = shots[active] ?? shots[0];
  if (!shot) return null;

  const pick = (i: number) => {
    if (i === active) return;
    setActive(i);
    setLayers((l) => [...l.slice(-1), { id: l[l.length - 1].id + 1, index: i }]);
  };

  return (
    <div className="flex flex-col gap-3 border-b border-line bg-bg p-4 sm:p-6 lg:col-span-7 lg:border-r lg:border-b-0">
      <div
        className={`relative aspect-[16/10] overflow-hidden rounded-xl border border-line ${
          shot.fit === "contain" ? "bg-canvas" : "bg-bg"
        }`}
      >
        {layers.map((layer, i) => {
          const picture = shots[layer.index] ?? shot;
          return (
            <Layer key={layer.id} shot={picture} fade={layer.id > 0} current={i === layers.length - 1} />
          );
        })}
      </div>

      <p className="min-h-8 font-mono text-[11px] text-pretty text-subtle" aria-live="polite">
        {shot.caption}
      </p>

      {shots.length > 1 && (
        // On wider screens every thumbnail fits on one row, however many there are.
        <div
          className="grid grid-cols-5 gap-1.5 sm:grid-cols-(--thumb-cols)"
          style={{ "--thumb-cols": `repeat(${shots.length}, minmax(0, 1fr))` } as CSSProperties}
        >
          {shots.map((s, i) => (
            <button
              key={s.src}
              type="button"
              onClick={() => pick(i)}
              aria-pressed={i === active}
              aria-label={`${label}: ${s.caption}`}
              className={`relative aspect-[16/10] overflow-hidden rounded-md border transition ${
                s.fit === "contain" ? "bg-canvas" : "bg-bg"
              } ${
                i === active
                  ? "border-accent opacity-100"
                  : "border-line opacity-65 hover:opacity-100"
              }`}
            >
              <Image
                src={s.src}
                alt=""
                fill
                draggable={false}
                sizes="96px"
                className={s.fit === "contain" ? "object-contain" : "object-cover object-left-top"}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/** One screenshot. It stays invisible until its picture has loaded, then fades in. */
function Layer({
  shot,
  fade,
  current,
}: {
  shot: CodeProject["shots"][number];
  fade: boolean;
  current: boolean;
}) {
  const [ready, setReady] = useState(!fade);
  const contain = shot.fit === "contain";

  return (
    <div
      aria-hidden={!current}
      className={`absolute inset-0 ${contain ? "bg-canvas" : "bg-bg"} ${
        !ready ? "opacity-0" : fade ? "animate-fade-in" : ""
      }`}
    >
      <Image
        src={shot.src}
        alt={current ? shot.caption : ""}
        fill
        draggable={false}
        onLoad={() => setReady(true)}
        sizes="(min-width: 1152px) 640px, (min-width: 1024px) 55vw, 100vw"
        className={contain ? "object-contain object-center" : "object-cover object-left-top"}
      />
    </div>
  );
}

function StepButton({
  dir,
  disabled,
  onClick,
}: {
  dir: "prev" | "next";
  disabled: boolean;
  onClick: () => void;
}) {
  const prev = dir === "prev";
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={prev ? "Previous project" : "Next project"}
      className="grid size-9 place-items-center rounded-full border border-line-strong bg-surface text-fg press enabled:hover:bg-fg enabled:hover:text-bg disabled:opacity-35"
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

const pad = (i: number) => String(i + 1).padStart(2, "0");
