import type { CSSProperties, ReactNode } from "react";
import { FlowLine, type FlowName } from "./FlowLine";

/** Delay for the `enter` and `line` animations in globals.css. */
export const delay = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-6xl px-5 sm:px-8 ${className}`}>{children}</div>;
}

export function Section({
  id,
  children,
  className = "",
}: {
  id?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`scroll-mt-20 py-24 sm:py-32 ${className}`}>
      <Container>{children}</Container>
    </section>
  );
}

export function SectionHeader({
  index,
  eyebrow,
  title,
  intro,
  className = "mb-14",
  flow,
  enter,
}: {
  index: string;
  eyebrow: string;
  title: ReactNode;
  intro?: string;
  /** Replaces the space below the header. */
  className?: string;
  /** A small workflow drawing beside the heading, on wide screens. */
  flow?: FlowName;
  /** For a header that can be on the first screen: arrives with the hero, after this many ms. */
  enter?: number;
}) {
  return (
    <header
      data-reveal=""
      style={enter === undefined ? undefined : delay(enter)}
      className={`reveal-lines ${flow ? "flex items-center justify-between gap-10" : "max-w-2xl"} ${
        enter === undefined ? "" : "enter"
      } ${className}`}
    >
      <div className="max-w-2xl">
        <p className="line mb-4 font-mono text-xs tracking-widest text-accent uppercase">
          <span className="text-subtle">{index} /</span> {eyebrow}
        </p>
        <h2 style={delay(80)} className="line text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
          {title}
        </h2>
        {intro && (
          <p style={delay(160)} className="line mt-4 text-lg text-pretty text-muted">
            {intro}
          </p>
        )}
      </div>
      {flow && <FlowLine name={flow} />}
    </header>
  );
}

export function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-md border border-line bg-surface-2 px-2 py-0.5 font-mono text-xs text-muted">
      {children}
    </span>
  );
}

export function ButtonLink({
  href,
  children,
  variant = "primary",
  external = false,
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "ghost";
  external?: boolean;
}) {
  const base =
    "inline-flex min-h-11 items-center justify-center gap-2 rounded-lg px-5 py-2.5 text-sm font-medium press focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";
  const styles =
    variant === "primary"
      ? "bg-fg text-bg hover:bg-accent hover:text-on-accent"
      : "border border-line-strong text-fg hover:border-fg/40 hover:bg-surface";
  return (
    <a
      href={href}
      className={`${base} ${styles}`}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {children}
    </a>
  );
}

export function Arrow() {
  return (
    <svg className="arrow" width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
