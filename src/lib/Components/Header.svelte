<script lang="ts">
  import { cartOpen, cartStore } from "../Api/Cart/cartStore";


  const setAlertLocalStorage = (value: "T" | "F") => {
    localStorage.setItem("showAlertLegacyHub071823", value)
  }
  const getAlertLocalStorage = (): string | undefined => {
    return localStorage.getItem("showAlertLegacyHub071823")
  }

  let open: boolean;
  let showAlert = getAlertLocalStorage();
</script>

<div id="main-navbar-wrapper">
  <div id="main-navbar-container">
    <div id="main-navbar-content-wrapper">
      <div id="main-navbar-content-container">
        <div id="tnris-logo">
          <a href="/" class="link"
            ><img
              src="https://cdn.tnris.org/images/tnris_logo.svg"
              alt="TNRIS"
            />
            <div>DataHub</div></a
          >
        </div>
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
        <!-- <div>
          <span><i class="material-icons">shopping_cart</i> Cart</span>
        </div> -->
      </div>
    </div>
    {#if showAlert != "F"}
      <div id="main-navbar-alert-wrapper">
        <div id="main-navbar-alert-container">
          <span>
            The new TNRIS DataHub Experience is here! If you need to use the old
            experience, it is available at <a href="https://betadata.tnris.org"
              >betadata.tnris.org</a
            > until at least August 15, 2023.
          </span>
          <button on:click={() => {setAlertLocalStorage("F"); showAlert = "F"}}>Okay</button>
        </div>
      </div>
    {/if}
  </div>
</div>

<style lang="scss">
  #main-navbar-wrapper {
    background: $primaryColor;

    #main-navbar-container {
      display: grid;
      gap: 0.25rem;
      padding: 0.25rem;
      #main-navbar-content-wrapper {
        #main-navbar-content-container {
          color: white;
          font-weight: 600;
          text-decoration: none;
          display: grid;
          grid-auto-flow: column;
          justify-content: space-between;
          align-items: center;
          margin: auto;
          max-width: 1600px;

          #tnris-logo {
            display: flex;
            a {
              color: white;
              font-weight: 600;
              text-decoration: none;
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
            gap: 0.25rem;
            width: auto;
            color: white;
            background: $primaryColor;
            font-weight: 600;


            #cart-length {
              background: red;
              color: white;
              border: solid 1px white;
              border-radius: 0.25rem;
              padding: 0.25rem;
              height: 0.75rem;
            }
          }
        }
      }

      #main-navbar-alert-wrapper {
        padding: .5rem;

        #main-navbar-alert-container {
          display: grid;
          grid-template-columns: 1fr auto;
          align-items: center;
          justify-content: space-between;
          margin: auto;
          max-width: 1600px;
          background: white;
          padding: .125rem;
          padding-left: 0.5rem;
        }
      }
    }
  }
</style>
