import { Background, ReactFlow } from "@xyflow/react";

import $CAMELCOMPONENT from "./component-example";

const nodeTypes = {
  customNode: $CAMELCOMPONENT,
};

const defaultNodes = [
  {
    id: "1",
    position: { x: 200, y: 200 },
    data: {},
    type: "customNode",
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
