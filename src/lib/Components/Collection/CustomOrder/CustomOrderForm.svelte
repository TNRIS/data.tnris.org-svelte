<script>
  // @ts-nocheck

  import { cartOpen, cartStore } from "../../../Api/Cart/cartStore";
  import InfoBox from "../../General/InfoBox.svelte";
  // @ts-nocheck

  import HistoricFields from "./HistoricFields.svelte";

  export let collection;
  $: isHistoric = collection?.category?.includes("Historic_Imagery");
  $: isLidar = collection?.category?.includes("Lidar");

  let dataPortion;
  let dataDescriptionType;
  let dataDescription;
</script>

<form
  id="custom-order-form"
  on:submit|preventDefault|stopPropagation={(event) => {
    const data = new FormData(event.target);
    const obj = {};
    for (let field of data) {
      const [key, value] = field;
      obj[key] = value;
    }
    cartStore.addItem(obj, collection.collection_id);
  }}
>
  {#if $cartStore[collection.collection_id]}
    <InfoBox infoClass="success"
      >This item has already been added to your cart. Open the cart to checkout
      or remove items from the cart.</InfoBox
    ><br />
    <button
      class="full-width inverse-colors"
      on:click|preventDefault|stopPropagation={() => ($cartOpen = true)}
      >Open Cart</button
    >
  {:else}
    <input
      bind:value={collection.collection_id}
      id="data-uuid"
      name="data-uuid"
      required
      style="display: none;"
    />
    <input
      bind:value={collection.name}
      id="data-name"
      name="data-name"
      required
      style="display: none;"
    />
    <input
      bind:value={collection.acquisition_date}
      id="data-acquisition-date"
      name="data-acquisition-date"
      required
      style="display: none;"
    />
    <label for="data-portion" class="required">
      Would you like the entire dataset, or just a portion of it?
      <select
        id="data-portion"
        name="data-portion"
        required
        bind:value={dataPortion}
      >
        <option value="Full">Full (Entire Dataset)</option>
        <option value="Partial">Partial (Described Portion)</option>
      </select>
    </label>
    {#if dataPortion == "Partial"}
      <label for="data-description-type" class="required">
        Would you like the entire dataset, or just a portion of it?
        <select
          id="data-description-type"
          name="data-description-type"
          required
          bind:value={dataDescriptionType}
        >
          <option value="Shapefile"
            >Shapefile (.kml, .shp compressed as a .zip file)</option
          >
          <option value="Screenshot">Screenshot (.png, .jpeg)</option>
          <option value="Text">Describe it (text)</option>
        </select>
      </label>

      {#if dataDescriptionType == "Shapefile"}
        <label for="data-description" class="required"
          >Please select a .zip file containing a .shp or .kml outlining the
          desired area
          <input
            accept=".zip,.rar,.7zip"
            bind:files={dataDescription}
            id="data-description"
            name="data-description"
            type="file"
            required
            aria-required="true"
          /></label
        >
      {:else if dataDescriptionType == "Screenshot"}
        <label for="data-description-files" class="required"
          >Please select a .jpeg, .jpg or .png file displaying the desired area
          on a map<input
            accept="image/png, image/jpeg"
            bind:files={dataDescription}
            id="data-description"
            name="data-description"
            type="file"
            required
            aria-required="true"
          /></label
        >
      {:else if dataDescriptionType == "Text"}
        <label for="data-description" class="required">
          Please describe the desired geographic boundary area
          <textarea
            id="data-description"
            name="data-description"
            rows="4"
            cols="60"
            required
            aria-required="true"
            bind:value={dataDescription}
          />
        </label>
      {/if}
    {/if}
    {#if isHistoric}
      <HistoricFields />
    {/if}
    <br />
    <input type="submit" value="add to cart" />
  {/if}
</form>

<style lang="scss">
</style>
