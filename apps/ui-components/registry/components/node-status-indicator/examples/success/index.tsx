import { Background, ReactFlow } from "@xyflow/react";

import { SuccessNode } from "./component-example";

const defaultNodes = [
  {
    id: "1",
    position: { x: 200, y: 0 },
    type: "successNode",
    data: {},
  },
];

const nodeTypes = {
  successNode: SuccessNode,
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
