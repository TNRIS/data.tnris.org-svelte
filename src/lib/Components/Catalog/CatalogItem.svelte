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

<a href="/collection?c={collection.collection_id}">
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
        <div class="catalog-item-title">
          <h2>{collection.name}</h2>
          <div class="catalog-item-date">
            {new Date(collection.acquisition_date).getFullYear()}
          </div>
        </div>
        <div class="catalog-item-tags">
          {#if collection.category}
            <div class="tags tags-category">
              {#each collection.category.split(",") as cat}
                <div class="tag">{cat.replace("_", " ")}</div>
              {/each}
            </div>
          {/if}
          {#if collection.availability}
            <div class="tags tags-availability">
              {#each collection.availability.split(",") as a}
                <div class="tag">{a.replace("_", " ")}</div>
              {/each}
            </div>
          {/if}
          {#if collection.file_type}
            <div class="tags tags-filetype">
              {#each collection.file_type.split(",") as ft}
                <div class="tag">{ft.replace("_", " ")}</div>
              {/each}
            </div>
          {/if}
        </div>
      </div>
    </div>
  </div>
</a>

<style lang="scss">
  a {
    text-decoration: none;
  }
  .catalog-item-container {
    min-height: 8rem;
    height: fit-content;
    padding: 0.2rem;
    display: grid;
    background: white;
    box-shadow: $boxShadow-xs;
    border: 1px solid #ccc;

    &:hover {
      border: 1px solid #9b9b9b;
      box-shadow: $boxShadow-md;
      cursor: pointer;
    }

    .catalog-item {
      display: grid;
      grid-template-columns: 1fr 3fr;
      gap: 0.25rem;

      .catalog-item-meta {
        padding: 0.125rem;

        .catalog-item-title {
          display: grid;
          grid-template-columns: 1fr auto;
          gap: 1fr;

          h2,
          .catalog-item-date {
            margin-top: 0 !important;
            margin-bottom: 0.5rem !important;
            font-size: 1.25rem !important;
            line-height: 1 !important;
          }
          .catalog-item-date {
            color: #666;
          }
        }

        .catalog-item-tags {
          display: grid;
          grid-template-rows: auto auto auto;
          font-size: 0.8rem;
          gap: 0.5rem;

          .tags {
            display: flex;
            flex-wrap: wrap;
            gap: 0.25rem;
            font-weight: 600;
            .tag {
              padding: 0.125rem 0.25rem;
              white-space: nowrap;
            }
          }
        }

        .tags-filetype {
          .tag {
            border: solid 1px #ccc;
            border-left: solid 0.125rem #a86b08;
          }
        }
        .tags-availability {
          .tag {
            border: solid 1px #ccc;
            border-left: solid 0.125rem #333;
          }
        }
        .tags-category {
          .tag {
            border: solid 1px #ccc;
            border-left: solid 0.125rem #25825f;
          }
        }
      }
      .catalog-item-thumbnail {
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
        max-height: 100%;
      }
    }
  }
</style>
