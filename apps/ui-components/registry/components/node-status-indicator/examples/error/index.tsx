import { Background, ReactFlow } from "@xyflow/react";

import { ErrorNode } from "./component-example";

const defaultNodes = [
  {
    id: "1",
    position: { x: 60, y: 80 },
    type: "errorNode",
    data: {},
  },
];

const nodeTypes = {
  errorNode: ErrorNode,
};

export default function App() {
  return (
    <div className="h-full w-full">
      <ReactFlow defaultNodes={defaultNodes} nodeTypes={nodeTypes} fitView>
        <Background />
      </ReactFlow>
    </div>
  );
}
