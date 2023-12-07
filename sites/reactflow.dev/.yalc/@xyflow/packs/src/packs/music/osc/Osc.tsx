import { useCallback, useState } from "react";
import {
  type NodeProps,
  Handle,
  Position,
  useReactFlow,
  useStore,
  useKeyPress,
} from "reactflow";

export type OscData = {
  frequency: number;
  waveform: Waveform;
};

export type Waveform = "sine" | "square" | "sawtooth" | "triangle";

export function Osc({ id, data }: NodeProps<OscData>) {
  const { setNodes } = useReactFlow();
  const highPrecision = useKeyPress("Shift");
  const hasIncomers = useStore(({ edges }) =>
    edges.some(({ target }) => target === id),
  );
  const hasOutgoers = useStore(({ edges }) =>
    edges.some(({ source }) => source === id),
  );

  const updateNodeData = useCallback((data: Partial<OscData>) => {
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
            hasIncomers ? "opacity-100" : "opacity-25"
          }`}
        >
          <span>freq</span>
          <Handle position={Position.Left} type="target" />
        </div>
      </header>

      <label
        className={`flex flex-col ${hasIncomers ? "opacity-25" : "opacity-100"}
        rounded ring-inset ring-pink-500 focus-within:ring-2
        `}
      >
        <p className="mb-1 font-bold">frequency</p>
        <input
          className="nodrag nopan"
          type="range"
          value={data.frequency}
          min={20}
          max={2000}
          step={highPrecision ? 0.01 : 1}
          disabled={hasIncomers}
          onChange={(e) => {
            // If the user enables our "high-precision" mode by holding down
            // shift, we need to prevent the usual update from happening. There
            // won't suddenly be more pixels for us to move the slider around, so
            // we need to work out the precise values ourselves.
            if (!highPrecision) {
              updateNodeData({ frequency: Number(e.target.value) });
            }
          }}
          onMouseMove={(e) => {
            if (highPrecision) {
              const min = Number(e.currentTarget.min);
              const max = Number(e.currentTarget.max);
              const value = data.frequency + e.movementX / 10;
              const clamped = Math.max(min, Math.min(max, value));

              updateNodeData({ frequency: clamped });
            }
          }}
        />
        <p className="text-right text-xs">{Math.round(data.frequency)}Hz</p>
      </label>

      <WaveformSelect
        value={data.waveform}
        onChange={(waveform) => updateNodeData({ waveform })}
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

export default Osc;

type WaveformSelectProps = {
  value: Waveform;
  onChange: (value: Waveform) => void;
};

function WaveformSelect({ value, onChange }: WaveformSelectProps) {
  const options: Waveform[] = ["sine", "triangle", "sawtooth", "square"];

  return (
    <div className="rounded ring-inset ring-pink-500 focus-within:ring-2">
      <fieldset className="flex flex-col" name="waveform">
        <legend className="mb-1 font-bold">waveform</legend>
        {options.map((option) => (
          <WaveformRadio
            key={option}
            value={option}
            checked={value === option}
            onChange={onChange}
          />
        ))}
      </fieldset>
    </div>
  );
}

type WaveformRadioProps = {
  value: Waveform;
  checked: boolean;
  onChange: (value: Waveform) => void;
};

function WaveformRadio({ value, checked, onChange }: WaveformRadioProps) {
  return (
    <label className="flex items-center gap-2">
      <input
        type="radio"
        name="waveform"
        value="square"
        checked={checked}
        onChange={() => onChange(value)}
        className="nopan nodrag"
      />
      <span className="flex-1 text-xs">{value}</span>
      <WaveformIcon
        kind={value}
        className={checked ? "text-black" : "text-gray-300"}
      />
    </label>
  );
}

type WaveformIconProps = React.SVGProps<SVGSVGElement> & { kind: Waveform };

function WaveformIcon({ kind, ...delegated }: WaveformIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
      width="14"
      height="14"
      {...delegated}
    >
      <path stroke="none" fill="currentColor" d={waves[kind]} />
    </svg>
  );
}

// These SVG icons are graciously taken from Templarian/MaterialDesign. You can
// find the repository here:
//
//   https://github.com/Templarian/MaterialDesign/tree/master
//
// These icons are licensed under the Apache 2.0 license, which you can find
// here:
//
//   https://www.apache.org/licenses/LICENSE-2.0
//
const waves = {
  sawtooth: ` 
    M 14.668 29.332 V 9.105 l -12 12.227 v -3.773 L 17.332 2.668 v 20.227
    l 12 -12.227 v 3.773 Z m 0 0
  `,
  sine: `
    M 22 28 c -4 0 -5.586 -5.652 -7.266 -11.625 C 13.52 12.055 12 6.668 10 6.668
    c -4.52 0 -4.668 9.238 -4.668 9.332 H 2.668 c 0 -.492 .078 -12 7.332 -12 4 
    0 5.613 5.668 7.293 11.652 1.148 4.082 2.707 9.68 4.707 9.68 4.586 0 4.707
    -9.238 4.707 -9.332 h 2.668 c 0 .492 -.082 12 -7.375 12 Z m 0 0
  `,
  square: `
    M 2.668 2.668 V 16 h 2.664 V 5.332 h 9.336 v 24 h 14.664 V 16 h -2.664 v 
    10.668 h -9.336 v -24 Z m 0 0
  `,
  triangle: `
    m 29.332 16 -6.664 13.332 L 9.465 8.055 5.652 16 H 2.668 L9.332 2.668 l
    13.203 21.277 L 26.348 16 Z m 0 0
  `,
};
// PRUNE START
Osc.meta = {
  title: "Oscillator",
  description: `
    An oscillator generates a tone at the specified frequency. The waveform can
    be changed to produce different sounds. The frequency slider is disabled if
    another node is connected to the frequency handle.
  `,
};
// PRUNE END
