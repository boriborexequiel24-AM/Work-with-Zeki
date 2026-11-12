import Image from "next/image";
import { nav, profile } from "@/data/content";
import { ThemeToggle } from "./ThemeToggle";
import { Container } from "./ui";

export function Nav() {
  return (
    <div className="sticky top-0 z-50 border-b border-line bg-bg/80 backdrop-blur-md">
      <Container className="flex h-16 items-center justify-between gap-4">
        <a href="#top" className="flex items-center gap-2.5 font-mono text-sm">
          <Image src={profile.logo} alt="" width={28} height={28} className="size-7 rounded-md object-cover" />
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
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <a
            href="#contact"
            className="rounded-lg bg-fg px-3.5 py-2 text-sm font-medium text-bg transition-colors hover:bg-accent hover:text-on-accent"
          >
            Hire me
          </a>
        </div>
      </Container>
    </div>
  );
}
