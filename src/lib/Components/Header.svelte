<script lang="ts">
  import { cartOpen } from "../Api/Cart/cartStore";

  let open: boolean;
</script>

<div id="main-navbar-header">
  <div id="main-navbar-container">
    <div id="tnris-logo">
      <a href="/" class="link"
        ><img
          src="https://cdn.tnris.org/images/tnris_logo.svg"
          alt="TNRIS Logo"
        /></a
      >
    </div>
    {#if !$cartOpen}
      <button
        id="cart-button"
        on:keydown={() => null}
        on:click={() => {
          if ($cartOpen == false) {
            $cartOpen = true;
          }
        }}
      >
        Cart
      </button>
    {:else}
      <button id="cart-button">Cart</button>
    {/if}
  </div>
</div>

<style lang="scss">
  #main-navbar-header,
  #main-navbar-header a {
    padding: 0.5rem;
    background: $primaryColor;
    color: white;
    font-weight: 600;
    text-decoration: none;

    #main-navbar-container {
      display: grid;
      grid-auto-flow: column;
      justify-content: space-between;
      align-items: center;
      margin: auto;
      max-width: 1600px;

      #tnris-logo,
      #cart-button {
        width: 4rem;
      }
    }
  }
</style>
