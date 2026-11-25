import type { CSSProperties } from "react";

// Small workflow drawings beside the section headings, in the shape of an n8n canvas. They
// draw themselves once, with the heading (see globals.css), and are decoration only.

type Flow = {
  /** Centre of each node. The first ones start the flow, the last one ends it. */
  nodes: [x: number, y: number][];
  /** Which node leads to which, in drawing order. */
  edges: [from: number, to: number][];
};

const flows = {
  // One trigger, an agent, two tools, one result.
  agent: {
    nodes: [[16, 60], [92, 60], [176, 22], [176, 98], [264, 60]],
    edges: [[0, 1], [1, 2], [1, 3], [2, 4], [3, 4]],
  },
  // One inbox, split three ways.
  branch: {
    nodes: [[16, 60], [100, 60], [184, 16], [184, 104], [184, 60], [264, 60]],
    edges: [[0, 1], [1, 2], [1, 4], [1, 3], [4, 5]],
  },
  // One thing after another.
  line: {
    nodes: [[16, 60], [98, 60], [181, 60], [264, 60]],
    edges: [[0, 1], [1, 2], [2, 3]],
  },
  // Three ways in, one conversation.
  merge: {
    nodes: [[16, 16], [16, 104], [16, 60], [140, 60], [264, 60]],
    edges: [[0, 3], [2, 3], [1, 3], [3, 4]],
  },
} satisfies Record<string, Flow>;

export type FlowName = keyof typeof flows;

const R = 12;

export function FlowLine({ name }: { name: FlowName }) {
  const { nodes, edges }: Flow = flows[name];
  const last = nodes.length - 1;
  // A node appears when the first line reaches it.
  const arrival = (node: number) => {
    const edge = edges.findIndex(([, to]) => to === node);
    return edge < 0 ? 0 : 250 + edge * 150;
  };

  return (
    <svg
      className="flow hidden h-30 w-70 shrink-0 lg:block"
      viewBox="0 0 280 120"
      fill="none"
      aria-hidden="true"
    >
      {edges.map(([from, to], i) => {
        const [x1, y1] = nodes[from];
        const [x2, y2] = nodes[to];
        const a = x1 + R;
        const b = x2 - R;
        const mid = (a + b) / 2;
        return (
          <path
            key={`${from}-${to}`}
            className="flow-edge"
            style={{ "--d": `${100 + i * 150}ms` } as CSSProperties}
            pathLength={1}
            d={`M${a} ${y1}C${mid} ${y1} ${mid} ${y2} ${b} ${y2}`}
          />
        );
      })}
      {nodes.map(([x, y], i) => (
        <rect
          key={i}
          className={`flow-node ${i === last ? "flow-end" : ""}`}
          style={{ "--d": `${arrival(i)}ms` } as CSSProperties}
          x={x - R}
          y={y - R}
          width={R * 2}
          height={R * 2}
          rx={arrival(i) === 0 ? R : 6}
        />
      ))}
    </svg>
  );
}
