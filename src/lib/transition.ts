import { flushSync } from "react-dom";

let latest = 0;

export const reducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Runs a change inside a browser view transition. `kind` is set as `data-transition` on
 * <html> while it runs, so globals.css can name and time the parts for that one change.
 * Browsers without the API, and visitors who ask for less motion, just get the change.
 *
 * `after` runs once the new page has been captured and the animation is over.
 */
export function withTransition(
  kind: "filter" | "viewer" | "theme",
  update: () => void | Promise<void>,
  after?: () => void,
) {
  if (!document.startViewTransition || reducedMotion()) {
    void update();
    after?.();
    return;
  }

  const run = ++latest;
  const root = document.documentElement;
  root.dataset.transition = kind;

  const transition = document.startViewTransition(async () => {
    await update();
  });
  // A skipped transition (the tab is hidden, or another one started) rejects `ready`. The
  // change itself still happens, so there is nothing to do about it.
  transition.ready.catch(() => {});
  transition.finished
    .catch(() => {})
    .finally(() => {
      if (run === latest) delete root.dataset.transition;
      after?.();
    });
}

/** Applies a React state change right away, so a transition captures the result. */
export const now = (change: () => void) => flushSync(change);

/** True once the picture is ready to paint, false if it isn't within `ms`. */
export function imageReady(src: string, ms: number): Promise<boolean> {
  const image = new Image();
  image.src = src;
  return Promise.race([
    image.decode().then(
      () => true,
      () => false,
    ),
    new Promise<boolean>((resolve) => setTimeout(() => resolve(false), ms)),
  ]);
}
