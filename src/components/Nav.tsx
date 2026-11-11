import { nav, profile } from "@/data/content";
import { Container } from "./ui";

export function Nav() {
  return (
    <div className="sticky top-0 z-50 border-b border-line bg-bg/70 backdrop-blur-xl">
      <Container className="flex h-16 items-center justify-between">
        <a href="#top" className="flex items-center gap-2.5 font-mono text-sm">
          <span className="grid size-7 place-items-center rounded-md border border-line-strong bg-surface-2 text-accent">
            Z
          </span>
          <span className="hidden sm:inline">
            zeki<span className="text-subtle">.automations</span>
          </span>
        </a>
        <nav aria-label="Primary" className="hidden items-center gap-8 md:flex">
          {nav.map((item) => (
            <a key={item.href} href={item.href} className="text-sm text-muted transition-colors hover:text-fg">
              {item.label}
            </a>
          ))}
        </nav>
        <a
          href={`mailto:${profile.email}`}
          className="rounded-lg border border-line-strong px-3.5 py-1.5 text-sm transition-colors hover:border-accent/60 hover:text-accent"
        >
          Hire me
        </a>
      </Container>
    </div>
  );
}
