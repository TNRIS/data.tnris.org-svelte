<script>
  // @ts-nocheck

  export let results;
  export let scrollContainer;
  export let inc;
  export let pg;
  export let setPageCallback = () => console.log(pg, inc);

  let count = results.count ? results.count : 0;

  const numPages =
    Math.floor(count / inc) + (count % inc > 0 && count % inc < inc ? 1 : 0);
  let pages = Array.from(Array(numPages).keys());

  const scrollToTop = () => {
    scrollContainer.scrollTo({ top: 0 });
  };
</script>

<div id="CatalogPagination">
  <button
    on:click={() => {
      scrollToTop();
      setPageCallback(pg - 1);
    }}
    disabled={pg == 1}
    ><i class="material-icons">chevron_left</i> Previous
  </button>
  <div>Jump To</div>
  <select
    bind:value={pg}
    on:change={(e) => {
      scrollToTop();
      setPageCallback(e.target.value);
    }}
  >
    {#each pages as page}
      <option value={page + 1}>page {page + 1}</option>
    {/each}
  </select>

  <button
    on:click={() => {
      scrollToTop();
      setPageCallback(pg + 1);
    }}
    disabled={pg == numPages}
    >Next<i class="material-icons">chevron_right</i>
  </button>
</div>

<style lang="scss">
  #CatalogPagination {
    display: flex;
    gap: 0.5rem;
    justify-content: center;
    align-content: center;
    align-items: center;
    overflow: auto;
    padding: 0.5rem;
    border-top: solid 1px $borderColor;
    height: fit-content;

    button {
      display: inline-flex;
      align-items: center;
    }
  }
</style>
