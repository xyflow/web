<script lang="ts">
  import { Canvas } from '@threlte/core';
  import { Handle, Position, type NodeProps } from '@xyflow/svelte';
  import NodeWrapper from './NodeWrapper.svelte';
  import type { NodeData } from './nodes-and-edges';
  import ThrelteScene from './ThrelteScene.svelte';

  type $$Props = NodeProps;
  export let data: NodeData;
  const { label, flowState } = data;
</script>

<NodeWrapper {label}>
  <div class="w-full h-[200px]">
    <Canvas dpr={2}>
      <ThrelteScene {flowState} />
    </Canvas>
    <Handle
      type="target"
      position={Position.Left}
      style="top:20px;"
      id="color"
      on:connect
      on:connectend
      on:connectstart
    />
    <Handle
      type="target"
      position={Position.Left}
      style="top:40px;"
      id="shape"
      on:connect
      on:connectend
      on:connectstart
    />
    <Handle
      type="target"
      position={Position.Left}
      style="top:60px;"
      id="zoom"
      on:connect
      on:connectend
      on:connectstart
    />
  </div>
</NodeWrapper>
