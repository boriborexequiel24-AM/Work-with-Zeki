"use client";

import Image from "next/image";
import { useRef, useState, type CSSProperties } from "react";
import { projects, sections, type Platform } from "@/data/content";
import { imageReady, now, withTransition } from "@/lib/transition";
import { Section, SectionHeader, Tag } from "./ui";
import { WorkflowViewer, type Shot } from "./WorkflowViewer";

const filters: ("All" | Platform)[] = [
  "All",
  "n8n",
  "Make",
  "Zapier",
  "GoHighLevel",
];

// Each card keeps one name across filter changes, so the browser can move it.
const cardName = (title: string) => `work-${title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;

export function Work() {
  const [active, setActive] = useState<(typeof filters)[number]>("All");
  const [open, setOpen] = useState<Shot | null>(null);
  const coverRef = useRef<HTMLElement | null>(null);
  const visible =
    active === "All" ? projects : projects.filter((p) => p.platform === active);

  // The cover that was clicked grows into the viewer, and the viewer shrinks back into it.
  // Both carry the same transition name, one before the change and one after.
  async function openShot(cover: HTMLElement, shot: Shot) {
    coverRef.current = cover;
    if (!(await imageReady(shot.src, 400))) {
      setOpen(shot);
      return;
    }
    cover.style.viewTransitionName = "shot";
    withTransition("viewer", async () => {
      cover.style.viewTransitionName = "";
      now(() => setOpen(shot));
      const image = document.querySelector<HTMLImageElement>("dialog[open] img");
      await Promise.race([image?.decode().catch(() => {}), new Promise((r) => setTimeout(r, 200))]);
    });
  }

  function closeShot(dialog: HTMLDialogElement | null) {
    const cover = coverRef.current;
    withTransition(
      "viewer",
      () => {
        // Closing it first gives focus back to the cover.
        dialog?.close();
        now(() => setOpen(null));
        if (cover) cover.style.viewTransitionName = "shot";
      },
      () => {
        if (cover) cover.style.viewTransitionName = "";
      },
    );
  }

  return (
    <Section id="work">
      <SectionHeader
        index="03"
        eyebrow={sections.work.eyebrow}
        title={sections.work.title}
        intro={`${projects.length} ${sections.work.intro}`}
      />

      <div
        role="tablist"
        aria-label="Filter by platform"
        className="mb-10 flex flex-wrap gap-2"
      >
        {filters.map((f) => {
          const count =
            f === "All"
              ? projects.length
              : projects.filter((p) => p.platform === f).length;
          const on = f === active;
          return (
            <button
              key={f}
              role="tab"
              aria-selected={on}
              onClick={() => withTransition("filter", () => now(() => setActive(f)))}
              className={`rounded-full border px-4 py-1.5 font-mono text-xs transition-colors ${
                on
                  ? "border-accent/60 bg-accent/10 text-accent"
                  : "border-line text-muted hover:border-line-strong hover:text-fg"
              }`}
            >
              {f} <span className="text-subtle">{count}</span>
            </button>
          );
        })}
      </div>

      <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {visible.map((p) => (
          <li
            key={p.title}
            data-reveal=""
            style={{ "--card-name": cardName(p.title) } as CSSProperties}
            className={`work-card group relative flex flex-col overflow-hidden rounded-2xl border border-line bg-surface transition-colors hover:border-line-strong ${
              p.featured && active === "All" ? "md:min-h-64" : ""
            }`}
          >
            {/* A workflow in two parts shows both, side by side. */}
            <div className="flex aspect-[16/9] gap-px overflow-hidden border-b border-line bg-line">
              {p.images.map((src, i) => {
                const part = p.images.length > 1 ? `, part ${i + 1}` : "";
                const alt = `${p.title} workflow in ${p.platform}${part}`;
                return (
                  <button
                    key={src}
                    type="button"
                    onClick={(e) => openShot(e.currentTarget, { src, title: p.title + part, alt })}
                    // A head start, so the picture is usually there by the click.
                    onPointerEnter={() => void imageReady(src, 0)}
                    aria-label={`See the ${alt} at full size`}
                    className="group/shot relative flex-1 cursor-zoom-in overflow-hidden bg-bg focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-accent"
                  >
                    <Image
                      src={src}
                      alt=""
                      fill
                      sizes="(min-width: 1152px) 384px, (min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                      className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                    <span
                      aria-hidden="true"
                      className="absolute right-2.5 bottom-2.5 grid size-7 place-items-center rounded-md border border-line-strong bg-surface text-muted transition-colors group-hover/shot:text-accent"
                    >
                      <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                        <path
                          d="M9.5 2.5h4v4M6.5 13.5h-4v-4M13.5 2.5l-5 5M2.5 13.5l5-5"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  </button>
                );
              })}
            </div>
            <div className="flex flex-1 flex-col p-6">
              <div className="flex items-center justify-between font-mono text-[11px]">
                <span className="text-accent">{p.category}</span>
                <span className="text-subtle">{p.platform}</span>
              </div>
              <h3 className="mt-5 text-lg font-medium text-balance">
                {p.title}
              </h3>
              <p className="mt-2 text-sm text-pretty text-muted">{p.summary}</p>
              <p className="mt-3 text-sm text-pretty">
                <span className="font-medium text-accent">{sections.work.resultLabel}</span> {p.result}
              </p>
              {p.estimate && (
                <p className="mt-4 rounded-lg bg-accent-soft px-3 py-2 font-mono text-[11px] text-muted">
                  <span className="font-medium text-accent">{p.estimate.saved} saved</span>{" "}
                  <span className="text-subtle">(est. from {p.estimate.basis})</span>
                </p>
              )}
              <div className="mt-auto flex flex-wrap gap-1.5 pt-6">
                {p.tools.map((t) => (
                  <Tag key={t}>{t}</Tag>
                ))}
              </div>
            </div>
          </li>
        ))}
      </ul>

      {open && <WorkflowViewer key={open.src} shot={open} onClose={closeShot} />}
    </Section>
  );
}
