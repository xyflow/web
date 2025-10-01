<script lang="ts">
  import { useEdges, useNodes, useSvelteFlow } from '@xyflow/svelte';

  let {
    id,
    top,
    left,
    right,
    bottom,
    onclick,
  }: {
    id: string;
    top: number | undefined;
    left: number | undefined;
    right: number | undefined;
    bottom: number | undefined;
    onclick: () => void;
  } = $props();

  const { deleteElements } = useSvelteFlow();

  const nodes = useNodes();

  function duplicateNode() {
    const node = nodes.current.find((node) => node.id === id);
    if (node) {
      nodes.current = [
        ...nodes.current,
        {
          ...node,
          // You should use a better id than this in production
          id: `${id}-copy${Math.random()}`,
          position: {
            x: node.position.x,
            y: node.position.y + 50,
          },
        },
      ];
    }
  }

  function deleteNode() {
    deleteElements({ nodes: [{ id }] });
  }
</script>

<div
  style="top: {top}px; left: {left}px; right: {right}px; bottom: {bottom}px;"
  class="context-menu"
  {onclick}
  onpointerdown={(e) => e.stopPropagation()}
>
  <p style="margin: 0.5em;">
    <small>node: {id}</small>
  </p>
  <button onclick={duplicateNode}>duplicate</button>
  <button onclick={deleteNode}>delete</button>
</div>

<style>
  .context-menu {
    background: white;
    border-style: solid;
    box-shadow: 10px 19px 20px rgba(0, 0, 0, 10%);
    position: absolute;
    z-index: 10;
  }

  .context-menu button {
    border: none;
    display: block;
    padding: 0.5em;
    text-align: left;
    width: 100%;
  }

  .context-menu button:hover {
    background: white;
  }
</style>
