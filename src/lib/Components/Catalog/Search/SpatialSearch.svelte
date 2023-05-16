<script>
  import { Query } from "@sveltestack/svelte-query";
  import bboxPolygon from "@turf/bbox-polygon";
  import { query } from "svelte-pathfinder";
  import { getAddressCandidates } from "../../../Api/Geos/getAddressCandidates";
  import { clickOutside } from "../../General/clickOutside";
  import LoadingIndicator from "../../General/LoadingIndicator.svelte";
  import mapStore, { draw } from "../../Map/mapStore";
  import DrawBBox from "./DrawBBox.svelte";

  export let callback;
  export let searchSource = "NOMINATIM";

  let spatialSearchInput = "";
  let show = false;

  const selectSpatialSearch = (feature) => {
    spatialSearchInput = feature.properties.display_name;
    callback(feature.bbox);
    if ($mapStore) {
      if ($mapStore.getLayer("tnris-bbox-search")) {
        $mapStore.removeLayer("tnris-bbox-search");
      }
      if ($mapStore.getSource("tnris-bbox-search")) {
        $mapStore.removeSource("tnris-bbox-search");
      }
      $mapStore.addSource("tnris-bbox-search", {
        type: "geojson",
        data: bboxPolygon(feature.bbox),
      });
      $draw.deleteAll();
      $mapStore.addLayer({
        id: "tnris-bbox-search",
        source: "tnris-bbox-search",
        type: "line",
        paint: {
          "line-color": "red",
          "line-width": 2,
        },
      });
      $mapStore.moveLayer("tnris-bbox-search");
      /* console.log(
        $mapStore.getStyle().layers.filter((v) => v.id.startsWith("tnris-"))
      ); */
    }
  };
  const clearSpatialSearch = () => {
    if ($mapStore.getLayer("tnris-bbox-search") != undefined) {
      $mapStore.removeLayer("tnris-bbox-search");
      $mapStore.removeSource("tnris-bbox-search");
    }
    if ($draw) {
      $draw.deleteAll();
    }
    delete $query.params.geo;
    $query.params = $query.params;
    spatialSearchInput = "";
    return;
  };

  $: queryOptions = {
    queryKey: ["posts", spatialSearchInput],
    queryFn: () => getAddressCandidates(spatialSearchInput, searchSource),
    keepPreviousData: false,
  };
</script>

<div id="spatial-search-container">
  <Query options={queryOptions}>
    <div id="spatial-search" slot="query" let:queryResult>
      <input
        id="spatial-search-input"
        class:no-rad-r={$query.params.geo}
        type="search"
        placeholder="spatial search"
        bind:value={spatialSearchInput}
        use:clickOutside
        on:click_outside={() => (show = false)}
        on:click={() => (show = true)}
      />
      {#if spatialSearchInput.length > 2 && searchSource == "ESRI"}
        <div id="spatial-search-results">
          {#if queryResult.isLoading}
            <LoadingIndicator loadingMessage="Retreiving addresses..." />
          {:else if queryResult.error}
            Uh oh! An error has occurred:
            {queryResult.error}
          {:else if queryResult.data.candidates.length > 0}
            {#each queryResult.data.candidates as candidate}
              <a
                class="spatial-search-result"
                href="/"
                on:click|preventDefault={() => selectSpatialSearch(candidate)}
              >
                {candidate.address}
              </a>
            {/each}
          {:else}
            <div>No results found</div>
          {/if}
        </div>
      {/if}
      {#if spatialSearchInput.length > 2 && searchSource == "NOMINATIM"}
        <div
          id={`spatial-search-results`}
          class={`${show ? "open " : "closed "}`}
        >
          {#if queryResult.isLoading}
            <LoadingIndicator loadingMessage="Retreiving addresses..." />
          {:else if queryResult.error}
            Uh oh! An error has occurred:
            {queryResult.error}
          {:else if queryResult.data.features.length > 0}
            {#each queryResult.data.features as feature}
              <a
                class="spatial-search-result"
                href="/"
                on:click|preventDefault={() => selectSpatialSearch(feature)}
              >
                {feature.properties.display_name}
              </a>
            {/each}
          {:else}
            <div>No results found</div>
          {/if}
        </div>
      {/if}
    </div>
  </Query>
  {#if $query.params.geo}
    <button class="alert" on:click={() => clearSpatialSearch()}>clear</button>
  {/if}
  <DrawBBox />
</div>

<style lang="scss">
  #spatial-search-container {
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto;
    gap: 0rem;
    .alert {
      border: solid 1px #d00404;
      color: #d00404;
    }
    #spatial-search {
      /* #spatial-search-bar {
      } */

      #spatial-search-input {
        width: 100%;
      }
      #spatial-search-results {
        &.open {
          display: block;
        }
        &.closed {
          display: none;
        }
        position: absolute;
        display: grid;
        background: white;
        border: solid 1px #ccc;
        padding: 0.5rem;
        z-index: 9999999999;
        max-width: 100%;
        width: 600px;

        .spatial-search-result {
          border-bottom: 1px solid #ccc;
          padding: 0.5rem 0.25rem;
          display: block;
          text-decoration: none;
          color: $primaryColor;
        }
      }
    }
  }
</style>
