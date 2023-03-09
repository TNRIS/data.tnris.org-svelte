<script>
  import { query } from "svelte-pathfinder";
  import InfoBox from "../General/InfoBox.svelte";
  import Recaptcha from "../General/Recaptcha.svelte";
  import { BASE_URL } from "../../constants.js"
  import { OTP } from "../../Api/OTP/otp.js";

  const order_id = $query.params["uuid"];
  OTP.order_id = "" + order_id
  let toggle = true;

  function success(resp) {
    toggle = false;
    OTP.onCaptchaSuccess(resp);
  }
  function reset(resp) {
    toggle = true;
    OTP.onCaptchaTimeout(resp)
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
      }
    );

    const json = await resp.json();

    console.log(json)
    statusData = json;

    if (json.status == "success") {
      authenticated = true;
    }
    e.target.reset();
    window.location.replace(json.order_url);

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
<div id="order-auth">
  {#if statusData}
    <InfoBox infoClass={
    statusData.status == "failure" || statusData.status == "denied"
    ? "caution" : "info"
    }>
      {#if statusData.status == "success"}
        Your order status is:
      {/if}
      {statusData.message}
    </InfoBox>
  {/if}
  {#if !authenticated}
    <h1>Pay Order</h1>
    <InfoBox infoClass="info">
      You must use a one time password and your email address to pay your
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
        >One Time Password
        <input
          type="password"
          name="otp"
          id="otp"
          placeholder="one time password"
          required
        />
      </label>
      <Recaptcha 
      on:success={success}
      on:reset={reset}
    />      <hr />
      <button type="submit">Make a Payment</button>
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
</style>
