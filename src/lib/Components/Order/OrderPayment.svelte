<script>
  import { query } from "svelte-pathfinder";
  import InfoBox from "../General/InfoBox.svelte";
  import Recaptcha from "../General/Recaptcha.svelte";
  import { BASE_URL } from "../../constants.js"
  import { OTP } from "../../Api/OTP/otp.js";
  import Modal from "../General/Modal.svelte";

  const order_id = $query.params["uuid"];
  OTP.order_id = "" + order_id
  let toggle = true;
  let open = false;
  let charge = 0;
  let order_url;
  let fee;

  function roundTwo(number) {
    number = parseFloat((number * 100).toFixed(11));
    number = Math.round(number) / 100;
    return number;
  }

  function success(resp) {
    toggle = false;
    OTP.onCaptchaSuccess(resp);
  }
  function reset(resp) {
    toggle = true;
    OTP.onCaptchaTimeout(resp)
  }
  function resend() {
    OTP.otp_gened = false; // Send another
    toggle = true;
  }
  let authenticated = false;
  let statusData = null;

  export let onSubmit = async (e) => {
    e.preventDefault();
    OTP.show_otp_msg = false;

    const fd = new FormData(e.target);

    const d = Object.fromEntries(fd);

    const payload = {
      accessCode: d["email"],
      passCode: d["otp"],
      recaptcha: OTP.captcha_token,
    };

    const resp = await fetch(
      `${BASE_URL}/api/v1/contact/order/submit?uuid=${order_id}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(payload),
        cache: "no-cache"
      }
    );

    const json = await resp.json();

    statusData = json;

    if (json.status == "success") {
      authenticated = true;
      open = true;
      charge = json.charge;
      
      fee = ((charge + .25)/100) * 2.25;
      fee += .25;
      order_url = json.order_url;
    }
    e.target.reset();
    //window.location.replace(json.order_url);

  };
</script>
{#if toggle}
<div id="recaptcha">
  <Recaptcha 
    on:success={success}
    on:reset={reset}
  />
</div>
{/if}

{#if !toggle}

<Modal bind:open>
  <div slot="title"><h1>Proceed to Payment Processor</h1></div>
  <div slot="content">
    <table class="unformatted_table">
      <tr>
        <td>Order Charge:</td>
        <td class="lpad">${roundTwo(charge)}</td>
      </tr>
      <tr>
        <td>Total:</td>
        <td class="lpad">${roundTwo(charge + fee)}*</td>
      </tr>
    </table>
    <br />
    <div class="warning">
      * This service is provided by Texas.gov, the official website of Texas. The price of this service includes funds that support the ongoing operations and enhancements of Texas.gov, which is provided by a third party in partnership with the State.
    </div>
    <div class="warning">
      After proceeding to the link below you will be redirected to our credit card payment partner.<br />
      By continuing you attest that you are authorized to use the card, and you are who you say you are.
      In addition you acknowledge that this transaction is non-refundable.
    </div>
    <br /><br /><br />
    <a href="{order_url}">Proceed to payment Partner.</a>
  </div>
</Modal>

<div id="order-auth">
  {#if !authenticated}
    <h1>Pay Order</h1>
    <InfoBox infoClass="info">
      You must use a one time access code and your email address to pay your
      order. You can use the form to the right to get a new one time
      password sent to your email address if you need one.
    </InfoBox>
    <form
      id="order-auth-form"
      on:submit|preventDefault|stopPropagation={onSubmit}
    >
      <label class="required">
        Email Address
        <input
          type="email"
          name="email"
          id="email"
          placeholder="email address"
          required
        />
      </label>
      <label class="required"
        >One Time Access Code
        <input
          type="password"
          name="otp"
          id="otp"
          placeholder="one time access code"
          required
        />
      </label>
      <Recaptcha 
      on:success={success}
      on:reset={reset}
    />      <hr />
      <button type="submit">Make a Payment</button>
      <a on:click|preventDefault={resend} href="#top"><button id="resend_button">Resend Access Code</button></a>
    </form>
  {/if}
</div>
{/if}
<style lang="scss">
  #order-auth {
    padding: 0.5rem;
    border: solid 1px #ccc;
  }
  form {
    margin-top: 1rem;

    input {
      display: block;
      margin-bottom: 0.5rem;
    }
  }
  .warning {
    font-size: 11px;
  }
  .unformatted_table {
    margin: 0;
    padding: 0;
    border: 0px;
  }
  .lpad {
    padding-left:3em;
  }
</style>
