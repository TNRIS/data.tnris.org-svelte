<script>
// @ts-nocheck

  import { PAYMENT_OPTIONS, RECAPTCHA_SITE_KEY } from "../../constants";
  import InfoBox from "../General/InfoBox.svelte";
  import Recaptcha from "../General/Recaptcha.svelte";
  export let formRef;

  let OPTS = [];

  $: {
    let dm;

    if (formRef) {
      let fd = new FormData(formRef);
      dm = fd.get("data-delivery-method");
    }
    if (!formRef) {
      OPTS = [];
    }
    if (formRef && dm == "ZIP") {
      OPTS = PAYMENT_OPTIONS;
    }
    if (formRef && dm == "USPS") {
      OPTS = PAYMENT_OPTIONS.filter(
        (v) => v.value !== "FEDEX_ACCOUNT" && v.value !== "PAY_AT_PICKUP"
      );
    }
    if (formRef && dm == "FEDEX") {
      OPTS = PAYMENT_OPTIONS.filter((v) => v.value !== "PAY_AT_PICKUP");
    }
    if (formRef && dm == "PICKUP") {
      OPTS = PAYMENT_OPTIONS.filter((v) => v.value !== "FEDEX_ACCOUNT");
    }
  }
</script>

{#if OPTS && OPTS.length == 1}
  <InfoBox>
    When ordering data as a zipfile, there is no additional charge
  </InfoBox>
{/if}
<label for="data-payment-method" class="required">
  Payment Method
  <select id="data-payment-method" name="data-payment-method" required>
    {#each OPTS as payOption}
      <option value={payOption.value}>{payOption.label}</option>
    {/each}
  </select>
</label>
<label for="g-recaptcha-response" class="required">
  <Recaptcha
    handleCaptchaCallback={async (v) => {
      let fd = new FormData(formRef);
      fd.set("g-recaptcha-response", v);
    }}
    handleCaptchaError={async (v) => {
      let fd = new FormData(formRef);
      fd.set("g-recaptcha-response", null);
    }}
    resetCaptcha={async (v) => {
      let fd = new FormData(formRef);
      fd.set("g-recaptcha-response", null);
      window.grecaptcha.reset();
    }}
  />
</label>
