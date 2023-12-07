import { useCallback, useState } from "react";
import {
  type NodeProps,
  Handle,
  Position,
  useReactFlow,
  useStore,
} from "reactflow";

export type XyData = {
  x: number;
  y: number;
};

export function Xy({ id, data }: NodeProps<XyData>) {
  const { setNodes } = useReactFlow();
  const [dragging, setDragging] = useState(false);
  const hasOutgoers = useStore(({ edges }) => ({
    x: edges.some(
      ({ source, sourceHandle }) => source === id && sourceHandle === "x",
    ),
    y: edges.some(
      ({ source, sourceHandle }) => source === id && sourceHandle === "y",
    ),
  }));

  const updateNodeData = useCallback((data: Partial<XyData>) => {
    setNodes((nodes) =>
      nodes.map((node) =>
        node.id === id ? { ...node, data: { ...node.data, ...data } } : node,
      ),
    );
  }, []);

  return (
    <div className="bg-white shadow-lg [&>*]:px-2 [&>*]:py-1">
      <div>
        <svg
          className={`nodrag nopan h-[200px] w-[200px] rounded bg-gray-50 text-gray-400 shadow-inner transition hover:bg-gray-100
        ${dragging ? "hover:text-pink-500" : "hover:text-gray-500"}
        `}
          viewBox="0 0 200 200"
          onMouseDown={(e) => {
            const { left, top, width, height } =
              e.currentTarget.getBoundingClientRect();

            const x = (e.clientX - left) / width;
            const y = (e.clientY - top) / height;

            setDragging(true);
            updateNodeData({ x, y });
          }}
          onMouseMove={(e) => {
            if (dragging) {
              const { left, top, width, height } =
                e.currentTarget.getBoundingClientRect();
              const x = (e.clientX - left) / width;
              const y = (e.clientY - top) / height;

              console.log({ left, x });
              updateNodeData({ x, y });
            }
          }}
          onMouseUp={() => setDragging(false)}
          onMouseEnter={(e) => e.buttons && setDragging(true)}
          onMouseLeave={() => setDragging(false)}
        >
          <circle
            className="pointer-events-none select-none"
            cx={data.x * 200}
            cy={data.y * 200}
            r="5"
            fill="currentColor"
          />
        </svg>
      </div>

      <footer className="rounded-b-lg bg-gray-100 text-xs">
        <div
          className={`relative -mx-2 px-2 text-right ${
            hasOutgoers.x ? "opacity-100" : "opacity-25"
          }`}
        >
          <span>x</span>
          <Handle position={Position.Right} type="source" id="x" />
        </div>
        <div
          className={`relative -mx-2 px-2 text-right ${
            hasOutgoers.y ? "opacity-100" : "opacity-25"
          }`}
        >
          <span>y</span>
          <Handle position={Position.Right} type="source" id="y" />
        </div>
      </footer>
    </div>
  );
}

export default Xy;
// PRUNE START
Xy.meta = {
  title: "XY",
  description: "An XY type thingy",
};
// PRUNE END
