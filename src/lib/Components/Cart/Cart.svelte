<script>
  import { cartStore } from "../../Api/Cart/cartStore";
  import Wizard from "../General/Wizard/Wizard.svelte";
  import CartItems from "./CartItems.svelte";
  import DeliveryMethod from "./DeliveryMethod.svelte";
  import PaymentMethod from "./PaymentMethod.svelte";
  import PersonalInfo from "./PersonalInfo.svelte";
  import ReviewOrder from "./ReviewOrder.svelte";
  import JSZip from "jszip";
  import { genZip64 } from "../../Api/Cart/zipBase64";

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
    let files = {};

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
      if (item["data-description-type"] && item["data-description-type"] == "Text") {
        if (item["data-description"]) cart_string += `Description: ${item["data-description"]}\n`
      } else {
        if(item["data-description"]) files[c] = item["data-description"];
      }

      return cart_string;
    });
    let dfZip = new JSZip();

    for(let f in files) {
      let b64s = files[f];

      // Remove the base64 prepend text.
      if (files[f].startsWith('data:application/zip;base64,')) {
        let split = b64s.split('data:application/zip;base64,');
        if(split.length && split.length > 1) {
          b64s = split[1];
        }
      }

      // Add each file to the master zip
      dfZip.file(f + '.zip', b64s, {base64: true});
    }
    // Overwrites object to string base 64 zip of all files
    files = await genZip64(dfZip);


    const payload = {
      pw: obj["data-email"],
      order_details: {
        Name: `${obj["data-first-name"]} ${obj["data-last-name"]}`,
        Email: obj["data-email"],
        Phone: obj["data-phone"],
        Address: obj["data-address"],
        Organization: obj["data-organization"],
        Industry: obj["data-industry"],
        Notes: obj["data-notes"],
        Delivery: obj["data-delivery-method"],
        HardDrive: obj["data-hard-drive"],
        Payment: obj["data-payment-method"],
        Order: cartOrderText.join("\n"),
      },
      recaptcha: obj["g-recaptcha-response"],
      files: files
    };

    const postOrder = async () =>
    fetch("https://stagingapi.tnris.org/api/v1/contact/order/", {
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
</script>

<div class="cart-wrapper">
  <Wizard bind:stepIdx {steps} onSubmit={submitCart} />
</div>

<style lang="scss">
  .cart-wrapper {
    width: 100%;
    height: 100vh;
  }
</style>
