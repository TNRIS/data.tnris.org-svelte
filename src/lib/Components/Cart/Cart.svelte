<script>
  import { cartStore } from "../../Api/Cart/cartStore";
  import Wizard from "../General/Wizard/Wizard.svelte";
  import CartItems from "./CartItems.svelte";
  import DeliveryMethod from "./DeliveryMethod.svelte";
  import PaymentMethod from "./PaymentMethod.svelte";
  import PersonalInfo from "./PersonalInfo.svelte";
  import ReviewOrder from "./ReviewOrder.svelte";

  let stepIdx = 0;

  const steps = [
    { title: "Cart", component: CartItems },
    { title: "Personal Info", component: PersonalInfo },
    { title: "Delivery Method", component: DeliveryMethod },
    { title: "Payment Method", component: PaymentMethod },
    { title: "Review Order", component: ReviewOrder },
  ];

  const submitCart = async (e) => {
    let fd = new FormData(e.target);
    let obj = Object.fromEntries(fd);

    const cartItems = $cartStore;

    const cartOrderText = Object.keys(cartItems).map((c, i) => {
      const item = cartItems[c];

      let cart_string = `(${i + 1}) `

      if (item["data-name"]) cart_string += `${item["data-name"]}\n`;
      if (c) cart_string += `UUID: ${c}\n`;
      if (item["data-acquisition-date"]) cart_string += `Acquisition Date: ${item["data-acquisition-date"]}\n`;
      if (item["data-portion"]) cart_string += `Coverage: ${item["data-portion"]}\n`
      if (item["data-format"]) cart_string += `Historical Format: ${item["data-format"]}\n`
      if (item["lidar-format"]) cart_string += `Format: ${item["lidar-format"]}\n`
      if (item["data-description-type"]) cart_string += `Description Type: ${item["data-description-type"]}\n`
      if (item["data-description"]) cart_string += `Description:\n ${item["data-description"]}\n`;

      return cart_string;
    });


    const payload = {
      pw: obj["data-email"],
      order_details: {
        Name: `${obj["data-first-name"]} ${obj["data-last-name"]}`,
        Email: obj["data-email"],
        Phone: obj["data-phone"],
        Address: obj["data-address"],
        Organization: obj["data-organization"],
        Industry: obj["data-industry"],
        Fedex: obj["data-fedex"],
        Notes: obj["data-notes"],
        Delivery: obj["data-delivery-method"],
        HardDrive: obj["data-hard-drive"],
        Payment: obj["data-payment-method"],
        Order: cartOrderText.join("\n"),
        form_id: "data-tnris-org-order"
      },
      recaptcha: obj["g-recaptcha-response"]
    };

    const postOrder = async () =>
    fetch("https://api.tnris.org/api/v1/contact/order/", {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json",
        },
      });

    let resp = await postOrder();
    let data = await resp.json();
    
    if (data.status == "success") {
      stepIdx = 0;
      cartStore.reset();
    }
  };

  let validator = function() {
    try {
      let itemKeys = Object.keys($cartStore);

      if(itemKeys && itemKeys.length) {
        return true;
      } else {
        return false;
      }
    } catch(err) {
      console.error("Error validating cart.")
      return false;
    }
  }
</script>

<div class="cart-wrapper">
  <Wizard bind:stepIdx {steps} onSubmit={submitCart} val={validator} error_message = {""}/>
</div>

<style lang="scss">
  .cart-wrapper {
    width: 100%;
    height: 100vh;
  }
</style>
