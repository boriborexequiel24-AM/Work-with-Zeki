import Image from "next/image";
import { profile, sections, stats } from "@/data/content";
import { Arrow, ButtonLink, Container, delay } from "./ui";

// The headline arrives word by word. It is still plain text to a screen reader.
function Words({ text, from }: { text: string; from: number }) {
  return text.split(" ").map((word, i) => (
    <span key={i}>
      {i > 0 && " "}
      <span className="word" style={delay(60 + (from + i) * 55)}>
        {word}
      </span>
    </span>
  ));
}

const count = (text: string) => text.split(" ").length;

function Portrait() {
  return (
    <figure className="portrait mx-auto w-full max-w-sm overflow-hidden rounded-2xl border border-line bg-surface lg:mx-0 lg:ml-auto">
      <div className="flex items-center justify-between border-b border-line px-4 py-2.5 font-mono text-xs text-subtle">
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
      <figcaption className="border-t border-line px-4 py-3 font-mono text-xs">
        <span className="text-fg">{profile.name}</span>
        <span className="block text-subtle">{profile.role}</span>
      </figcaption>
    </figure>
  );
}

export function Hero() {
  const { before, accent, after } = sections.hero;

  return (
    <section id="top" className="dots">
      <Container className="grid items-center gap-14 pt-16 pb-20 sm:pt-24 lg:grid-cols-[1.4fr_1fr] lg:pb-28">
        <div>
          <p className="enter mb-6 font-mono text-xs text-accent">
            <span className="text-subtle">{"//"}</span> {profile.availability.toLowerCase()}
          </p>
          <h1 className="text-4xl font-semibold tracking-tight text-balance sm:text-6xl">
            <Words text={before} from={0} />{" "}
            <span className="text-accent">
              <Words text={accent} from={count(before)} />
            </span>{" "}
            <Words text={after} from={count(before) + count(accent)} />
          </h1>
          <p style={delay(420)} className="enter mt-6 max-w-xl text-lg text-pretty text-muted">{profile.tagline}</p>
          <div style={delay(540)} className="enter mt-9 flex flex-wrap gap-3">
            <ButtonLink href="#ai-apps">
              {sections.hero.demoLink} <Arrow />
            </ButtonLink>
            <ButtonLink href="#work" variant="ghost">
              {sections.hero.workLink}
            </ButtonLink>
            <ButtonLink href={profile.cv} variant="ghost" external>
              {sections.hero.cvLink}
            </ButtonLink>
          </div>

          <dl style={delay(640)} className="enter mt-14 grid grid-cols-2 gap-x-6 gap-y-6 border-t border-line pt-8 sm:grid-cols-4">
            {stats.map((s, i) => (
              <div key={s.label} style={delay(700 + i * 70)} className="enter">
                <dt className="font-mono text-xs tracking-wide text-subtle uppercase">{s.label}</dt>
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
