import { Position } from '@xyflow/react';
import { Slider } from '@xyflow/xy-ui';

import Handle from './handle';
import Wrapper from './node-wrapper';

const min = 0;
const max = 40;

export default function SliderNode({ data }: { data: any }) {
  const { label = '', setState = () => {}, zoom = 12 } = data;

  return (
    <Wrapper label={label}>
      <Slider
        className="nodrag m-2"
        min={min}
        max={max}
        value={[zoom]}
        onValueChange={(val) =>
          setState((state: any) => ({ ...state, zoom: val[0] }))
        }
        inverted
        rangeClassName="bg-primary"
        thumbClassName="bg-primary"
      />
      <Handle type="source" position={Position.Right} />
    </Wrapper>
  );
}
