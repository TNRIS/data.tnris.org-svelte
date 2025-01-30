<script>
  // @ts-nocheck

  import InfoBox from "../General/InfoBox.svelte";
  import Recaptcha from "../General/Recaptcha.svelte";
  import { BASE_URL } from "../../constants.js";

  let formRef;

  const industryList = [
    "Agriculture",
    "Cartography",
    "Conservation",
    "Construction",
    "Consulting",
    "Education",
    "Emergency Management",
    "Environmental",
    "Forestry",
    "Government",
    "Insurance",
    "Law Enforcement",
    "Oil and Gas",
    "Public Health",
    "Retail",
    "Utilities",
    "Urban Planning",
    "Other",
  ];

  let submitStatus = null;
  let submitMessage = null;

  const submitContactForm = async (e) => {
    let fd = new FormData(e.target);
    let postData = Object.fromEntries(fd);

    let formVals = {
      name: `${postData["first_name"]} ${postData["last_name"]}`,
      email: postData["email"],
      industry: postData["industry"],
      organization: postData["organization"],
      question_or_comments: postData["comment"],
      form_id: "contact",
      recaptcha: postData["g-recaptcha-response"],
    };

    const url = `${BASE_URL}/api/v1/contact/submit`;
    const payload = {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(formVals),
      cache: "no-cache"
    };

    const response = await fetch(url, payload);
    const data = await response.json();

    submitStatus = data.status;
    submitMessage = data.message;
    if (submitStatus == "success") e.target.reset();
  };
</script>

<form
  id="collection-contact-form"
  on:submit|preventDefault|stopPropagation={submitContactForm}
  bind:this={formRef}
>
  <br />
  {#if submitStatus}
    {#if submitStatus == "success"}
      <InfoBox infoClass="success">
        Your message was submitted successfully.
      </InfoBox>
    {:else}
      <InfoBox infoClass="caution">
        <strong>{submitStatus}</strong>
        <p>{submitMessage}</p>
      </InfoBox>
    {/if}
  {/if}
  <label for="first_name" class="required">
    First Name
    <input
      type="text"
      id="first_name"
      name="first_name"
      maxlength={40}
      minlength={2}
      required
    /></label
  >
  <label for="last_name" class="required">
    Last Name
    <input
      type="text"
      id="last_name"
      name="last_name"
      maxlength={40}
      minlength={2}
      required
    /></label
  >
  <label for="email" class="required">
    Email
    <input
      type="email"
      id="email"
      name="email"
      maxlength={70}
      minlength={2}
      required
    /></label
  >
  <label for="industry" class="required">
    Industry
    <select id="industry" name="industry" required>
      {#each industryList as ind}
        <option value={ind.replace(" ", "_")}>{ind}</option>
      {/each}
    </select></label
  >
  <label for="organization" class="required">
    Organization
    <input
      type="text"
      id="organization"
      name="organization"
      maxlength={70}
      minlength={1}
      required
    /></label
  >
  <label for="comment" class="required">
    Comment
    <textarea id="comment" name="comment" required />
  </label>
  <label for="g-recaptcha-response" class="required">
    <Recaptcha
      handleCaptchaCallback={async (v) => {
        let fd = new FormData(formRef);
        fd.set("g-recaptcha-response", v);
        //console.log(v, fd);
      }}
      handleCaptchaError={async (v) => {
        let fd = new FormData(formRef);
        fd.set("g-recaptcha-response", null);
      }}
      resetCaptcha={async (v) => {
        let fd = new FormData(formRef);
        fd.set("g-recaptcha-response", null);

        window?.grecaptcha?.reset();
      }}
    />
  </label>
  <button type="submit">Send</button>
</form>

<style lang="scss">
  form {
    display: flex;
    gap: 0.5rem;
    overflow-y: auto;
    flex-direction: column;
    width: 100%;
    label {
      width: 100%;
    }
  }
</style>
