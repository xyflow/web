<script lang="ts">
  import { Canvas } from '@threlte/core';
  import { Handle, type Node, Position, type NodeProps } from '@xyflow/svelte';
  import NodeWrapper from './NodeWrapper.svelte';
  import { type NodeData } from './nodes-and-edges.svelte';
  import ThrelteScene from './ThrelteScene.svelte';

  let { data }: NodeProps<Node<NodeData>> = $props();
</script>

<NodeWrapper label={data.label}>
  <div class="w-full h-[200px] relative p-3">
    <Canvas dpr={2}>
      <ThrelteScene />
    </Canvas>
    <Handle
      type="target"
      position={Position.Left}
      style="top:20px;"
      id="color"
    />
    <Handle
      type="target"
      position={Position.Left}
      style="top:40px;"
      id="shape"
    />
    <Handle
      type="target"
      position={Position.Left}
      style="top:60px;"
      id="zoom"
    />
  </div>
</NodeWrapper>
