import { faq, sections } from "@/data/content";
import { Section, SectionHeader } from "./ui";

// Closed until clicked, so it stays short. The answers are in the page either way, for
// search engines and for "find in page", which opens them.
export function Faq() {
  return (
    <Section id="faq" className="border-t border-line">
      <SectionHeader index="06" eyebrow={sections.faq.eyebrow} title={sections.faq.title} className="mb-10" />
      <div data-reveal="" className="max-w-3xl border-t border-line">
        {faq.map((f) => (
          <details key={f.question} className="group border-b border-line">
            <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-6 py-4 font-medium transition-colors hover:text-accent [&::-webkit-details-marker]:hidden">
              <h3 className="text-pretty">{f.question}</h3>
              <svg
                className="shrink-0 text-subtle transition-transform group-open:rotate-45 motion-reduce:transition-none"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                aria-hidden="true"
              >
                <path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </summary>
            <p className="max-w-2xl pb-6 text-pretty text-muted">{f.answer}</p>
          </details>
        ))}
      </div>
    </Section>
  );
}
