<script>
  import { Query } from "@sveltestack/svelte-query";
  import { query } from "svelte-pathfinder";
  import {
    catalogParamsStore,
    getCollections,
  } from "../../Api/Collections/Controller/getCollections";
  import Empty from "../General/Empty.svelte";
  import InfoBox from "../General/InfoBox.svelte";

  import LoadingIndicator from "../General/LoadingIndicator.svelte";
  import CatalogItem from "./CatalogItem.svelte";
  import CatalogPagination from "./CatalogPagination.svelte";
  import CatalogSearchBar from "./CatalogSearchBar.svelte";

  let catalogScrollWindow;
  //store stringified value of filter params excluding page and inc
  let prevParams = `${$query.params.s}_${$query.params.availability}_${$query.params.category}_${$query.params.file_type}_${$query.params.geo}_${$query.params.sort}`;

  $: queryOptions = {
    queryKey: ["posts", $catalogParamsStore],
    queryFn: () => getCollections($catalogParamsStore),
    keepPreviousData: false,
  };

  $: {
    // check if previous params for filters equal current, most updated ones
    // if filter params not equal to previous values, set pg = 1
    const cur = `${$query.params.s}_${$query.params.availability}_${$query.params.category}_${$query.params.file_type}_${$query.params.geo}_${$query.params.sort}`;
    if (prevParams != cur) {
      $query.params.pg = 1;
    }
    prevParams = cur;
  }
</script>

<Query options={queryOptions}>
  <div id="CatalogContainer" slot="query" let:queryResult>
    <CatalogSearchBar />
    {#if queryResult.isLoading}
      <LoadingIndicator loadingMessage="Loading Collections..." />
    {:else if queryResult.error}
      An error has occurred:
      <InfoBox infoClass="caution">{queryResult.error}</InfoBox>
    {:else if queryResult && queryResult.data.results.length < 1}
      <Empty />
    {:else}
      <div id="CatalogItemList" bind:this={catalogScrollWindow}>
        {#each queryResult.data.results as col}
          <CatalogItem collection={col} />
        {/each}
      </div>
      <CatalogPagination
        results={queryResult?.data}
        scrollContainer={catalogScrollWindow}
        inc={$query.params.inc !== undefined ? $query.params.inc : 24}
        pg={$query.params.pg !== undefined ? $query.params.pg : 1}
        setPageCallback={function callback(value) {
          $query.params.pg = value;
        }}
      />
    {/if}
  </div>
</Query>

<style lang="scss">
  #CatalogContainer {
    display: grid;
    grid-template-rows: auto 1fr auto;
    height: 100%;
    width: 100%;
    border: solid 1px $borderColor;

    #CatalogItemList {
      overflow-y: auto;
      display: grid;
      align-content: flex-start;
      gap: 0.5rem;
      padding-top: 0.5rem;
      padding-bottom: 0.5rem;
      padding-left: 0.5rem;
      padding-right: 0.75rem;
      height: auto;
    }
  }
</style>
