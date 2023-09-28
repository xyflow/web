import React from 'react';
import { Position } from 'reactflow';

import { RadioGroup, RadioGroupItem, Label, cn } from 'xy-ui';
import Handle from './handle';
import Wrapper from './node-wrapper';

export default function SwitcherNode({ data }) {
  const {
    label = '',
    options = [],
    onChange = () => {},
    value,
    variant,
  } = data;

  return (
    <Wrapper label={label}>
      <Handle type="source" position={Position.Right} />
      <RadioGroup value={value} onValueChange={onChange}>
        {options.map((option) => (
          <div className="flex items-center space-x-2 nodrag" key={option}>
            <RadioGroupItem
              value={option}
              id={option}
              className={cn(`text-${variant} border-${variant}`)}
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
