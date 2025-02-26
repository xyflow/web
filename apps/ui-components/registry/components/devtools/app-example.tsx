import { Background, ReactFlow } from "@xyflow/react";

import { DevTools } from "@/registry/components/devtools/";

const defaultNodes = [
  {
    id: "1a",
    type: "input",
    data: { label: "Node 1" },
    position: { x: 250, y: 5 },
  },
];

export default function App() {
  return (
    <div className="h-full w-full">
      <ReactFlow defaultNodes={defaultNodes} fitView>
        <Background />
        <DevTools position="top-left" />
      </ReactFlow>
    </div>
  );
}
