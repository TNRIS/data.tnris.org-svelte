<script>
  import InfoBox from "../../General/InfoBox.svelte";

  export let metadata = {};

  let indexes = JSON.parse("[" + metadata?.scanned_index_ls4_links + "]");
</script>

{#if indexes.length > 0 && metadata?.scanned_index_ls4_links }
  <section>
    <h2>Scanned Indexes</h2>
    <p>
      This Historic Imagery dataset has scanned indexes (.tif format) available for download. Use the scanned indexes to view this collection's spatial extent and the identification numbers of the individual frames which comprise it.
    </p>
    <InfoBox infoClass="info">
      Frames shown within each index sheet may or may not be availabile due to incomplete collections within the archive.
    </InfoBox>
    <div class="historic-idxs">
      {#each indexes as idx}
        <div class="historic-idx">
          <div class="historic-idx-info">
            <h3>Sheet {idx.sheet} {metadata.source_abbreviation} {idx.year}</h3>
            {idx.size}
          </div>
          <a href={idx.link}><i class="material-icons">download</i> Download</a>
        </div>
      {/each}
    </div>
  </section>
{/if}

<style lang="scss">
  section {
    padding-bottom: 0.5rem;
    border-bottom: solid 1px #ccc;

    .historic-idxs {
      margin-top: .25rem;
      .historic-idx {
        display: grid;
        grid-template-columns: 1fr auto;
        align-items: center;
        padding: 0rem 0.5rem;
        border-top: solid 1px #ccc;

        a {
            border: solid 1px $primaryColor;
            padding: .5rem 1rem;
            text-decoration: none;
        }
      }
    }
  }
</style>
