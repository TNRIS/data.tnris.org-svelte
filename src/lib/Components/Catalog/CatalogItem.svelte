<script>
  import { Link } from "svelte-navigator";
  import mapStore from "../Map/mapStore";
  export let collection;

  const collectionCoverageLayerStyle = {
    id: "collection-coverage-layer",
    type: "fill",
    source: "collection-coverage-source",
    minzoom: 2,
    maxzoom: 24,
    paint: {
      "fill-color": "#73808c",
      "fill-opacity": 0.25,
      "fill-outline-color": "#73808C",
    },
  };

  const collectionCoverageOutlineLayerStyle = {
    id: "collection-coverage-outline-layer",
    type: "line",
    source: "collection-coverage-source",
    minzoom: 2,
    maxzoom: 24,
    paint: {
      "line-color": "#fff",
      "line-width": 2,
    },
  };
  const addCollectionExtent = (the_geom) => {
    if ($mapStore && $mapStore.getSource("collection-coverage-source")) {
      $mapStore.removeLayer("collection-coverage-outline-layer");
      $mapStore.removeLayer("collection-coverage-layer");
      $mapStore.removeSource("collection-coverage-source");
    }
    if ($mapStore) {
      $mapStore.addSource("collection-coverage-source", {
        type: "geojson",
        data: the_geom,
      });
      $mapStore.addLayer(collectionCoverageLayerStyle);
      $mapStore.addLayer(collectionCoverageOutlineLayerStyle);
    }
  };
</script>

<div
  class="catalogItem"
  on:mouseenter={() => addCollectionExtent(collection.the_geom)}
>
  <div
    class="catalogItemThumbnail"
    style="background-image: url({collection.thumbnail_image})"
  />
  <div id={collection.collection_id} class="catalogItemMeta">
    <h2>
      <Link class="link" to="/collection?c={collection.collection_id}"
        >{collection.name}</Link
      >
    </h2>
  </div>
</div>

<style lang="scss">
  .catalogItem {
    display: grid;
    grid-template-columns: 1fr 3fr;
    gap: 0.25rem;
    min-height: 120px;
    border-radius: 0.5rem;
    padding: 0.1rem;
    background: white;
    box-shadow: $boxShadow-xs;
    border: 1px solid #fbf8f3;

    .catalogItemMeta {
      padding: 0.5rem;

      :global(.link) {
        font-size: 1rem;
        font-weight: 600;
        text-decoration: none;

        &:visited {
          color: $primaryColor;
        }
        color: #333;
      }
    }
    .catalogItemThumbnail {
      background-position: center;
      background-repeat: no-repeat;
      background-size: cover;
      max-height: 120px;
      border-radius: 0.25rem 0rem 0rem 0.25rem;
    }
  }
</style>
