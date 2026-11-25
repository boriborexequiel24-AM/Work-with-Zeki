import type { Metadata } from "next";
import Image from "next/image";
import { caseStudies, type CaseStudy } from "@/data/caseStudies";
import { profile, sections } from "@/data/content";
import { caseStudyData } from "@/lib/structuredData";
import { BookCall } from "./BookCall";
import { Footer } from "./Footer";
import { JsonLd } from "./JsonLd";
import { Nav } from "./Nav";
import { Reveal } from "./Reveal";
import { SmoothScroll } from "./SmoothScroll";
import { Arrow, ButtonLink, Container, DemoLink, Tag } from "./ui";

const copy = sections.caseStudy;
// Plain links: a client-side one scrolls the new page under the sticky bar.
const home = "/";

/** The parts of a case study's route, see app/work. Each study has a route of its own: with
    Cache Components a [slug] route answers an unknown address with 200 instead of 404. */
export function caseStudyMetadata(slug: string): Metadata {
  const study = find(slug);
  const { metaTitle: title, description, cover } = study;
  const images = [{ url: cover.src, width: cover.width, height: cover.height, alt: cover.alt }];
  return {
    title: `${title} | ${profile.shortName}`,
    description,
    alternates: { canonical: `/work/${study.slug}` },
    openGraph: {
      title,
      description,
      url: `/work/${study.slug}`,
      siteName: profile.shortName,
      type: "article",
      publishedTime: study.published,
      authors: [profile.site],
      locale: "en_US",
      images,
    },
    twitter: { card: "summary_large_image", title, description, images },
  };
}

function find(slug: string): CaseStudy {
  const study = caseStudies.find((s) => s.slug === slug);
  if (!study) throw new Error(`No case study "${slug}" in caseStudies.ts`);
  return study;
}

/** n8n canvases are wide, so each picture opens at its original size. */
function Figure({ picture, priority = false }: { picture: CaseStudy["cover"]; priority?: boolean }) {
  return (
    <figure className="overflow-hidden rounded-2xl border border-line bg-surface">
      <a href={picture.src} target="_blank" rel="noopener noreferrer" className="block cursor-zoom-in focus-visible:-outline-offset-2">
        <Image
          src={picture.src}
          alt={picture.alt}
          width={picture.width}
          height={picture.height}
          priority={priority}
          sizes="(min-width: 960px) 896px, 92vw"
          className="h-auto w-full"
        />
      </a>
      <figcaption className="border-t border-line px-4 py-3 font-mono text-xs text-pretty text-subtle">
        {picture.caption}
      </figcaption>
    </figure>
  );
}

export function CaseStudyPage({ slug }: { slug: string }) {
  const study = find(slug);
  const others = caseStudies.filter((s) => s.slug !== study.slug);

  return (
    <>
      <JsonLd data={caseStudyData(study)} />
      <Nav base="/" />
      <main id="main" tabIndex={-1} className="outline-none">
        <Container className="pt-10 pb-24 sm:pt-14">
          <div className="mx-auto max-w-4xl">
            <nav aria-label={copy.breadcrumb} className="font-mono text-xs text-subtle">
              <a href={`${home}#work`} className="inline-flex min-h-11 items-center gap-2 transition-colors hover:text-fg">
                <span aria-hidden="true">←</span> {copy.back}
              </a>
            </nav>

            <article>
              <header className="mt-6">
                <p className="font-mono text-xs tracking-widest text-accent uppercase">{study.kind}</p>
                <h1 className="mt-4 text-3xl font-semibold tracking-tight text-balance sm:text-5xl">{study.title}</h1>
                <p className="mt-6 text-lg text-pretty text-muted">{study.intro}</p>
                <p className="mt-5 text-sm text-subtle">
                  {copy.by}{" "}
                  <a href={home} className="text-fg underline decoration-line-strong underline-offset-4 hover:text-accent">
                    {profile.name}
                  </a>
                  , {profile.role}
                </p>
                {(study.liveUrl || study.repoUrl) && (
                  <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                    {study.liveUrl && <DemoLink href={study.liveUrl}>{sections.aiApps.demoLink}</DemoLink>}
                    {study.repoUrl && (
                      <ButtonLink href={study.repoUrl} variant="ghost" external>
                        {sections.aiApps.codeLink} <Arrow />
                      </ButtonLink>
                    )}
                  </div>
                )}
              </header>

              <dl
                className={`mt-10 grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2 ${
                  study.facts.length === 3 ? "lg:grid-cols-3" : "lg:grid-cols-4"
                }`}
              >
                {study.facts.map((f, i) => (
                  <div
                    key={f.label}
                    // An odd last one fills its row on a tablet.
                    className={`flex flex-col-reverse justify-end bg-surface p-5 ${
                      study.facts.length % 2 && i === study.facts.length - 1 ? "sm:col-span-2 lg:col-span-1" : ""
                    }`}
                  >
                    <dt className="mt-1 font-mono text-xs text-pretty text-muted">{f.label}</dt>
                    <dd className="text-xl font-semibold tracking-tight text-accent tabular-nums">{f.value}</dd>
                  </div>
                ))}
              </dl>

              <div className="mt-10">
                <Figure picture={study.cover} priority />
              </div>

              {study.sections.map((s) => {
                const List = s.ordered ? "ol" : "ul";
                return (
                  <section key={s.title} data-reveal="" className="mt-14">
                    <h2 className="text-2xl font-semibold tracking-tight text-balance">{s.title}</h2>
                    {s.body?.map((p) => (
                      <p key={p} className="mt-4 max-w-3xl text-pretty text-muted">
                        {p}
                      </p>
                    ))}
                    {s.list && (
                      <List
                        className={`mt-5 max-w-3xl space-y-3 pl-6 text-muted marker:text-accent ${
                          s.ordered ? "list-decimal marker:font-mono marker:text-sm" : "list-disc"
                        }`}
                      >
                        {s.list.map((item) => (
                          <li key={item} className="pl-1 text-pretty">
                            {item}
                          </li>
                        ))}
                      </List>
                    )}
                    {s.image && (
                      <div className="mt-8">
                        <Figure picture={s.image} />
                      </div>
                    )}
                  </section>
                );
              })}

              <section data-reveal="" className="mt-14">
                <h2 className="text-2xl font-semibold tracking-tight">{copy.stack}</h2>
                <div className="mt-5 flex flex-wrap gap-1.5">
                  {study.stack.map((t) => (
                    <Tag key={t}>{t}</Tag>
                  ))}
                </div>
              </section>
            </article>

            <section data-reveal="" className="mt-16 rounded-2xl border border-accent bg-surface p-7 sm:p-9">
              <h2 className="text-xl font-semibold tracking-tight text-balance">{copy.ctaTitle}</h2>
              <p className="mt-3 max-w-xl text-pretty text-muted">{copy.ctaBody}</p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <BookCall className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-accent px-5 py-2.5 text-sm font-medium text-on-accent press hover:opacity-90" />
                <ButtonLink href="/#contact" variant="ghost">
                  {sections.hiring.messageLink}
                </ButtonLink>
              </div>
            </section>

            <section data-reveal="" className="mt-16">
              <h2 className="text-xl font-semibold tracking-tight">{copy.more}</h2>
              <ul className="mt-5 border-t border-line">
                {others.map((o) => (
                  <li key={o.slug} className="border-b border-line">
                    <a
                      href={`/work/${o.slug}`}
                      className="flex min-h-14 items-center justify-between gap-6 py-4 transition-colors hover:text-accent"
                    >
                      <span className="text-pretty">{o.title}</span>
                      <span className="shrink-0 font-mono text-xs text-subtle">{o.kind}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </Container>
      </main>
      <Footer />
      <Reveal key={study.slug} />
      <SmoothScroll />
    </>
  );
}
