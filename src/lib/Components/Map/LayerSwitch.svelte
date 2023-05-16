<script lang="ts">
  import { onDestroy } from "svelte";
  import { reorderTnrisLayers } from "../../Api/Geos/tnrisMapLayers";
  import Switch from "../General/Switch.svelte";
  import mapStore from "./mapStore";
  import type { MapLayer } from "../../Api/Geos/tnrisMapLayers";

  export let checked: boolean = false;

  export let mapLayer: MapLayer = {
    id: null,
    source: null,
    layer: null,
  };

  const toggleLayer = () => {
    if ($mapStore == undefined || $mapStore == null) {
      return;
    }
    if (checked == true) {
      if ($mapStore.getLayer(mapLayer?.layer?.id) == undefined) {
        $mapStore.addSource(mapLayer?.layer?.id, mapLayer?.source);
        $mapStore.addLayer(mapLayer?.layer);
        reorderTnrisLayers($mapStore);
      }
    }
    if (checked == false) {
      if ($mapStore.getLayer(mapLayer?.layer?.id) !== undefined) {
        $mapStore.removeLayer(mapLayer?.layer?.id);
        $mapStore.removeSource(mapLayer?.layer?.id);
      }
    }
    let layers = $mapStore.getStyle().layers;
    //console.log(layers.filter((v) => v.id.includes("tnris")));
  };

  $: {
    if (checked || !checked) {
      toggleLayer();
    }
  }

  onDestroy(() => {
    //console.log("LayerSwitch removed")
    if ($mapStore.getLayer(mapLayer?.layer?.id) !== undefined) {
      $mapStore.removeLayer(mapLayer?.layer?.id);
      $mapStore.removeSource(mapLayer?.layer?.id);
    }
  });
</script>

<div class="layer-switch">
  <span class="switch-label"><slot /></span>
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
