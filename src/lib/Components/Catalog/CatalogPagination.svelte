<script>
  export let results;

  const numPages =
    Math.floor(results / 25) + (results % 25 > 0 && results % 25 < 25 ? 1 : 0);
  let pages = Array.from(Array(numPages).keys());
  pages = pages.length > 6 ? [...pages.slice(0, 4), ...pages.slice(-2)] : pages;
  const curPage = 1;

  //TODO: back()
  //TODO: forward()
  //TODO: jumpTo()
  //TODO: setLimit()
  //TODO: setPage()
</script>

<div id="CatalogPagination">
  <button><i class="material-icons">chevron_left</i> </button>
  {#each pages as page}
    <button>{page + 1}</button>
  {/each}
  <button><i class="material-icons">chevron_right</i> </button>
</div>

<style lang="scss">
  #CatalogPagination {
    display: flex;
    gap: 0.25rem;
    justify-content: center;
    overflow: auto;
    padding: 0.5rem;
    border-top: solid 1px $borderColor;
    height: fit-content;
  }
</style>
