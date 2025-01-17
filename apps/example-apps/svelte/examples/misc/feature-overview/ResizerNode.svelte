<script lang="ts">
  import {
    Handle,
    NodeResizer,
    Position,
    type NodeProps,
  } from '@xyflow/svelte';

  let { data }: NodeProps = $props();
</script>

<NodeResizer minWidth={1} minHeight={1} />
<Handle type="target" position={Position.Left} class="custom-handle" />
<div>{data.label}</div>
<div class="resizer-node__handles">
  <Handle
    class="resizer-node__handle custom-handle"
    id="a"
    type="source"
    position={Position.Bottom}
  />
  <Handle
    class="resizer-node__handle custom-handle"
    id="b"
    type="source"
    position={Position.Bottom}
  />
</div>
