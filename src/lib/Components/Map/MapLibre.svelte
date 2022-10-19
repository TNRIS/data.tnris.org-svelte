<script>
    import { onMount, onDestroy } from "svelte";
    import { Map } from "maplibre-gl";
    import "maplibre-gl/dist/maplibre-gl.css";
    import mapStore from "./mapStore";

    let map;
    let mapContainer;
    onMount(() => {
        const initialState = { lng: -99.341389, lat: 31.33, zoom: 4 };

        mapStore.update(
            () =>
                new Map({
                    container: mapContainer,
                    style: "https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json",
                    center: [initialState.lng, initialState.lat],
                    zoom: initialState.zoom,
                })
        );
    });

    onDestroy(() => {
        map.remove();
        mapStore.update(null);
    });
</script>

<div id="mapLibreMapContainer">
    <div id="mapLibreMap" bind:this={mapContainer} />
</div>

<style lang="scss">
    #mapLibreMapContainer {
        width: 100%;
        height: 100%;
        border-radius: 1rem;
        
        #mapLibreMap {
            width: 100%;
            height: 100%;
            border-radius: .5rem;
            border: solid 1px $borderColor;
        }
    }
</style>
