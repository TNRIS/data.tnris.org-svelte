<script lang="ts">
  export let value;
  export let callback;
</script>

<div id="keyword-search">
  <input
    class="keyword-search-input"
    bind:value={value}
    type="search"
    placeholder="keyword search"
  /><button class="keyword-search-button" on:click={() => callback(value)}
    ><i class="material-icons">search</i></button
  >
</div>

<style lang="scss">
  #keyword-search {
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto;
    .keyword-search-input {
      width: 100%;
      border-radius: 0.25rem 0rem 0rem 0.25rem;
      border-right: none;
    }
    .keyword-search-button {
      border-radius: 0rem 0.25rem 0.25rem 0rem;
      background: $primaryColor;
      color: white;
      border: 1px solid $primaryColor;
    }
  }
</style>
