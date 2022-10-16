<script>
</script>

<div id="CatalogNavBar">
  <div id="CatalogNavBarSearch">
    <input type="text" />
    <input type="text" />
    <button>Draw Search</button>
  </div>

  <div id="CatalogNavBarFilterBar">
    <button>Availability</button>
    <button>Category</button>
    <button>File Type</button>
    <button>Date Range</button>
    <select>
      <option>NEWEST</option>
      <option>OLDEST</option>
      <option>A-Z</option>
      <option>Z-A</option>
    </select>
  </div>
</div>

<style lang="scss">
  #CatalogNavBar {
    padding: 0.25rem 0.5rem;
    display: grid;
    gap: .25rem;
    border-bottom: solid 1px #ccc;

    #CatalogNavBarFilterBar {
      grid-template-rows: masonry;
      flex-direction: row;
    }
  }
</style>
