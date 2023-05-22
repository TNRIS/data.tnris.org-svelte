<script>
  import { useQuery } from "@sveltestack/svelte-query";
  import { onDestroy } from "svelte";
  import { query } from "svelte-pathfinder";
  import * as rscs from "../../../Api/Collections/Controller/getAreas";
  import mapStore from "../../Map/mapStore";
  import LoadingIndicator from "../../General/LoadingIndicator.svelte";
  import InfoBox from "../../General/InfoBox.svelte";
  import AreaTypeSelect from "./AreaTypeSelect.svelte";
  import SearchSelect from "../../../General/SearchSelect.svelte";
  import ResourceAreasMapLayer from "./ResourceAreasMapLayer.svelte";
  import ResourceAreaItem from "./ResourceAreaItem.svelte";

  export let collection_id = null;

  let map = mapStore;

  // TODO! //////////////////////////////////////////////////////////////////////////
  //////////// use query seems to be encountering a race condition
  //////////// this causes the wrong collections to load for a collection
  //////////// if the user has not allowed the areas to load fully before navigating
  //////////// away from the collection
  //////////// look into https://sveltequery.vercel.app/guides/query-cancellation
  ///////////////////////////////////////////////////////////////////////////////////

  const controller = new AbortController();
  // Get the abortController's signal
  const signal = controller.signal;

  let areas;

  const queryAreas = useQuery(
    ["collection-areas", collection_id],
    () => rscs.getMapAreasByCollectionId(collection_id, signal)
  );

  let areaTypeSelection;

  //variable to store id of map resource area currently hovered over
  let hoverAreaTypeId = null;
  //variable to store area-type selections
  let areaSelections = [];

  const removeSelection = (opt) =>
    (areaSelections = areaSelections.filter((cur) => cur.value != opt.value));
  const addSelection = (opt) => (areaSelections = [...areaSelections, opt]);
  const toggleSelection = (opt) => {
    if (areaSelections.some((cur) => cur.value == opt.value)) {
      removeSelection(opt);
    } else {
      addSelection(opt);
    }
  };

  const onAreaClick = (e) => {
    let new_selection = {
      value: e.features[0].id,
      label: e.features[0].properties.area_type_name,
    };
    toggleSelection(new_selection);

    if ($query.params.activeTab !== "Downloads") {
      $query.params.activeTab = "Downloads";
    }
  };

  onDestroy(() => {
    controller.abort();
  });
</script>

<section id="collection-resources-container">
  {#if $queryAreas.status === "loading"}
    <LoadingIndicator />
  {:else if $queryAreas.status === "error"}
    <h3>ERROR: {$queryAreas.error}</h3>
  {:else if $queryAreas.status === "success"}
    <InfoBox infoClass="info">
      Select one or more areas from the searchable list below or from the map to
      view available resources for each respective area for this collection.
    </InfoBox>
    <br />
    <div id="collection-resources-area-select">
      <AreaTypeSelect
        bind:areaTypeSelection
        areasQQuad={$queryAreas.data[0]}
        areasQuad={$queryAreas.data[1]}
        areasCounty={$queryAreas.data[2]}
        areasBlock={$queryAreas.data[3]}
        areas250k={$queryAreas.data[4]}
        areasState={$queryAreas.data[5]}
      />
      {#if areaTypeSelection == "State"}
        <SearchSelect
          options={$queryAreas.data[5].features
            .map((v) => {
              return {
                label: v.properties.area_type_name,
                value: v.properties.area_type_id,
              };
            })
            .sort((a, b) => {
              if (a.label > b.label) {
                return -1;
              }
              if (a.label > b.label) {
                return 1;
              }
              if (a.label == b.label) {
                return 0;
              }
            })}
          bind:selections={areaSelections}
        />
        <ResourceAreasMapLayer
          data={$queryAreas.data[5]}
          {onAreaClick}
          selections={areaSelections}
          bind:hoverAreaTypeId
        />
      {/if}
      {#if areaTypeSelection == "County"}
        <SearchSelect
          options={$queryAreas.data[2].features.map((v) => {
            return {
              label: v.properties.area_type_name,
              value: v.properties.area_type_id,
            };
          })}
          bind:selections={areaSelections}
        />
        <ResourceAreasMapLayer
          data={$queryAreas.data[2]}
          {onAreaClick}
          selections={areaSelections}
          bind:hoverAreaTypeId
        />
      {/if}
      {#if areaTypeSelection == "Block"}
        <SearchSelect
          options={$queryAreas.data[3].features.map((v) => {
            return {
              label: v.properties.area_type_name,
              value: v.properties.area_type_id,
            };
          })}
          bind:selections={areaSelections}
        />
        <ResourceAreasMapLayer
          data={$queryAreas.data[3]}
          {onAreaClick}
          selections={areaSelections}
          bind:hoverAreaTypeId
        />
      {/if}
      {#if areaTypeSelection == "250k"}
        <SearchSelect
          options={$queryAreas.data[4].features?.map((v) => {
            return {
              label: v.properties.area_type_name,
              value: v.properties.area_type_id,
            };
          })}
          bind:selections={areaSelections}
        />
        <ResourceAreasMapLayer
          data={$queryAreas.data[4]}
          {onAreaClick}
          selections={areaSelections}
          bind:hoverAreaTypeId
        />
      {/if}
      {#if areaTypeSelection == "Quad"}
        <SearchSelect
          options={$queryAreas.data[1].features.map((v) => {
            return {
              label: v.properties.area_type_name,
              value: v.properties.area_type_id,
            };
          })}
          bind:selections={areaSelections}
        />
        <ResourceAreasMapLayer
          data={$queryAreas.data[1]}
          {onAreaClick}
          selections={areaSelections}
          bind:hoverAreaTypeId
        />
      {/if}
      {#if areaTypeSelection == "QQuad"}
        <SearchSelect
          options={$queryAreas.data[0].features.map((v) => {
            return {
              label: v.properties.area_type_name,
              value: v.properties.area_type_id,
            };
          })}
          bind:selections={areaSelections}
        />
        <ResourceAreasMapLayer
          data={$queryAreas.data[0]}
          {onAreaClick}
          selections={areaSelections}
          bind:hoverAreaTypeId
        />
      {/if}
    </div>

    <section id="area-selections-resource-list-container">
      {#each areaSelections as area}
        <ResourceAreaItem
          resourceAreaId={area.value}
          resourceAreaName={area.label}
          collectionId={collection_id}
          removeResourceSelectionFn={removeSelection}
          bind:hoverAreaTypeId
        />
      {/each}
    </section>
  {/if}
</section>

<style lang="scss">
  #collection-resources-container {
    display: grid;
    gap: 0.25rem;
    grid-template-rows: auto 1fr;
    max-height: 100%;
    overflow-y: auto;

    #collection-resources-area-select {
      display: grid;
      grid-template-columns: auto 1fr;
      :global(.select-search input) {
        border-left: none;
      }
    }
    #area-selections-resource-list-container {
      display: grid;
      gap: 0.5rem;
      justify-content: stretch;
      align-content: flex-start;
      overflow-y: scroll;
    }
  }
</style>
