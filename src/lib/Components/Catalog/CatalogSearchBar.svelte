<script>
  import { CATALOG_FILTER_CONSTANTS } from "../../constants";
  import Dropdown from "../General/Dropdown.svelte";
  import MultiSelect from "../General/MultiSelect.svelte";
</script>

<div id="CatalogSearchBar">
  <div id="CatalogSearchBarSearch">
    <input type="text" placeholder="keyword search" />
    <input type="text" placeholder="spatial search" />
    <button>Draw Search</button>
  </div>

  <div id="CatalogSearchBarFilterBar">
    <Dropdown title="Availability">
      <MultiSelect options={CATALOG_FILTER_CONSTANTS.AVAILABILITY} />
    </Dropdown>
    <Dropdown title="Categories">
      <MultiSelect options={CATALOG_FILTER_CONSTANTS.CATEGORIES} />
    </Dropdown>
    <Dropdown title="File Type">
      <MultiSelect options={CATALOG_FILTER_CONSTANTS.FILETYPE} />
    </Dropdown>
    <button>Date Range</button>
    <select>
      <option>NEWEST</option>
      <option>OLDEST</option>
      <option>A-Z</option>
      <option>Z-A</option>
    </select>
  </div>
</div>

<style lang="scss">
  #CatalogSearchBar {
    display: grid;
    gap: 0.5rem;
    box-sizing: border-box;
    padding-bottom: 0.75rem;
    padding-top: 0.75rem;
    border-bottom: 1px solid $borderColor;
    padding: 0.5rem;
    height: min-content;

    #CatalogSearchBarFilterBar {
      display: inline-flex;
      gap: 0.25rem;
      flex-wrap: wrap;
      gap: 0.25rem;
    }
    #CatalogSearchBarSearch {
      display: inline-flex;
      gap: 0.25rem;
      flex-wrap: wrap;
    }
  }
</style>
