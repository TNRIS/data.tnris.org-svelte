<script lang="ts">
  import Switch from "../General/Switch.svelte";

  export let checked: boolean = false;
</script>

<div class="layer-switch">
  <span class="switch-label"><slot /> </span>
  <Switch bind:checked />
</div>

<style lang="scss">
  .layer-switch {
    display: grid;
    gap: 0.5rem;
    grid-template-columns: auto 1fr;
    align-items: center;
    justify-content: center;
    height: fit-content;
  }
</style>
