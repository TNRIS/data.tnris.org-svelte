<script lang="ts">
  import mapStore from "../Map/mapStore";
  export let collection;

  const collectionCoverageLayerStyle = {
    id: "tnris-collection-coverage",
    type: "fill",
    source: "tnris-collection-coverage",
    minzoom: 2,
    maxzoom: 24,
    paint: {
      "fill-color": "#73808c",
      "fill-opacity": 0.25,
      "fill-outline-color": "#73808C",
    },
  };

  const collectionCoverageOutlineLayerStyle = {
    id: "tnris-collection-coverage-outline",
    type: "line",
    source: "tnris-collection-coverage",
    minzoom: 2,
    maxzoom: 24,
    paint: {
      "line-color": "#fff",
      "line-width": 2,
    },
  };
  const addCollectionExtent = (the_geom) => {
    if ($mapStore && $mapStore.getSource("tnris-collection-coverage")) {
      try {
        $mapStore.removeLayer("tnris-collection-coverage-outline");
        $mapStore.removeLayer("tnris-collection-coverage");
        $mapStore.removeSource("tnris-collection-coverage");
      } catch {
        (e) => {
          console.error(e);
        };
      }
    }
    if ($mapStore) {
      try {
        $mapStore.addSource("tnris-collection-coverage", {
          type: "geojson",
          data: the_geom,
        });
      } catch {
        (e) => console.error(e);
      }
      $mapStore.addLayer(collectionCoverageLayerStyle);
      $mapStore.addLayer(collectionCoverageOutlineLayerStyle);
    }
  };
</script>

<div class="catalog-item-container">
  <div
    class="catalog-item"
    on:mouseenter={() => addCollectionExtent(collection.the_geom)}
  >
    <div
      class="catalog-item-thumbnail"
      style="background-image: url({collection.thumbnail_image})"
    />
    <div id={collection.collection_id} class="catalog-item-meta">
      <h2 class="catalog-item-title">
        <a href="/collection?c={collection.collection_id}" class="link"
          >{collection.name}</a
        >
      </h2>
      <div class="catalog-item-tags">
        <div class="tags tags-date">
          {#each collection.acquisition_date.split(",") as d}
            <div class="tag">{new Date(d).getFullYear()}</div>
          {/each}
        </div>
        <div class="tags tags-category">
          {#each collection.category.split(",") as cat}
            <div class="tag">{cat.replace("_", " ")}</div>
          {/each}
        </div>
        <div class="tags tags-availability">
          {#each collection.availability.split(",") as a}
            <div class="tag">{a.replace("_", " ")}</div>
          {/each}
        </div>
      </div>
    </div>
  </div>
</div>

<style lang="scss">
  .catalog-item-container {
    height: fit-content;
    padding: 0.2rem;
    display: grid;
    background: white;
    box-shadow: $boxShadow-xs;
    border: 1px solid #ccc;

    .catalog-item {
      display: grid;
      grid-template-columns: 1fr 3fr;
      gap: 0.25rem;

      .catalog-item-meta {
        h2.catalog-item-title {
          margin-top: 0 !important;
          margin-bottom: 1.25rem !important;
          font-size: 0.8rem !important;
          line-height: 1 !important;
        }
        padding: 0.125rem;

        :global(.link) {
          font-size: 1rem;
          font-weight: 600;
          text-decoration: none;

          &:visited {
            color: $primaryColor;
          }
          color: #333;
        }
        .catalog-item-tags {
          display: grid;
          grid-template-rows: auto auto auto;
          margin-top: -0.75rem;
          font-size: 0.6rem;
          gap: 0.125rem;

          .tags {
            display: flex;
            gap: 0.25rem;
            font-weight: 600;
            .tag {
              padding: 0.125rem 0.25rem;
            }
          }
        }

        .tags-date {
          .tag {
            background: #a86b08;
            color: white;
          }
        }
        .tags-availability {
          .tag {
            background: #333;
            color: white;
          }
        }
        .tags-category {
          .tag {
            background: #25825f;
            color: white;
          }
        }
      }
      .catalog-item-thumbnail {
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
        max-height: 120px;
      }
    }
  }
</style>
