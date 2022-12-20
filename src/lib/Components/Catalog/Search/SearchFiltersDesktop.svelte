<script>
  import { query } from "svelte-pathfinder";
  import { CATALOG_FILTER_CONSTANTS } from "../../../constants";
  import Dropdown from "../../General/Dropdown.svelte";
  import MultiSelect from "../../General/MultiSelect.svelte";
  import CatalogSort from "./CatalogSort.svelte";
  import DatesRange from "./DatesRange.svelte";
</script>

<Dropdown
  title="Availability"
  indicator={$query.params.availability !== undefined &&
  $query.params.availability != ""
    ? $query.params.availability.toString().split(",").length
    : null}
>
  <MultiSelect
    options={CATALOG_FILTER_CONSTANTS.AVAILABILITY}
    value={$query.params.availability !== undefined
      ? $query.params.availability.toString().split(",")
      : []}
    callback={function callback(value) {
      $query.params.availability = value;
    }}
  />
</Dropdown>
<Dropdown
  title="Categories"
  indicator={$query.params.category !== undefined &&
  $query.params.category != ""
    ? $query.params.category.toString().split(",").length
    : null}
>
  <MultiSelect
    options={CATALOG_FILTER_CONSTANTS.CATEGORIES}
    value={$query.params.category !== undefined
      ? $query.params.category.toString().split(",")
      : []}
    callback={function callback(value) {
      $query.params.category = value;
    }}
  />
</Dropdown>
<Dropdown
  title="File Type"
  indicator={$query.params.file_type != undefined &&
  $query.params.file_type != ""
    ? $query.params.file_type.toString().split(",").length
    : null}
>
  <MultiSelect
    options={CATALOG_FILTER_CONSTANTS.FILETYPE}
    value={$query.params.file_type != undefined
      ? $query.params.file_type.toString().split(",")
      : []}
    callback={function callback(value) {
      $query.params.file_type = value;
    }}
  />
</Dropdown>
<Dropdown title="Date Range" indicator={$query.params.dates ? "set" : null}>
  <DatesRange />
</Dropdown>
<CatalogSort
  value={$query.params.sort != undefined
    ? $query.params.sort
    : "-acquisition_date"}
  callback={function callback(value) {
    $query.params.sort = value;
  }}
/>
