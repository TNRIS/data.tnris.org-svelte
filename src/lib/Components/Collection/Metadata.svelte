<script>
  import CopyLink from "../General/CopyLink.svelte";
  import LicenseInfo from "./Metadata/LicenseInfo.svelte";
  import SupplementalDownloads from "./Metadata/SupplementalDownloads.svelte";

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
    { key: "s_three_key", label: "s3 bucket key" },
  ];

  const isValidUrl = (str) => {
    try {
      return Boolean(new URL(str));
    } catch (e) {
      return false;
    }
  };
</script>

<section id="metadata-tab-container">
  {#if collection.collection_id}
    <h2>collection id</h2>
    <p>{collection.collection_id}</p>
  {/if}
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
        {@const isUrl = isValidUrl(collection[field.key])}
        {#if collection[field.key] !== "null" && collection[field.key] !== "undefined" && collection[field.key]}
          <section class="metadata-section">
            <h2>{field.label}</h2>
            {#if isUrl}
              <div>
                <a href={collection[field.key]} rel="noreferrer" target="_blank"
                  >{collection[field.key]}</a
                >
              </div>
            {:else}
              {@html collection[field.key]}
            {/if}
          </section>
        {/if}
      {/each}
      {#if collection.wms_link}
        <section class="metadata-section">
          <h2>wms link</h2>
          <p>
            This dataset is available as an online mapping service. An OGC WMS
            service and an ArcGIS service are available. To connect to the WMS
            service in your software, please copy the unique url provided in the
            box below. To access the TNRIS ArcGIS Server, please use the
            following url in your ESRI software and select from the list of
            available services.
          </p>
          <CopyLink href={collection.wms_link} title={collection.wms_link} />
        </section>
      {/if}
      {#if collection.s_three_key}
        <section class="metadata-section s3-url">
          <h2>s3 url</h2>
          <CopyLink
            href={"https://tnris-data-warehouse.s3.us-east-1.amazonaws.com/index.html?prefix=LCD/collection/" +
              collection.s_three_key}
            title={"https://tnris-data-warehouse.s3.us-east-1.amazonaws.com/index.html?prefix=LCD/collection/" +
              collection.s_three_key}
          />
        </section>
        <section class="metadata-section s3-uri">
          <h2>s3 uri</h2>
          <CopyLink
            href={"s3://tnris-data-warehouse/LCD/collection/" +
              collection.s_three_key}
            title={"s3://tnris-data-warehouse/LCD/collection/" +
              collection.s_three_key}
          />
        </section>
      {/if}
      <SupplementalDownloads metadata={collection} />
      <LicenseInfo metadata={collection}/>
    {/if}
  {/if}
</section>

<style lang="scss">
  #metadata-tab-container {
    font-size: 0.9rem;
    max-height: 100%;
    width: 100%;
    overflow-y: scroll;
    white-space: pre-line;
    .metadata-section {
      border-bottom: 1px solid #ccc;
      padding-bottom: 0.5rem;
    }
  }
</style>
