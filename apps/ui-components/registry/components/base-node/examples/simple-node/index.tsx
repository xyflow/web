import { Background, ReactFlow } from "@xyflow/react";

import { SimpleBaseNode } from "./component-example";

const nodeTypes = {
  simpleNode: SimpleBaseNode,
};

const defaultNodes = [
  {
    id: "1",
    position: { x: -100, y: 150 },
    data: { label: "Simple Base Node" },
    type: "simpleNode",
  },
];

export default function App() {
  return (
    <div className="h-full w-full">
      <ReactFlow defaultNodes={defaultNodes} nodeTypes={nodeTypes} fitView>
        <Background />
      </ReactFlow>
    </div>
  );
}
