<script>
  export let options = [{ label: "", value: "" }];
  export let value;
  export let callback;

  const arraysEqual = (a, b) => {
    return a.sort().join(",") == b.sort().join(",");
  };
  $: allSelected = arraysEqual(
    options.map((v) => v.value),
    value !== undefined ? value : []
  );
</script>

<div class="select-boxes">
  {#each options as opt}
    <label>
      <input
        type="checkbox"
        bind:group={value}
        value={opt.value}
        on:change={() => callback(value)}
      />
      {opt.label}
    </label>
  {/each}
  {#if allSelected == true}
    <button class="select-all-menu-btn" on:click={() => callback([])}
      >Clear All</button
    >
  {:else}
    <button
      class="select-all-menu-btn"
      on:click={() => callback(options.map((v) => v.value))}>Select All</button
    >
  {/if}
</div>

<style lang="scss">
  .select-boxes {
    display: grid;
  }
  .select-all-menu-btn {
    margin-top: 1rem;
  }
</style>
