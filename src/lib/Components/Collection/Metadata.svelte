<script>
  export let collection;

  const orderedContemporaryFields = [
    { key: "description", label: "description" },
    { key: "acquisition_date", label: "acquisition date" },
    { key: "partners", label: "partners" },
    { key: "source_name", label: "source name" },
    { key: "source_website", label: "source website" },
    { key: "source_data_website", label: "source data website" },
    { key: "source_contact", label: "source contact" },
    { key: "spatial_reference", label: "spatial reference" },
    { key: "file_type", label: "file type" },
    { key: "download_formats", label: "download formats" },
    { key: "band_types", label: "bands" },
    { key: "resolution", label: "resolution" },
    { key: "category", label: "category" },
  ];
  const orderedHistoricFields = [
    { key: "source_name", label: "source name" },
    { key: "collection", label: "mission identifier" },
    { key: "media_type", label: "media type" },
    { key: "general_scale", label: "general scale" },
  ];
</script>

<section id="metadata-tab-container">
  {#if collection.name}
    {#if collection.category.includes("Historic_Imagery")}
      {#each orderedHistoricFields as field}
        {#if collection[field.key] !== "null" && collection[field.key] !== "undefined" && collection[field.key]}
          <section>
            <h2>{field.label}</h2>
            {@html collection[field.key]}
          </section>
        {/if}
      {/each}
    {:else}
      {#each orderedContemporaryFields as field}
        {#if collection[field.key] !== "null" && collection[field.key] !== "undefined" && collection[field.key]}
          <section class="metadata-section">
            <h2>{field.label}</h2>
            {@html collection[field.key]}
          </section>
        {/if}
      {/each}
    {/if}
  {/if}
</section>

<style lang="scss">
  #metadata-tab-container {
    max-height: 100%;
    width: 100%;
    overflow-y: scroll;
    white-space: pre-line;
    .metadata-section {
      border-bottom: 1px solid #ccc;
      padding-bottom: .5rem;
    }
    h2,
    h3,
    h4 {
      font-variant: small-caps;
    }
  }
</style>
