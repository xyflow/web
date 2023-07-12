import { memo } from 'react';
import { Position } from 'reactflow';

import Handle from './handle';
import Wrapper from './node-wrapper';

export default memo(({ data }: { data: any }) => {
  const { label = '', onChange = () => {}, color = '#000' } = data;

  return (
    <Wrapper label={label}>
      <div className="pl-1 pr-2">
        <div>
          <input
            className="nodrag"
            type="color"
            onChange={(evt) => onChange(evt.target.value)}
            defaultValue={color}
          />
        </div>
      </div>
      <Handle type="source" position={Position.Right} />
    </Wrapper>
  );
});
