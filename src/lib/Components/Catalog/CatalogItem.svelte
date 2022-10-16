<script>
  export let collection;

  const addCollectionExtent = (the_geom) => {
    console.log(the_geom);
  };
</script>

<div
  class="catalogItem"
  on:mouseenter={() => addCollectionExtent(collection.the_geom)}
>
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
    gap: 0.25rem;
    min-height: 120px;
    border-radius: 0.5rem;
    padding: 0.1rem;
    background: white;
    box-shadow: $boxShadow-xxs;
    border: 1px solid #efefef;

    .catalogItemMeta {
      padding: 0.5rem;

      h2,
      a {
        font-size: 1.2rem;
        font-weight: 600;
        text-decoration: none;

        &:visited {
          color: $primaryColor;
        }
        color: #333;
      }
    }
    .catalogItemThumbnail {
      background-position: center;
      background-repeat: no-repeat;
      background-size: cover;
      max-height: 120px;
      border-radius: 0.25rem 0rem 0rem 0.25rem;
    }
  }
</style>
