<script>
  import { RECAPTCHA_SITE_KEY } from "../../constants";
  import { onMount } from "svelte";
  import { createEventDispatcher } from "svelte";

  const dispatcher = createEventDispatcher();
  export let recaptchaId = "grecaptcha-default-id"
  let recaptchaContainer = null;

  export let handleCaptchaCallback = async (v) => {
    dispatcher("success", { msg: "okay", token: v });
    //console.log("DEFAULT HANDLE CAPTCHA CALLBACK", v);
    return;
  };

  export let handleCaptchaError = async (v) => {
    dispatcher("error", { msg: "error", token: v });
    //console.log("DEFAULT HANDLE CAPTCHA ERROR", v);
    return;
  };

  export let resetCaptcha = async (v) => {
    dispatcher("reset", { msg: "reset", token: v });
    //console.log("DEFAULT RESET CAPTCHA", v);
    // @ts-ignore
    window.grecaptcha.reset(recaptchaContainer);
    return;
  };

  onMount(() => {
    // @ts-ignore
    window.grecaptcha.ready(function () {
      // @ts-ignore
      grecaptcha.render(recaptchaContainer, {
        sitekey: RECAPTCHA_SITE_KEY,
        callback: handleCaptchaCallback,
        "expired-callback": resetCaptcha,
        "error-ballback": handleCaptchaError
      });
    });
  });
</script>

<div bind:this={recaptchaContainer} id={recaptchaId} />

<style lang="scss">
</style>
