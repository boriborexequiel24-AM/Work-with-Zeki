import { engagement, profile, sections } from "@/data/content";
import { Arrow, ButtonLink, Section, SectionHeader } from "./ui";

// Replaces the old pricing table. Zeki is open to a role and to contract work,
// so this section invites the conversation instead of quoting a number: the
// three cards say what he's open to, the panel says what a first call is like.
export function Hiring() {
  return (
    <Section id="hiring" className="border-t border-line">
      <SectionHeader
        index="05"
        eyebrow={sections.hiring.eyebrow}
        title={sections.hiring.title}
        intro={sections.hiring.intro}
      />
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {engagement.openTo.map((o) => (
          <li key={o.name} data-reveal="" className="flex flex-col rounded-2xl border border-line bg-surface p-7">
            <h3 className="font-mono text-xs tracking-widest text-muted uppercase">{o.kind}</h3>
            <p className="mt-4 text-xl font-semibold tracking-tight text-balance">{o.name}</p>
            <p className="mt-3 text-sm text-muted">{o.blurb}</p>
            <ul className="mt-6 space-y-2.5 border-t border-line pt-6 text-sm">
              {o.points.map((pt) => (
                <li key={pt} className="flex gap-2.5">
                  <span className="text-accent">✓</span>
                  <span className="text-pretty">{pt}</span>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>

      <div data-reveal="" className="mt-4 rounded-2xl border border-accent bg-surface p-7 sm:p-9">
        <div className="flex flex-col gap-7 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-xl">
            <h3 className="text-xl font-semibold tracking-tight text-balance">{engagement.intro.title}</h3>
            <p className="mt-3 text-pretty text-muted">{engagement.intro.body}</p>
          </div>
          <div className="flex shrink-0 flex-wrap items-center gap-3">
            <a
              href="#contact"
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-accent px-5 py-3 text-sm font-medium text-on-accent press hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              {engagement.intro.cta}
              <Arrow />
            </a>
            <ButtonLink href={profile.cv} variant="ghost" external>
              {sections.hiring.cvLink}
            </ButtonLink>
          </div>
        </div>
        <dl className="mt-8 grid gap-5 border-t border-line pt-7 sm:grid-cols-3">
          {engagement.facts.map((f) => (
            <div key={f.label}>
              <dt className="font-mono text-xs tracking-widest text-subtle uppercase">{f.label}</dt>
              <dd className="mt-2 text-sm text-pretty">{f.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </Section>
  );
}
