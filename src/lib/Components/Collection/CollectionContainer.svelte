<script lang="ts">
  import { Collection } from "../../Api/Collections/Controller/Collection";
  import LoadingIndicator from "../General/LoadingIndicator.svelte";

  import { query } from "svelte-pathfinder";
  import mapStore from "../Map/mapStore";
  import { onDestroy } from "svelte";
  import { each } from "svelte/internal";
  import Tabs from "./Tabs.svelte";
  import Metadata from "./Metadata.svelte";

  let collectionCtrl: Collection | null = null;

  $: {
    const uuid = String($query.params.c);
    if (uuid && $query.params.c) {
      collectionCtrl = new Collection(uuid);
    }
  }

  onDestroy(() => {
    if (collectionCtrl && collectionCtrl.areas && $mapStore) {
      collectionCtrl.sigCtrl.abort();
      collectionCtrl.removeCollectionAreasFromMap($mapStore);
    }
  });
</script>

<div id="collection-info-container">
  {#if $query.params.c && collectionCtrl}
    {#await collectionCtrl.details}
      <LoadingIndicator loadingMessage="Loading Collection Details" />
    {:then details}
      <Tabs collection={details} {collectionCtrl} />
    {:catch error}
      <h3>ERROR</h3>
      <p>{error.message}</p>
    {/await}
  {/if}
</div>

<style lang="scss">
  #collection-info-container {
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    grid-template-rows: auto 1fr;
    width: 100%;
    overflow: hidden;
  }
</style>
