import { Background, ReactFlow } from "@xyflow/react";

import { NodeAppendixDemo, NodeBadgeDemo } from "./component-example";

const nodeTypes = {
  appendixNode: NodeAppendixDemo,
  badgeNode: NodeBadgeDemo,
};

const defaultNodes = [
  {
    id: "1",
    position: { x: 200, y: 200 },
    data: {},
    type: "appendixNode",
  },
  {
    id: "2",
    position: { x: 185, y: 480 },
    data: {},
    type: "badgeNode",
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
