import { Background, ReactFlow } from "@xyflow/react";

import { AnnotationNodeDemo } from "./component-example";
import { BaseNodeDemo } from "./component-example";

const nodeTypes = {
  annotationNode: AnnotationNodeDemo,
  baseNode: BaseNodeDemo,
};

const defaultNodes = [
  {
    id: "1",
    position: { x: -100, y: 150 },
    data: { label: "Annotation 1" },
    type: "annotationNode",
  },
  {
    id: "2",
    position: { x: 0, y: 200 },
    data: { label: "Node To Annotate" },
    type: "baseNode",
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
