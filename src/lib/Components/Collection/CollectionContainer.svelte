<script lang="ts">
  import { Collection } from "../../Api/Collections/Controller/Collection";
  import LoadingIndicator from "../General/LoadingIndicator.svelte";

  import { onDestroy, onMount } from "svelte";
  import { query } from "svelte-pathfinder";
  import mapStore from "../Map/mapStore";
  import Tabs from "./Tabs.svelte";

  let collectionCtrl: Collection | null = null;

  $: {
    const uuid = String($query.params.c);
    if (uuid && $query.params.c && $mapStore) {
      collectionCtrl = new Collection(uuid);
      collectionCtrl.onMapLoaded();
    }
  }

  onDestroy(() => {
    if (collectionCtrl && collectionCtrl.areas) {
      collectionCtrl.sigCtrl.abort();
      if ($mapStore) {
        collectionCtrl.destroy();
      }
    }
  });
</script>

<div id="collection-info-container">
  {#if $query.params.c && collectionCtrl && $mapStore}
    {#await collectionCtrl.details}
      <LoadingIndicator loadingMessage="Loading Collection Details" />
    {:then details}
      <Tabs collection={details} {collectionCtrl} />
    {:catch error}
      <h3>ERROR</h3>
      <p>{error.message}m</p>
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
