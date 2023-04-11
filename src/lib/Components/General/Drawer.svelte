<script>
  import { fly, fade } from "svelte/transition";
  import { clickOutside } from "./clickOutside";

  export let open = false;

</script>

{#key open}
  <div
    class="drawer"
    class:active={open}
    in:fade|local={{ duration: 100 }}
    out:fade|local={{ duration: 100, delay: 300 }}
  >
    <div
      class="drawer-container"
      in:fly|local={{ x: 800, duration: 200, delay: 150 }}
      out:fly|local={{ x: 800, duration: 200 }}
      use:clickOutside
      on:click_outside|stopPropagation={() => (open = false)}
    >
      <slot />
    </div>
  </div>
{/key}

<style lang="scss">
  .drawer {
    display: none; /* Hidden by default */
    position: absolute; /* Stay in place */
    z-index: 9999999; /* Sit on top */
    top: 0;
    left: 0;
    width: 100%; /* Full width */
    height: 100%; /* Full height */
    max-width: 100vw;
    max-height: 100vh;
    overflow: auto;
    &.active {
      display: grid;
      grid-template-columns: minmax(0, 1fr);
      margin: auto;
      align-items: center;
      background: rgb(0, 0, 0, 0.4);
    }

    .drawer-container {
      display: block;
      position: absolute;
      background: white;
      box-shadow: -.5rem 0rem 1rem #33333360;
      right: 0;
      width: 70%;
      height: 100vh;
      z-index: 99999999;
    }
  }
</style>
