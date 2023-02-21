<script>
  import { RECAPTCHA_SITE_KEY } from "../../constants";
  import { onMount } from "svelte";

  let recaptchaContainer = null;

  export let handleCaptchaCallback = async (v) => {
    //console.log("DEFAULT HANDLE CAPTCHA CALLBACK", v);
    return;
  };

  export let handleCaptchaError = async (v) => {
    //console.log("DEFAULT HANDLE CAPTCHA ERROR", v);
    return;
  };

  export let resetCaptcha = async (v) => {
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
        "error-ballback": handleCaptchaError,
      });
    });
  });
</script>

<div bind:this={recaptchaContainer} />

<style lang="scss">
</style>
