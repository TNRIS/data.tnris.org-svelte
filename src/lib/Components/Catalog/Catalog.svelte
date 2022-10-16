<script>
  import { queryCollections } from "../../Api/Collections/getCollections";

  import CatalogItem from "./CatalogItem.svelte";
  import CatalogNavBar from "./CatalogNavBar.svelte";
  import CatalogPagination from "./CatalogPagination.svelte";

  const qc = queryCollections();
</script>

<div id="CatalogContainer">
  <CatalogNavBar />
  {#if $qc.isLoading}
    <div>Retreiving Collections...</div>
    <CatalogPagination results={0} />
  {:else if $qc.error}
    An error has occurred:
    {$qc.error}
  {:else}
    <CatalogPagination results={$qc?.data?.count ? $qc.data.count : 0} />
    <div id="CatalogItemList">
      {#each $qc.data.results as col}
        <CatalogItem collection={col} />
      {/each}
    </div>
  {/if}
</div>

<style lang="scss">
  #CatalogContainer {
    display: grid;
    grid-template-rows: auto auto 1fr;
    gap: .5rem;
    padding: .5rem;
    max-height: 100%;


    #CatalogItemList {
      overflow-y: scroll;
      display: grid;
      gap: .5rem;
      padding-right: .75rem;
      border-top: solid 2px white;
    }
  }
</style>
