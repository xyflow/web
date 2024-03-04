<script lang="ts">
  import {
    Handle,
    Position,
    useHandleConnections,
    useNodesData,
    useSvelteFlow,
    type NodeProps
  } from '@xyflow/svelte';

  type $$Props = NodeProps;

  export let id: $$Props['id'];

  const { updateNodeData } = useSvelteFlow();
  const connections = useHandleConnections({
    nodeId: id,
    type: 'target'
  });

  $: nodeData = useNodesData($connections[0]?.source);

  $: console.log($nodeData);

  $: {
    updateNodeData(id, { text: $nodeData?.data?.text?.toUpperCase() || '' });
  }
</script>

<div class="custom">
  <Handle type="target" position={Position.Left} isConnectable={$connections.length === 0} />
  <div>uppercase transform</div>
  <Handle type="source" position={Position.Right} />
</div>

<style>
  .custom {
    background-color: #eee;
    padding: 10px;
    border-radius: 10px;
    font-size: 12px;
  }
</style>
