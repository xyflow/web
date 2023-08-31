import { Position } from 'reactflow';

import { Label, Slider } from 'xy-ui';
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
      <Slider
        className="nodrag m-2"
        min={min}
        max={max}
        value={[value]}
        onValueChange={(val) => onChange(val[0])}
        inverted
        rangeClassName={`bg-${variant}`}
        thumbClassName={`bg-${variant}`}
      />
      <Handle type="source" position={Position.Right} />
    </Wrapper>
  );
}
