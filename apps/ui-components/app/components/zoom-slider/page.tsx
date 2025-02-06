import { Background, ReactFlow } from "@xyflow/react";
import { ZoomSlider } from "@/registry/components/zoom-slider";

const defaultNodes = [
  {
    id: "1",
    position: { x: 200, y: 200 },
    data: { label: "Node" },
  },
];

export default function ZoomSliderDemo() {
  return (
    <div className="h-full w-full">
      <ReactFlow defaultNodes={defaultNodes} fitView>
        <Background />
        <ZoomSlider />
      </ReactFlow>
    </div>
  );
}
