import { useCallback } from 'react';
import { NodeProps, Position, useReactFlow } from '@xyflow/react';
import { RadioGroup, RadioGroupItem, Label } from '@xyflow/xy-ui';

import Handle from './handle';
import Wrapper from './node-wrapper';

const options = ['cube', 'pyramid'];

export default function SwitcherNode({ id, data }: NodeProps) {
  const { updateNodeData } = useReactFlow();
  const onValueChange = useCallback(
    (value: string) => updateNodeData(id, { value }),
    [],
  );

  return (
    <Wrapper label={data.label}>
      <Handle type="source" position={Position.Right} />
      <RadioGroup value={data.value} onValueChange={onValueChange}>
        {options.map((option: any) => (
          <div className="flex items-center space-x-2 nodrag" key={option}>
            <RadioGroupItem
              value={option}
              id={option}
              className="text-primary border-primary"
            />
            <Label
              htmlFor={option}
              className="cursor-pointer text-light text-xs"
            >
              {option}
            </Label>
          </div>
        ))}
      </RadioGroup>
    </Wrapper>
  );
}
