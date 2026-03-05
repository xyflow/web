import { useCallback } from 'react';
import { Node, NodeProps, Position, useReactFlow } from '@xyflow/react';
import { RadioGroup, RadioGroupItem } from '../../../components/ui/radio-group';
import { Label } from '../../../components/ui/label';

import Handle from './handle';
import Wrapper from './node-wrapper';

const options = [
  { label: 'cube', value: 'cube' },
  { label: 'pyramid', value: 'tetrahedron' },
];

export type SwitcherNode = Node<{
  label: 'cube' | 'pyramid';
  value: 'cube' | 'tetrahedron';
}>;

export default function SwitcherNode({ id, data }: NodeProps<SwitcherNode>) {
  const { updateNodeData } = useReactFlow();
  const onValueChange = useCallback(
    (value: string) => updateNodeData(id, { value }),
    [id, updateNodeData],
  );

  return (
    <Wrapper label={data.label}>
      <Handle type="source" position={Position.Right} />
      <RadioGroup value={data.value} onValueChange={onValueChange}>
        {options.map((option) => (
          <div className="flex items-center space-x-2 nodrag" key={option.value}>
            <RadioGroupItem
              value={option.value}
              id={option.value}
              className="text-primary border-primary"
            />
            <Label htmlFor={option.value} className="cursor-pointer text-light text-xs">
              {option.label}
            </Label>
          </div>
        ))}
      </RadioGroup>
    </Wrapper>
  );
}
