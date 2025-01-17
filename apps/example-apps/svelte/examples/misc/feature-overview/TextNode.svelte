<script lang="ts">
  import {
    type NodeProps,
    Handle,
    Position,
    useNodeConnections,
    useInternalNode,
    type BuiltInNode,
    type Dimensions,
    useNodes,
  } from '@xyflow/svelte';

  let {}: NodeProps<BuiltInNode> = $props();

  const nodes = useNodes();

  const handleConnections = useNodeConnections({
    handleType: 'target',
  });

  let connectedNode = useInternalNode(handleConnections.current[0]?.source);
  let dimensions: null | Dimensions = $derived.by(() => {
    if (
      connectedNode.current?.measured.width &&
      connectedNode.current.measured.height
    ) {
      return {
        width: connectedNode.current.measured.width,
        height: connectedNode.current.measured.height,
      };
    }
    return null;
  });

  const updateDimension = (attr: string) => (event) => {
    nodes.update((nds) =>
      nds.map((n) => {
        if (n.id === '2-3') {
          return {
            ...n,
            [attr]: parseInt(event.target.value),
          };
        }

        return n;
      }),
    );
  };
</script>

{#each ['width', 'height'] as attr}
  <label>node {attr}</label>
  <input
    type="number"
    value={dimensions ? parseInt(dimensions[attr]) : 0}
    onchange={updateDimension(attr)}
    class="text-input-node__input nodrag"
    disabled={!dimensions}
  />
{/each}

{#if dimensions === null}
  no node connected
{/if}
<Handle type="target" position={Position.Top} class="custom-handle" />
