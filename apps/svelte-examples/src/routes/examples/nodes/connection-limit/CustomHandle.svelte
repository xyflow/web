<script lang="ts">
  import {
    Handle,
    Position,
    useSvelteFlow,
    // useEdges,
    useConnection,
    type Node
  } from '@xyflow/svelte';
  import type { HandleType } from '@xyflow/system';

  export let nodeId: string;
  export let type: HandleType;
  export let position: Position;

  const { getConnectedEdges } = useSvelteFlow();

  // const edges = useEdges();
  const connection = useConnection();

  let isConnectable = true;

  // Currently runs on every connection drag
  $: if ($connection.startHandle) {
    const connectedEdges = getConnectedEdges(nodeId);
    console.log(connectedEdges);
  }
</script>

<Handle {type} {position} {isConnectable} />
