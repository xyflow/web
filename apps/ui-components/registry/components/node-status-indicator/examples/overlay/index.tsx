import { Background, ReactFlow } from "@xyflow/react";

import { LoadingNode } from "./component-example";

const defaultNodes = [
  {
    id: "1",
    position: { x: 0, y: 0 },
    type: "loadingNode",
    data: {},
  },
];

const nodeTypes = {
  loadingNode: LoadingNode,
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
