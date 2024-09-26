<script lang="ts">
  import { Handle, NodeResizer, Position, type NodeProps } from '@xyflow/svelte';

  type $$Props = NodeProps;

  export let data: $$Props['data'] = undefined;
  export let selected: $$Props['selected'] = undefined;
</script>

<NodeResizer minWidth={100} minHeight={30} isVisible={selected} color="rgb(255, 64, 0)" } />
<Handle type="target" position={Position.Left} />
<div style="padding: 10px">{data.label}</div>
<Handle type="source" position={Position.Right} />
