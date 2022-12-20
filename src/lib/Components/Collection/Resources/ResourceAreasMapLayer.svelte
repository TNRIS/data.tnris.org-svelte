<script>
  import { onDestroy, onMount } from "svelte";

  export let map;
  export let layerId;
  export let data;
  export let onAreaClick = (e) => console.log("click", e);
  export let selections = [];
  export let hoverAreaTypeId;

  export let onAreaMouseMove = (e) => {
    //console.log("mousemove", e, hoverAreaTypeId);
    map.getCanvas().style.cursor = "pointer";
    if (hoverAreaTypeId) {
      map.removeFeatureState({
        source: layerId,
        sourceLayer: layerId,
        id: hoverAreaTypeId,
      });
    }

    hoverAreaTypeId = e.features[0].id;

    // When the mouse moves over the earthquakes-viz layer, update the
    // feature state for the feature under the mouse
    map.setFeatureState(
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
      map.setFeatureState(
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
    map.getCanvas().style.cursor = "";
  };

  onMount(() => {
    if (map.getSource(`${layerId}`)) {
      if (map.getLayer(`${layerId}`)) {
        map.removeLayer(`${layerId}`);
      }
      map.removeSource(`${layerId}`);
    }
    map.addSource(`${layerId}`, {
      type: "geojson",
      data: data,
      promoteId: "area_type_id",
    });
    map.addLayer({
      id: `${layerId}`,
      source: `${layerId}`,
      type: "fill",
      paint: {
        "fill-color": [
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
        ],
        "fill-opacity": [
          "case",
          ["boolean", ["feature-state", "hover"], false],
          0.8,
          0.4,
        ],
        "fill-outline-color": "blue",
      },
    });
    map.off("mousemove", onAreaMouseMove);
    map.on("mousemove", `${layerId}`, onAreaMouseMove);
    map.off("mouseleave", onAreaMouseLeave);
    map.on("mouseleave", `${layerId}`, onAreaMouseLeave);
    map.off("click", onAreaClick);
    map.on("click", `${layerId}`, onAreaClick);
  });

  $: {
    if (map && selections && map.getLayer(layerId) !== undefined) {
      map.setPaintProperty(layerId, "fill-color", [
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
    if (map) {
      if (map.getLayer(`${layerId}`) != undefined) {
        map.off("mousemove", onAreaMouseMove);
        map.on("mousemove", `${layerId}`, onAreaMouseMove);
        map.off("mouseleave", onAreaMouseLeave);
        map.on("mouseleave", `${layerId}`, onAreaMouseLeave);
        map.off("click", onAreaClick);
        map.on("click", `${layerId}`, onAreaClick);
        map.removeLayer(`${layerId}`);
      }
      if (map.getSource(`${layerId}`) != undefined) {
        map.removeSource(`${layerId}`);
      }
    }
  });
</script>

<div />

<style lang="scss"></style>
