<script module>
  import { type Node } from '@xyflow/svelte';

  export type ErasableNodeType = Node<
    {
      toBeDeleted?: boolean;
      label?: string;
    },
    'erasable-node'
  >;
</script>

<script lang="ts">
  import { Handle, Position, type NodeProps } from '@xyflow/svelte';

  let { data, isConnectable }: NodeProps<ErasableNodeType> = $props();
</script>

<div style="opacity: {data.toBeDeleted ? 0.3 : 1}">
  <Handle type="target" position={Position.Top} {isConnectable} />
  <div style="padding: 10px">{data.label}</div>
  <Handle type="source" position={Position.Bottom} {isConnectable} />
</div>
