<script lang="ts">
  import { pattern, prefs } from "svelte-pathfinder";
  import { cartOpen } from "../Api/Cart/cartStore";
  import Cart from "./Cart/Cart.svelte";
  import Catalog from "./Catalog/Catalog.svelte";
  import Metrics from "./Metrics/Metrics.svelte";
  import Drawer from "./General/Drawer.svelte";
  import MapLibre from "./Map/MapLibre.svelte";
  import Order from "./Order/Order.svelte";
  import CollectionContainer from "./Collection/CollectionContainer.svelte";
  import Modal from "./General/Modal.svelte";

  prefs.array.format = "separator";

  const checkShowMap = (pattern) => {
    const show = pattern("/") || pattern("") || pattern("/collection");

    return show;
  };

  $: showMap = checkShowMap($pattern);

  function acknowledge() {
    let acknowledged = localStorage.getItem("02_08_24_acknowledgement");
    localStorage.setItem("02_08_24_acknowledgement", "false");

    return acknowledged;
  }

  let show = acknowledge() !== "false";
</script>

<div id={showMap ? "main-app-container-split" : "main-app-container"}>
  {#if $pattern("/") || $pattern("")}
    <section id="left-pane"><Catalog /></section>
  {/if}

  {#if $pattern("/collection")}
    <section id="left-pane"><CollectionContainer /></section>
  {/if}

  {#if $pattern("/metrics")}
    <Metrics />
  {/if}

  {#if $pattern("/order/*")}
    <Order />
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
<Modal open={show}>
  <h1 slot="title">Easy Access to Historic Imagery</h1>
  <div slot="content">
    <span>Individual imagery frames and indices for the Historical Imagery Archive collections are now available for download! Access and explore the digital archive of the historic imagery collections via a clickable hyperlink, located in the metadata for the historic collection. The Historical Imagery Archive maintained by TxGIO is one of our most used and important data collections. It is comprised of over 1 million frames of photos covering all parts of Texas from dates as far back as the 1920s.</span>
  </div>
</Modal>
<style lang="scss">
  #main-app-container-split {
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
      padding: .5rem;
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

  #main-app-container {
    display: grid;
    grid-template-columns: 1fr;
    justify-content: center;
    align-content: start;
    overflow: hidden;
  }
</style>
