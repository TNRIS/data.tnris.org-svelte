<script>
  export let collection;
</script>

<div class="catalogItem">
  <div
    class="catalogItemThumbnail"
    style="background-image: url({collection.thumbnail_image})"
  />
  <div id={collection.collection_id} class="catalogItemMeta">
    <h2><a href="#{collection.collection_id}">{collection.name}</a></h2>
  </div>
</div>

<style lang="scss">
  .catalogItem {
    display: grid;
    grid-template-columns: 1fr 3fr;
    gap: .25rem;
    min-height: 120px;
    border-bottom: solid 1px #ccc;
    padding: 0.1rem;
    .catalogItemMeta {
      padding: 1rem;
    }
    .catalogItemThumbnail {
      background-position: center;
      background-repeat: no-repeat;
      background-size: cover;
      max-height: 120px;
    }
  }
</style>
