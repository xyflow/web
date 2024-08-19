import React from 'react';
import { Handle } from '@xyflow/react';
import { shallow } from 'zustand/shallow';
import { tw } from 'twind';
import { useStore } from '../store';

const selector = (id) => (store) => ({
  setGain: (e) => store.updateNode(id, { gain: +e.target.value }),
});

export default function Osc({ id, data }) {
  const { setGain } = useStore(selector(id), shallow);

  return (
    <div className={tw('rounded-md bg-white shadow-xl')}>
      <Handle className={tw('w-2 h-2')} type="target" position="top" />

      <p
        className={tw('rounded-t-md px-2 py-1 bg-blue-500 text-white text-sm')}
      >
        Amp
      </p>
      <label className={tw('flex flex-col px-2 pt-1 pb-4')}>
        <p className={tw('text-xs font-bold mb-2')}>Gain</p>
        <input
          className="nodrag"
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={data.gain}
          onChange={setGain}
        />
        <p className={tw('text-right text-xs')}>{data.gain.toFixed(2)}</p>
      </label>

      <Handle className={tw('w-2 h-2')} type="source" position="bottom" />
    </div>
  );
}
