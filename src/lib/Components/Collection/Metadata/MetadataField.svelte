<script>
  export let field;
  export let collection;
  export let isUrl;
</script>


<section class="metadata-section">
  <h2>{field.label}</h2>
  {#if isUrl}
    <div>
      <a href={collection[field.key]} rel="noreferrer" target="_blank">
          {collection[field.key]}
      </a>
    </div>
  {:else}
    {@html collection[field.key]}
  {/if}
</section>

<style lang="scss">
  h2 {
    text-transform: capitalize;
  }

  .metadata-section {
    border-bottom: 1px solid #ccc;
    padding-bottom: 0.5rem;
  }

</style>
