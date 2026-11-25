"use client";

import Image from "next/image";
import { useState, type CSSProperties, type MouseEvent } from "react";
import { projects, sections, type Platform } from "@/data/content";
import { imageReady, now, withTransition } from "@/lib/transition";
import { Arrow, Section, SectionHeader, Tag } from "./ui";
import { useViewer } from "./WorkflowViewer";

const filters: ("All" | Platform)[] = [
  "All",
  "n8n",
  "Make",
  "Zapier",
  "GoHighLevel",
];

// How many show before "Show all". The rest is in the page, just hidden.
const FIRST = 6;

// Each card keeps one name across filter changes, so the browser can move it.
const cardName = (title: string) => `work-${title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;

export function Work() {
  const [active, setActive] = useState<(typeof filters)[number]>("All");
  const [expanded, setExpanded] = useState(false);
  const { openShot, viewer } = useViewer();
  const visible =
    active === "All" ? projects : projects.filter((p) => p.platform === active);

  function pick(filter: (typeof filters)[number]) {
    withTransition("filter", () =>
      now(() => {
        setActive(filter);
        setExpanded(false);
      }),
    );
  }

  function toggleAll(e: MouseEvent<HTMLButtonElement>) {
    const section = e.currentTarget.closest("section");
    const closing = expanded;
    withTransition("filter", () => {
      now(() => setExpanded(!closing));
      // The cards that were on screen are gone, so go back to where the list starts.
      if (closing) section?.scrollIntoView({ behavior: "instant" });
    });
  }

  return (
    <Section id="work">
      <SectionHeader
        index="03"
        flow="branch"
        eyebrow={sections.work.eyebrow}
        title={sections.work.title}
        intro={`${projects.length} ${sections.work.intro}`}
      />

      <div
        role="group"
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
              type="button"
              aria-pressed={on}
              onClick={() => pick(f)}
              className={`inline-flex min-h-11 items-center gap-1.5 rounded-full border px-4 py-1.5 font-mono text-xs transition-colors md:min-h-0 ${
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
        {visible.map((p, n) => (
          <li
            key={p.title}
            data-reveal=""
            hidden={!expanded && n >= FIRST}
            style={{ "--card-name": cardName(p.title) } as CSSProperties}
            className={`work-card lift group relative flex flex-col overflow-hidden rounded-2xl border border-line bg-surface transition-colors hover:border-line-strong ${
              p.featured ? "md:col-span-2 lg:col-span-3 lg:flex-row" : ""
            }`}
          >
            {/* A workflow in two parts shows both, side by side. */}
            <div
              className={`flex aspect-[16/9] gap-px overflow-hidden border-b border-line bg-line ${
                p.featured ? "lg:aspect-auto lg:w-7/12 lg:shrink-0 lg:border-b-0" : ""
              }`}
            >
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
                    className={`group/shot relative flex-1 cursor-zoom-in overflow-hidden focus-visible:-outline-offset-2 ${
                      p.featured ? "bg-canvas" : "bg-bg"
                    }`}
                  >
                    <Image
                      src={src}
                      alt=""
                      fill
                      sizes={
                        p.featured
                          ? "(min-width: 1152px) 640px, (min-width: 1024px) 58vw, 100vw"
                          : "(min-width: 1152px) 384px, (min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                      }
                      className={`object-cover object-top transition-transform duration-500 group-hover:scale-[1.03] ${
                        p.featured ? "lg:object-contain lg:object-center" : ""
                      }`}
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
            <div className={`flex flex-1 flex-col p-6 ${p.featured ? "lg:border-l lg:border-line lg:p-8" : ""}`}>
              <div className="flex items-center justify-between font-mono text-xs">
                <span className="text-accent">{p.category}</span>
                <span className="text-subtle">{p.platform}</span>
              </div>
              <h3 className={`mt-5 font-medium text-balance ${p.featured ? "text-xl" : "text-lg"}`}>
                {p.title}
              </h3>
              {p.featured && (
                <p className="mt-3 text-sm text-pretty text-muted">
                  <span className="font-medium text-fg">{sections.work.problemLabel}</span> {p.featured.problem}
                </p>
              )}
              <p className={`text-sm text-pretty text-muted ${p.featured ? "mt-3" : "mt-2"}`}>
                {p.featured && (
                  <span className="font-medium text-fg">{sections.work.solutionLabel} </span>
                )}
                {p.summary}
              </p>
              <p className="mt-3 text-sm text-pretty">
                <span className="font-medium text-accent">{sections.work.resultLabel}</span> {p.result}
              </p>
              {p.estimate && (
                <p className="mt-4 rounded-lg bg-accent-soft px-3 py-2 font-mono text-xs text-muted">
                  <span className="font-medium text-accent">{p.estimate.saved} saved</span>{" "}
                  <span className="text-subtle">(est. from {p.estimate.basis})</span>
                </p>
              )}
              <div className="mt-auto flex flex-wrap gap-1.5 pt-6">
                {p.tools.map((t) => (
                  <Tag key={t}>{t}</Tag>
                ))}
              </div>
              {p.liveUrl && (
                <a
                  href={p.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-flex min-h-11 items-center gap-2 self-start font-mono text-xs text-accent underline-offset-4 hover:underline"
                >
                  {sections.work.demoLink} <Arrow />
                </a>
              )}
            </div>
          </li>
        ))}
      </ul>

      {visible.length > FIRST && (
        <div className="mt-8 flex justify-center">
          <button
            type="button"
            aria-expanded={expanded}
            onClick={toggleAll}
            className="press inline-flex min-h-11 items-center rounded-lg border border-line-strong px-5 text-sm font-medium hover:border-fg/40 hover:bg-surface"
          >
            {expanded
              ? sections.work.showFewer
              : `${sections.work.showAll[0]} ${visible.length} ${sections.work.showAll[1]}`}
          </button>
        </div>
      )}

      {viewer}
    </Section>
  );
}
