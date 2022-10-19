<script>
  import { queryCollections } from "../../Api/Collections/getCollections";

  import CatalogItem from "./CatalogItem.svelte";
  import CatalogSearchBar from "./CatalogSearchBar.svelte";
  import CatalogPagination from "./CatalogPagination.svelte";

  const qc = queryCollections();
</script>

<div id="CatalogContainer">
  <CatalogSearchBar />
  {#if $qc.isLoading}
    <div>Retreiving Collections...</div>
    <CatalogPagination results={0} />
  {:else if $qc.error}
    An error has occurred:
    {$qc.error}
  {:else}
    <div id="CatalogItemList">
      {#each $qc.data.results as col}
        <CatalogItem collection={col} />
      {/each}
    </div>
    <CatalogPagination results={$qc?.data?.count ? $qc.data.count : 0} />
  {/if}
</div>

<style lang="scss">
  #CatalogContainer {
    display: grid;
    grid-template-rows: auto 1fr auto;
    height: 100%;
    width: 100%;
    border: solid 1px $borderColor;
    border-radius: .5rem;

    #CatalogItemList {
      overflow-y: scroll;
      display: grid;
      gap: .5rem;
      padding-top: .5rem;
      padding-bottom: .5rem;
      padding-left: .5rem;
      padding-right: .75rem;
      border-radius: .5rem;
      height: auto;
    }
  }
</style>
