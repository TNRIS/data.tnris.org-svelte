<script lang="ts">
  import type { AnySourceData, Layer } from "mapbox-gl";
  import { mapLayers, type MapLayer } from "../../Api/Geos/tnrisMapLayers";
  import { onDestroy, onMount } from "svelte";

  export let wms_link = undefined;
  export let layer_name = "tnris-collection-wms-link";
  export let layer_label = "WMS Preview";
  export let src_params = "?bbox={bbox-epsg-3857}&format=image/png&service=WMS&version=1.1.1&request=GetMap&SRS=EPSG:3857&styles=default&width=256&height=256&layers=0&transparent=true";

  const src: AnySourceData = {
    id: layer_name,
    type: "raster",
    tiles: [wms_link + src_params],
    tileSize: 256,
  };

  const layer: Layer = {
    id: layer_name,
    type: "raster",
    source: layer_name,
    layout: { visibility: "visible" },
    paint: {},
  };

  const wmsLayer: MapLayer = {
    id: layer_label,
    layer: layer,
    source: src,
  };

  onMount(() => {
    $mapLayers = [...$mapLayers, wmsLayer];
    //console.log("MAP LAYERS", $mapLayers, wmsLayer);
  });

  onDestroy(() => {
    $mapLayers = $mapLayers.filter((v) => v?.layer?.id !== layer.id);
  });
</script>
