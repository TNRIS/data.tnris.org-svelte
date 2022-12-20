<script>
  import { query } from "svelte-pathfinder";
  import KeywordSearch from "./Search/KeywordSearch.svelte";
  import SpatialSearch from "./Search/SpatialSearch.svelte";
  import SearchFiltersMobile from "./Search/SearchFiltersMobile.svelte";
  //import SearchFiltersDesktop from "./Search/SearchFiltersDesktop.svelte";
</script>

<div id="CatalogSearchBar">
  <div id="CatalogSearch">
    <KeywordSearch
      value={$query.params.s}
      callback={function callback(value) {
        $query.params.s = value;
      }}
    />
    <SpatialSearch
      searchSource="NOMINATIM"
      callback={function callback(value) {
        $query.params.geo = value;
      }}
    />
  </div>

  <div id="CatalogSearchBarFilterBar">
    <SearchFiltersMobile />
  </div>
</div>

<style lang="scss">
  #CatalogSearchBar {
    display: grid;
    grid-template-columns: 1fr;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
    box-sizing: border-box;
    border-bottom: 1px solid $borderColor;
    padding: 0.5rem;
    height: min-content;

    #CatalogSearchBarFilterBar {
      display: block;
      max-width: 500px;
      width: 100%;
    }
    #CatalogSearch {
      display: grid;
      gap: .25rem;
      max-width: 500px;
      width: 100%;
    }
  }
</style>
