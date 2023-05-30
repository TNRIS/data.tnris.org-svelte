<script lang="ts">
  import { onMount } from "svelte";
  import type { Collection } from "../../../Api/Collections/Controller/Collection";
  import { getResourcesByAreaTypeAndCollectionId } from "../../../Api/Collections/Controller/getResources";
  import Empty from "../../General/Empty.svelte";
  import LoadingIndicator from "../../General/LoadingIndicator.svelte";
  import mapStore from "../../Map/mapStore";

  export let resourceAreaName;
  export let resourceAreaId;
  export let collectionCtrl: Collection;

  const { hoveredAreaId } = collectionCtrl;
  const map = $mapStore;

  let loading = true;
  let data = null;
  
  onMount(async () => {
    //console.log(resourceAreaId, "MOUNTED");
    const r = await getResourcesByAreaTypeAndCollectionId(
      collectionCtrl.collection_id,
      resourceAreaId
    );

    data = r;
    loading = false;
  });
</script>

<div class="area-resource-container">
  {#if resourceAreaId && collectionCtrl.collection_id}
    {#if loading == true}
      <LoadingIndicator loadingMessage="fetching resources..." />
    {:else}
      {#if data && data.count >= 1}
        <div
          class="area-resource-item"
          id={`${collectionCtrl.collection_id}_${resourceAreaId}`}
          class:hover={resourceAreaId == $hoveredAreaId}
          on:mouseenter={() => {
            $hoveredAreaId = resourceAreaId;

            if (map && resourceAreaId) {
              map.setFeatureState(
                {
                  source: "tnris-collection-areas",
                  id: resourceAreaId,
                },
                {
                  hover: true,
                }
              );
            }
          }}
          on:mouseleave={() => {
            $hoveredAreaId = null;
            if (map && resourceAreaId) {
              map.setFeatureState(
                {
                  source: "tnris-collection-areas",
                  id: resourceAreaId,
                },
                {
                  hover: false,
                }
              );
            }
          }}
        >
          <div class="area-resource-header">
            <h3>{resourceAreaName}</h3>
            <button
              on:click={() =>
                collectionCtrl.removeAreaSelection($mapStore, {
                  label: resourceAreaName,
                  value: resourceAreaId,
                })}>X</button
            >
          </div>
          <div class="resource-area-rows">
            {#each data.results as resource}
              <div class="area-resource-row">
                {resource.resource_type_name}<a
                  href={resource.resource}
                  download
                  >Download (~{(resource.filesize / 1000000).toFixed(2)}mb)</a
                >
              </div>
            {/each}
          </div>
        </div>
      {:else}
        <div class="area-resource-row">
          <Empty
            message={`Aww, shucks! No resources to download found for ${resourceAreaName}.`}
          />
        </div>
      {/if}
    {/if}
  {/if}
</div>

<style lang="scss">
  .area-resource-container {
    .area-resource-header {
      display: grid;
      grid-template-columns: minmax(0, 1fr) auto;
      justify-content: space-between;

      button {
        padding: 0.25rem !important;
        height: max-content;
      }
    }
    .area-resource-item {
      padding: 0.5rem;
      border: solid 1px #ccc;
      box-shadow: $boxShadow-xs;
      &.hover {
        border: solid 1px $primaryColor;
      }
      .resource-area-rows {
        display: grid;
        gap: 0.5rem;
        .area-resource-row {
          display: grid;
          grid-template-columns: minmax(0, 1fr) auto;
          border-bottom: 1px solid #cccccc80;
        }
      }
    }
  }
</style>
