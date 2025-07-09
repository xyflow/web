import { Background, ReactFlow } from "@xyflow/react";

import { ActionBarNodeDemo } from "./component-example";

const nodeTypes = {
  actionBarNode: ActionBarNodeDemo,
};

const defaultNodes = [
  {
    id: "1",
    position: { x: 0, y: 0 },
    parentId: "1a",
    data: { label: "Action Bar" },
    type: "actionBarNode",
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
