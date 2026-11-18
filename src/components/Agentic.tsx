import { codeProjects } from "@/data/content";
import { ProjectCarousel } from "./ProjectCarousel";
import { Section, SectionHeader } from "./ui";

// Systems built with Claude Code. Each project is one slide of a swipeable carousel,
// with a tab per project above it. Add more to `codeProjects` and they get a slide and
// a tab of their own.
export function Agentic() {
  return (
    <Section id="agentic">
      <SectionHeader
        index="01"
        eyebrow="Built with Claude Code"
        title="Agentic workflows, shipped as working software."
        intro="These are applications, not platform workflows. I design and write them with Claude Code, the source is public, and the demos are live for anyone to try."
      />

      <ProjectCarousel projects={codeProjects} />
    </Section>
  );
}
