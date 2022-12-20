<script>
  import { query } from "svelte-pathfinder";
  import DualRangeSlider from "../../General/DualRangeSlider.svelte";

  let dates = $query.params.dates;

  let range = [1900, new Date().getFullYear()];
  let start =
    dates && String(dates).split(",").length == 2
      ? Number(String(dates).split(",")[0])
      : range[0];
  let end =
    dates && String(dates).split(",").length == 2
      ? Number(String(dates).split(",")[1])
      : range[1];

  const onDatesChangedCallback = (start, end) => {
    $query.params.dates = `${start},${end}`;
  };
</script>

<div id="date-range-search">
  <DualRangeSlider bind:range bind:start bind:end {onDatesChangedCallback} />
  <div class="date-range-inputs">
    <input min={range[0]} max={range[1]} bind:value={start} type="number" />
    <input min={range[0]} max={range[1]} bind:value={end} type="number" />
  </div>
</div>

<style lang="scss">
  #date-range-search {
    display: grid;
    z-index: 999999;

    .date-range-inputs {
      display: grid;
      grid-template-columns: auto auto;
      gap: 1rem;
      max-width: 90%;
      justify-content: space-between;
      input {
        max-width: 5rem;
      }
    }
  }
</style>
