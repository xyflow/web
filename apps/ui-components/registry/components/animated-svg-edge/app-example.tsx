import { Background, ReactFlow } from "@xyflow/react";

import { AnimatedSvgEdge } from "@/registry/components/animated-svg-edge";

const defaultNodes = [
  {
    id: "1",
    position: { x: 200, y: 200 },
    data: { label: "A" },
  },
  {
    id: "2",
    position: { x: 400, y: 400 },
    data: { label: "B" },
  },
];

const defaultEdges = [
  {
    id: "1->2",
    source: "1",
    target: "2",
    type: "animatedSvgEdge",
    data: {
      duration: 2,
      shape: "package",
      path: "smoothstep",
    },
  } satisfies AnimatedSvgEdge,
];

const edgeTypes = {
  animatedSvgEdge: AnimatedSvgEdge,
};

export default function App() {
  return (
    <div className="h-full w-full">
      <ReactFlow
        defaultNodes={defaultNodes}
        edgeTypes={edgeTypes}
        defaultEdges={defaultEdges}
        fitView
      >
        <Background />
      </ReactFlow>
    </div>
  );
}
