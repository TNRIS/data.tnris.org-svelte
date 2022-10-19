<script>
  import Catalog from "./Catalog/Catalog.svelte";
  import MapLibre from "./Map/MapLibre.svelte";
  import { Router, Route } from "svelte-navigator";
  import Collection from "./Collection/Collection.svelte";

  window.addEventListener("popstate", (e) => {
    console.log(e);
  });

  window.addEventListener("hashchange", (e) => {
    console.log(e);
  });
</script>

<Router>
  <div id={"main-app-container"}>
    <section id="left-pane">
      <Route path="/">
        <Catalog />
      </Route>
      <Route path="/collection">
        <Collection />
      </Route>
    </section>

    <section id="right-pane">
      <MapLibre />
    </section>
  </div>
</Router>

<style lang="scss">
  #main-app-container {
    display: grid;
    position: relative;
    grid-template-columns: 2fr 3fr;
    grid-template-rows: auto;
    width: 100%;
    max-width: 1600px;
    margin: auto;
    height: 100%;
    overflow: hidden;

    #left-pane,
    #right-pane {
      display: flex;
      overflow: hidden;
      background-color: white;
      padding: 1rem 0.5rem;
    }

    @media (max-width: 1000px) {
      grid-template-columns: 1fr;
      grid-template-rows: 1fr 3fr;
      grid-auto-flow: dense;
      gap: 0;

      #left-pane, #right-pane {
        padding: 0;
      }
      #left-pane {
        order: 2
      }
      #right-pane {
        order: 1;
      }
    }
  }
</style>
