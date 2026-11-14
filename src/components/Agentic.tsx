import { codeProjects } from "@/data/content";
import { Gallery } from "./Gallery";
import { Arrow, Section, SectionHeader, Tag } from "./ui";

// Systems built with Claude Code. One project for now, but the layout is a list:
// more go in `codeProjects` and stack below this one.
//
// The gallery runs the full width of the card rather than sitting in a column,
// because an n8n canvas is too wide to read in half of one.
export function Agentic() {
  return (
    <Section id="agentic">
      <SectionHeader
        index="01"
        eyebrow="Built with Claude Code"
        title="Agentic workflows, shipped as working software."
        intro="These are applications, not platform workflows. I design and write them with Claude Code, the source is public, and the demo is live for anyone to try."
      />

      <div className="space-y-10">
        {codeProjects.map((p) => (
          <article
            key={p.title}
            className="overflow-hidden rounded-2xl border border-line bg-surface"
          >
            <div className="border-b border-line bg-bg p-4 sm:p-6">
              <Gallery shots={p.shots} label={p.title} />
            </div>

            <div className="p-7 sm:p-9">
              <p className="font-mono text-[11px] text-accent">{p.tagline}</p>
              <h3 className="mt-4 text-2xl font-medium tracking-tight text-balance">
                {p.title}
              </h3>
              <p className="mt-3 max-w-3xl text-sm text-pretty text-muted">
                {p.summary}
              </p>

              <ul className="mt-8 grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
                {p.facts.map((f) => (
                  <li key={f.label} className="bg-surface p-5">
                    <p className="text-xl font-semibold tracking-tight text-accent tabular-nums">
                      {f.value}
                    </p>
                    <p className="mt-1.5 font-mono text-[11px] text-pretty text-muted">
                      {f.label}
                    </p>
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
                <div className="flex flex-wrap gap-1.5">
                  {p.stack.map((t) => (
                    <Tag key={t}>{t}</Tag>
                  ))}
                </div>

                <div className="flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-xs sm:ml-auto">
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
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}
