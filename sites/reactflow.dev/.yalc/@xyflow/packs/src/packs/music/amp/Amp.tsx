import { useCallback } from "react";
import {
  type NodeProps,
  Handle,
  Position,
  useReactFlow,
  useStore,
  getIncomers,
} from "reactflow";

/**
 *
 */
export type AmpData = {
  gain: number;
};

/**
 *
 */
export function Amp({ id, data }: NodeProps<AmpData>) {
  const { setNodes } = useReactFlow();

  const hasIncomers = useStore(
    ({ edges }) =>
      ({
        gain: edges.some(
          ({ target, targetHandle }) =>
            target === id && targetHandle === "gain",
        ),
        in: edges.some(
          ({ target, targetHandle }) => target === id && targetHandle === "in",
        ),
      }) as const,
  );
  const hasOutgoers = useStore(({ edges }) =>
    edges.some(({ source }) => source === id),
  );

  const updateNodeData = useCallback((data: Partial<AmpData>) => {
    setNodes((nodes) =>
      nodes.map((node) =>
        node.id === id ? { ...node, data: { ...node.data, ...data } } : node,
      ),
    );
  }, []);

  return (
    <div className="bg-white shadow-lg [&>*]:px-2 [&>*]:py-1">
      <header className="rounded-t-lg bg-gray-100 text-xs">
        <div
          className={`relative -mx-1.5 px-2 ${
            hasIncomers.gain ? "opacity-100" : "opacity-25"
          }`}
        >
          <span>gain</span>
          <Handle position={Position.Left} type="target" id="gain" />
        </div>
        <div
          className={`relative -mx-1.5 px-2 ${
            hasIncomers.in ? "opacity-100" : "opacity-25"
          }`}
        >
          <span>in</span>
          <Handle position={Position.Left} type="target" id="in" />
        </div>
      </header>

      <label
        className={`flex flex-col ${hasIncomers ? "opacity-25" : "opacity-100"}
        rounded ring-inset ring-pink-500 focus-within:ring-2
        `}
      >
        <p className="mb-1 font-bold">gain</p>
        <input
          className="nodrag nopan"
          type="range"
          value={data.gain}
          min={0}
          max={2}
          step={0.01}
          disabled={hasIncomers.gain}
          onChange={(e) => updateNodeData({ gain: Number(e.target.value) })}
        />
        <p className="text-right text-xs">{data.gain}</p>
      </label>

      <footer className="rounded-b-lg bg-gray-100 text-xs">
        <div
          className={`relative -mx-2 px-2 text-right ${
            hasOutgoers ? "opacity-100" : "opacity-25"
          }`}
        >
          <span>out</span>
          <Handle position={Position.Right} type="source" />
        </div>
      </footer>
    </div>
  );
}

export default Amp;
// PRUNE START
Amp.meta = {
  title: "Amp",
  description: `
    A simple gain control. The gain slider is disabled if another node is connected
    to the gain handle.
  `,
};
// PRUNE END
