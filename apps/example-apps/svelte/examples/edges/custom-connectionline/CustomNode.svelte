<script lang="ts">
  import { Handle, Position, type NodeProps } from '@xyflow/svelte';

  let { isConnectable }: NodeProps = $props();

  const DEFAULT_HANDLE_STYLE = 'width: 10px; height: 10px; bottom: -5px;';
</script>

<div style="background: #DDD; padding: 25px">
  <div>Node</div>
  <Handle
    id="red"
    type="source"
    position={Position.Bottom}
    style="{DEFAULT_HANDLE_STYLE}; left: 15%; background: red;"
    {isConnectable}
  />
  <Handle
    id="blue"
    type="source"
    position={Position.Bottom}
    style="{DEFAULT_HANDLE_STYLE}; left: 50%; background: blue;"
    {isConnectable}
  />
  <Handle
    id="orange"
    type="source"
    position={Position.Bottom}
    style="{DEFAULT_HANDLE_STYLE}; left: 85%; background: orange;"
    {isConnectable}
  />
</div>
