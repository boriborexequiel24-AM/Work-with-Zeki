import Image from "next/image";
import { profile } from "@/data/content";
import { MobileMenu } from "./MobileMenu";
import { NavLinks } from "./NavLinks";
import { ThemeToggle } from "./ThemeToggle";
import { Container } from "./ui";

export function Nav() {
  return (
    <div className="site-nav sticky top-0 z-50 border-b border-line bg-bg/80 backdrop-blur-md">
      <Container className="flex h-16 items-center justify-between gap-4">
        <a href="#top" className="flex min-h-11 min-w-11 items-center gap-2.5 font-mono text-sm">
          <Image src={profile.logo} alt="" width={28} height={28} className="size-7 rounded-md object-cover" />
          <span className="hidden sm:inline">
            zeki<span className="text-subtle">.automations</span>
          </span>
        </a>
        <nav aria-label="Primary" className="hidden items-center gap-8 md:flex">
          <NavLinks />
        </nav>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <a
            href="#contact"
            className="inline-flex min-h-11 items-center rounded-lg bg-fg px-3.5 py-2 text-sm md:min-h-0 font-medium text-bg press hover:bg-accent hover:text-on-accent"
          >
            Hire me
          </a>
          <MobileMenu />
        </div>
      </Container>
    </div>
  );
}
