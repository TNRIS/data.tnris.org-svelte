<script lang="ts">
  import type { Collection } from "src/lib/Api/Collections/Controller/Collection";
  import mapStore from "../../Map/mapStore";

  export let collectionCtrl: Collection = null;
  export let collectionAreas = null;
  export let areaTypeSelection;

  const { mapReady } = collectionCtrl;
  $: {
    //console.log("STATE", collectionAreas["state"])
    //console.log("AREA TYPE SELECT", areaTypeSelection, $mapStore, $mapStore.loaded())
    console.log("PRE ADD TO MAP");
    console.log(
      areaTypeSelection,
      $mapStore,
      $mapReady,
      collectionAreas
    );
    if (areaTypeSelection && $mapStore && $mapReady && collectionAreas) {
      console.log("ADDING TO MAP", collectionAreas, $mapReady, areaTypeSelection);
      collectionCtrl.addCollectionAreasToMap(
        collectionAreas[areaTypeSelection]
      );
    }
  }
</script>

{#if collectionAreas && collectionAreas["state"]?.numberMatched >= 0}
  <select id="area-type-select" bind:value={areaTypeSelection}>
    {#if Object.keys(collectionAreas).length > 1}
      {#each Object.keys(collectionAreas).sort((a, b) => {
        return collectionAreas[a].numberMatched > collectionAreas[b].numberMatched ? -1 : 1;
      }) as areaTypeKey}
        <option
          value={areaTypeKey}
          disabled={collectionAreas[areaTypeKey].numberMatched < 1}
        >
          {areaTypeKey}
          <div>[{collectionAreas[areaTypeKey].numberMatched}]</div>
        </option>
      {/each}
    {/if}
  </select>
{/if}

<style lang="scss">
  #area-type-select {
    height: max-content;
  }
</style>
