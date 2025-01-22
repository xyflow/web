<script lang="ts">
  import { T, useThrelte, useTask } from '@threlte/core';
  import { flowState } from './nodes-and-edges.svelte';

  const { camera } = useThrelte();

  const randomVector: (r: number) => [x: number, y: number, z: number] = (
    r: number,
  ) => [
    r / 2 - Math.random() * r,
    r / 2 - Math.random() * r,
    r / 2 - Math.random() * r,
  ];

  const randomEuler: () => [x: number, y: number, z: number] = () => [
    Math.random() * Math.PI,
    Math.random() * Math.PI,
    Math.random() * Math.PI,
  ];

  const NUMBER_OF_OBJECTS = 150;

  const randomAssets = Array.from(
    { length: NUMBER_OF_OBJECTS },
    (r: number = 10) => ({
      random: Math.random(),
      position: randomVector(r),
      rotation: randomEuler(),
    }),
  );

  $effect(() => {
    $camera.position.set(0, 0, +flowState.zoom);
  });

  let t: number = $state(0.0);
  useTask((delta) => {
    t += delta;
  });
</script>

<T.PerspectiveCamera
  makeDefault
  on:create={({ ref }) => {
    ref.lookAt(0, 0, 0);
  }}
/>

<T.AmbientLight intensity={0.5} />
<T.DirectionalLight intensity={3} position={[0, 0, 100]} />

{#each randomAssets as asset}
  <T.Mesh
    position={asset.position}
    rotation={[
      asset.rotation[0] + Math.cos((t * asset.random) / 1.5) / 2,
      asset.rotation[1] + Math.sin(t * asset.random) / 2,
      asset.rotation[2] + Math.cos((t * asset.random) / 1.5) / 2,
    ]}
  >
    {#if flowState.shape === 'cube'}
      <T.BoxGeometry args={[1, 1, 1]} />
    {:else if flowState.shape === 'pyramid'}
      <T.TetrahedronGeometry args={[1, 0]} />
    {/if}
    <T.MeshLambertMaterial color={flowState.color} toneMapped={false} />
  </T.Mesh>
{/each}
