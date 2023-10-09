<script lang="ts">
  import { Handle, Position } from '@xyflow/svelte';
  import type { HandleType } from '@xyflow/system';

  export let type: HandleType;
  export let position: Position;
</script>

<Handle {type} {position} />
