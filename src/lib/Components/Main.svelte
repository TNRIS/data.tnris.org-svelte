<script>
  import Catalog from "./Catalog/Catalog.svelte";
  import MapLibre from "./Map/MapLibre.svelte";
</script>

<div id={"main-app-container"}>
  <section id="left-pane">
    <Catalog />
  </section>
  <section id="right-pane">
    <MapLibre />
  </section>
</div>

<style lang="scss">
  #main-app-container {
    display: grid;
    position: relative;
    grid-template-columns: 2fr 3fr;
    grid-template-rows: auto;
    max-width: 1600px;
    margin: auto;
    height: 100%;
    overflow: hidden;

    #left-pane,
    #right-pane {
      display: flex;
      overflow: hidden;
      background-color: white;
      padding: 1rem;
    }
  }
</style>
