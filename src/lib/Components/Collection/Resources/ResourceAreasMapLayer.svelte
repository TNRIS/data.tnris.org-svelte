<script>
  import { generateCollectionAreasLayer } from "../../../Api/Geos/MapLayers/tnrisCollectionAreasFillLayer";
  import { onDestroy, onMount } from "svelte";
  import mapStore from "../../Map/mapStore";

  const layerId = "tnris-collection-areas";
  export let data;
  export let onAreaClick = (e) => console.log("click", e);
  export let selections = [];
  export let hoverAreaTypeId;
  const layer = generateCollectionAreasLayer(layerId, selections)

  export let onAreaMouseMove = (e) => {
    //console.log("mousemove", e, hoverAreaTypeId);
    $mapStore.getCanvas().style.cursor = "pointer";
    if (hoverAreaTypeId) {
      $mapStore.removeFeatureState({
        source: layerId,
        sourceLayer: layerId,
        id: hoverAreaTypeId,
      });
    }

    hoverAreaTypeId = e.features[0].id;

    // When the mouse moves over the collection area layer,
    // update the feature state for the feature under the mouse
    $mapStore.setFeatureState(
      {
        source: layerId,
        id: hoverAreaTypeId,
      },
      {
        hover: true,
      }
    );
  };

  export let onAreaMouseLeave = (e) => {
    //console.log("mouseleave", e, hoverAreaTypeId);
    if (hoverAreaTypeId) {
      $mapStore.setFeatureState(
        {
          source: layerId,
          id: hoverAreaTypeId,
        },
        {
          hover: false,
        }
      );
    }

    hoverAreaTypeId = null;
    // Remove the information from the previously hovered feature from the sidebar
    // Reset the cursor style
    $mapStore.getCanvas().style.cursor = "";
  };

  onMount(() => {
    if ($mapStore.getSource(`${layerId}`)) {
      if ($mapStore.getLayer(`${layerId}`)) {
        $mapStore.removeLayer(`${layerId}`);
      }
      $mapStore.removeSource(`${layerId}`);
    }
    $mapStore.addSource(`${layerId}`, {
      type: "geojson",
      data: data,
      promoteId: "area_type_id",
    });
    // @ts-ignore
    $mapStore.addLayer(layer);
    $mapStore.off("mousemove", onAreaMouseMove);
    $mapStore.on("mousemove", `${layerId}`, onAreaMouseMove);
    $mapStore.off("mouseleave", onAreaMouseLeave);
    $mapStore.on("mouseleave", `${layerId}`, onAreaMouseLeave);
    $mapStore.off("click", onAreaClick);
    $mapStore.on("click", `${layerId}`, onAreaClick);
  });

  $: {
    if ($mapStore && selections && $mapStore.getLayer(layerId) !== undefined) {
      $mapStore.setPaintProperty(layerId, "fill-color", [
        "case",
        [
          "boolean",
          [
            "in",
            ["get", "area_type_id"],
            ["literal", selections.map((v) => v.value)],
          ],
          false,
        ],
        "#888",
        "#fff",
      ]);
    }
  }

  onDestroy(() => {
    if ($mapStore) {
      if ($mapStore.getLayer(`${layerId}`) != undefined) {
        $mapStore.off("mousemove", onAreaMouseMove);
        $mapStore.on("mousemove", `${layerId}`, onAreaMouseMove);
        $mapStore.off("mouseleave", onAreaMouseLeave);
        $mapStore.on("mouseleave", `${layerId}`, onAreaMouseLeave);
        $mapStore.off("click", onAreaClick);
        $mapStore.on("click", `${layerId}`, onAreaClick);
        $mapStore.removeLayer(`${layerId}`);
      }
      if ($mapStore.getSource(`${layerId}`) != undefined) {
        $mapStore.removeSource(`${layerId}`);
      }
    }
  });
</script>

<div />

<style lang="scss"></style>
