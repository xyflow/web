import { Background, ReactFlow } from "@xyflow/react";

import AnnotationNode from "./component-example";

const nodeTypes = {
  annotationNode: AnnotationNode,
};

const defaultNodes = [
  {
    id: "1a",
    type: "input",
    data: { label: "Node 1" },
    position: { x: 0, y: 0 },
  },
  {
    id: "1b",
    position: { x: -150, y: -55 },
    parentId: "1a",
    data: { label: "Annotation 1" },
    type: "annotationNode",
  },
];

export default function App() {
  return (
    <div className="h-full w-full">
      <ReactFlow nodeTypes={nodeTypes} defaultNodes={defaultNodes} fitView>
        <Background />
      </ReactFlow>
    </div>
  );
}
