import { experience, sections } from "@/data/content";
import { Certificates } from "./Certificates";
import { Section, SectionHeader, Tag } from "./ui";

export function Experience() {
  return (
    <Section id="experience" className="border-t border-line">
      <SectionHeader index="04" {...sections.experience} />

      <ol className="space-y-6">
        {experience.map((e) => (
          <li key={e.role} data-reveal="" className="grid gap-6 rounded-2xl border border-line bg-surface p-7 sm:p-9 lg:grid-cols-[240px_1fr]">
            <div className="font-mono text-xs text-subtle">
              <p className="text-muted">{e.period}</p>
              <p className="mt-1">{e.location}</p>
            </div>
            <div>
              <h3 className="text-xl font-medium">{e.role}</h3>
              <p className="mt-1 text-sm text-accent">{e.org}</p>
              <p className="mt-4 text-pretty text-muted">{e.summary}</p>

              <ul className="mt-6 grid gap-x-8 gap-y-2.5 sm:grid-cols-2">
                {e.highlights.map((h) => (
                  <li key={h} className="flex gap-3 text-sm">
                    <span className="mt-2 size-1 shrink-0 rounded-full bg-accent" />
                    {h}
                  </li>
                ))}
              </ul>

              {e.outcomes && (
                <div className="mt-6 flex flex-wrap gap-2">
                  {e.outcomes.map((o) => (
                    <span key={o} className="rounded-full bg-accent-soft px-3 py-1 text-xs text-accent">
                      {o}
                    </span>
                  ))}
                </div>
              )}

              <div className="mt-6 flex flex-wrap gap-1.5 border-t border-line pt-6">
                {e.tools.map((t) => (
                  <Tag key={t}>{t}</Tag>
                ))}
              </div>
            </div>
          </li>
        ))}
      </ol>

      <div className="mt-20">
        <h3 className="mb-6 font-mono text-xs tracking-widest text-subtle uppercase">Certifications</h3>
        <Certificates />
      </div>
    </Section>
  );
}
