import { Background, FitViewOptions, ReactFlow } from "@xyflow/react";

import { BaseNodeFullDemo } from "./component-example";

const nodeTypes = {
  baseNodeFull: BaseNodeFullDemo,
};

const defaultNodes = [
  {
    id: "2",
    position: { x: 200, y: 200 },
    data: {},
    type: "baseNodeFull",
  },
];

const fitViewOptions: FitViewOptions = {
  padding: "100px",
};

export default function App() {
  return (
    <div className="h-full w-full">
      <ReactFlow
        defaultNodes={defaultNodes}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={fitViewOptions}
      >
        <Background />
      </ReactFlow>
    </div>
  );
}
