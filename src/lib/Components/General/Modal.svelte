<script>
  import { fade, fly } from "svelte/transition";
  import { clickOutside } from "./clickOutside";

  export let open = false;
</script>

{#key open}
  <div class="modal" class:active={open} in:fade={{ duration: 50 }} out:fade={{ delay: 200, duration: 100 }}>
    <div
      class="modal-content-container"
      use:clickOutside
      on:click_outside={() => (open = false)}
      in:fly|local={{ y: 800, delay: 50, duration: 100 }}
      out:fly|local={{ y: 800, duration: 100, }}
    >
      <div class="modal-header">
        <div class="modal-title">
          <slot name="title">
            <h1>Modal</h1>
          </slot>
        </div>
        <div class="modal-close">
          <slot name="close">
            <button on:click={() => (open = false)}>X</button>
          </slot>
        </div>
      </div>
      <div class="modal-content">
        <slot name="content">default content</slot>
      </div>
      <div class="modal-footer">
        <slot name="footer" />
      </div>
    </div>
  </div>
{/key}

<style lang="scss">
  .modal {
    display: none; /* Hidden by default */
    position: fixed; /* Stay in place */
    z-index: 9999999; /* Sit on top */
    left: 0;
    top: 0;
    width: 100%; /* Full width */
    height: 100%; /* Full height */
    max-width: 100vw;
    max-height: 100vh;
    overflow: auto;
    background-color: rgba(0, 0, 0, 0.4);
    &.active {
      display: grid;
      grid-template-columns: minmax(0, 1fr);
      margin: auto;
      align-items: center;
    }
    .modal-content-container {
      display: grid;
      grid-template-rows: auto 1fr auto;
      justify-self: center;
      background-color: #fefefe;
      padding: 0.25rem;
      border: none;
      box-shadow: 1rem 1rem 4vw #33333330, -1rem -1rem 3vw #33333320;
      width: 90%; /* Could be more or less, depending on screen size */
      max-width: 30rem;
      max-height: 80vh;
      overflow: hidden;

      .modal-header {
        color: $primaryColor;
        border-bottom: $primaryColor 1px solid;
        display: grid;
        grid-template-columns: minmax(0, 1fr) auto;
        padding: 0.5rem;

        h1,
        h2,
        h3,
        h4,
        h5,
        h6 {
          margin-bottom: 0 !important;
        }
      }
      .modal-content {
        display: grid;
        grid-auto-flow: row;
        max-height: 100%;
        padding: 1rem 0.5rem 1.5rem 0.5rem;
        overflow-y: auto;
      }
    }
  }
</style>
