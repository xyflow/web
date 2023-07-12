import { Position } from 'reactflow';

import { Slider } from 'xy-ui';
import Handle from './handle';
import Wrapper from './node-wrapper';

export default function SliderNode({ data }) {
  const {
    label = '',
    min = 0,
    max = 1,
    onChange = () => {},
    value = 0.5,
    variant,
  } = data;

  return (
    <Wrapper label={label}>
      <Handle type="source" position={Position.Right} />
      <div className="pr-2 py-2 w-full">
        <Slider
          className="nodrag"
          min={min}
          max={max}
          value={[value]}
          onValueChange={(val) => onChange(val[0])}
          inverted
          rangeClassName={`bg-${variant}`}
          thumbClassName={`bg-${variant}`}
        />
      </div>
    </Wrapper>
  );
}
