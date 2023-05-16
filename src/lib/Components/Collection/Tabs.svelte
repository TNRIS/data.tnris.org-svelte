<script>
  import { query } from "svelte-pathfinder";
  import InfoBox from "../General/InfoBox.svelte";
  import CollectionContactForm from "./Contact/CollectionContactForm.svelte";
  import CustomOrderForm from "./CustomOrder/CustomOrderForm.svelte";
  import Downloads from "./Downloads.svelte";
  import Metadata from "./Metadata.svelte";

  export let collection = {};

  const tabs = ["Metadata", "Downloads", "Custom Order", "Contact"];
  $query.params.activeTab = "Metadata";
  const setActiveTab = (tab) => {
    $query.params.activeTab = tab;
  };
</script>

<div id="collection-tabs-container">
  <div id="collection-tabs-nav">
    {#each tabs as tab}
      <button
        class={`tab-button${
          $query.params.activeTab === tab ? " active-tab" : ""
        }`}
        on:click={() => setActiveTab(tab)}>{tab}</button
      >
    {/each}
  </div>
  <div
    class="collection-tab"
    class:active={$query.params.activeTab == "Metadata"}
  >
    <Metadata {collection} />
  </div>
  <div
    class="collection-tab"
    class:active={$query.params.activeTab == "Downloads"}
  >
    <Downloads collection_id={collection.collection_id} />
  </div>
  <div
    class="collection-tab"
    class:active={$query.params.activeTab == "Custom Order"}
  >
    <CustomOrderForm {collection} />
  </div>
  <div
    class="collection-tab"
    class:active={$query.params.activeTab == "Contact"}
  >
    <CollectionContactForm {collection} />
  </div>
</div>

<style lang="scss">
  #collection-tabs-container {
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    grid-template-rows: auto 1fr;
    justify-content: center;
    height: 100%;
    width: 100%;
    min-height: 0px;

    .collection-tab {
      display: none;
      grid-template-columns: minmax(0, 1fr);
      grid-template-rows: auto 1fr;
      gap: 0.5rem;
      border: solid 1px $borderColor;
      padding: 0.25rem;
      min-height: 0px;

      &.active {
        display: grid;
      }
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
      overflow-x: auto;

      .tab-button {
        width: 100%;
        height: 100%;
        padding: 0.5rem;
        border-bottom: none;

        &.active-tab {
          color: white;
          background: $primaryColor;
        }
      }
    }
  }
</style>
