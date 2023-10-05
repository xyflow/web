import { Position } from 'reactflow';

import { Slider } from '../../..';
import Handle from './handle';
import Wrapper from './node-wrapper';

export default function SliderNode({ data }: { data: any }) {
  const {
    label = '',
    min = 0,
    max = 1,
    onChange = () => {},
    value = 0.5,
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
        rangeClassName="bg-primary"
        thumbClassName="bg-primary"
      />
      <Handle type="source" position={Position.Right} />
    </Wrapper>
  );
}
