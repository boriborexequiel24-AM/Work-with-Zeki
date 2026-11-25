"use client";

import Image from "next/image";
import { certifications } from "@/data/content";
import { useViewer } from "./WorkflowViewer";

// A certificate opens in the same viewer as the workflows, fitted to the screen.
export function Certificates() {
  const { openShot, viewer } = useViewer();

  return (
    <>
      <ul className="grid gap-4 sm:grid-cols-3">
        {certifications.map((c) => {
          const alt = `${c.title} certificate`;
          return (
            <li key={c.title} data-reveal="" className="lift overflow-hidden rounded-xl border border-line bg-surface hover:border-line-strong">
              <button
                type="button"
                onClick={(e) =>
                  openShot(e.currentTarget.firstElementChild as HTMLElement, {
                    src: c.image,
                    title: c.title,
                    alt,
                    fit: true,
                  })
                }
                aria-label={`See the ${alt}, ${c.date}`}
                className="group block w-full cursor-zoom-in text-left focus-visible:-outline-offset-2"
              >
                <div className="relative aspect-[3/2] overflow-hidden border-b border-line">
                  <Image
                    src={c.image}
                    alt=""
                    fill
                    sizes="(min-width: 640px) 33vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </div>
                <div className="p-5">
                  <div className="flex items-center justify-between font-mono text-xs">
                    <span className="text-accent">{c.platform}</span>
                    <span className="text-subtle">{c.date}</span>
                  </div>
                  <p className="mt-3 font-medium">{c.title}</p>
                  <p className="mt-1 text-xs text-subtle">{c.issuer}</p>
                </div>
              </button>
            </li>
          );
        })}
      </ul>

      {viewer}
    </>
  );
}
