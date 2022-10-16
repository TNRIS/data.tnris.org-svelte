<script>
    export let results;

    const numPages =
        Math.floor(results / 25) +
        (results % 25 > 0 && results % 25 < 25 ? 1 : 0);
    const pages = Array.from(Array(numPages).keys());
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
        overflow: auto;
        padding: 1rem 0.25rem;
        border-radius: .5rem;
        box-shadow: $boxShadow-md;
    }
</style>
