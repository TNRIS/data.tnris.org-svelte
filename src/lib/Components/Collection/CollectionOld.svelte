<script>
  import { Query } from "@sveltestack/svelte-query";
  import { getCollectionById } from "../../Api/Collections/getCollections";
  import LoadingIndicator from "../General/LoadingIndicator.svelte";
  import Tabs from "./Tabs.svelte";

  import { back, query } from "svelte-pathfinder";

  let queryOptions = {
    queryKey: ["collection-details", $query.params.c],
    queryFn: async () => await getCollectionById($query.params.c),
    keepPreviousData: false,
    refetchOnMount: "always"
  };
</script>

{#if $query.params.c}
  <Query options={queryOptions}>
    <div id="collection-info-container" slot="query" let:queryResult>
      {#if queryResult.isLoading}
        <div id="collection-info-header">
          <h1 on:click={() => back()} on:keyup={() => null}>
            <i class="material-icons">arrow_back</i> Back
          </h1>
          <LoadingIndicator loadingMessage={"Retreiving collection..."} />
        </div>
        <Tabs />
      {:else if queryResult.error}
        <div id="collection-info-header">
          <a href="/" class="link"
            ><i class="material-icons">arrow_back</i> Back</a
          >
          <p>Could not find collection {$query.params.c}</p>
        </div>
        <Tabs />
      {:else}
        <div id="collection-info-header">
          <a href="/" class="link back-button"
            ><i class="material-icons">arrow_back</i></a
          >
          <h1>
            {queryResult?.data?.name}
          </h1>
        </div>
        <Tabs collection={queryResult?.data} />
      {/if}
    </div>
  </Query>
{/if}

<style lang="scss">
  #collection-info-container {
    width: 100%;
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    grid-template-rows: auto 1fr;
    #collection-info-header {
      padding: 0.25rem 0.5rem;
      display: grid;
      grid-template-columns: auto 1fr;
      align-items: center;
      gap: 1rem;

      a.back-button {
        i.material-icons {
          color: $primaryColor;
          font-size: 1.5rem;
        }
      }
    }
  }
</style>
