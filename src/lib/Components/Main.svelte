<script>
  import Catalog from "./Catalog/Catalog.svelte";
  import AgsMap from "./Map/AgsMap.svelte";
</script>

<div id={"main-app-container"}>
  <section id="left-pane">
    <Catalog />
  </section>
  <section id="right-pane">
    <AgsMap />
  </section>
</div>

<style lang="scss">
  #main-app-container {
    display: grid;
    grid-template-columns: 2fr 3fr;
    max-width: 1600px;
    margin: auto;
    height: 100%;
    width: 100%;
    overflow: hidden;

    #left-pane,
    #right-pane {
    }
    #left-pane {
      overflow-y: scroll;
    }
  }
</style>
