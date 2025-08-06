<script lang="ts">
  import {
    SvelteFlow,
    Background,
    type Node,
    type Edge,
    type OnBeforeDelete,
    getIncomers,
    getOutgoers,
    getConnectedEdges,
  } from '@xyflow/svelte';

  import '@xyflow/svelte/dist/style.css';

  import { initialNodes, initialEdges } from './nodes-and-edges';

  let nodes = $state.raw<Node[]>(initialNodes);
  let edges = $state.raw<Edge[]>(initialEdges);

  const onbeforedelete: OnBeforeDelete = async ({ nodes: deletedNodes, edges: _edges }) => {
    let remainingNodes = [...nodes]; 
    
    edges = deletedNodes.reduce((acc, node) => {
      const incomers = getIncomers(node, remainingNodes, acc);
      const outgoers = getOutgoers(node, remainingNodes, acc);
      const connectedEdges = getConnectedEdges([node], acc);

      const remainingEdges = acc.filter((edge) => !connectedEdges.includes(edge));

      const createdEdges = incomers.flatMap(({ id: source }) =>
        outgoers.map(({ id: target }) => ({
          id: `${source}->${target}`,
          source,
          target,
        })),
      );

      remainingNodes = remainingNodes.filter((rn) => rn.id !== node.id);

      return [...remainingEdges, ...createdEdges];
    }, edges);

    nodes = remainingNodes;

    return true;
  };
</script>

<SvelteFlow bind:nodes bind:edges {onbeforedelete} fitView>
  <Background />
</SvelteFlow>
