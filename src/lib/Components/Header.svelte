<script lang="ts">
  import { cartOpen, cartStore } from "../Api/Cart/cartStore";

  let open: boolean;
</script>

<div id="main-navbar-header">
  <div id="main-navbar-container">
    <div id="tnris-logo">
      <a href="/" class="link"
        ><img src="https://cdn.tnris.org/images/tnris_logo.svg" alt="TNRIS" />
        <div>DataHub</div></a
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
        <span><i class="material-icons">shopping_cart</i> Cart</span>
        {#if Object.keys($cartStore).length}
          <div id="cart-length">{Object.keys($cartStore).length}</div>
        {/if}
      </button>
    {:else}
      <button id="cart-button">
        <span><i class="material-icons">shopping_cart</i> Cart</span>
        {#if Object.keys($cartStore).length}
          <div id="cart-length">{Object.keys($cartStore).length}</div>
        {/if}
      </button>
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

      #tnris-logo {
        display: flex;
        a {
          display: flex;
          gap: 0.25rem;
          align-items: end;

          img {
            display: inline-flex;
            max-width: 4rem;
          }
          div {
            display: inline-flex;
            align-items: end;
            width: auto;
            //font-size: 1.25rem;
            font-style: italic;
          }
        }
        width: 100%;
      }
      #cart-button {
        display: grid;
        grid-template-columns: 1fr auto;
        align-items: center;
        gap: .125rem;
        width: auto;
        
        #cart-length {
          background: red;
          color: white;
          border: solid 1px white;
          border-radius: 0.25rem;
          padding: 0.25rem;
          height: .75rem;
        }
      }
    }
  }
</style>
