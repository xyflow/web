<script lang="ts">
  import { writable } from 'svelte/store';
  import { SvelteFlow, Background, type Node, type Edge } from '@xyflow/svelte';

  import '@xyflow/svelte/dist/style.css';

  import { initialNodes, initialEdges } from './nodes-and-edges';
  import ColorPickerNode from './ColorPickerNode.svelte';
  import SliderNode from './SliderNode.svelte';
  import ThrelteNode from './ThrelteNode.svelte';
  import SwitcherNode from './SwitcherNode.svelte';

  const nodes = writable<Node[]>(initialNodes);
  const edges = writable<Edge[]>(initialEdges);

  const nodeTypes = {
    colorpicker: ColorPickerNode,
    slider: SliderNode,
    hero: ThrelteNode,
    switcher: SwitcherNode,
  };
</script>

<SvelteFlow {nodes} {nodeTypes} {edges} fitView>
  <Background />
</SvelteFlow>
