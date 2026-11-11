import { profile, stats } from "@/data/content";
import { Arrow, ButtonLink, Container } from "./ui";

const flow = [
  { label: "Gmail", detail: "New carrier email" },
  { label: "AI Classify", detail: "OpenAI · claim data" },
  { label: "JobNimbus", detail: "Create job + task" },
  { label: "Notify", detail: "Assign via round-robin" },
];

function WorkflowVisual() {
  return (
    <div className="relative rounded-2xl border border-line bg-surface/80 p-5 shadow-2xl shadow-black/50 backdrop-blur">
      <div className="mb-5 flex items-center justify-between font-mono text-[11px] text-subtle">
        <span className="flex items-center gap-2">
          <span className="animate-pulse-ring size-2 rounded-full bg-accent" />
          workflow.lead-intake
        </span>
        <span>status: running</span>
      </div>
      <ol className="space-y-0">
        {flow.map((step, i) => (
          <li key={step.label}>
            <div className="flex items-center gap-4 rounded-xl border border-line bg-surface-2 px-4 py-3">
              <span className="grid size-8 shrink-0 place-items-center rounded-lg border border-line-strong font-mono text-xs text-accent">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="min-w-0">
                <p className="text-sm font-medium">{step.label}</p>
                <p className="truncate font-mono text-[11px] text-subtle">{step.detail}</p>
              </div>
              <span className="ml-auto font-mono text-[11px] text-accent">✓</span>
            </div>
            {i < flow.length - 1 && (
              <div className="relative ml-8 h-6 w-px bg-line-strong" aria-hidden="true">
                <span
                  className="animate-packet absolute -left-[3px] size-[7px] -translate-y-1/2 rounded-full bg-accent"
                  style={{ animationDelay: `${i * 0.6}s` }}
                />
              </div>
            )}
          </li>
        ))}
      </ol>
      <div className="mt-5 flex justify-between border-t border-line pt-4 font-mono text-[11px] text-subtle">
        <span>n8n · 4 nodes</span>
        <span className="text-muted">based on a real client build</span>
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      {/* backdrop */}
      <div className="bg-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_top,black_20%,transparent_70%)]" />
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-accent/10 blur-[120px]" />

      <Container className="relative grid items-center gap-16 pt-20 pb-24 sm:pt-28 lg:grid-cols-[1.15fr_1fr] lg:pb-32">
        <div>
          <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-line bg-surface/60 px-3 py-1 font-mono text-xs text-muted">
            <span className="size-1.5 rounded-full bg-accent" />
            {profile.availability}
          </p>
          <h1 className="text-4xl font-semibold tracking-tight text-balance sm:text-6xl">
            I build automations that <span className="text-gradient">run the business</span> for you.
          </h1>
          <p className="mt-6 max-w-xl text-lg text-pretty text-muted">
            {profile.name} — {profile.role}. {profile.tagline}
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <ButtonLink href="#work">
              See my work <Arrow />
            </ButtonLink>
            <ButtonLink href="#contact" variant="ghost">
              Start a project
            </ButtonLink>
          </div>

          <dl className="mt-14 grid grid-cols-2 gap-x-6 gap-y-6 border-t border-line pt-8 sm:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label}>
                <dt className="font-mono text-[11px] tracking-wide text-subtle uppercase">{s.label}</dt>
                <dd className="mt-1 text-2xl font-semibold tabular-nums">{s.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <WorkflowVisual />
      </Container>
    </section>
  );
}
