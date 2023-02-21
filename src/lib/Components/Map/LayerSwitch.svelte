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
    if (checked) {
      $mapStore.addSource(mapLayer.id, mapLayer.source);
      $mapStore.addLayer(mapLayer.layer);
      reorderTnrisLayers($mapStore);
    }
    if (checked == false) {
      $mapStore.removeLayer(mapLayer?.layer?.id);
      $mapStore.removeSource(mapLayer.id, mapLayer.source);
    }
    let layers = $mapStore.getStyle().layers;
    //console.log(layers.filter((v) => v.id.includes("tnris")));
  };

  onDestroy(() => {
    if ($mapStore) {
      const src = $mapStore.getSource(mapLayer.id);
      const lyr = $mapStore.getLayer(mapLayer?.layer?.id);

      if (lyr !== undefined && lyr !== null) {
        $mapStore.removeLayer(mapLayer?.layer?.id);
      }
      if (src !== undefined && src !== null) {
        $mapStore.removeSource(mapLayer.id);
      }
    }
  });

  $: {
    if (checked || !checked) {
      toggleLayer();
    }
  }
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
