<script lang="ts">
  import type { Collection } from "src/lib/Api/Collections/Controller/Collection";
  import InfoBox from "../../General/InfoBox.svelte";
  import LoadingIndicator from "../../General/LoadingIndicator.svelte";
  import SearchSelect from "../../General/SearchSelect.svelte";
  import mapStore from "../../Map/mapStore";
  import AreaTypeSelect from "./AreaTypeSelect.svelte";
  import ResourceAreaItem from "./ResourceAreaItem.svelte";

  export let collectionId = null;
  export let collectionCtrl: Collection | null = null;
  let map = $mapStore;
  let areaTypeSelection;
  let hoverAreaTypeId = null;
  let areaSelections = [];

  $: mapReady = () => {
    return $mapStore && $mapStore.loaded() && $mapStore.isStyleLoaded();
  };

  const removeSelection = (opt) => {
    (areaSelections = areaSelections.filter(
      (cur) => cur.value != opt.value
    ));
    //remove states
    map.setFeatureState({
      "id": opt.value,
      "source": "tnris-collection-areas"
    }, {
      hover: false
    });
    map.setFeatureState({
      "id": opt.value,
      "source": "tnris-collection-areas"
    }, {
      selected: false
    });
  };

  const addSelection = (opt) => {
    //console.log(opt)
    map.setFeatureState({
      "id": opt.value,
      "source": "tnris-collection-areas"
    }, {
      selected: true
    });
    (areaSelections = [...areaSelections, opt]);
  };

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
  };
</script>

<section id="collection-resources-container">
  {#if collectionCtrl.areas && collectionId && mapReady}
    {#await collectionCtrl.areas}
      <LoadingIndicator
        loadingMessage="Loading Download Areas for Collection"
      />
    {:then areas}
      <InfoBox infoClass="info">
        Select one or more areas from the searchable list below or from the map
        to view available resources for each respective area for this
        collection.
      </InfoBox>
      <AreaTypeSelect
        bind:areaTypeSelection
        collectionAreas={areas}
        {collectionCtrl}
      />
      <SearchSelect
        {collectionCtrl}
        removeSelection={removeSelection}
        addSelection={addSelection}
        toggleSelection={toggleSelection}
        options={areas[areaTypeSelection]?.features
          .map((v) => {
            return {
              label: v.properties.area_type_name,
              value: v.properties.area_type_id,
            };
          })
          .sort((a, b) => {
            if (a.label > b.label) {
              return 1;
            }
            if (a.label < b.label) {
              return -1;
            }
            if (a.label == b.label) {
              return 0;
            }
          })}
        bind:selections={areaSelections}
      />
    {:catch error}
      <h3>ERROR</h3>
      <p>{error.message}</p>
    {/await}
    <section id="area-selections-resource-list-container">
      {#each areaSelections as area}
        <ResourceAreaItem
          resourceAreaId={area.value}
          resourceAreaName={area.label}
          {collectionId}
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

    #area-selections-resource-list-container {
      display: grid;
      gap: 0.25rem;
      justify-content: stretch;
      align-content: flex-start;
      overflow-y: scroll;
    }
  }
</style>
