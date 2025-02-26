<script lang="ts">
  import { SvelteFlow, Background, type Node, type Edge } from '@xyflow/svelte';

  import '@xyflow/svelte/dist/style.css';

  import { initialNodes, initialEdges } from './nodes-and-edges.svelte';
  import ColorPickerNode from './ColorPickerNode.svelte';
  import SliderNode from './SliderNode.svelte';
  import ThrelteNode from './ThrelteNode.svelte';
  import SwitcherNode from './SwitcherNode.svelte';

  let nodes = $state.raw<Node[]>(initialNodes);
  let edges = $state.raw<Edge[]>(initialEdges);

  const nodeTypes = {
    colorpicker: ColorPickerNode,
    slider: SliderNode,
    hero: ThrelteNode,
    switcher: SwitcherNode,
  };
</script>

<SvelteFlow bind:nodes {nodeTypes} bind:edges fitView>
  <Background />
</SvelteFlow>
