<script lang="ts">
  import { Handle, Position, useNodes, type NodeProps } from '@xyflow/svelte';

  const options = [
    {
      value: 'smoothstep',
      label: 'Smoothstep'
    },
    {
      value: 'step',
      label: 'Step'
    },
    {
      value: 'default',
      label: 'Bezier (default)'
    },
    {
      value: 'straight',
      label: 'Straight'
    }
  ];

  type $$Props = NodeProps;

  export let data: $$Props['data'];
  export let id: $$Props['id'];

  const nodes = useNodes();

  function handleInput(evt: InputEvent, handleId: string) {
    nodes.set(
      Array.from($nodes.values()).map((node) => {
        if (node.id === id) {
          node.data = {
            ...node.data,
            selects: {
              ...node.data.selects,
              [handleId]: evt.target?.value
            }
          };
        }

        return node;
      })
    );
  }
</script>

<div class="custom">
  <div class="custom-node__header">
    This is a <strong>custom node</strong>
  </div>
  <div class="custom-node__body">
    {#each Object.entries(data.selects) as [handleId, value]}
      <div class="custom-node__select">
        <div>Edge Type</div>
        <select
          class="nodrag"
          bind:value
          on:input={(e) => {
            handleInput(e, handleId);
          }}
        >
          {#each options as option}
            <option value={option.value}>
              {option.label}
            </option>
          {/each}
        </select>
        <Handle
          type="source"
          position={Position.Right}
          id={handleId}
          on:connect
          on:connectend
          on:connectstart
        />
      </div>
    {/each}
  </div>
</div>

<style>
  :global(.svelte-flow__node-custom) {
    font-size: 10px;
    width: 180px;
    background: #f5f5f6;
    color: #222;
    box-shadow:
      0 4px 6px -1px rgb(0 0 0 / 15%),
      0 2px 4px -1px rgb(0 0 0 / 8%);
    border-radius: 2px;
  }

  :global(.svelte-flow__node-custom .svelte-flow__handle) {
    top: 24px;
    right: -15px;
    width: 6px;
    height: 10px;
    border-radius: 2px;
    background-color: #778899;
  }

  :global(.custom-node__header) {
    padding: 8px 10px;
    border-bottom: 1px solid #e2e8f0;
  }

  :global(.custom-node__body) {
    padding: 10px;
  }

  :global(.custom-node__select) {
    position: relative;
    margin-bottom: 10px;
  }

  :global(.custom-node__select select) {
    width: 100%;
    margin-top: 5px;
    font-size: 10px;
  }
</style>
