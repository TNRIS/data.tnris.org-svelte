<script lang="ts">
  import type { Collection } from "src/lib/Api/Collections/Controller/Collection";
import CollectionContactForm from "./Contact/CollectionContactForm.svelte";
  import CustomOrderForm from "./CustomOrder/CustomOrderForm.svelte";
  import Metadata from "./Metadata.svelte";
  import ResourcesContainer from "./Resources/ResourcesContainer.svelte";

  export let collection;
  export let collectionCtrl: Collection;

  const tabs = ["Metadata", "Downloads", "Custom Order", "Contact"];
  let active = "Metadata";
</script>

<div id="collection-info-header">
  <a href="/" class="link back-button"
    ><i class="material-icons">arrow_back</i></a
  >
  <h1>
    {collection?.name}
  </h1>
</div>
<div id="collection-tabs-wrapper">
  <div id="collection-tabs-nav">
    {#each tabs as tab}
      <button
        class="tab-button"
        class:active={active == tab}
        on:click={() => (active = tab)}>{tab}</button
      >
    {/each}
  </div>
  <div class="collection-tab-container">
    <div class="collection-tab" class:active={active == "Metadata"}>
      <Metadata {collection} />
    </div>
    <div class="collection-tab" class:active={active == "Downloads"}>
      <ResourcesContainer
        collectionCtrl={collectionCtrl}
        collectionId={collection.collection_id}
      />
    </div>
    <div class="collection-tab" class:active={active == "Custom Order"}>
      <CustomOrderForm {collection} />
    </div>
    <div class="collection-tab" class:active={active == "Contact"}>
      <CollectionContactForm {collection} />
    </div>
  </div>
</div>

<style lang="scss">
  #collection-info-header {
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    gap: 1rem;

    a.back-button {
      i.material-icons {
        color: $primaryColor;
        font-size: 1.5rem;
      }
    }
  }
  #collection-tabs-wrapper {
    display: grid;
    grid-template-rows: auto 1fr;
    grid-template-columns: 1fr;
    justify-content: center;
    height: 100%;
    width: 100%;
    overflow: hidden;

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

      button {
        width: 100%;
        height: 100%;
        padding: 0.5rem;
        border-bottom: none;

        &.active {
          color: white;
          background: $primaryColor;
        }
      }
    }

    .collection-tab-container {
      display: grid;
      grid-template-rows: 1fr;
      grid-template-columns: 1fr;
      overflow-y: auto;
      .collection-tab {
        display: none;
        grid-template-columns: minmax(1fr, 1fr);
        grid-template-rows: 1fr;
        gap: 0.5rem;
        border: solid 1px $borderColor;
        padding: 0.25rem;
        height: fit-content;

        &.active {
          display: grid;
        }
      }
    }
  }
</style>
