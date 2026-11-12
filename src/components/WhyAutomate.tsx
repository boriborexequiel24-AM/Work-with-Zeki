import { industryStats } from "@/data/content";
import { Container } from "./ui";

// Industry context with linked sources. These are not claims about my own clients.
export function WhyAutomate() {
  return (
    <section aria-labelledby="why-automate" className="border-y border-line bg-surface">
      <Container className="py-14">
        <h2 id="why-automate" className="mb-8 font-mono text-xs tracking-widest text-subtle uppercase">
          Why automate? <span className="normal-case tracking-normal">What the research says</span>
        </h2>
        <ul className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {industryStats.map((s) => (
            <li key={s.value} className="flex flex-col bg-surface p-6">
              <p className="text-3xl font-semibold tracking-tight text-accent tabular-nums">{s.value}</p>
              <p className="mt-2 text-sm text-pretty text-muted">{s.label}</p>
              <a
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-auto pt-5 font-mono text-[11px] text-subtle underline decoration-line-strong underline-offset-4 transition-colors hover:text-fg"
              >
                {s.source} ↗
              </a>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
