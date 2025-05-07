<script lang="ts">
  import {
    type NodeProps,
    Handle,
    Position,
    useNodeConnections,
    useInternalNode,
    type BuiltInNode,
    type Dimensions
  } from '@xyflow/svelte';

  import { nodes } from './nodes-and-edges';

  type $$Props = NodeProps<BuiltInNode>;
  $$restProps;

  $: handleConnections = useNodeConnections({
    handleType: 'target'
  });

  $: connectedNode = useInternalNode($handleConnections[0]?.source);
  let dimensions: null | Dimensions = null;

  $: {
    if ($connectedNode?.measured.width && $connectedNode?.measured.height) {
      dimensions = {
        width: $connectedNode.measured.width,
        height: $connectedNode.measured.height
      };
    } else {
      dimensions = null;
    }
  }

  const updateDimension = (attr: string) => (event) => {
    nodes.update((nds) =>
      nds.map((n) => {
        if (n.id === '2-3') {
          return {
            ...n,
            [attr]: parseInt(event.target.value)
          };
        }

        return n;
      })
    );

    $nodes = $nodes;
  };
</script>

<div class="wrapper gradient">
  <div class="inner">
    {#each ['width', 'height'] as attr}
      <label>node {attr}</label>
      <input
        type="number"
        value={dimensions ? parseInt(dimensions[attr]) : 0}
        on:change={updateDimension(attr)}
        class="nodrag"
        disabled={!dimensions}
      />
    {/each}

    {#if dimensions === null}
      no node connected
    {/if}
  </div>
</div>
<Handle type="target" position={Position.Top} />
