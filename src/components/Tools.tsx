import { toolGroups } from "@/data/content";
import { Section, SectionHeader } from "./ui";

export function Tools() {
  return (
    <Section id="stack" className="border-y border-line bg-surface">
      <SectionHeader
        index="03"
        eyebrow="Stack"
        title="The tools I wire together."
        intro="Platform-agnostic: I pick the right tool for the job, then connect it to everything else."
      />
      <div className="grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
        {toolGroups.map((g) => (
          <div key={g.label}>
            <h3 className="mb-4 font-mono text-xs tracking-widest text-subtle uppercase">{g.label}</h3>
            <ul className="flex flex-wrap gap-2">
              {g.tools.map((t) => (
                <li
                  key={t}
                  className="rounded-lg border border-line bg-bg px-3 py-1.5 text-sm text-muted transition-colors hover:border-accent/50 hover:text-fg"
                >
                  {t}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}
