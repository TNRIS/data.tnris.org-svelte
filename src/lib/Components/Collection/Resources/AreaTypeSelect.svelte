<script>
  export let areasQQuad;
  export let areasQuad;
  export let areas250k;
  export let areasBlock;
  export let areasCounty;
  export let areasState;
  export let areaTypeSelection;

  $: options = {
    QQuad: $areasQQuad,
    Quad: $areasQuad,
    "250k": $areas250k,
    Block: $areasBlock,
    County: $areasCounty,
    State: $areasState,
  };
</script>

{#if $areasQuad.data && $areasQuad.data && $areas250k.data && $areasBlock.data && $areasCounty.data && $areasState.data}
  <select id="area-type-select" bind:value={areaTypeSelection}>
    {#if Object.entries(options).length > 1}
      {#each Object.entries(options).sort( (a, b) => (a[1].data?.features.length > b[1].data?.features.length ? -1 : 1) ) as arr}
        {#if arr[1].data}
          <option value={arr[0]} disabled={arr[1].data.length < 1}>
            {arr[0]}
            <div>[{arr[1].data.features.length}]</div>
          </option>
        {/if}
      {/each}
    {/if}
  </select>
{/if}

<style lang="scss">
  #area-type-select {
    height: max-content;
  }
</style>
