<script lang="ts">
  import { cartOpen, cartStore } from "../Api/Cart/cartStore";

  /* const setAlertLocalStorage = (value: "T" | "F") => {
    localStorage.setItem("showAlertAGS072024", value);
  };
  const getAlertLocalStorage = (): string | undefined => {
    return localStorage.getItem("showAlertAGS072024");
  };

  let open: boolean;
  let showAlert = getAlertLocalStorage(); */
</script>

<div id="main-navbar-wrapper">
  <div id="main-navbar-container">
    <div id="main-navbar-content-wrapper">
      <div id="main-navbar-content-container">
        <div id="tnris-logo">
          <a href="https://geographic.texas.gov" class="link"
            ><img
              src="/logo.svg"
              alt="TxGIO"
            />
          </a>
          <a href="/" class="link">
            <div>DataHub</div>
          </a>
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
      </div>
    </div>
    <!-- {#if showAlert != "F"}
      <div id="main-navbar-alert-wrapper">
        <div id="main-navbar-alert-container">
          <span>
            Certain functionality within the datahub are
            unexpectedly unavailable. We are troubleshooting and
            apologize for the inconvenience.
        </span>
          <button
            on:click={() => {
              setAlertLocalStorage("F");
              showAlert = "F";
            }}>Okay</button
          >
        </div>
      </div>
    {/if} -->
  </div>
</div>

<style lang="scss">
  #main-navbar-wrapper {
    background: white;
    border: solid 1px #ccc;

    #main-navbar-container {
      display: grid;
      gap: 0.25rem;

      #main-navbar-content-wrapper {
        #main-navbar-content-container {
          font-weight: 600;
          text-decoration: none;
          display: grid;
          grid-auto-flow: column;
          justify-content: space-between;
          align-items: center;
          margin: auto;
          max-width: 1600px;

          #tnris-logo {
            display: grid;
            align-items: center;
            justify-content: start;
            grid-template-columns: auto auto;
  
            a {
              color: $primaryColor;
              font-weight: 600;
              text-decoration: none;
              display: flex;
              gap: 0.25rem;
              align-items: center;

              img {
                display: inline-flex;
                height: 77px;
              }
              div {
                display: inline-flex;
                align-items: center;
                width: auto;
                font-style: italic;
              }
            }
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
            margin-right: 1rem;
  
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
        padding: 0.5rem;
        display: grid;
        justify-content: center;

        #main-navbar-alert-container {
          display: grid;
          gap: 1rem;
          grid-template-columns: 1fr auto;
          align-items: center;
          justify-content: space-between;
          margin: auto;
          max-width: 1600px;
          background: white;
          padding: 0.125rem;
          padding-left: 0.5rem;
        }
      }
    }
  }
</style>
