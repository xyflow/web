<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { SvelteFlow, Background, Panel, useSvelteFlow } from '@xyflow/svelte';
  import '@xyflow/svelte/dist/style.css';
  import * as d3Force from 'd3-force';
  import collide from './collide.js';

  import { initialNodes, initialEdges } from './nodes-edges.js';
  let nodes = $state.raw([...initialNodes]);
  let edges = $state.raw([...initialEdges]);

  let simulation;
  let running = $state.raw(false);
  let initialized = $state.raw(false);
  let draggingNode = $state.raw(null);

  const { fitView } = $derived(useSvelteFlow());

  onMount(() => {
    // Set up the force simulation
    simulation = d3Force
      .forceSimulation()
      .force('charge', d3Force.forceManyBody().strength(-1000))
      .force('x', d3Force.forceX().x(0).strength(0.05))
      .force('y', d3Force.forceY().y(0).strength(0.05))
      .force('collide', collide())
      .alphaTarget(0.05)
      .stop();

    // Initialize the simulation when the component mounts
    setTimeout(() => {
      initialized = true;
      initializeSimulation();
    }, 500); // Give time for nodes to render with dimensions

    return () => {
      if (simulation) simulation.stop();
    };
  });

  onDestroy(() => {
    if (simulation) {
      simulation.stop();
    }
  });

  function initializeSimulation() {
    if (!simulation || !initialized || nodes.length === 0) return;

    // Create a deep copy of nodes to avoid direct mutation
    let simNodes = nodes.map((node) => ({
      ...node,
      x: node.position.x,
      y: node.position.y,
      measured: {
        width: node.width || 150,
        height: node.height || 40,
      },
    }));

    // Create a deep copy of edges and ensure it has all the necessary properties
    let simEdges = edges.map((edge) => ({
      ...edge,
      source: edge.source,
      target: edge.target,
    }));

    // Reset the simulation with the current nodes and edges
    simulation.nodes(simNodes);
    simulation.force(
      'link',
      d3Force
        .forceLink(simEdges)
        .id((d) => d.id)
        .strength(0.05)
        .distance(100),
    );
  }

  function tick() {
    if (!running) return;

    // Get current simulation nodes
    const simNodes = simulation.nodes();

    // Update dragged node position if applicable
    simNodes.forEach((node, i) => {
      const dragging = draggingNode?.id === node.id;

      // Setting the fx/fy properties of a node tells the simulation to "fix"
      // the node at that position and ignore any forces that would normally
      // cause it to move.
      if (dragging) {
        // Fix the position to the dragged position
        simNodes[i].fx = draggingNode.position.x;
        simNodes[i].fy = draggingNode.position.y;
      } else {
        // Release fixed position
        delete simNodes[i].fx;
        delete simNodes[i].fy;
      }
    });

    // Step the simulation forward
    simulation.tick();

    // Update the nodes with their new positions from the simulation
    // Preserve all the original node data while updating only the position
    nodes = simNodes.map((simNode) => {
      // Find the original node to keep all its properties
      const originalNode = nodes.find((n) => n.id === simNode.id) || {};

      return {
        ...originalNode,
        position: {
          x: simNode.fx ?? simNode.x,
          y: simNode.fy ?? simNode.y,
        },
      };
    });

    // Request next animation frame and fit the view
    window.requestAnimationFrame(() => {
      fitView();
      if (running) tick();
    });
  }

  function toggleLayout() {
    if (!running) {
      // Before starting, update simulation nodes with current positions
      initializeSimulation(); // Reinitialize the simulation

      running = true;
      window.requestAnimationFrame(tick);
    } else {
      running = false;
    }
  }

  function handleNodeDragStart({ targetNode }) {
    draggingNode = event.node;
  }

  function handleNodeDrag({ targetNode }) {
    draggingNode = targetNode;
  }

  function handleNodeDragStop() {
    draggingNode = null;
  }
</script>

<SvelteFlow
  bind:nodes
  bind:edges
  fitView
  onnodedragstart={handleNodeDragStart}
  onnodedrag={handleNodeDrag}
  onnodedragstop={handleNodeDragStop}
>
  <Panel position="top-right">
    <button onclick={toggleLayout}>
      {running ? 'Stop' : 'Start'} force simulation
    </button>
  </Panel>
  <Background />
</SvelteFlow>
