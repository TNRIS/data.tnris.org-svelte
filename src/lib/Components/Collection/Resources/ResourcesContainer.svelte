<script lang="ts">
  import type { Collection } from "src/lib/Api/Collections/Controller/Collection";
  import InfoBox from "../../General/InfoBox.svelte";
  import LoadingIndicator from "../../General/LoadingIndicator.svelte";
  import SearchSelect from "../../General/SearchSelect.svelte";
  import AreaTypeSelect from "./AreaTypeSelect.svelte";
  import ResourceAreaItem from "./ResourceAreaItem.svelte";

  export let collectionCtrl: Collection | null = null;
  let areaTypeSelection;

  /* $: mapReady = () => {
    return $mapStore && $mapStore.loaded() && $mapStore.isStyleLoaded();
  }; */

  const { selectedAreas, mapReady } = collectionCtrl;
</script>

<section id="collection-resources-container">
  {#if collectionCtrl.areas && collectionCtrl.collection_id && $mapReady}
    {#await collectionCtrl.areas}
      <LoadingIndicator
        loadingMessage="Loading Download Areas for Collection"
      />
    {:then areas}
      <InfoBox infoClass="info">
        Select county, state, 250k, block, quad, or qquad from the area types
        dropdown below, then select the resource areas you would like to
        download resources for.
      </InfoBox>
      <AreaTypeSelect
        bind:areaTypeSelection
        collectionAreas={areas}
        {collectionCtrl}
      />
      <SearchSelect
        {collectionCtrl}
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
      />
    {:catch error}
      <h3>ERROR</h3>
      <p>{error.message}</p>
    {/await}
    <section id="area-selections-resource-list-container">
      {#if $selectedAreas && $selectedAreas.length > 0}
        {#each $selectedAreas as area}
          <ResourceAreaItem
            {collectionCtrl}
            resourceAreaId={area.value}
            resourceAreaName={area.label}
          />
        {/each}
      {/if}
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
