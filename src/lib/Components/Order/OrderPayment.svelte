<script>
  import { query } from "svelte-pathfinder";
  import InfoBox from "../General/InfoBox.svelte";
  import Recaptcha from "../General/Recaptcha.svelte";

  const order_id = $query.params["order_id"];

  let authenticated = false;
  let statusData = null;

  export let onSubmit = async (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);

    const d = Object.fromEntries(fd);

    const payload = {
      accessCode: d["email"],
      passCode: d["otp"],
      recaptcha: d["g-recaptcha-response"],
    };

    const resp = await fetch(
      `https://stagingapi.tnris.org/api/v1/contact/order/submit?uuid=${order_id}`,
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
  };
</script>

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
      <Recaptcha />
      <hr />
      <button type="submit">Make a Payment</button>
    </form>
  {/if}
</div>

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
