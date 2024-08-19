<script>
  import CopyLink from "../../General/CopyLink.svelte";

  const { collection } = $$props;

  const now = new Date();
  const dateString = new Date(now.getTime() - now.getTimezoneOffset() * 60000)
    .toISOString()
    .split("T")[0];
  const sourceCitationText = `${collection.source_name} (${collection.source_abbreviation}). ${collection.name}, ${collection.acquisition_date}. Web. ${dateString}.`;
</script>

<section class="metadata-section collection-citation">
  <h2>Collection Citation</h2>
  <CopyLink isPlaintext title={sourceCitationText} buttonText={"Copy Citation"}></CopyLink>
</section>
