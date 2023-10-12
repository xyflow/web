<script lang="ts">
  import { Position, type NodeProps, Handle, useEdges } from '@xyflow/svelte';
  type $$Props = NodeProps;

  export let id: $$Props['id'];

  const edges = useEdges();
  let isConnectable = true;

  $: isConnectable = $edges.filter((edge) => edge.target === id || edge.source === id).length < 1;
</script>

<div class="customNode">
  <Handle type="target" position={Position.Left} {isConnectable} />
  <div>Connection Limit 1</div>
</div>

<style>
  .customNode {
    padding: 16px;
    border: 1px solid black;
  }
</style>
