<script lang="ts">
  import type { Collection } from "src/lib/Api/Collections/Controller/Collection";
  import LoadingIndicator from "../../General/LoadingIndicator.svelte";
  import SearchSelect from "../../General/SearchSelect.svelte";
  import AreaTypeSelect from "./AreaTypeSelect.svelte";
  import ResourceAreaItem from "./ResourceAreaItem.svelte";
  import InfoBox from "../../General/InfoBox.svelte";

  export let collectionCtrl: Collection | null = null;
  export let collection;
  let areaTypeSelection;

  const { selectedAreas, mapReady } = collectionCtrl;
</script>

<section id="collection-resources-container">
  {#if collectionCtrl.areas && collectionCtrl.collection_id && $mapReady && collection}
    {#if collection.category.includes("Historic_Imagery")}
      <InfoBox>
        To get historic imagery, please use the "Custom Order" tab above.
      </InfoBox>
    {:else if collection.availability.includes("External_Link")}
      <InfoBox>
        This data collection references an external data source. To find this
        data, please visit
        <a
          target="_blank"
          referrerpolicy="no-referrer"
          href={collection.source_data_website}
          >{collection.source_data_website}</a
        >
      </InfoBox>
    {:else}
      <InfoBox infoClass="info">
        Tired of all the clicking? Want to download an entire collection of data resources all at
        once? Consider using the TxGIO Bulk Downloader. Learn more <a target="_blank"
        referrerpolicy="no-referrer" href="https://geographic.texas.gov/applications-and-utilities">here</a>!
      </InfoBox>
      {#await collectionCtrl.areas}
        <LoadingIndicator
          loadingMessage="Loading Download Areas for Collection"
        />
      {:then areas}
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
          {#each $selectedAreas as area (area.value)}
            <ResourceAreaItem
              {collectionCtrl}
              resourceAreaId={area.value}
              resourceAreaName={area.label}
            />
          {/each}
        {/if}
        {#if $selectedAreas.length == 0}
          <InfoBox infoClass="info">
            Select county, state, 250k, block, quad, or qquad from the area
            types dropdown above, then select the resource areas you would like
            to download resources for.
          </InfoBox>
        {/if}
      </section>
    {/if}
  {/if}
</section>

<style lang="scss">
  #collection-resources-container {
    display: grid;
    gap: 0.25rem;
    grid-template-rows: auto 1fr;
    max-height: 100%;

    #area-selections-resource-list-container {
      display: grid;
      gap: 0.25rem;
      justify-content: stretch;
      align-content: flex-start;
      overflow-y: auto;
      padding: 0.2rem;
      background: #f3f2ed;
    }
  }
</style>
