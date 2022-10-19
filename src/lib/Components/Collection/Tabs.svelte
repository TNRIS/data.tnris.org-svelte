<script>
  import CollectionContact from "./CollectionContact.svelte";
  import CustomOrder from "./CustomOrder.svelte";
  import Downloads from "./Downloads.svelte";
  import Metadata from "./Metadata.svelte";

  let activeTab = "Metadata";

  const setActiveTab = (e) => {
    activeTab = e.target.innerText.replace(" ", "_");
  };
</script>

<div id="collection-tabs-container">
  <div id="collection-tabs-nav">
    <button class="tab-button" on:click={setActiveTab}>Metadata</button>
    <button class="tab-button open" on:click={setActiveTab}>Downloads</button>
    <button class="tab-button" on:click={setActiveTab}>Custom Order</button>
    <button class="tab-button" on:click={setActiveTab}>Contact</button>
  </div>
  <div id="collection-tab">
    {#if activeTab == "Metadata"}
      <Metadata />
    {:else if activeTab == "Downloads"}
      <Downloads />
    {:else if activeTab == "Custom_Order"}
      <CustomOrder />
    {:else if activeTab == "Contact"}
      <CollectionContact />
    {:else}
      <Metadata />
    {/if}
  </div>
</div>

<style lang="scss">
  #collection-tabs-container {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: auto 1fr;
    justify-content: center;
    align-items: top;
    width: 100%;

    #collection-tab {
      display: flex;
      border: solid 1px $borderColor;
      padding: 0.5rem;
      border-bottom-left-radius: 0.5rem;
      border-bottom-right-radius: 0.5rem;
    }

    #collection-tabs-nav {
      width: 100%;
      height: 100%;
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      grid-auto-rows: 1fr;
      justify-content: space-between;
      align-items: flex-end;
      gap: 0.25rem;
      overflow-x: scroll;

      .tab-button {
        width: 100%;
        height: 100%;
        padding: 0.5rem;
        border-radius: 0.5rem 0.5rem 0rem 0rem;
        border-bottom: none;

        &:active,
        &:focus,
        &:hover {
          color: white;
          background: $primaryColor;
        }
      }
    }
  }
</style>
