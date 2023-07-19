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
    <!-- {#if $query.params.availability}
      Availability: {$query.params.availability.split(",").length}
    {/if} -->
    <div id="catalog-filter-badge-wrapper">
      {#if $query.params.category}<div>
          {#if $query.params.category.toString().split(",").length > 0}
            <button
              class="category filter-indicator-wrapper"
              on:click={() => {
                delete $query.params.category;
                $query.params = $query.params;
              }}
            >
              <div class="filter-indicator-container">
                <div class="filter-indicator">
                  Category: {$query.params.category.toString().split(",")
                    .length} selected
                </div>
                <span><strong>x</strong></span>
              </div>
            </button>
          {/if}
        </div>
      {/if}
      {#if $query.params.availability}<div>
          {#if $query.params.availability.toString().split(",").length > 0}
            <button
              class="availability filter-indicator-wrapper"
              on:click={() => {
                delete $query.params.availability;
                $query.params = $query.params;
              }}
            >
              <div class="filter-indicator-container">
                <div class="filter-indicator">
                  Availability: {$query.params.availability
                    .toString()
                    .split(",").length} selected
                </div>
                <span><strong>x</strong></span>
              </div>
            </button>
          {/if}
        </div>
      {/if}
      {#if $query.params.file_type}<div>
          {#if $query.params.file_type.toString().split(",").length > 0}
            <button
              class="filetype filter-indicator-wrapper"
              on:click={() => {
                delete $query.params.file_type;
                $query.params = $query.params;
              }}
            >
              <div class="filter-indicator-container">
                <div class="filter-indicator">
                  File Type: {$query.params.file_type.toString().split(",")
                    .length} selected
                </div>
                <span><strong>x</strong></span>
              </div>
            </button>
          {/if}
        </div>
      {/if}
    </div>
  </div>
</div>

<style lang="scss">
  #CatalogSearchBar {
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
    box-sizing: border-box;
    border-bottom: 1px solid $borderColor;
    padding: 0.5rem;
    height: min-content;

    #CatalogSearchBarFilterBar {
      display: grid;
      justify-content: flex-start;
      grid-template-columns: 1fr;
      grid-template-rows: auto auto;
      gap: 0.5rem;
      width: 100%;

      #catalog-filter-badge-wrapper {
        display: grid;
        justify-content: start;
        grid-auto-flow: column;
        gap: 0.25rem;

        .filter-indicator-wrapper {
          padding: 0.25rem;
          border: solid 1px #ccc;

          &.filetype {
            border: solid 1px #ccc;
            border-left: solid 0.125rem #a86b08;
          }
          &.availability {
            border: solid 1px #ccc;
            border-left: solid 0.125rem #333;
          }
          &.category {
            border: solid 1px #ccc;
            border-left: solid 0.125rem #25825f;
          }

          .filter-indicator-container {
            display: grid;
            grid-template-columns: auto auto;
            gap: 0.5rem;
            align-items: center;
            justify-content: space-between;

            span {
              padding: 0 0.25rem;
              border: none;
            }
          }
        }
      }
    }

    #CatalogSearch {
      display: grid;
      gap: 0.25rem;
      width: 100%;
    }
  }
</style>
