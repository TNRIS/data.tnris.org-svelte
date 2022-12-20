<script>
  import { clickOutside } from "./clickOutside.js";
  import DropdownContent from "./DropdownContent.svelte";

  export let title;
  export let indicator;
  let show = false;

  const showDropdown = () => {
    show = !show;
  };
</script>

<div
  class="multiselect-dropdown"
  use:clickOutside
  on:click_outside={() => (show = false)}
>
  <button on:click={showDropdown}>
    <span>{title}</span>
    {#if indicator}
      <div class="dropdown-indicator">{indicator}</div>
    {/if}
  </button>
  <div class={show ? "show" : "hide"}>
    <DropdownContent>
      <slot />
    </DropdownContent>
  </div>
</div>

<style lang="scss">
  .multiselect-dropdown {
    button {
      display: grid;
      grid-template-columns: 1fr auto;
      justify-content: space-between;
      align-items: center;
      gap: 1rem;
      text-align: center;

      .dropdown-indicator {
        background: $primaryColor;
        color: white;
        border-radius: 50%;
        width: 1rem;
        height: 1rem;
        display: grid;
        grid-template-columns: 1fr;
        justify-content: center;
        align-items: center;
      }
    }
  }
  .show {
    display: contents;
  }
  .hide {
    display: none;
  }
</style>
