<script>
  import { query } from "svelte-pathfinder";
  import { CATALOG_FILTER_CONSTANTS } from "../../../constants";
  import Modal from "../../General/Modal.svelte";
  import MultiSelect from "../../General/MultiSelect.svelte";
  import CatalogSort from "./CatalogSort.svelte";
  import DatesRange from "./DatesRange.svelte";

  let open = false;
</script>

<button
  on:click={() => {
    open = !open;
  }}><i class="material-icons">filter_alt</i>Add Filters</button
>
<Modal bind:open>
  <div slot="title"><h1>Catalog Filters</h1></div>
  <div slot="content">
    <h4>Availability</h4>
    <div class="grid-two-column">
      <MultiSelect
        options={CATALOG_FILTER_CONSTANTS.AVAILABILITY}
        value={$query.params.availability !== undefined
          ? $query.params.availability.toString().split(",")
          : []}
        callback={function callback(value) {
          $query.params.availability = value;
        }}
      />
    </div>
    <h4>Category</h4>
    <div class="grid-two-column">
      <MultiSelect
        options={CATALOG_FILTER_CONSTANTS.CATEGORIES}
        value={$query.params.category !== undefined
          ? $query.params.category.toString().split(",")
          : []}
        callback={function callback(value) {
          $query.params.category = value;
        }}
      />
    </div>
    <h4>File Type</h4>
    <div class="grid-two-column">
      <MultiSelect
        options={CATALOG_FILTER_CONSTANTS.FILETYPE}
        value={$query.params.file_type != undefined
          ? $query.params.file_type.toString().split(",")
          : []}
        callback={function callback(value) {
          $query.params.file_type = value;
        }}
      />
    </div>

    <h4>Sort By</h4>
    <div class="grid-two-column">
      <CatalogSort
        value={$query.params.sort != undefined
          ? $query.params.sort
          : "-acquisition_date"}
        callback={function callback(value) {
          $query.params.sort = value;
        }}
      />
    </div>
    <h4>Date Range</h4>
    <DatesRange />
  </div>
</Modal>

<style lang="scss">
  .grid-two-column {
    display: grid;
    grid-template-columns: repeat(2, minmax(80px, 1fr));
  }
</style>
