<script lang="ts">
  export let id: number;
  export let top: number;
  export let left: number;
  export let right: number;
  export let bottom: number;

  function duplicateNode() {}

  function deleteNode() {}
</script>

<div
  style={`top: ${top}px; left: ${left}px; right: ${right}px; bottom: ${bottom}px;`}
  class="context-menu"
>
  <p style="margin: 0.5em;">
    <small>node: {id}</small>
  </p>
  <button on:click={duplicateNode}>duplicate</button>
  <button on:click={deleteNode}>delete</button>
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
