<script lang="ts">
  import LayerSwitch from "./LayerSwitch.svelte";
</script>

<div id="map-previews">
  <LayerSwitch>Imagery Layer</LayerSwitch>
</div>

<style lang="scss">
  #map-previews {
    position: absolute;
    top: 0.5rem;
    left: 0.5rem;
    display: grid;
    padding: 0.5rem;
    border: 1px solid $borderColor;
    z-index: 999999;
    background: white;
    width: fit-content;
    min-width: 40px;
    height: fit-content;
    border-radius: 0.25rem;
    box-shadow: $boxShadow-xs;
  }
</style>
