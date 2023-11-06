import { useCallback } from 'react';
import { Position } from 'reactflow';
import { RadioGroup, RadioGroupItem, Label, cn } from '@xyflow/xy-ui';

import Handle from './handle';
import Wrapper from './node-wrapper';

const options = ['cube', 'pyramid'];

export default function SwitcherNode({ data }: { data: any }) {
  const { label = '', setState = () => {}, shape } = data;

  const onValueChange = useCallback((val: string) => {
    setState((state: any) => ({ ...state, shape: val }));
  }, []);

  return (
    <Wrapper label={label}>
      <Handle type="source" position={Position.Right} />
      <RadioGroup value={shape} onValueChange={onValueChange}>
        {options.map((option: any) => (
          <div className="flex items-center space-x-2 nodrag" key={option}>
            <RadioGroupItem
              value={option}
              id={option}
              className={cn(`text-primary border-primary`)}
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
