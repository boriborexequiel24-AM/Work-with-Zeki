"use client";

import { useState } from "react";
import { sections, toolGroups } from "@/data/content";
import { Arrow, Container, SectionHeader } from "./ui";

type ToolGroup = (typeof toolGroups)[number];

// Two rows of about the same length, drifting in opposite directions.
const rows = [toolGroups.slice(0, 4), toolGroups.slice(4)];

// Kept short on purpose: it sits between the projects and the work, so it has to be
// quick to pass. The two links jump straight to the parts clients come for.
export function Tools() {
  const [paused, setPaused] = useState(false);

  return (
    <section id="stack" className="scroll-mt-16 border-y border-line bg-surface py-14">
      <Container className="mb-8 flex flex-col gap-x-10 gap-y-6 lg:flex-row lg:items-end lg:justify-between">
        <SectionHeader
          index="02"
          eyebrow={sections.tools.eyebrow}
          title={sections.tools.title}
          intro={sections.tools.intro}
          className=""
        />
        <div className="flex flex-wrap items-center gap-x-4 gap-y-3 font-mono text-xs">
          <a
            href="#work"
            className="inline-flex min-h-11 items-center gap-2 text-accent underline-offset-4 hover:underline"
          >
            {sections.tools.workLink} <Arrow />
          </a>
          <a
            href="#experience"
            className="inline-flex min-h-11 items-center gap-2 text-muted underline-offset-4 transition-colors hover:text-fg hover:underline"
          >
            {sections.tools.experienceLink} <Arrow />
          </a>
          {/* Anything that moves by itself needs a way to stop it, also without a mouse. */}
          <button
            type="button"
            onClick={() => setPaused((p) => !p)}
            aria-label={paused ? "Play the tools carousel" : "Pause the tools carousel"}
            className="grid size-11 place-items-center md:size-9 rounded-full border border-line-strong text-fg press hover:bg-fg hover:text-bg motion-reduce:hidden"
          >
            <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
              <path d={paused ? "M4 2.5v11l9-5.5z" : "M4 3h3v10H4zM9 3h3v10H9z"} />
            </svg>
          </button>
        </div>
      </Container>

      <div className="marquee space-y-3 overflow-hidden" data-paused={paused}>
        {rows.map((groups, i) => (
          <div key={groups[0].label} className="flex">
            <Track groups={groups} reverse={i === 1} />
            {/* A second copy follows the first, so the loop has no gap. */}
            <Track groups={groups} reverse={i === 1} copy />
          </div>
        ))}
      </div>
    </section>
  );
}

function Track({ groups, reverse, copy }: { groups: ToolGroup[]; reverse: boolean; copy?: boolean }) {
  return (
    <div
      aria-hidden={copy}
      data-reverse={reverse}
      className={`marquee-track flex min-w-full shrink-0 justify-around gap-8 pr-8 motion-reduce:w-full motion-reduce:flex-wrap motion-reduce:justify-center motion-reduce:gap-y-3 motion-reduce:px-5 ${
        copy ? "motion-reduce:hidden" : ""
      }`}
    >
      {groups.map((g) => (
        <div key={g.label} className="flex items-center gap-2 motion-reduce:flex-wrap">
          <h3 className="mr-1 font-mono text-xs tracking-widest whitespace-nowrap text-subtle uppercase">
            {g.label}
          </h3>
          <ul className="flex gap-2 motion-reduce:flex-wrap">
            {g.tools.map((t) => (
              <li
                key={t}
                className="rounded-lg border border-line bg-bg px-3 py-1.5 text-sm whitespace-nowrap text-muted transition-colors hover:border-accent/50 hover:text-fg"
              >
                {t}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
