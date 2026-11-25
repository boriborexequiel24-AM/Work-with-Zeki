"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";

// Small workflows beside the section headings, in the shape of an n8n canvas. Each one draws
// itself with the heading, then runs over and over: a pulse travels the lines, every step
// lights up as it is reached, the last one finishes, and it starts again from the trigger.
// Decoration only. It runs only while it is on screen, can be paused, and stands still for
// visitors who ask for less motion.

// Drawn on a 24 x 24 grid.
const icons = {
  ai: "M12 3l2 7 7 2-7 2-2 7-2-7-7-2 7-2z",
  calendar: "M4 6h16v14H4zM4 11h16M8 3v5M16 3v5",
  case: "M4 8h16v11H4zM9 8V5h6v3",
  chat: "M4 5h16v11H11l-5 4v-4H4z",
  check: "M5 12.5l5 5L19 7",
  clock: "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM12 7v5l3 3",
  cloud: "M7 18a4 4 0 0 1 0-8 6 6 0 0 1 11-1 4.5 4.5 0 0 1 0 9z",
  code: "M8 7l-5 5 5 5M16 7l5 5-5 5",
  data: "M5 6c0-1.7 3.1-3 7-3s7 1.3 7 3-3.1 3-7 3-7-1.3-7-3zM5 6v12c0 1.7 3.1 3 7 3s7-1.3 7-3V6M5 12c0 1.7 3.1 3 7 3s7-1.3 7-3",
  doc: "M6 3h8l4 4v14H6zM9 12h6M9 16h6",
  folder: "M3 6h6l2 2h10v11H3z",
  image: "M4 5h16v14H4zM4 16l5-5 4 4 3-3 4 4",
  loop: "M4 12a8 8 0 0 1 14-5l2 2M20 4v5h-5M20 12a8 8 0 0 1-14 5l-2-2M4 20v-5h5",
  mail: "M4 6h16v12H4zM4 7l8 6 8-6",
  mic: "M12 3a3 3 0 0 1 3 3v5a3 3 0 0 1-6 0V6a3 3 0 0 1 3-3zM6 11a6 6 0 0 0 12 0M12 17v4",
  send: "M21 3L3 10l7 3 3 7zM10 13L21 3",
  sheet: "M4 4h16v16H4zM4 10h16M10 4v16",
  shield: "M12 3l7 3v6c0 4-3 7-7 9-4-2-7-5-7-9V6zM9 12l2 2 4-4",
  split: "M4 12h4c4 0 3-6 7-6h5M8 12c4 0 3 6 7 6h5",
  user: "M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM4 21c0-4 4-6 8-6s8 2 8 6",
  video: "M3 6h12v12H3zM15 11l6-4v10l-6-4z",
};

type Flow = {
  /** Centre of each node and its icon. Nodes nothing leads to are triggers. The last one ends it. */
  nodes: [x: number, y: number, icon: keyof typeof icons][];
  /** Which node leads to which. */
  edges: [from: number, to: number][];
};

const flows = {
  // A message, an agent with three tools, a rules check, then a reply and a hand-off.
  agent: {
    nodes: [
      [18, 75, "mail"], [92, 75, "ai"],
      [168, 25, "data"], [168, 75, "doc"], [168, 125, "calendar"],
      [238, 75, "shield"], [304, 35, "send"], [304, 115, "chat"], [362, 75, "check"],
    ],
    edges: [[0, 1], [1, 2], [1, 3], [1, 4], [2, 5], [3, 5], [4, 5], [5, 6], [5, 7], [6, 8], [7, 8]],
  },
  // An inbox sorted into three lanes that end in one sheet.
  branch: {
    nodes: [
      [18, 75, "mail"], [84, 75, "split"],
      [158, 25, "user"], [158, 75, "doc"], [158, 125, "clock"],
      [232, 25, "data"], [232, 75, "ai"], [232, 125, "send"],
      [304, 75, "sheet"], [362, 75, "check"],
    ],
    edges: [[0, 1], [1, 2], [1, 3], [1, 4], [2, 5], [3, 6], [4, 7], [5, 8], [6, 8], [7, 8], [8, 9]],
  },
  // Content from brief to delivery, with someone signing off on the way.
  line: {
    nodes: [
      [18, 40, "doc"], [96, 40, "ai"], [174, 40, "image"], [252, 40, "user"], [330, 40, "mic"],
      [330, 115, "video"], [252, 115, "cloud"], [174, 115, "sheet"], [96, 115, "check"],
    ],
    edges: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7], [7, 8]],
  },
  // A role, a project or ongoing support: one conversation, then scope, build and test.
  merge: {
    nodes: [
      [18, 25, "case"], [18, 75, "folder"], [18, 125, "loop"],
      [100, 75, "chat"], [172, 75, "doc"],
      [244, 35, "code"], [244, 115, "shield"], [308, 75, "user"], [362, 75, "check"],
    ],
    edges: [[0, 3], [1, 3], [2, 3], [3, 4], [4, 5], [4, 6], [5, 7], [6, 7], [7, 8]],
  },
} satisfies Record<string, Flow>;

export type FlowName = keyof typeof flows;

const R = 14;

/** A line leaves the side of a node that faces the next one. */
function path([x1, y1]: readonly [number, number, ...unknown[]], [x2, y2]: readonly [number, number, ...unknown[]]) {
  if (x1 === x2) {
    const down = Math.sign(y2 - y1);
    return `M${x1} ${y1 + R * down}L${x2} ${y2 - R * down}`;
  }
  const side = Math.sign(x2 - x1);
  const a = x1 + R * side;
  const b = x2 - R * side;
  const mid = (a + b) / 2;
  return `M${a} ${y1}C${mid} ${y1} ${mid} ${y2} ${b} ${y2}`;
}

// The run, in ms.
const TRAVEL = 520; // along a line
const WORK = 260; // at a node
const HOLD = 1500; // finished
const FADE = 500; // back to the start
const GAP = 500;

/** When each node is reached. One that several lines lead to waits for the last of them. */
function schedule({ nodes, edges }: Flow) {
  const at = nodes.map(() => 0);
  // Edges only ever lead to a later node, so one pass in order is enough.
  for (const [from, to] of [...edges].sort((a, b) => a[0] - b[0])) {
    at[to] = Math.max(at[to], at[from] + WORK + TRAVEL);
  }
  const done = Math.max(...at) + WORK;
  return { at, hold: done + HOLD, total: done + HOLD + FADE + GAP };
}

export function FlowLine({ name }: { name: FlowName }) {
  const flow: Flow = flows[name];
  const { nodes, edges } = flow;
  const svgRef = useRef<SVGSVGElement>(null);
  const [paused, setPaused] = useState(false);
  const pausedRef = useRef(false);
  const syncRef = useRef<() => void>(() => {});

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg || !svg.animate || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const { at, hold, total } = schedule(flow);
    const t = (ms: number) => Math.min(1, ms / total);
    const options: KeyframeAnimationOptions = { duration: total, iterations: Infinity };
    const running: Animation[] = [];
    const run = (el: Element | null, frames: Keyframe[]) => {
      if (!el) return;
      const animation = el.animate(frames, options);
      animation.pause();
      running.push(animation);
    };

    const { nodes, edges } = flow;
    const lit = svg.querySelectorAll(".flow-lit");
    const pulses = svg.querySelectorAll(".flow-pulse");
    const steps = svg.querySelectorAll(".flow-step");

    edges.forEach(([from], i) => {
      const start = t(at[from] + WORK);
      const end = t(at[from] + WORK + TRAVEL);
      run(lit[i], [
        { strokeDashoffset: 1, opacity: 1, offset: 0 },
        { strokeDashoffset: 1, opacity: 1, offset: start, easing: "ease-in-out" },
        { strokeDashoffset: 0, opacity: 1, offset: end },
        { strokeDashoffset: 0, opacity: 1, offset: t(hold) },
        { strokeDashoffset: 0, opacity: 0, offset: t(hold + FADE) },
        { strokeDashoffset: 0, opacity: 0, offset: 1 },
      ]);
      run(pulses[i], [
        { strokeDashoffset: 0.14, opacity: 0, offset: 0 },
        { strokeDashoffset: 0.14, opacity: 0, offset: start },
        { strokeDashoffset: 0.14, opacity: 1, offset: start, easing: "ease-in-out" },
        { strokeDashoffset: -0.86, opacity: 1, offset: end },
        { strokeDashoffset: -0.86, opacity: 0, offset: end },
        { strokeDashoffset: -0.86, opacity: 0, offset: 1 },
      ]);
    });
    nodes.forEach((_, i) => {
      run(steps[i], [
        { opacity: 0, scale: 1.35, offset: 0 },
        { opacity: 0, scale: 1.35, offset: t(at[i]), easing: "cubic-bezier(0.22, 1, 0.36, 1)" },
        { opacity: 1, scale: 1, offset: t(at[i] + 320) },
        { opacity: 1, scale: 1, offset: t(hold) },
        { opacity: 0, scale: 1, offset: t(hold + FADE) },
        { opacity: 0, scale: 1, offset: 1 },
      ]);
    });

    let onScreen = false;
    let drawn = false;
    let timer: ReturnType<typeof setTimeout> | undefined;
    const sync = () => {
      const go = onScreen && drawn && !pausedRef.current;
      for (const animation of running) {
        if (go) animation.play();
        else animation.pause();
      }
    };
    syncRef.current = sync;

    const observer = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting;
      // Let the drawing finish before the first run.
      if (onScreen && !drawn && !timer) {
        timer = setTimeout(() => {
          drawn = true;
          sync();
        }, 1800);
      }
      sync();
    });
    observer.observe(svg);

    return () => {
      observer.disconnect();
      clearTimeout(timer);
      running.forEach((animation) => animation.cancel());
    };
  }, [flow]);

  function toggle() {
    pausedRef.current = !pausedRef.current;
    setPaused(pausedRef.current);
    syncRef.current();
  }

  const last = nodes.length - 1;
  const order = (node: number) => {
    const edge = edges.findIndex(([, to]) => to === node);
    return edge < 0 ? 0 : 200 + edge * 80;
  };

  return (
    <div className="flow relative hidden w-75 shrink-0 lg:block xl:w-95">
      <svg ref={svgRef} className="w-full" viewBox="0 0 380 150" fill="none" aria-hidden="true">
        {edges.map(([from, to], i) => {
          const d = path(nodes[from], nodes[to]);
          return (
            <g key={`${from}-${to}`}>
              <path
                className="flow-edge"
                style={{ "--d": `${80 + i * 80}ms` } as CSSProperties}
                pathLength={1}
                d={d}
              />
              <path className="flow-lit" pathLength={1} d={d} />
              <path className="flow-pulse" pathLength={1} d={d} />
            </g>
          );
        })}
        {nodes.map(([x, y, icon], i) => {
          const trigger = order(i) === 0;
          const box = { x: x - R, y: y - R, width: R * 2, height: R * 2, rx: trigger ? R : 7 };
          const mark = <path transform={`translate(${x - 7.8} ${y - 7.8}) scale(0.65)`} d={icons[icon]} />;
          return (
            <g key={i}>
              <g className={`flow-node ${i === last ? "flow-end" : ""}`} style={{ "--d": `${order(i)}ms` } as CSSProperties}>
                <rect {...box} />
                {mark}
              </g>
              {/* The same node, lit. Invisible until the run reaches it. */}
              <g className={`flow-step ${i === last ? "flow-done" : ""}`}>
                <rect {...box} />
                {mark}
              </g>
            </g>
          );
        })}
      </svg>

      {/* Anything that keeps moving by itself needs a way to stop it. */}
      <button
        type="button"
        onClick={toggle}
        aria-label={paused ? "Play the workflow animation" : "Pause the workflow animation"}
        className="flow-pause press absolute -right-1 -bottom-1 grid size-7 place-items-center rounded-full border border-line-strong bg-surface text-muted hover:text-fg"
      >
        <svg width="10" height="10" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
          <path d={paused ? "M4 2.5v11l9-5.5z" : "M4 3h3v10H4zM9 3h3v10H9z"} />
        </svg>
      </button>
    </div>
  );
}
