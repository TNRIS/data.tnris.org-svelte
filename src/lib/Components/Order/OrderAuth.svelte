<script>
  import { query } from "svelte-pathfinder";
  import InfoBox from "../General/InfoBox.svelte";
  import Recaptcha from "../General/Recaptcha.svelte";
  import { BASE_URL } from "../../constants.js";
  import { OTP } from "../../Api/OTP/otp.js";
  const order_id = $query.params["uuid"];

  OTP.order_id = "" + order_id
  let authenticated = false;
  let statusData = null;
  let toggle = true;

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
      `${BASE_URL}/api/v1/contact/order/status?uuid=${order_id}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(payload),
      }
    );

    const json = await resp.json();

    statusData = json;

    if (json.status == "success") {
      authenticated = true;
    }
    e.target.reset();
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
      <InfoBox infoClass={statusData.status == "failure" ? "caution" : "info"}>
        {#if statusData.status == "success"}
          Your order status is:
        {/if}
        {statusData.message}
      </InfoBox>
    {/if}
    {#if !authenticated}
      <h1>Order Status Login</h1>
      {#if OTP.show_otp_msg}
        <InfoBox infoClass="info">
          A One time Passcode has been sent to the email this order is registered under. Please enter it below.
        </InfoBox>
      {/if}
      <form
        id="order-auth-form"
        on:submit|preventDefault|stopPropagation={onSubmit}
      >
        <label class="required">
          One Time Access Code
          <input
            type="password"
            name="otp"
            id="otp"
            placeholder="One time access code"
            required
          />
        </label>

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
        <Recaptcha 
          on:success={success}
          on:reset={reset}
        />
        <hr />
        <button id="order_button" type="submit">Check Order Status</button>
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
  #order_button:hover:enabled, #resend_button:hover:enabled {
    font-weight: 100; /* Overwrite bold to none and simulate instead since it causes button shifting. */
    text-shadow: 0 0 1px #333, 0 0 .65px #333; /* Simulate bold without the shift. */
  }
</style>
