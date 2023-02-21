<script lang="ts">
  import { pattern, prefs } from "svelte-pathfinder";
  import { cartOpen } from "../Api/Cart/cartStore";
  import Cart from "./Cart/Cart.svelte";
  import Catalog from "./Catalog/Catalog.svelte";
  import Collection from "./Collection/Collection.svelte";
  import Drawer from "./General/Drawer.svelte";
  import MapLibre from "./Map/MapLibre.svelte";

  prefs.array.format = "separator";

  const checkShowMap = (pattern) => {
    const show = pattern("/") || pattern("") || pattern("/collection");

    return show;
  };

  $: showMap = checkShowMap($pattern);
</script>

<div id={"main-app-container"}>
  {#if $pattern("/") || $pattern("")}
    <section id="left-pane"><Catalog /></section>
  {/if}

  {#if $pattern("/collection")}
    <section id="left-pane"><Collection /></section>
  {/if}

  {#if $pattern("/order")}
    <h1>ORDER</h1>
  {/if}

  {#if showMap}
    <section id="right-pane">
      <MapLibre />
    </section>
  {/if}
</div>
<Drawer bind:open={$cartOpen}>
  <Cart />
</Drawer>

<style lang="scss">
  #main-app-container {
    display: grid;
    position: relative;
    grid-template-columns: minmax(0, 2fr) 3fr;
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
    }

    #left-pane {
      padding: 0.5rem;
    }

    @media (max-width: 1000px) {
      grid-template-columns: minmax(0, 1fr);
      grid-template-rows: 1fr 3fr;
      grid-auto-flow: dense;
      gap: 0;

      #left-pane,
      #right-pane {
        padding: 0;
      }
      #left-pane {
        order: 2;
      }
      #right-pane {
        order: 1;
      }
    }
  }
</style>
