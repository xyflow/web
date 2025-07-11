import { Background, ReactFlow } from "@xyflow/react";

import { NodeBadgeDemo } from "./component-example";

const nodeTypes = {
  badgeNode: NodeBadgeDemo,
};

const defaultNodes = [
  {
    id: "1",
    position: { x: 0, y: 0 },
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
