<script>
  import { query } from "svelte-pathfinder";
  import InfoBox from "../General/InfoBox.svelte";
  import Recaptcha from "../General/Recaptcha.svelte";
  import { BASE_URL } from "../../constants.js";

  const orderIDParam = $query.params["order_id"]
    ? $query.params["order_id"]
    : "";

  let submitted = false;

  let otpForm = null;

  const submitOrderStatusQuery = async (e) => {
    const fd = new FormData(e.target);
    const d = Object.fromEntries(fd);

    const payload = {
      recaptcha: d["g-recaptcha-response"],

    };

    const resp = await fetch(
      `${BASE_URL}/api/v1/contact/order/otp?uuid=${orderIDParam}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(payload),
        cache: "no-cache"
      }
    );

    const data = await resp.json();

    if (data.status == "success") {
      otpForm.reset();
      //@ts-ignore
      //window.grecaptcha.reset("otp-grecaptcha");
      submitted = true;
    }
  };
</script>

<div id="order-otp">
  {#if submitted == false}
    <h1>Get One Time Password</h1>
    <p>
      Click the button below to get a one-time-passcode delivered to your email.
      You can use the passcode we send you to access you order status on this
      page!
    </p>
    <form on:submit|preventDefault={submitOrderStatusQuery} bind:this={otpForm}>
      <input required name="data-order-id" value={orderIDParam} />
      <Recaptcha recaptchaId={"otp-grecaptcha"} />
      <hr />

      <button type="submit">Get One Time Password</button>
    </form>
  {:else}
    <InfoBox infoClass="success">
      We just sent you an email containing your one time password. You can use
      this password once to access the status of your order.
    </InfoBox>
    <button
      on:click={() => {
        submitted = false;
      }}>Get Another OTP</button
    >
  {/if}
</div>

<style lang="scss">
  #order-otp {
    padding: 0.5rem;
    border: solid 1px #ccc;
    width: fit-content;

    button {
      margin-top: 0.5rem;
    }
  }
</style>
