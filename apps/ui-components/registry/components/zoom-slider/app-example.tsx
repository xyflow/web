import { Background, ReactFlow } from "@xyflow/react";
import { ZoomSlider } from "@/registry/components/zoom-slider/";

const defaultNodes = [
  {
    id: "1",
    position: { x: 200, y: 200 },
    data: { label: "Node" },
  },
];

export default function App() {
  return (
    <div className="h-full w-full">
      <ReactFlow defaultNodes={defaultNodes} fitView>
        <Background />
        <ZoomSlider position="top-left" />
      </ReactFlow>
    </div>
  );
}
