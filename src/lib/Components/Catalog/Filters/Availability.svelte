<script>
  export let title = "";
  export let opts = ["Download", "External_Link", "Order_Only", "WMS_Service"];
  let selections = [];
  let show = false;

  const showDropdown = () => {
    show = !show;
  };
</script>

<div class="multiselect-dropdown">
  <button on:click={showDropdown}>{title}</button>
  {#if show == true}
    <div id="availability-dropdown" class="select-menu">
      {#each opts as opt}
        <label>
          <input
            type="checkbox"
            bind:group={selections}
            value={opt}
            on:change={(e) => console.log(selections)}
          />
          {opt}
        </label>
      {/each}
    </div>
  {/if}
</div>

<style lang="scss">
  .select-menu {
    display: grid;
    position: absolute;
    background: white;
    padding: 0.25rem;
    border: solid 1px $borderColor;
    border-radius: 0.25rem;
  }
</style>
