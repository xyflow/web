<script lang="ts">
  import { SvelteFlow } from '@xyflow/svelte';
  import type { Edge, Node } from '@xyflow/svelte';
  import { writable } from 'svelte/store';

  import '@xyflow/svelte/dist/style.css';

  import { initialNodes, initialEdges } from './nodes-and-edges';

  const nodes = writable<Node[]>(initialNodes);
  const edges = writable<Edge[]>(initialEdges);

  const MIN_DISTANCE = 150;

  function getClosestEdge(node: Node, nodes: Node[]) {
    const closestNode = nodes.reduce(
      (res, n) => {
        if (n.id !== node.id) {
          const dx = n.positionAbsolute.x - node.positionAbsolute.x;
          const dy = n.positionAbsolute.y - node.positionAbsolute.y;
          const d = Math.sqrt(dx * dx + dy * dy);

          if (d < res.distance && d < MIN_DISTANCE) {
            res.distance = d;
            res.node = n;
          }
        }

        return res;
      },
      <{ distance: number; node: Node | null }>{
        distance: Number.MAX_VALUE,
        node: null
      }
    );

    if (!closestNode.node) {
      return null;
    }

    const closeNodeIsSource = closestNode.node.positionAbsolute.x < node.positionAbsolute.x;

    return {
      id: closeNodeIsSource
        ? `${node.id}-${closestNode.node.id}`
        : `${closestNode.node.id}-${node.id}`,
      source: closeNodeIsSource ? closestNode.node.id : node.id,
      target: closeNodeIsSource ? node.id : closestNode.node.id,
      class: 'temp'
    };
  }

  function onNodeDrag({ detail: { node } }) {
    const closestEdge = getClosestEdge(node, $nodes);

    let edgeAlreadyExists = false;
    $edges.forEach((edge, i) => {
      if (edgeAlreadyExists) {
        return;
      }

      if (closestEdge) {
        // non-temporary edge already exists
        if (edge.source === closestEdge.source && edge.target === closestEdge.target) {
          edgeAlreadyExists = true;
          return;
        }

        if (edge.class !== 'temp') {
          return;
        }

        if (edge.source !== closestEdge.source || edge.target !== closestEdge.target) {
          $edges[i] = closestEdge; // replace the edge
          edgeAlreadyExists = true;
        }
      } else if (edge.class === 'temp') {
        $edges.splice(i, 1); // remove edge
      }
    });

    if (closestEdge && !edgeAlreadyExists) {
      $edges.push(closestEdge);
    }

    $edges = $edges;
  }

  function onNodeDragStop() {
    $edges.forEach((edge) => {
      if (edge.class === 'temp') {
        edge.class = '';
      }
    });
    $edges = $edges;
  }
</script>

<div style="height:100vh;">
  <SvelteFlow {nodes} {edges} fitView on:nodedrag={onNodeDrag} on:nodedragstop={onNodeDragStop}
  ></SvelteFlow>
</div>

<style>
  :global(.svelte-flow__edge-path) {
    stroke: #333;
    stroke-width: 2;
  }

  :global(.temp .svelte-flow__edge-path) {
    stroke: #bbb;
    stroke-dasharray: 5 5;
  }

  :global(.svelte-flow__node) {
    border-radius: 100%;
    background-color: #fff;
    width: 50px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
