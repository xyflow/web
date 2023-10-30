<script lang="ts">
  import { toPng } from 'html-to-image';
  import { Panel, getRectOfNodes, getTransformForBounds, useNodes } from '@xyflow/svelte';

  const nodes = useNodes();

  const imageWidth = 1024;
  const imageHeight = 768;

  function handleClick() {
    const nodesBounds = getRectOfNodes($nodes);
    const transform = getTransformForBounds(nodesBounds, imageWidth, imageHeight, 0.5, 2.0, 0.2);

    const viewport = document.querySelector<HTMLElement>('.svelte-flow__viewport');

    if (viewport) {
      toPng(viewport, {
        backgroundColor: '#1a365d',
        width: imageWidth,
        height: imageHeight,
        style: {
          width: `${imageWidth}px`,
          height: `${imageHeight}px`,
          transform: `translate(${transform[0]}px, ${transform[1]}px) scale(${transform[2]})`
        }
      }).then((dataUrl) => {
        const link = document.createElement('a');
        link.download = 'svelte-flow.png';
        link.href = dataUrl;
        link.click();
      });
    }
  }
</script>

<Panel position="top-right">
  <button on:click={handleClick}>Download Image</button>
</Panel>
