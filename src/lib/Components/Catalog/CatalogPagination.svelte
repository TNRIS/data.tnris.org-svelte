<script>
  // @ts-nocheck

  export let results;
  export let scrollContainer;
  export let inc;
  export let pg;
  export let setPageCallback = () => console.log(pg, inc);

  let count = results.count ? results.count : 0;
  $: min = pg * inc - inc + 1;
  $: max = pg * inc;

  const numPages =
    Math.floor(count / inc) + (count % inc > 0 && count % inc < inc ? 1 : 0);
  let pages = Array.from(Array(numPages).keys());

  const scrollToTop = () => {
    scrollContainer.scrollTo({ top: 0 });
  };
</script>

<div id="CatalogPaginationWrapper">
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
  <div id="CatalogPaginationStatus">
    <span> {min} - {max} of {results.count}</span>
  </div>
</div>

<style lang="scss">
  #CatalogPaginationWrapper {
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
    #CatalogPaginationStatus {
      display: flex;
      justify-content: center;
      padding: 0.25rem;
      background: #efefef;
      color: #555;
      border-bottom: 1px solid #ccc;
    }
  }
</style>
