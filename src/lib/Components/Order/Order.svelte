<script>
  import { pattern } from "svelte-pathfinder";
  import OrderAuth from "./OrderAuth.svelte";
  import OrderOtp from "./OrderOTP.svelte";
  import OrderPayment from "./OrderPayment.svelte";
  import OrderRedirect from "./OrderRedirect.svelte";
</script>

<div id="order-route-container">
  {#if $pattern("/order/status")}
    <div id="main-order-pane">
      <OrderAuth />
    </div>
  {:else if $pattern("/order/submit")}
    <OrderPayment />
  {:else if $pattern("/order/redirect")}
    <OrderRedirect />
  {/if}
</div>

<style lang="scss">
  #order-route-container {
    display: grid;
    grid-template-columns: 1fr 300px;
    gap: 1rem;
    padding: 1.5rem 0.5rem;
    width: 100%;
    max-width: 1200px;
    margin: auto;

    .order-nav {
      display: grid;
      grid-auto-flow: column;
      justify-content: space-around;
      gap: 0.5rem;
      padding: 1.5rem 0.25rem;
      background: #333;
      color: white;

      a {
        color: white;
      }
    }
  }
</style>
