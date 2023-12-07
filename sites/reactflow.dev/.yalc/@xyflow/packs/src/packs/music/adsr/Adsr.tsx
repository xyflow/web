import { useCallback, useMemo, useState } from "react";
import {
  type NodeProps,
  Handle,
  Position,
  useReactFlow,
  useStore,
} from "reactflow";

export type AdsrData = {
  attack: number;
  decay: number;
  sustain: number;
  release: number;
};

export const defaultData: AdsrData = {
  attack: 100,
  decay: 100,
  sustain: 0.5,
  release: 100,
};

type Param = "attack" | "decay" | "sustain" | "release";

export function Adsr({ id, data }: NodeProps<AdsrData>) {
  // It's important to remember to *copy* the node data when updating it. If you
  // don't, React Flow won't know the data has changed and your node might not
  // re-render.
  //
  // This `updateNodeData` callback is a helper that lets you pass in a partial
  // object and merge it with the existing node data.
  const { setNodes } = useReactFlow();
  const updateNodeData = useCallback((data: Partial<AdsrData>) => {
    setNodes((nodes) =>
      nodes.map((node) =>
        node.id === id ? { ...node, data: { ...node.data, ...data } } : node,
      ),
    );
  }, []);

  // We calculate whether any edges are connected to or from this node so we
  // can highlight the corresponding handles.
  //
  // React Flow provides two utils that you could use instead, `getIncomers` and
  // `getOutgoers` but we've opted to manually iterate over the edges from the
  // store so we can exit the iteration early if we find what we're looking for.
  const hasIncomers = useStore(({ edges }) => {
    const incomers = { in: false, gate: false };

    for (const { target, targetHandle } of edges) {
      if (target === id && targetHandle === "in") incomers.in = true;
      if (target === id && targetHandle === "gate") incomers.gate = true;
      if (incomers.in && incomers.gate) break;
    }

    return incomers;
  });
  const hasOutgoers = useStore(({ edges }) =>
    edges.some(({ source }) => source === id),
  );

  // Keeping track of the current hovered/focused slider lets us highlight the
  // corresponding line segment in the graph.
  const [focusedParam, setFocusedParam] = useState<Param | null>(null);

  // Memoizing the path segments saves us re-calculating the segments just because
  // a handle is connected or an input is focused.
  const segments = useMemo(() => toPathSegments(data), [data]);

  return (
    <div className="bg-white shadow-lg [&>*]:px-2 [&>*]:py-1">
      <header className="rounded-t-lg bg-gray-100 text-xs">
        <div
          className={`relative -mx-1.5 px-2 ${
            hasIncomers.gate ? "opacity-100" : "opacity-25"
          }`}
        >
          <span>gate</span>
          <Handle position={Position.Left} type="target" id="gate" />
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

      <div className="m-2 rounded bg-gray-50 text-pink-500 shadow-inner">
        <svg className="w-full" viewBox="-5 -5 410 110" width="220">
          {segments.map(({ param, from, to }) => (
            <path
              key={param}
              className={
                param === focusedParam ? "text-pink-500" : "text-black"
              }
              d={`M ${from.x} ${from.y} L ${to.x} ${to.y}`}
              stroke="currentColor"
              strokeWidth={3}
              strokeLinejoin="round"
              strokeLinecap="round"
            />
          ))}
        </svg>
      </div>

      <label
        className="flex gap-2 rounded ring-inset ring-pink-500 focus-within:ring-2"
        onMouseEnter={() => setFocusedParam("attack")}
        onMouseLeave={() => setFocusedParam(null)}
      >
        <p className="text-right text-xs">attack</p>
        <input
          className="nodrag nopan col-span-2"
          type="range"
          min={0}
          max={1000}
          value={data.attack}
          onChange={(e) => updateNodeData({ attack: Number(e.target.value) })}
          onFocus={() => setFocusedParam("attack")}
          onBlur={() => setFocusedParam(null)}
        />
        <span className="text-xs">{data.attack}ms</span>
      </label>

      <label
        className="flex gap-2 rounded ring-inset ring-pink-500 focus-within:ring-2"
        onMouseEnter={() => setFocusedParam("decay")}
        onMouseLeave={() => setFocusedParam(null)}
      >
        <p className="text-right text-xs">decay</p>
        <input
          className="nodrag nopan col-span-2"
          type="range"
          min={0}
          max={1000}
          value={data.decay}
          onChange={(e) => updateNodeData({ decay: Number(e.target.value) })}
          onFocus={() => setFocusedParam("decay")}
          onBlur={() => setFocusedParam(null)}
        />
        <span className="text-xs">{data.decay}ms</span>
      </label>

      <label
        className="flex gap-2 rounded ring-inset ring-pink-500 focus-within:ring-2"
        onMouseEnter={() => setFocusedParam("sustain")}
        onMouseLeave={() => setFocusedParam(null)}
      >
        <p className="text-right text-xs">sustain</p>
        <input
          className="nodrag nopan col-span-2"
          type="range"
          min={0}
          max={1}
          step={0.01}
          value={data.sustain}
          onChange={(e) => updateNodeData({ sustain: Number(e.target.value) })}
          onFocus={() => setFocusedParam("sustain")}
          onBlur={() => setFocusedParam(null)}
        />
        <span className="text-xs">{data.sustain}</span>
      </label>

      <Slider
        label="release"
        value={data.release}
        unit="ms"
        min={0}
        max={1000}
        onChange={(value) => updateNodeData({ release: value })}
        onFocus={() => setFocusedParam("release")}
        onBlur={() => setFocusedParam(null)}
      />

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

export default Adsr;

const toPathSegments = ({ attack, decay, sustain, release }: AdsrData) => {
  const sustainY = 100 - sustain * 100;
  const params = ["attack", "decay", "sustain", "release"];
  const segments = [
    { x: 0, y: 100 },
    { x: attack / 10, y: 0 },
    { x: attack / 10 + decay / 10, y: sustainY },
    { x: attack / 10 + decay / 10 + 100, y: sustainY },
    { x: attack / 10 + decay / 10 + 100 + release / 10, y: 100 },
  ];

  return params.map((param, i) => ({
    param,
    from: segments[i],
    to: segments[i + 1],
  }));
};

type SliderProps = {
  label: string;
  value: number;
  unit?: string;
  onChange: (value: number) => void;
  onFocus: () => void;
  onBlur: () => void;
};

function Slider({
  label,
  value,
  unit,
  onChange,
  onFocus,
  onBlur,
  ...delegated
}: SliderProps & Omit<JSX.IntrinsicElements["input"], keyof SliderProps>) {
  return (
    <label
      className="flex gap-2 rounded ring-inset ring-pink-500 focus-within:ring-2"
      onMouseEnter={onFocus}
      onMouseLeave={onBlur}
    >
      <p className="text-right text-xs">{label}</p>
      <input
        // It's important to add the `nodrag` and `nopan` classes to interactive
        // elements inside a custom node so React Flow knows not to start moving
        // the node around or panning the canvas when you interact with them.
        className="nodrag nopan col-span-2"
        type="range"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        onFocus={() => onFocus}
        onBlur={() => onBlur}
        {...delegated}
      />
      <span className="text-xs">
        {value}
        {unit}
      </span>
    </label>
  );
}

// PRUNE -----------------------------------------------------------------------

Adsr.meta = {
  title: "ADSR",
  route: "adsr",
  description: [
    "An ADSR envelope generator. Use the sliders to adjust the attack, decay,\
     sustain level, and release time.",
  ],
};
