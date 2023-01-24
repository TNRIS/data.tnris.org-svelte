<script>
  import MapboxDraw from "@mapbox/mapbox-gl-draw";
  import DrawRectangle from "mapbox-gl-draw-rectangle-mode";
  import { Map } from "maplibre-gl";
  import { onDestroy, onMount } from "svelte";

  import "maplibre-gl/dist/maplibre-gl.css";
  import mapStore, { draw } from "./mapStore";
  import MapPreviews from "./MapPreviews.svelte";

  let map;
  let mapContainer;
  onMount(() => {
    const initialState = { lng: -99.341389, lat: 31.33, zoom: 4 };

    mapStore.update(() => {
      let map = new Map({
        container: mapContainer,
        style: "https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json",
        center: [initialState.lng, initialState.lat],
        zoom: initialState.zoom,
      });

      map.on("load", () => {
        MapboxDraw;
        let modes = MapboxDraw.modes;
        modes["draw_rectangle"] = DrawRectangle;
        $draw = new MapboxDraw({
          displayControlsDefault: false,
          modes: modes,
          styles: [
            // ACTIVE (being drawn)
            // line stroke
            {
              id: "gl-draw-line",
              type: "line",
              filter: [
                "all",
                ["==", "$type", "LineString"],
                ["!=", "mode", "static"],
              ],
              layout: {
                "line-cap": "round",
                "line-join": "round",
              },
              paint: {
                "line-color": "#D20C0C",
                "line-dasharray": [0.2, 2],
                "line-width": 2,
              },
            },
            // polygon fill
            {
              id: "gl-draw-polygon-fill",
              type: "fill",
              filter: [
                "all",
                ["==", "$type", "Polygon"],
                ["!=", "mode", "static"],
              ],
              paint: {
                "fill-color": "#D20C0C",
                "fill-outline-color": "#D20C0C",
                "fill-opacity": 0.1,
              },
            },
            // polygon mid points
            {
              id: "gl-draw-polygon-midpoint",
              type: "circle",
              filter: [
                "all",
                ["==", "$type", "Point"],
                ["==", "meta", "midpoint"],
              ],
              paint: {
                "circle-radius": 3,
                "circle-color": "#fbb03b",
              },
            },
            // polygon outline stroke
            // This doesn't style the first edge of the polygon, which uses the line stroke styling instead
            {
              id: "gl-draw-polygon-stroke-active",
              type: "line",
              filter: [
                "all",
                ["==", "$type", "Polygon"],
                ["!=", "mode", "static"],
              ],
              layout: {
                "line-cap": "round",
                "line-join": "round",
              },
              paint: {
                "line-color": "#D20C0C",
                "line-dasharray": [0.2, 2],
                "line-width": 2,
              },
            },
            // vertex point halos
            {
              id: "gl-draw-polygon-and-line-vertex-halo-active",
              type: "circle",
              filter: [
                "all",
                ["==", "meta", "vertex"],
                ["==", "$type", "Point"],
                ["!=", "mode", "static"],
              ],
              paint: {
                "circle-radius": 5,
                "circle-color": "#FFF",
              },
            },
            // vertex points
            {
              id: "gl-draw-polygon-and-line-vertex-active",
              type: "circle",
              filter: [
                "all",
                ["==", "meta", "vertex"],
                ["==", "$type", "Point"],
                ["!=", "mode", "static"],
              ],
              paint: {
                "circle-radius": 3,
                "circle-color": "#D20C0C",
              },
            },

            // INACTIVE (static, already drawn)
            // line stroke
            {
              id: "gl-draw-line-static",
              type: "line",
              filter: [
                "all",
                ["==", "$type", "LineString"],
                ["==", "mode", "static"],
              ],
              layout: {
                "line-cap": "round",
                "line-join": "round",
              },
              paint: {
                "line-color": "#000",
                "line-width": 3,
              },
            },
            // polygon fill
            {
              id: "gl-draw-polygon-fill-static",
              type: "fill",
              filter: [
                "all",
                ["==", "$type", "Polygon"],
                ["==", "mode", "static"],
              ],
              paint: {
                "fill-color": "#000",
                "fill-outline-color": "#000",
                "fill-opacity": 0.0,
              },
            },
            // polygon outline
            {
              id: "gl-draw-polygon-stroke-static",
              type: "line",
              filter: [
                "all",
                ["==", "$type", "Polygon"],
                ["==", "mode", "static"],
              ],
              paint: {
                "line-color": "#000",
                "line-width": 3,
              },
            },
          ],
        });
        map.addControl($draw);
      });
      map.on("idle", () => {
        map.resize();
      });
      map.on("load", () => {
        map.resize();
      });

      return map;
    });
  });
  onMount(() => {
    if (map) {
      map.resize();
    }
  });
  onDestroy(() => {
    map.remove();
    mapStore.update(null);
  });
</script>

<div id="mapLibreMapContainer">
  <div id="mapLibreMap" bind:this={mapContainer}>
    <MapPreviews />
  </div>
</div>

<style lang="scss">
  #mapLibreMapContainer {
    width: 100%;
    height: 100%;

    #mapLibreMap {
      width: 100%;
      height: 100%;
      border: solid 1px $borderColor;
    }
  }
</style>
