<script>
  // @ts-nocheck

  import { cartOpen, cartStore } from "../../../Api/Cart/cartStore";
  import InfoBox from "../../General/InfoBox.svelte";
  // @ts-nocheck
  import { LIDAR_FORMATS } from "../../../constants";

  import HistoricFields from "./HistoricFields.svelte";

  export let collection;
  let formats = [];
  $: isHistoric = collection?.category?.includes("Historic_Imagery");
  $: isLidar = collection?.category?.includes("Lidar");

  let dataPortion;
  let dataDescriptionType;
  let dataDescription;

  function handleMultiples(id) {
    formats = "";
    var options = document.getElementById(id).options;
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        formats += `${options[i].value}, `;
      }
    }
    if (formats.length > 2) {
      // Delete trailing comma
      formats = formats.slice(0, -2);
      // Update the multiselect value then assign it to select box.
      document.querySelector(`#${id} option.multiselect`).value = formats;
      document.getElementById(id).value = formats;
    }
  }

  function submit_order() {
    handleMultiples("lidar-format");
    if (document.getElementById("data-format")) {
      handleMultiples("data-format");
    }
  }
</script>

<form
  id="custom-order-form"
  on:submit|preventDefault|stopPropagation={(event) => {
    const data = new FormData(event.target);
    let obj = {};
    for (let field of data) {
      // Files should be stored in an array since there can be multiples
      if (field[1] instanceof File) {
        let files = obj[field[0]];
        if (files) {
          files.push(field[1]);
        } else {
          obj[field[0]] = [field[1]];
        }
      } else {
        const [key, value] = field;
        obj[key] = value;
      }
    }
    cartStore.addItem(obj, collection.collection_id);
  }}
>
  {#if $cartStore && Object.keys($cartStore)?.length > 0 && $cartStore[collection.collection_id]}
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
    <InfoBox infoClass="info">
      Is there no download option for this dataset? Is everything you're looking
      for too large to directly download? Every dataset is available for order
      directly from TNRIS.
    </InfoBox>
    <br />
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
          desired area<br />
          <div class="warning">
            ***Notice- All data submitted to TNRIS is subject to Texas Public
            Information Requests and becomes publicly available. Please do not
            include personal information in your uploaded area of interest
            files.
          </div>
          <input
            accept=".zip,.rar,.7zip"
            bind:files={dataDescription}
            multiple
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
          on a map
          <div class="warning">
            ***Notice- All data submitted to TNRIS is subject to Texas Public
            Information Requests and becomes publicly available. Please do not
            include personal information in your uploaded area of interest
            files.
          </div>
          <input
            accept="image/png, image/jpeg"
            multiple
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
    {#if isLidar}
      <label for="lidar-format" class="required">
        Please select the desired formats of lidar data. Hold Ctrl and Click to
        select multiple.
        <select
          id="lidar-format"
          name="lidar-format"
          multiple
          bind:value={formats}
        >
          {#each LIDAR_FORMATS as opt}
            <option value={opt.value}>{opt.label}</option>
          {/each}
          <option value="" class="multiselect" style="display:none;" />
        </select>
      </label>
    {/if}
    {#if isHistoric}
      <HistoricFields />
    {/if}
    <br />
    <input on:click={submit_order} type="submit" value="add to cart" />
  {/if}
</form>

<style lang="scss">
  form {
    gap: 1rem;
    overflow-y: scroll;
    flex-direction: column;
    width: 100%;
    label {
      width: 100%;
    }
  }
  .warning {
    padding: 1em;
    padding-right: 8em;
    font-size: 0.65em;
  }
</style>
