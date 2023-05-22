<script lang="ts">
  import { clickOutside } from "../General/clickOutside";
  export let collectionCtrl = null;
  //options state
  export let showOptions: boolean = false;
  //input
  export let searchInput: string = "";
  export let options: { label: string; value: any }[];

  
  
  //function to filter selections
  let filterOptions = (opts) => {
    if (searchInput) {
      return opts.filter((v) => v.label.toLowerCase().includes(searchInput.toLowerCase()  ));
    } else {
      return options;
    }
  };
  //selected areas
  export let selections = [];
  //toggle area from selections array
  export let toggleSelection = (opt) => {
    if (selections.some((cur) => cur.value == opt.value)) {
      removeSelection(opt);
    } else {
      addSelection(opt);
    }
  };
  //remove area from selections
  export let removeSelection = (opt) =>{
    (selections = selections.filter((cur) => cur.value != opt.value));}
  //add area to selections
  export let addSelection = (opt) => {(selections = [...selections, opt])};
  //clear all areas from selections
  const clearSelections = () => {
    selections = [];
  };

  $: filteredOptions = filterOptions(options);

</script>

{#if options && filteredOptions}
  <div
    class="select-search-container"
    use:clickOutside
    on:click_outside={() => (showOptions = false)}
    on:keydown={() => null}
  >
    <div class="select-search">
      <input
        id="spatial-search-bar"
        type="search"
        placeholder="select download areas"
        bind:value={searchInput}
        on:change={e => console.log(e)}
        on:keyup={() => filteredOptions = filterOptions(options)}
        on:click={() => {
          showOptions = true;
        }}
      />

      <div class={`${showOptions ? "open " : "closed "}select-search-results`}>
        {#each filteredOptions as opt}
          <a
            class="select-search-result"
            href="/"
            class:selected={selections.some((cur) => cur.value == opt.value)}
            on:click|preventDefault|stopPropagation={() => toggleSelection(opt)}
          >
            {opt.label}
          </a>
        {/each}
      </div>
    </div>
    <div class="selection-search-tag-container">
      {#each selections as s}
        <div class="selection-tag">
          {s.label}
          <button
            class="selection-tag-button"
            on:click={() => removeSelection(s)}>X</button
          >
        </div>
      {/each}
      {#if selections.length >= 1}
        <div class="selection-tag">
          Clear Selections
          <button
            class="selection-tag-button"
            on:click={() => clearSelections()}>X</button
          >
        </div>
      {/if}
    </div>
  </div>
{:else}
  <div>no options</div>
{/if}

<style lang="scss">
  .select-search-container {
    display: grid;
    grid-template-rows: auto 1fr;
    width: 100%;
    .select-search {
      input {
        width: 100%;
      }
      .select-search-results {
        &.open {
          display: block;
        }
        &.closed {
          display: none;
        }
        position: absolute;
        display: grid;
        background: white;
        border: solid 1px #ccc;
        box-shadow: 1px 1px 3px #cccccc80, 1px 1px 6px #cccccc80;
        padding: 0.5rem;
        z-index: 9999999999;
        max-height: 200px;
        overflow-y: scroll;
        min-width: 300px;

        .select-search-result {
          border-bottom: 1px solid #ccc;
          padding: 0.5rem 0.25rem;
          display: block;
          font-size: 0.75rem;
          text-decoration: none;
          color: $primaryColor;
          &.selected {
            background: #efefef;
          }
        }
      }
    }
    .selection-search-tag-container {
      display: flex;
      flex-wrap: wrap;
      overflow-y: auto;
      max-height: 120px;
      gap: 0.125rem;
      padding: 0.125rem 0rem;
      .selection-tag {
        height: fit-content;
        font-size: 0.75rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 0.25rem;
        width: 100%;
        padding: 0.25rem;
        border: solid 1px #ccc;
        padding-left: 0.5rem;
        max-width: fit-content;
        background: #efefef;

        button.selection-tag-button {
          height: fit-content;
          padding: 0rem !important;
          border: none;
          background: none;
          background: #efefef !important;
        }
      }
    }
  }
</style>
