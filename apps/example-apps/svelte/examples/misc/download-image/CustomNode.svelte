<script lang="ts">
  import { Handle, Position, type NodeProps } from '@xyflow/svelte';

  let { data, isConnectable }: NodeProps = $props();
</script>

<!-- import React, { memo } from 'react';
import { Handle, Position } from '@xyflow/react';

export default memo(({ data, isConnectable }) => {
  return (
    <>
      <Handle
        type="target"
        position={Position.Left}
        onConnect={(params) => console.log('handle onConnect', params)}
        isConnectable={isConnectable}
      />
      <div>▼</div>

      <Handle
        type="source"
        position={Position.Right}
        id="a"
        style={{ top: 5 }}
        isConnectable={isConnectable}
      />
      <Handle
        type="source"
        position={Position.Right}
        id="b"
        style={{ bottom: 5, top: 'auto' }}
        isConnectable={isConnectable}
      />
    </>
  );
}); -->

<Handle type="target" position={Position.Left} {isConnectable} />

<div>▼</div>
<Handle
  type="source"
  position={Position.Right}
  id="a"
  style="top:5px"
  {isConnectable}
/>
<Handle
  type="source"
  position={Position.Right}
  id="b"
  style="bottom:5px; top:auto"
  {isConnectable}
/>
