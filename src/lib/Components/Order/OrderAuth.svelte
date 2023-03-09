<script>
  import { query } from "svelte-pathfinder";
  import InfoBox from "../General/InfoBox.svelte";
  import Recaptcha from "../General/Recaptcha.svelte";
  import { BASE_URL } from "../../constants.js"
  const order_id = $query.params["uuid"];

  let authenticated = false;
  let statusData = null;
  let otp_gened = false;
  let captcha_token = "";
  let toggle  = true;
  let show_otp_msg = true;
  
  function storeCaptchaToken(resp) {
    if(resp && resp.detail && resp.detail.token) {
      captcha_token = resp.detail.token
    } else {
      captcha_token = ""
    }
  }

  function onCaptchaSuccess(resp) {
    toggle = false;
    storeCaptchaToken(resp)
    
    if(captcha_token && captcha_token.length) {
      genotp(captcha_token);
    }
  }

  function onCaptchaTimeout() {
    toggle = true;
  }

  function genotp(resp) {
    if(!otp_gened) {
      otp_gened = true;
      const payload = {
        recaptcha: resp,
      };

      fetch(
        `${BASE_URL}/api/v1/contact/order/otp?uuid=${order_id}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify(payload),
        }
      );
    }
  }

  export let onSubmit = async (e) => {
    e.preventDefault();

    show_otp_msg = false;
    const fd = new FormData(e.target);

    const d = Object.fromEntries(fd);

    const payload = {
      accessCode: d["email"],
      passCode: d["otp"],
      recaptcha: captcha_token,
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
        on:success={onCaptchaSuccess}
        on:reset={onCaptchaTimeout}
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
    {#if show_otp_msg}
      <InfoBox infoClass="info">
        A One time Passcode has been sent to the email this order is registered under. Please enter it below.
      </InfoBox>
    {/if}
    <form
      id="order-auth-form"
      on:submit|preventDefault|stopPropagation={onSubmit}
    >
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
    on:success={onCaptchaSuccess}
    on:reset={onCaptchaTimeout}
  />
      <hr />
      <button id="order_button" type="submit">Check Order Status</button>
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
  #order_button:hover {
    font-weight: 100; /* Overwrite bold to none and simulate instead since it causes button shifting. */
    text-shadow: 0 0 .65px #333, 0 0 .65px #333; /* Simulate bold without the shift. */
  }
</style>
