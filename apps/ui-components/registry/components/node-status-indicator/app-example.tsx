import { Background, ReactFlow } from "@xyflow/react";

import {
  LoadingNode,
  SuccessNode,
  ErrorNode,
  LoadingNodeOverlay,
} from "./component-example";

const defaultNodes = [
  {
    id: "1",
    position: { x: 0, y: 0 },
    type: "loadingNode",
    data: {},
  },
  {
    id: "2",
    position: { x: 200, y: 0 },
    type: "successNode",
    data: {},
  },
  {
    id: "3",
    position: { x: 60, y: 80 },
    type: "errorNode",
    data: {},
  },
  {
    id: "4",
    position: { x: 120, y: 160 },
    type: "loadingNodeOverlay",
    data: {},
  },
];

const nodeTypes = {
  loadingNode: LoadingNode,
  loadingNodeOverlay: LoadingNodeOverlay,
  successNode: SuccessNode,
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
