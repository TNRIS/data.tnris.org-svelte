<script>
  import CopyLink from "../General/CopyLink.svelte";
  import AboutLidar from "./Metadata/AboutLidar.svelte";
  import HistoricProducts from "./Metadata/HistoricProducts.svelte";
  import HistoricScannedIndexes from "./Metadata/HistoricScannedIndexes.svelte";
  import LicenseInfo from "./Metadata/LicenseInfo.svelte";
  import SupplementalDownloads from "./Metadata/SupplementalDownloads.svelte";
  import WmsPreview from "./WmsPreview.svelte";
  import S3Links from "./S3Links.svelte";
  import Citation from "./Metadata/Citation.svelte";
  import SpatialReferenceLinks from "./Metadata/SpatialReferenceLinks.svelte";
  import MetadataField from "./Metadata/MetadataField.svelte";

  export let collection = {};

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
    { key: "about", label: "description" },
    { key: "acquisition_date", label: "acquisition date" },
    { key: "category", label: "category" },
    { key: "source_name", label: "source name" },
    { key: "collection", label: "mission identifier" },
    { key: "media_type", label: "media type" },
    { key: "general_scale", label: "general scale" },
    { key: "source_abbreviation", label: "source abbreviation" },
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
    <section class="metadata-section">
      <h2>collection id</h2>
      <p>{collection.collection_id}</p>
    </section>
  {/if}
  {#if collection.name}
    {#if collection.category.includes("Historic_Imagery") && collection.template != "tnris-download"}
      <section class="metdata-section">
        <h2>About the Historic Imagery Archive</h2>
        <p>
          The Historical Imagery Archive maintained by TxGIO is one of our most
          used and important data collections. It is comprised of over 1 million
          frames of photos covering all parts of Texas from dates as far back as
          the 1920s.
        </p>
        <p>
          The TxGIO Research & Distribution Center (RDC) is charged with
          preserving this collection, distributing it to the public, and
          continuing with the large task of digitizing the frames.
        </p>
      </section>
      {#each orderedHistoricFields as field}
        {#if collection[field.key] !== "null" && collection[field.key] !== "undefined" && collection[field.key]}
          <section class="metadata-section">
            <h2>{field.label}</h2>
            {@html collection[field.key]}
          </section>
        {/if}
      {/each}

      <!-- Limit the S3 download to these abbreviations. -->
      {#if ["AV", "ASCS", "AMNN", "BAFB", "CAPCOG", "COA", "FCD", "HAS", "IBWC", "IS", "LCRA", "MKD", "MC", "MLR", "MJH", "MPSI", "NGS", "NHA", "NPS", "TAMFS", "TXDOT", "TFS", "GLO", "TPWD", "TWC", "TBN", "TCAD", "USDA", "WLCE", "WQC", "WMSH", "USACE"].indexOf(collection.source_abbreviation) > -1}
        <S3Links {collection} topfolder={"LORE"} />
      {/if}
      <section class="metadata-section">
        <h2>Scan Status</h2>
        {collection.fully_scanned ? "Completed" : "In Progress"}
      </section>
      {#if collection.index_service_url}
        <section class="metadata-section">
          <h2>wms link</h2>
          <p>
            This dataset is available as an online mapping service. An OGC WMS
            service and an ArcGIS service are available. To connect to the WMS
            service in your software, please copy the unique url provided in the
            box below. To access the TxGIO ArcGIS Server, please use the
            following url in your ESRI software and select from the list of
            available services.
          </p>
          <CopyLink
            href={collection.index_service_url}
            title={collection.index_service_url}
          />
        </section>
      {/if}
      {#if collection.index_service_url}
        <WmsPreview
          wms_link={collection.index_service_url}
          src_params={`&mode=tile&tilemode=gmap&tile={x}+{y}+{z}&layers=all&map.imagetype=image/png&transparent=true`}
        />
      {/if}
      <HistoricScannedIndexes metadata={collection} />
      <HistoricProducts metadata={collection} />
      <LicenseInfo metadata={collection} />
    {:else}
      <AboutLidar metadata={collection} />
      {#each orderedContemporaryFields as field}
        {@const isUrl = isValidUrl(collection[field.key])}
        {#if collection[field.key] !== "null" && collection[field.key] !== "undefined" && collection[field.key]}
          {#if field.key == "spatial_reference"}
            <SpatialReferenceLinks {field} {collection} showLink={true} />
          {:else}
            <MetadataField {field} {collection} {isUrl} />
          {/if}
        {/if}
      {/each}
      {#if collection.wms_link}
        <section class="metadata-section">
          <h2>wms link</h2>
          <p>
            This dataset is available as an online mapping service. An OGC WMS
            service and an ArcGIS service are available. To connect to the WMS
            service in your software, please copy the unique url provided in the
            box below. To access the TxGIO ArcGIS Server, please use the
            following url in your ESRI software and select from the list of
            available services.
          </p>

          <p>
            For ESRI users accessing our RESTful Services hosted on our ArcGIS
            server (feature.geographic.texas.gov or
            imagery.geographic.texas.gov), you may access all WMS services
            available by downloading our <a
              href="https://tnris-data-warehouse.s3.us-east-1.amazonaws.com/LCD/collection/txgio_restful_services/TxGIO_RESTful_Services.zip"
              download>feature and imagery connection files</a
            > and selecting from the list of availabile services within your ESRI
            desktop software.
          </p>
          <CopyLink href={collection.wms_link} title={collection.wms_link} />
          <WmsPreview wms_link={collection.wms_link} />
        </section>
      {/if}
      <SupplementalDownloads metadata={collection} />
      <S3Links {collection} topfolder={"LCD"} />
      <LicenseInfo metadata={collection} />
    {/if}
  {/if}
  <Citation {collection} buttonText="Copy Citation" isPlaintext={true} />
</section>

<style lang="scss">
  h2 {
    text-transform: capitalize;
  }
  #metadata-tab-container {
    font-size: 0.9rem;
    max-height: 100%;
    width: 100%;
    overflow-y: auto;
    white-space: pre-line;
    .metadata-section {
      border-bottom: 1px solid #ccc;
      padding-bottom: 0.5rem;
    }
  }
</style>
