import { Background, ReactFlow } from "@xyflow/react";

import { NodeAppendixDemo } from "./component-example";

const nodeTypes = {
  appendixNode: NodeAppendixDemo,
};

const defaultNodes = [
  {
    id: "1",
    position: { x: 200, y: 200 },
    data: {},
    type: "appendixNode",
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
