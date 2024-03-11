import { memo } from 'react';
import { NodeProps, Position, useReactFlow } from '@xyflow/react';
import { Text } from '@xyflow/xy-ui';

import Handle from './handle';
import Wrapper from './node-wrapper';

export default memo(({ data, id }: NodeProps) => {
  const { updateNodeData } = useReactFlow();

  return (
    <Wrapper label={data.label}>
      <div className="flex items-center space-x-2">
        <input
          className="nodrag border-md w-6 h-6"
          type="color"
          onChange={(evt) => updateNodeData(id, { value: evt.target.value })}
          defaultValue={data.value}
        />
        <Text size="xs" variant="light">
          {data.value}
        </Text>
      </div>
      <Handle type="source" position={Position.Right} />
    </Wrapper>
  );
});
