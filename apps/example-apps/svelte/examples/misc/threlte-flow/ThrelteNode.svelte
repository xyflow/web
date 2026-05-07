<script lang="ts">
  import { Canvas } from '@threlte/core';
  import { Handle, type Node, Position, type NodeProps } from '@xyflow/svelte';
  import NodeWrapper from './NodeWrapper.svelte';
  import { type NodeData } from './nodes-and-edges.svelte';
  import ThrelteScene from './ThrelteScene.svelte';

  let { data }: NodeProps<Node<NodeData>> = $props();
</script>

<NodeWrapper label={data.label}>
  <div class="w-[200px] h-[200px] relative p-2">
    <div class="threlte-canvas-container w-full h-full rounded-xl overflow-hidden">
      <Canvas dpr={2}>
        <ThrelteScene />
      </Canvas>
    </div>
    <Handle
      type="target"
      position={Position.Left}
      class="w-[10px] h-[10px] border-none bg-gray-400 top-[20px]"
      id="color"
    />
    <Handle
      type="target"
      position={Position.Left}
      class="w-[10px] h-[10px] border-none bg-gray-400 top-[40px]"
      id="shape"
    />
    <Handle
      type="target"
      position={Position.Left}
      class="w-[10px] h-[10px] border-none bg-gray-400 top-[60px]"
      id="zoom"
    />
  </div>
</NodeWrapper>

<style>
  /* This is important to fix threltes canvas sizing behavior https://github.com/threlte/threlte/issues/1381 */
  .threlte-canvas-container :global(canvas) {
    width: 100% !important;
    height: 100% !important;
  }
</style>
