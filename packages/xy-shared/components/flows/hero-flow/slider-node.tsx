import { useCallback } from 'react';
import { Node, NodeProps, Position, useReactFlow } from '@xyflow/react';
import { Slider } from '../../../components/ui/slider';

import Handle from './handle';
import Wrapper from './node-wrapper';

const min = 0;
const max = 40;

export type SliderNode = Node<{ label: string; value: number }>;

export default function SliderNode({ data, id }: NodeProps<SliderNode>) {
  const { updateNodeData } = useReactFlow();
  const onValueChange = useCallback(
    (values: number[]) => updateNodeData(id, { value: values[0] }),
    [id, updateNodeData],
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
