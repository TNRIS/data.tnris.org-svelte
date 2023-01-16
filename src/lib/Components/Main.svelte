<script lang="ts">
  import { pattern, prefs } from "svelte-pathfinder";
  import { cartOpen } from "../Api/Cart/cartStore";
  import Cart from "./Cart/Cart.svelte";
  import CartItems from "./Cart/CartItems.svelte";
  import Catalog from "./Catalog/Catalog.svelte";
  import Collection from "./Collection/Collection.svelte";
  import Drawer from "./General/Drawer.svelte";
  import MapLibre from "./Map/MapLibre.svelte";

  prefs.array.format = "separator";
</script>

<div id={"main-app-container"}>
  <section id="left-pane">
    {#if $pattern("/")}
      <Catalog />
    {/if}
    {#if $pattern("/collection")}
      <Collection />
    {/if}
  </section>

  <section id="right-pane">
    <MapLibre />
  </section>
  <!-- <div id="map-controls"></div> -->
</div>
<Drawer bind:open={$cartOpen}>
  <Cart />
</Drawer>

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

      /* #map-controls {
        width: 10rem;
        height: 16rem;
        background: white;
        display: block;
        position: absolute;
        margin: 1rem;
        border-radius: .25rem;
        box-shadow: inset 2px 2px 6px #cccccc97, inset -1px -1px 6px #cccccc97;
      } */
    }

    @media (max-width: 1000px) {
      grid-template-columns: 1fr;
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
