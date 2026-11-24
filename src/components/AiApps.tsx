import { codeProjects } from "@/data/content";
import { ProjectCarousel } from "./ProjectCarousel";
import { Section, SectionHeader } from "./ui";

// Systems built with Claude Code. Each project is one slide of a swipeable carousel,
// with a tab per project above it. Add more to `codeProjects` and they get a slide and
// a tab of their own.
export function AiApps() {
  return (
    <>
      {/* The section's old anchor. Keeps links to #agentic landing here. */}
      <span id="agentic" aria-hidden="true" className="block scroll-mt-20" />
      <Section id="ai-apps">
        <SectionHeader
          index="01"
          eyebrow="Built with Claude Code"
          title="AI apps and agents, shipped as working software."
          intro="These are applications, not platform workflows. I design and write them with Claude Code, the source is public, and the demos are live for anyone to try."
        />

        <ProjectCarousel projects={codeProjects} />
      </Section>
    </>
  );
}
