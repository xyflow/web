<script lang="ts">
  import { Handle, NodeResizer, Position, type NodeProps } from '@xyflow/svelte';

  type $$Props = NodeProps;

  export let data: $$Props['data'];
  $$restProps;
</script>

<NodeResizer minWidth={100} minHeight={30} />
<Handle type="target" position={Position.Left} />
<div style="padding: 10px">{data.label}</div>

<div
  style="display: flex;position: absolute;bottom: 0;width: 100%; justify-content: space-evenly;left: 0;"
>
  <Handle
    style="position: relative'; left: 0; transform: none"
    id="a"
    type="source"
    position={Position.Bottom}
  />
  <Handle
    style="position: relative'; left: 0; transform: none"
    id="b"
    type="source"
    position={Position.Bottom}
  />
</div>
