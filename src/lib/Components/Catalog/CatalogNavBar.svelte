<script>
</script>

<div id="CatalogNavBar">
  <div id="CatalogNavBarSearch">
    <input type="text" placeholder="keyword search" />
    <input type="text" placeholder="spatial search" />
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
    display: grid;
    gap: .5rem;
    box-sizing: border-box;
    padding-bottom: .75rem;
    padding-top: .75rem;
    border-radius: .5rem;
    box-shadow: $boxShadow-md;
    padding: .5rem;
    height: min-content;

    #CatalogNavBarFilterBar {
      display: inline-flex;
      gap: .25rem;
      flex-wrap: wrap;
      gap: .25rem;
    }
    #CatalogNavBarSearch {
      display: inline-flex;
      gap: .25rem;
      flex-wrap: wrap;
    }
  }
</style>
