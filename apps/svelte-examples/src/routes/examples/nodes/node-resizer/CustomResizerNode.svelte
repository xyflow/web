<script lang="ts">
  import { Handle, Position, type NodeProps, NodeResizeControl } from '@xyflow/svelte';

  type $$Props = NodeProps;

  export let data: $$Props['data'] = undefined;
</script>

<NodeResizeControl minWidth={100} minHeight={5} style="background: transparent; border: none;">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    stroke-width="2"
    stroke="rgb(255, 64, 0)"
    fill="none"
    stroke-linecap="round"
    stroke-linejoin="round"
    style="position: absolute; right: 5px; bottom: 5px;"
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <polyline points="16 20 20 20 20 16" />
    <line x1="14" y1="14" x2="20" y2="20" />
    <polyline points="8 4 4 4 4 8" />
    <line x1="4" y1="4" x2="10" y2="10" />
  </svg>
</NodeResizeControl>
<Handle type="target" position={Position.Left} />
<div>{data.label}</div>
<Handle type="source" position={Position.Right} />
