<script>
  import { getResourcesByAreaTypeAndCollectionId } from "../../../Api/Collections/Controller/getResources";
  import Empty from "../../General/Empty.svelte";
  import LoadingIndicator from "../../General/LoadingIndicator.svelte";
  import mapStore from "../../Map/mapStore";

  export let resourceAreaName;
  export let resourceAreaId;
  export let collectionId;
  export let removeResourceSelectionFn;
  export let hoverAreaTypeId;

  const map = $mapStore;
</script>

<div class="area-resource-container">
  {#if resourceAreaId && collectionId}
  {#await getResourcesByAreaTypeAndCollectionId(collectionId, resourceAreaId)}
      <LoadingIndicator loadingMessage="fetching resources..." />
    {:then rscs}
      {#if rscs && rscs.count > 0}
        <div
          class="area-resource-item"
          id={`${collectionId}_${resourceAreaId}`}
          class:hover={resourceAreaId == hoverAreaTypeId}
          on:mouseenter={() => {
            hoverAreaTypeId = resourceAreaId;

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
            hoverAreaTypeId = null;
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
              on:click={removeResourceSelectionFn({
                value: resourceAreaId,
                label: resourceAreaName,
              })}>X</button
            >
          </div>
          <div class="resource-area-rows">
            {#each rscs.results as resource}
              <div class="area-resource-row">
                {resource.resource_type_name}<a href={resource.resource} download
                  >Download (~{(resource.filesize / 1000000).toFixed(2)}mb)</a
                >
              </div>
            {/each}
          </div>
        </div>
      {:else }
        <div class="area-resource-row">
          <Empty
            message={`Aww, shucks! No resources found for ${resourceAreaName}.`}
          />
        </div>
      {/if}
    {:catch error}
      <h4>ERROR</h4>
      <p>{error.message}</p>
  {/await}
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
