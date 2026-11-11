import { pricing } from "@/data/content";
import { Section, SectionHeader } from "./ui";

export function Pricing() {
  return (
    <Section id="pricing" className="border-t border-line">
      <SectionHeader
        index="05"
        eyebrow="Pricing"
        title="Flexible engagement models."
        intro="From a same-day fix to a fully scoped automation system — pick what fits."
      />
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {pricing.map((p) => (
          <li
            key={p.name}
            className={`relative flex flex-col rounded-2xl border p-7 ${
              p.highlighted ? "border-accent/50 bg-gradient-to-b from-accent/[0.08] to-surface" : "border-line bg-surface"
            }`}
          >
            {p.highlighted && (
              <span className="absolute -top-3 left-7 rounded-full bg-accent px-2.5 py-0.5 font-mono text-[10px] font-medium tracking-wide text-bg uppercase">
                Most popular
              </span>
            )}
            <h3 className="font-mono text-xs tracking-widest text-muted uppercase">{p.name}</h3>
            <p className="mt-5 flex items-baseline gap-1.5">
              <span className="text-3xl font-semibold tracking-tight">{p.price}</span>
              <span className="text-sm text-subtle">{p.unit}</span>
            </p>
            <p className="mt-3 text-sm text-muted">{p.blurb}</p>
            <ul className="mt-6 space-y-2.5 border-t border-line pt-6 text-sm">
              {p.features.map((f) => (
                <li key={f} className="flex gap-2.5">
                  <span className="text-accent">✓</span>
                  {f}
                </li>
              ))}
            </ul>
            <a
              href="#contact"
              className={`mt-8 rounded-lg px-4 py-2.5 text-center text-sm font-medium transition-colors ${
                p.highlighted ? "bg-accent text-bg hover:bg-fg" : "border border-line-strong hover:border-accent/60 hover:text-accent"
              }`}
            >
              {p.cta}
            </a>
          </li>
        ))}
      </ul>
    </Section>
  );
}
