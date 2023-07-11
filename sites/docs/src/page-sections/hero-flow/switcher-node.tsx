import React from 'react';
import { Position } from 'reactflow';

import Handle from './handle';
import Wrapper from './node-wrapper';

export default function SwitcherNode({ data }) {
  const { label = '', options = [], onChange = () => {}, value } = data;

  return (
    <Wrapper label={label}>
      <Handle type="source" position={Position.Right} />
      todo
      {/* <RadioGroup fontFamily="mono" value={value} onChange={onChange}>
        <Stack direction="row">
          {options.map((option) => (
            <Radio size="sm" key={option} value={option}>
              <Text fontSize="11" fontFamily="mono" as="span">
                {option}
              </Text>
            </Radio>
          ))}
        </Stack>
      </RadioGroup> */}
    </Wrapper>
  );
}
