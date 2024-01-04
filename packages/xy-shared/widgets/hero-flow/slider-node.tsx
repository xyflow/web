import { useCallback } from 'react';
import { NodeProps, Position, useReactFlow } from '@xyflow/react';
import { Slider } from '@xyflow/xy-ui';

import Handle from './handle';
import Wrapper from './node-wrapper';

const min = 0;
const max = 40;

export default function SliderNode({ data, id }: NodeProps) {
  const { updateNodeData } = useReactFlow();
  const onValueChange = useCallback(
    (values: number[]) => updateNodeData(id, { value: values[0] }),
    [],
  );

  return (
    <Wrapper label={data.label}>
      <Slider
        className="nodrag m-2"
        min={min}
        max={max}
        value={[data.value]}
        onValueChange={onValueChange}
        inverted
        rangeClassName="bg-primary"
        thumbClassName="bg-primary"
      />
      <Handle type="source" position={Position.Right} />
    </Wrapper>
  );
}
