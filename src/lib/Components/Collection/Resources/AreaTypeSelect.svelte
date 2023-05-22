<script lang="ts">
  import type { Collection } from "src/lib/Api/Collections/Controller/Collection";
  import mapStore from "../../Map/mapStore";

  export let collectionCtrl: Collection = null;
  export let collectionAreas = null;
  export let areaTypeSelection;

  $: {
    if(areaTypeSelection && $mapStore?.loaded()){
      collectionCtrl.addCollectionAreasToMap($mapStore, collectionAreas[areaTypeSelection])
    }
  }
</script>

{#if collectionAreas && collectionAreas["state"]}
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
