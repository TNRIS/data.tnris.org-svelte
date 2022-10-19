<script>
  export let options = [{ label: "", value: "" }];
  export let selections = [];

  const arraysEqual = (a, b) => {
    return a.sort().join("-") == b.sort().join("-");
  };
  $: allSelected = arraysEqual(
    options.map((v) => v.value),
    selections
  );
</script>

<div class="select-menu">
  {#each options as opt}
    <label>
      <input
        type="checkbox"
        bind:group={selections}
        value={opt.value}
        on:change={(e) => console.log(selections)}
      />
      {opt.label}
    </label>
  {/each}
  {#if allSelected == true}
    <button on:click={() => (selections = [])}>Clear All</button>
  {:else}
    <button on:click={() => (selections = options.map((v) => v.value))}
      >Select All</button
    >
  {/if}
</div>

<style lang="scss">
  .select-menu {
    display: grid;
    position: absolute;
    background: white;
    padding: 0.5rem;
    border: solid 1px $borderColor;
    border-radius: 0.25rem;
  }
</style>
