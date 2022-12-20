<script>
  import HistoricFields from "./HistoricFields.svelte";

  export let collection;
  $: isHistoric = collection?.category?.includes("Historic_Imagery");
  $: isLidar = collection?.category?.includes("Lidar");
  // full or partial
  // if full
  // end
  // if partial
  // case shapefile
  // upload shapefile component
  // case screenshot
  // upload img component
  // case describe it
  // text area component
  // if lidar
  // lidar formats multiselect component
  // if historic
  // Historic imagery format options component
  // add to cart
  let dataPortion;
  let dataDescriptionType;
  let dataDescription;
</script>

<form id="custom-order-form">
  <div>isLidar = {isLidar}; isHistoric = {isHistoric}</div>
  <br />
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
        /></label
      >
    {:else if dataDescriptionType == "Screenshot"}
      <label for="data-description-files" class="required"
        >Please select a .jpeg, .jpg or .png file displaying the desired area on
        a map<input
          accept="image/png, image/jpeg"
          bind:files={dataDescription}
          id="data-description"
          name="data-description"
          type="file"
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
          bind:value={dataDescription}
        />
      </label>
    {/if}
  {/if}
  {#if isHistoric}
    <HistoricFields />
  {/if}
</form>

<style lang="scss">
  
</style>
