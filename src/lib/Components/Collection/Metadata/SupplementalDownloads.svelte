<script>
  export let metadata = {};

  const supplements = [
    "supplemental_report_url",
    "lidar_breaklines_url",
    "tile_index_url",
    "lidar_buildings_url",
  ];

  $:show = () => {
    return supplements.find((s) => {
      //console.log(metadata[s]);
      metadata[s] != "";
    });
  };
</script>

{#if show }
  <section>
    <h2>supplemental downloads</h2>
    <div>
      {#each supplements as s}
        {#if metadata[s]}
          <div class="supplemental-link">
            <div>{s.replaceAll("_", " ")}</div>
            <div><a href={metadata[s]}><i class="material-icons">download</i>Download</a></div>
          </div>
        {/if}
      {/each}
    </div>
  </section>
{/if}

<style lang="scss">
  section {
    border-bottom: solid 1px #ccc;
    div.supplemental-link {
        display: grid;
        grid-template-columns: 1fr auto;
        justify-content: stretch;
        padding: .25rem;
        border-top: solid 1px #ccc
    }
  }
</style>
