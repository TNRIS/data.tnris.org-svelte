<script>
  import { query } from "svelte-pathfinder";
  import mapStore, { draw } from "../../Map/mapStore";
  import bbox from "@turf/bbox";

  $: geo = $query.params.geo;
  const onDrawBBox = (e) => {
    const bb = bbox(e.features[0].geometry);
    $query.params.geo = bb.toString();
  };
  $: {
    if (($draw, $mapStore)) {
      $mapStore.on("draw.create", onDrawBBox);
      $mapStore.on("draw.update", onDrawBBox);
    }
  }
</script>

{#if !geo}
  <button
    on:click={(e) => {
      geo = null;
      $draw.deleteAll();
      $draw.changeMode("draw_rectangle");
    }}
  >
    <i class="material-icons">edit</i>&nbsp;Draw Search
  </button>
{/if}
