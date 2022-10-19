<script>
  import { clickOutside } from "./clickOutside.js";

  export let title;
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
  <button on:click={showDropdown}>{title}</button>
  {#if show == true}
    <slot></slot>
  {/if}
</div>
