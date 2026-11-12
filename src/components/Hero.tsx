import Image from "next/image";
import { profile, stats } from "@/data/content";
import { Arrow, ButtonLink, Container } from "./ui";

function Portrait() {
  return (
    <figure className="mx-auto w-full max-w-sm overflow-hidden rounded-2xl border border-line bg-surface lg:mx-0 lg:ml-auto">
      <div className="flex items-center justify-between border-b border-line px-4 py-2.5 font-mono text-[11px] text-subtle">
        <span>~/zeki</span>
        <span className="flex items-center gap-1.5">
          <span className="animate-blink size-1.5 rounded-full bg-accent" />
          available
        </span>
      </div>
      <Image
        src={profile.photo}
        alt={`Portrait of ${profile.name}`}
        width={880}
        height={1206}
        priority
        sizes="(min-width: 1024px) 384px, 90vw"
        className="aspect-[4/5] w-full object-cover object-top"
      />
      <figcaption className="border-t border-line px-4 py-3 font-mono text-[11px]">
        <span className="text-fg">{profile.name}</span>
        <span className="block text-subtle">{profile.role}</span>
      </figcaption>
    </figure>
  );
}

export function Hero() {
  return (
    <section id="top">
      <Container className="grid items-center gap-14 pt-16 pb-20 sm:pt-24 lg:grid-cols-[1.4fr_1fr] lg:pb-28">
        <div>
          <p className="mb-6 font-mono text-xs text-accent">
            <span className="text-subtle">{"//"}</span> {profile.availability.toLowerCase()}
          </p>
          <h1 className="text-4xl font-semibold tracking-tight text-balance sm:text-6xl">
            I build automations that <span className="text-accent">run the business</span> for you.
          </h1>
          <p className="mt-6 max-w-xl text-lg text-pretty text-muted">{profile.tagline}</p>
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

        <Portrait />
      </Container>
    </section>
  );
}
