<script>
  import bbox from "@turf/bbox";
  import mapStore from "../../Map/mapStore";

  export let areasQQuad;
  export let areasQuad;
  export let areas250k;
  export let areasBlock;
  export let areasCounty;
  export let areasState;
  export let areaTypeSelection;

  $: options = {
    QQuad: areasQQuad,
    Quad: areasQuad,
    "250k": areas250k,
    Block: areasBlock,
    County: areasCounty,
    State: areasState,
  };

  const onAreaTypeSelectionChange = (d) => {
    let areas = options[d]?.data ? options[d].data : null;
    if ($mapStore && areas && areas?.features.length > 0) {
      let bb = bbox(areas);
      $mapStore.fitBounds(bb, {
        padding: 16,
      });
    }
  };

  $: {
    if (
      $mapStore &&
      options &&
      areaTypeSelection &&
      areasQQuad &&
      areasQuad &&
      areas250k &&
      areasBlock &&
      areasCounty &&
      areasState
    ) {
      $mapStore;
      onAreaTypeSelectionChange(areaTypeSelection);
    }
  }
</script>

{#if areasQuad && areasQuad && areas250k && areasBlock && areasCounty && areasState}
  <select id="area-type-select" bind:value={areaTypeSelection}>
    {#if Object.entries(options).length > 1}
      {#each Object.entries(options).sort( (a, b) => (a[1].numberMatched > b[1].numberMatched ? -1 : 1) ) as arr}
        <option value={arr[0]} disabled={arr[1].numberMatched < 1}>
          {arr[0]}
          <div>[{arr[1].features.length}]</div>
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
