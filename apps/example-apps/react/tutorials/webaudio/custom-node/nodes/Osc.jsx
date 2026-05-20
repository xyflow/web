import React from 'react';
import { Handle } from '@xyflow/react';
import { shallow } from 'zustand/shallow';
import { tw } from 'twind';

import { useStore } from '../store';

const selector = (id) => (store) => ({
  setFrequency: (e) => store.updateNode(id, { frequency: +e.target.value }),
  setType: (e) => store.updateNode(id, { type: e.target.value }),
});

export default function Osc({ id, data }) {
  const { setFrequency, setType } = useStore(selector(id), shallow);

  return (
    <div className={tw('rounded-md bg-white shadow-xl')}>
      <p className={tw('rounded-t-md px-2 py-1 bg-pink-500 text-white text-sm')}>Osc</p>

      <label className={tw('flex flex-col px-2 py-1')}>
        <p className={tw('text-xs font-bold mb-2')}>Frequency</p>
        <input
          className="nodrag"
          type="range"
          min="10"
          max="1000"
          value={data.frequency}
          onChange={setFrequency}
        />
        <p className={tw('text-right text-xs')}>{data.frequency} Hz</p>
      </label>

      <hr className={tw('border-border mx-2')} />

      <label className={tw('flex flex-col px-2 pt-1 pb-4')}>
        <p className={tw('text-xs font-bold mb-2')}>Waveform</p>
        <select className="nodrag" value={data.type} onChange={setType}>
          <option value="sine">sine</option>
          <option value="triangle">triangle</option>
          <option value="sawtooth">sawtooth</option>
          <option value="square">square</option>
        </select>
      </label>

      <Handle className={tw('w-2 h-2')} type="source" position="bottom" />
    </div>
  );
}
