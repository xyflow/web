import { Background, ReactFlow } from "@xyflow/react";
import LabeledHandleDemo from "./component-example";

const defaultNodes = [
  {
    id: "1",
    position: { x: 200, y: 200 },
    data: {},
    type: "labeledHandle",
  },
];

const nodeTypes = {
  labeledHandle: LabeledHandleDemo,
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
