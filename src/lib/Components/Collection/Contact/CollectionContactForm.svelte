<script>
  // @ts-nocheck

  import InfoBox from "../../General/InfoBox.svelte";
  import Recaptcha from "../../General/Recaptcha.svelte";
  import { BASE_URL } from "../../../constants.js";

  export let collection = {};
  let formRef;

  const softwareList = [
    "ArcMap",
    "ENVI",
    "ERDAS",
    "Global Mapper",
    "Integraph",
    "LP360",
    "Microstation",
    "PostGIS",
    "QGIS",
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
      software: postData["software"],
      message: postData["comment"],
      form_id: "data-tnris-org-inquiry",
      uuid: collection.collection_id,
      collection: collection.name,
      category: collection.category,
      acquisition_date: collection.acquisition_date,
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
  <InfoBox>
    For questions about the <strong>{collection.name} </strong>
    dataset, please complete the form below. Orders for this data cannot be submitted
    via this form.
    <strong> To order this dataset, please visit the Custom Order tab. </strong>
  </InfoBox>
  <br />
  {#if submitStatus}
    {#if submitStatus == "success"}
      <InfoBox infoClass="success">
        Your inquiry was submitted successfully.
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
      maxlength={40}
      minlength={2}
      required
    /></label
  >
  <label for="software" class="required">
    Software
    <select id="software" name="software" required>
      {#each softwareList as s}
        <option value={s.replace(" ", "_")}>{s}</option>
      {/each}
    </select></label
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
    gap: .5rem;
    overflow-y: auto;
    flex-direction: column;
    width: 100%;
    label {
      width: 100%;
    }
  }
</style>
