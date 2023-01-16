<script>
  import Wizard from "../General/Wizard/Wizard.svelte";
  import CartItems from "./CartItems.svelte";

  const steps = [
    { title: "Cart", component: CartItems },
    { title: "Cart2", component: CartItems },
  ];
</script>

<Wizard {steps} />

<style lang="scss">
</style>
