<script>
  import Wizard from "../General/Wizard/Wizard.svelte";
  import CartItems from "./CartItems.svelte";
  import DeliveryMethod from "./DeliveryMethod.svelte";
  import PaymentMethod from "./PaymentMethod.svelte";
  import PersonalInfo from "./PersonalInfo.svelte";
  import ReviewOrder from "./ReviewOrder.svelte";

  const steps = [
    { title: "Cart", component: CartItems },
    { title: "Personal Info", component: PersonalInfo },
    { title: "Delivery Method", component: DeliveryMethod },
    { title: "Payment Method", component: PaymentMethod },
    { title: "Review Order", component: ReviewOrder },
  ];
</script>

<div class="cart-wrapper">
  <Wizard {steps} />

</div>

<style lang="scss">
  .cart-wrapper {
    width: 100%;
  }
</style>
