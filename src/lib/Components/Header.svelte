<script>
  import { Link, Router } from "svelte-navigator";
</script>

<Router primary={false}>
  <div id="main-navbar-header">
  <div id="main-navbar-container">
    <div id="tnris-logo">
      <Link class="link" to="/"
        ><img
          src="https://cdn.tnris.org/images/tnris_logo.svg"
          alt="TNRIS Logo"
        /></Link
      >
    </div>
    <div id="cart-button">
      <a href="/">Cart</a>
    </div>
  </div>
</div>
</Router>


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
