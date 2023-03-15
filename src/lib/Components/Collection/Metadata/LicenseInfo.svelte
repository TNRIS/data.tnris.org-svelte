<script>
  import CopyLink from "../../General/CopyLink.svelte";

  export let metadata = {};
</script>

{#if metadata.license_name && metadata.license_url && metadata.license_abbreviation}
  <section>
    <h2>License Info</h2>
    <CopyLink href={metadata.license_url} title={
        `${metadata?.license_name}(${metadata.license_abbreviation})`
    }/>
  </section>
{/if}
