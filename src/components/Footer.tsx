import { profile } from "@/data/content";
import { Container } from "./ui";

export function Footer() {
  return (
    <footer className="border-t border-line py-10">
      <Container className="flex flex-col items-start justify-between gap-4 font-mono text-xs text-subtle sm:flex-row sm:items-center">
        <p>
          © 2026 {profile.name}
        </p>
        <p>Built with Next.js & Tailwind · Automated with care</p>
      </Container>
    </footer>
  );
}
