<script>
  import { useQuery } from "@sveltestack/svelte-query";
  import { getCollections } from "../../Api/Collections/getCollections";

  import CatalogItem from "./CatalogItem.svelte";
  import CatalogNavBar from "./CatalogNavBar.svelte";

  const queryCollections = useQuery("collectionCatalog", () => {
    return getCollections();
  });
</script>

<div>
  <CatalogNavBar />
  {#if $queryCollections.isLoading}
    <div>Retreiving Collections...</div>
  {:else if $queryCollections.error}
    An error has occurred:
    {$queryCollections.error}
  {:else}
    {#each $queryCollections.data.results as col, i}
      <CatalogItem collection={col} />
    {/each}
  {/if}
</div>

<style>
</style>
