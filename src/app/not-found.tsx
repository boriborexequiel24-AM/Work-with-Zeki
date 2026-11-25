import type { Metadata } from "next";
import { ButtonLink, Container } from "@/components/ui";

export const metadata: Metadata = { title: "Page not found | Exequiel Boribor", alternates: { canonical: null } };

export default function NotFound() {
  return (
    <main id="main" tabIndex={-1} className="grid min-h-screen place-items-center outline-none">
      <Container className="max-w-2xl">
        <p className="font-mono text-xs text-accent">404</p>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">This page doesn&apos;t exist.</h1>
        <p className="mt-4 text-lg text-muted">The link may be old or mistyped. Everything is on the home page.</p>
        <div className="mt-8">
          <ButtonLink href="/">Go to the home page</ButtonLink>
        </div>
      </Container>
    </main>
  );
}
