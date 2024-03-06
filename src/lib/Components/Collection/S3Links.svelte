<script>
    import CopyLink from "../General/CopyLink.svelte";
    const { collection, topfolder} = $$props;

</script>

{#if collection.s_three_key}
<section class="metadata-section s3-url">
  <h2>s3 url</h2>
  <CopyLink
    href={`https://tnris-data-warehouse.s3.us-east-1.amazonaws.com/index.html?prefix=${topfolder}/collection/` +
      collection.s_three_key}
    title={`https://tnris-data-warehouse.s3.us-east-1.amazonaws.com/index.html?prefix=${topfolder}/collection/` +
      collection.s_three_key}
  />
</section>
<section class="metadata-section s3-uri">
  <h2>s3 uri</h2>
  <CopyLink
    href={`s3://tnris-data-warehouse/${topfolder}/collection/` +
      collection.s_three_key}
    title={`s3://tnris-data-warehouse/${topfolder}/collection/` +
      collection.s_three_key}
  />
</section>
{/if}