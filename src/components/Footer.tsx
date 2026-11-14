import { profile } from "@/data/content";
import { Container } from "./ui";

export function Footer() {
  return (
    <footer className="border-t border-line py-10">
      <Container className="flex flex-col items-start justify-between gap-4 font-mono text-xs text-subtle sm:flex-row sm:items-center">
        <p className="flex flex-wrap items-center gap-x-4 gap-y-1">
          <span>&copy; 2026 {profile.name}</span>
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-fg"
          >
            GitHub
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-fg"
          >
            LinkedIn
          </a>
        </p>
        <p>Built with Next.js & Tailwind · Automated with care</p>
      </Container>
    </footer>
  );
}
