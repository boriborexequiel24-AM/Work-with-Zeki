import { differentiators, services } from "@/data/content";
import { Section, SectionHeader } from "./ui";

export function Services() {
  return (
    <Section id="services">
      <SectionHeader
        index="02"
        eyebrow="Services"
        title="Bridging technology and business outcomes."
        intro="I help teams replace repetitive manual work with reliable systems, from a single integration to a full AI-assisted operation."
      />

      <div className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2">
        {services.map((s, i) => (
          <div key={s.title} className="group bg-bg p-8 transition-colors hover:bg-surface">
            <p className="font-mono text-xs text-subtle">{String(i + 1).padStart(2, "0")}</p>
            <h3 className="mt-6 text-lg font-medium group-hover:text-accent">{s.title}</h3>
            <p className="mt-2 text-muted">{s.body}</p>
          </div>
        ))}
      </div>

      <div className="mt-16 grid gap-8 sm:grid-cols-3">
        {differentiators.map((d) => (
          <div key={d.title} className="border-l border-accent/40 pl-5">
            <h3 className="font-medium">{d.title}</h3>
            <p className="mt-1.5 text-sm text-muted">{d.body}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
