<script lang="ts">
  import { SvelteFlow, Background, Controls, MiniMap } from '@xyflow/svelte';
  import type { NodeTypes, Node } from '@xyflow/svelte';
  import { writable } from 'svelte/store';

  import { nodes as initialNodes, edges as initialEdges } from './initial-nodes';

  import CustomNode from './CustomNode.svelte';

  import '@xyflow/svelte/dist/style.css';
  // import './overview.css';

  const nodes = writable<Node[]>(initialNodes);
  const edges = writable(initialEdges);

  // FIXME: impossible to get the Type right
  const nodeTypes: NodeTypes = {
    custom: CustomNode
  };

  // we are using a bit of a shortcut here to adjust the edge type
  // this could also be done with a custom edge for example
  $: {
    $edges.forEach((edge) => {
      if (edge.sourceHandle) {
        const edgeType = $nodes.find((node) => node.type === 'custom')?.data.selects[
          edge.sourceHandle
        ];
        console.log(edgeType);
        edge.type = edgeType;
      }
    });
    $edges = $edges;
  }

  // FIXME The correct edges are definitely set but for some reason changes don't get applied
  $: console.log($edges);
</script>

<div style="height:100vh;">
  <SvelteFlow {nodes} {edges} {nodeTypes} fitView>
    <Background />
    <Controls />
    <MiniMap />
  </SvelteFlow>
</div>

<style>
  :global(.custom-style) {
    background: #63b3ed;
    color: white;
    width: 100;
  }

  :global(.circle) {
    background: #2b6cb0;
    color: white;
    border-radius: 50%;
    width: 60px;
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 700;
  }

  :global(.annotation) {
    border-radius: 0;
    text-align: left;
    background: white;
    border: none;
    line-height: 1.4;
    width: 225px;
    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 15%), 0 2px 4px -1px rgb(0 0 0 / 8%);
  }

  :global(.annotation .svelte-flow__handle) {
    display: none;
  }
</style>
