"use client";

import Image from "next/image";
import { useState } from "react";
import { projects, type Platform } from "@/data/content";
import { Section, SectionHeader, Tag } from "./ui";

const filters: ("All" | Platform)[] = [
  "All",
  "n8n",
  "Make",
  "Zapier",
  "GoHighLevel",
];

export function Work() {
  const [active, setActive] = useState<(typeof filters)[number]>("All");
  const visible =
    active === "All" ? projects : projects.filter((p) => p.platform === active);

  return (
    <Section id="work">
      <SectionHeader
        index="03"
        eyebrow="Selected work"
        title="Real systems, running in production."
        intro={`${projects.length} automations built for real clients and operations. Here's what each one does and the stack behind it.`}
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
              onClick={() => setActive(f)}
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

      <ul className="grid gap-4 md:grid-cols-2">
        {visible.map((p) => (
          <li
            key={p.title}
            className={`group relative flex flex-col overflow-hidden rounded-2xl border border-line bg-surface transition-colors hover:border-line-strong ${
              p.featured && active === "All" ? "md:min-h-64" : ""
            }`}
          >
            <div className="relative aspect-[16/9] overflow-hidden border-b border-line bg-bg">
              <Image
                src={p.images[0]}
                alt={`${p.title} workflow in ${p.platform}`}
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
              />
            </div>
            <div className="flex flex-1 flex-col p-7">
              <div className="flex items-center justify-between font-mono text-[11px]">
                <span className="text-accent">{p.category}</span>
                <span className="text-subtle">{p.platform}</span>
              </div>
              <h3 className="mt-5 text-lg font-medium text-balance">
                {p.title}
              </h3>
              <p className="mt-2 text-sm text-pretty text-muted">{p.summary}</p>
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
    </Section>
  );
}
