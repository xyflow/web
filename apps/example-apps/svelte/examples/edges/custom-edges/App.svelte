<script lang="ts">
  import { writable } from 'svelte/store';
  import { SvelteFlow, Background, ConnectionMode, type Node, type Edge } from '@xyflow/svelte';

  import '@xyflow/svelte/dist/style.css';

  import { initialNodes, initialEdges } from './nodes-and-edges';

  import ButtonEdge from './ButtonEdge.svelte';
  import BiDirectionalEdge from './BiDirectionalEdge.svelte';
  import BiDirectionalNode from './BiDirectionalNode.svelte';
  import SelfConnectingEdge from './SelfConnectingEdge.svelte';

  const nodes = writable<Node[]>(initialNodes);
  const edges = writable<Edge[]>(initialEdges);

  const nodeTypes = {
    biDirectional: BiDirectionalNode
  };

  const edgeTypes = {
    buttonEdge: ButtonEdge,
    biDirectional: BiDirectionalEdge,
    selfConnecting: SelfConnectingEdge
  };
</script>

<div style="height:100vh;">
  <SvelteFlow {nodes} {nodeTypes} {edges} {edgeTypes} connectionMode={ConnectionMode.Loose} fitView>
    <Background />
  </SvelteFlow>
</div>
